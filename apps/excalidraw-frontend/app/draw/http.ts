import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export  async function getExistingShapes(roomId:string){
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`) 
    const messaages=res.data.messages

    const  shapes=messaages.map((x:{message:string})=>{
        const messageData=JSON.parse(x.message)
        return messageData;
    })

    return  shapes;

}