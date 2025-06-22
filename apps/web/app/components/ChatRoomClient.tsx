"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}:{
    messages:{messages:string}[];
    id:string
}){
    const [chats,setChats]=useState(messages);
    const {socket,loading} = useSocket();
    const [currentMessages,setCurrentMessages]=useState('');

    useEffect(()=>{
        if(socket &&  !loading){

            socket.send(JSON.stringify({
                type:"join_room",
                roomId: id
            }));

            socket.onmessage =(event)=>{
                const parsedData = JSON.parse(event.data);
                if(parsedData.type ==="chat"){
                    setChats(c => [...c,parsedData.messages])
                }
            }
        }
    },[socket,loading,id])

    return <div>
        {messages.map(m=><div>{m.messages}</div>)}
        <input type="text" value={currentMessages} onChange={e=>{
            setCurrentMessages(e.target.value);
        }} />
        <button onClick={()=>{
            socket?.send(JSON.stringify({
                type:"chat",
                roomId:id,
                messages:currentMessages

            }))
            setCurrentMessages("");
        }}>Send MEssages</button>
    </div>
}