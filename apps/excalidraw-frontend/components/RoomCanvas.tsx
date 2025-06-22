"use client";


import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { MainCanvas } from "./MainCanvas";


export function RoomCanvas({roomId}:{roomId:string}){
    
    const [socket,setSocket]=useState<WebSocket|null>(null);

    useEffect(()=>{
        const ws= new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNTIyNjFlNy1mOWJiLTRlM2QtOGIzNS03NzMyMmEyOTA3ODUiLCJpYXQiOjE3NDM2MDE2OTR9.nOYLqSEqFNOhoWSbCFRO4wTgF0LdG1hOEKSwUzSV6e0`)
        ws.onopen=()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type:"join_room",
                roomId:roomId
            }))
        }
    },[])



    if(!socket){
        return <div>
            Connectin to server .....
        </div>
    }
    return <div>
        <MainCanvas roomId={roomId} socket={socket}></MainCanvas>
        {/* <div className="absolute bottom-0 right-0">
            <button className="bg-white text-black">Rect</button>
            <button className="bg-white text-black">Circle</button>
        </div> */}
    </div>
}