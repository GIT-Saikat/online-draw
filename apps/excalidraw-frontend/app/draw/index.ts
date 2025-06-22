// import { HTTP_BACKEND } from "@/config";
// import axios from "axios";

// type Shape={
//     type:"rect",
//     x:number,
//     y:number,
//     width:number,
//     height:number
// }|{
//     type:"circle",
//     centerX:number,
//     centerY:number,
//     radius:number
// }|{
//     type:"pencil",
//     startX:number,
//     startY:number,
//     endX:number,
//     endY:number
// }
// export async function initDraw(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){
//             if(canvas){
//                 canvas.width = window.innerWidth;
//                 canvas.height = window.innerHeight;
//             }
//             const ctx= canvas.getContext("2d");
//             if(!ctx){
//                 return
//             }

//             let existingShapes: Shape[]=await getExistingShapes(roomId);

//             // socket.onmessage=(event)=>{
//             //     const  message=JSON.parse(event.data);

//             //     if(message.type=="chat"){
//             //         const parsedShape=JSON.parse(message.message)
//             //         existingShapes.push(parsedShape)
//             //         clearCanvas(existingShapes,ctx,canvas)
//             //     }

//             // }

//             socket.onmessage = (event) => {
//                 try {
//                     const message = JSON.parse(event.data);
//                     console.log("Received WebSocket message:", message); // Debug log
                    
//                     if (message.type === "chat") {
//                         if (typeof message.message === "string") {
//                             try {
//                                 const parsedShape = JSON.parse(message.message);
//                                 existingShapes.push(parsedShape);
//                                 clearCanvas(existingShapes, ctx, canvas);
//                             } catch (jsonError) {
//                                 console.error("Failed to parse message.message:", message.message);
//                             }
//                         } else {
//                             console.log("message.message is not a string:", message.message);
//                             existingShapes.push(message.message); // Directly push if already an object
//                             clearCanvas(existingShapes, ctx, canvas);
//                         }
//                     }
//                 } catch (error) {
//                     console.error("Failed to parse WebSocket event data:", event.data);
//                 }
//             };

//             clearCanvas(existingShapes,ctx,canvas);
//             // ctx.strokeRect(25,25,100,100);
//             let  clicked = false;
//             let startX=0;
//             let startY=0;
//             addEventListener("mousedown",(e)=>{
//                 clicked=true;
//                 startX=(e.clientX);
//                 startY=(e.clientY);
//             })

//             addEventListener("mouseup",(e)=>{
//                 clicked=false;
//                 const Width = e.clientX-startX;
//                 const Height = e.clientY-startY;

//                 //@ts-ignore
//                 const selectedTool=window.selectedTool;
//                 let shape:Shape|null=null;
//                 if(selectedTool==="rect"){
//                     shape = {
//                         type:"rect",
//                         x:startX,
//                         y:startY,
//                         width:Width,
//                         height:Height
//                     }
//                 }else if(selectedTool==="circle"){
//                     const radius=Math.max(Math.abs(Width), Math.abs(Height)) / 2;
//                     shape = {
//                         type:"circle",
//                         centerX:startX+radius,
//                         centerY:startY+radius,
//                         radius : radius,
//                     }
//                 }
//                 if(!shape){
//                     return;
//                 }

//                 existingShapes.push(shape);
                

//                 socket.send(JSON.stringify({
//                     type:"chat",
//                     roomId:roomId,
//                     message: shape
                    
//                 }))

//             })

//             addEventListener("mousemove",(e)=>{
//                 if (clicked){
//                     const Width = e.clientX-startX;
//                     const Height = e.clientY-startY;
//                     clearCanvas(existingShapes,ctx,canvas);
//                     ctx.strokeStyle="rgba(255,255,255)"
//                     //@ts-ignore
//                     const selectedTool=window.selectedTool;

//                     if(selectedTool==="rect"){
//                         ctx.strokeRect(startX,startY,Width,Height);
//                     }else if(
//                         selectedTool==="circle"
//                     ){
//                         const absWidth = Math.abs(Width);
//                         const absHeight = Math.abs(Height);
//                         const radius = Math.max(absWidth, absHeight) / 2;
//                         const centerX = startX + radius;
//                         const centerY = startY + radius;

//                         // const  radius = Math.max(Width,Height)/2;
//                         ctx.beginPath();
//                         ctx.arc(centerX,centerY,radius,0,Math.PI*2);
//                         ctx.stroke();
//                         ctx.closePath();
//                     }
                    

//                 }
//             })
// }

// function clearCanvas(existingShapes:Shape[],ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     //We can also not use the above code line of clearRect becuse we are  essentially again fillingthe canvas with black colour it  has no real any use case
//     ctx.fillStyle="rgba(0,0,0)";
//     ctx.fillRect(0,0,canvas.width,canvas.height);

//     existingShapes.map((shape)=>{
//         if(shape.type==="rect"){
//             ctx.strokeStyle="rgba(255,255,255)"
//             ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
//         }
//         else if(shape.type==="circle"){
//             ctx.beginPath();
//             ctx.arc(shape.centerX,shape.centerY,shape.radius,0,Math.PI*2);
//             ctx.stroke();
//             ctx.closePath();
//         }
//     })
// }

// async function getExistingShapes(roomId:string){
//     const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`) 
//     const messaages=res.data.messages

//     const  shapes=messaages.map((x:{message:string})=>{
//         const messageData=JSON.parse(x.message)
//         return messageData;
//     })

//     return  shapes;

// }