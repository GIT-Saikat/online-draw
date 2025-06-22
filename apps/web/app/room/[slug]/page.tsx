import axios from "axios";
import { BACKEN_URL } from "../../config";
import { Chatroom } from "../../components/ChatRoom";

async function getRooms(slug:string) {
    const  response = await axios.get(`${BACKEN_URL}/room/${slug}`);
    return response.data.id;
}

export default  async function chatRoom({
    params
}:{
    params:{
        slug:string
    }
}){
    const  slug =  (await params).slug;
    const roomId = await getRooms(slug);

    return Chatroom
}