import axios from "axios"
import { BACKEN_URL } from "../config"

async function getChats (roomId){
  const response  = await axios.get(`${BACKEN_URL}/chats/${roomId}`);
}


export async function Chatroom({id}:{
  id:string
}){
  const messages=  await getChats(id);
}
