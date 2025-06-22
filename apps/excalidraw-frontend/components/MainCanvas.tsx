"use client";

// import { initDraw } from "@/app/draw";
import { useEffect, useRef, useState } from "react";
import { Icon_Button } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import "/app/globals.css";
import { Game } from "@/app/draw/Game";

export type  Tool =  "circle"|"rect"|"pencil"

export function MainCanvas({roomId,socket}:{
    roomId:string,
    socket:WebSocket
}){
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const  [game,setGame]=useState<Game>();
    const [selectedTool,setSelectedTool]=useState<Tool>("circle")

    useEffect(()=>{
        //@ts-ignore
        game?.setTool(selectedTool)
    },[selectedTool,game]);

    useEffect(()=>{
        if(canvasRef.current){
            const g  = new Game(canvasRef.current,roomId,socket)
            setGame(g);
            return  () =>{
                g.destroy()
            }
        }

       

        const handleScroll = (e: Event) => {
            e.preventDefault();
        };

        document.body.style.overflow = "hidden"; // Disable scroll on body
        document.documentElement.style.overflow = "hidden"; // Disable scroll on html

        // Optional: Prevent touch move scroll on mobile devices
        window.addEventListener("scroll", handleScroll, { passive: false });

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            window.removeEventListener("scroll", handleScroll);
        };
    },[canvasRef]);

    return <div style={{
        height:"100vh",
        overflow:"hidden",
        position: "relative"// It doesn’t move the element itself But it anchors absolutely positioned children inside it instead of the whole page
    }}>
        {/* <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas> */}
        <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh",
            position:"absolute",// important: take it out of normal flow
            top:0,
            left: 0,
            zIndex: 0, // canvas at bottom
         }} />
        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>

       
    </div>
}

function Topbar({selectedTool,setSelectedTool}:{
    selectedTool:Tool,
    setSelectedTool:(s:Tool)=>void
}){
    return <div style={{
        position:"fixed",
        top:10,
        left:10,
        zIndex: 10, // higher than canvas
        color: "white" // in case you want visible text
    }} >
        
        <div className="flex gap-2">
            <Icon_Button onClick={()=>{
                setSelectedTool("pencil")
            }} activated={selectedTool==="pencil"} icon ={<Pencil ></Pencil>}></Icon_Button>

            <Icon_Button onClick={()=>{
                setSelectedTool("rect")
            }} activated={selectedTool==="rect"} icon ={<RectangleHorizontalIcon ></RectangleHorizontalIcon>} ></Icon_Button>

            <Icon_Button onClick={()=>{
                setSelectedTool("circle")
            }} activated={selectedTool==="circle"} icon ={<Circle ></Circle>}></Icon_Button>
        </div>
        
    </div>
}