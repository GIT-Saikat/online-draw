import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({port:8080});

interface User{
    ws:WebSocket,
    room:string[],
    userId:string
}

//use redux or singletons for future for scalable state management . this is the simplest approach

const users: User[]=[]



function checkUser(token : string):string|null{
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(typeof decoded ==  "string"){
            return null;
        }
        if(!decoded || !decoded.userId){
            return null;
        }//we can perform this check at http level itself
        return decoded.userId;
    }catch(e){
        return null;
    }
    
}

wss.on("connection",function connection(ws,request){

    const  url  = request.url;
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token")||"";
    const userId = checkUser(token);
    if(userId==null){
        ws.close()
        return null;
    }
    users.push({
        userId,
        room:[],
        ws
    })

    ws.on("message",  async function message(data){
        // console.log(data)
        // const parsedData=JSON.parse(data as unknown as string);
        let parsedData;
        if(typeof data !=="string"){
            parsedData = JSON.parse(data.toString());
            console.log("Case1");
            console.log(parsedData);
        }else{
            parsedData=JSON.parse(data);
            console.log("Case2");
            console.log(parsedData);//{type:""}
        }

        // if(parsedData.type==="join_room"){
        //     const user =users.find(x=>x.ws===ws);
        //     if(user){
        //         user?.room.push(parsedData.roomId);
        //         console.log(`User ${user.userId} joined room: ${parsedData.roomId}`);
        //     }
        //     // user?.room.push(parsedData.roomId)
        // }

        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            if (user) {
                if (!user.room.includes(parsedData.roomId)) {
                    user?.room.push(parsedData.roomId);
                    console.log(`User ${user.userId} joined room: ${parsedData.roomId}`);
                } else {
                    console.log(`User ${user.userId} is already in room: ${parsedData.roomId}`);
                }
            } else {
                console.log(`User not found when trying to join room: ${parsedData.roomId}`);
            }
        }

        // console.log("Current users:", users.map(u => ({ userId: u.userId, rooms: u.room })));

        
        if(parsedData.type==="leave_room"){
            const  user = users.find(x=>x.ws===ws);
            if(!user){
                return;
            }
            user.room=user?.room.filter(x=>x===parsedData.room)
        }

        // console.log("message recxeived");
        // console.log(parsedData)


        //ideal approach is throw this in a queue pipiline into a database . this is an async approach. go through the chess video
        if(parsedData.type==="chat"){
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            const sender = users.find(x => x.ws === ws);
            if (!sender) {
                console.log("Sender not found!");
                return;
            }
            if (!sender?.room.includes(roomId)) {
                console.log(`User ${sender?.userId} is trying to send a message but has not joined room: ${roomId}`);
                return;
            }

            // console.log(`User ${sender.userId} sent message: "${message}" in room: ${roomId}`);

            await prismaClient.chat.create({
                data:{
                    roomId:Number(roomId),
                    message: JSON.stringify(message),
                    userId
                }
            })

            users.forEach(user =>{
                if(user.room.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomId
                    }))
                }
            })
        }
    });
});