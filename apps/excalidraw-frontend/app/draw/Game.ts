import { Tool } from "@/components/MainCanvas";
import { getExistingShapes } from "./http";

type Shape={
    type:"rect",
    x:number,
    y:number,
    width:number,
    height:number
}|{
    type:"circle",
    centerX:number,
    centerY:number,
    radius:number
}|{
    type:"pencil",
    startX:number,
    startY:number,
    endX:number,
    endY:number
}

export class  Game{
    
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX= 0;
    private startY= 0;
    private selectedTool:Tool="circle";

    socket:WebSocket;

    constructor(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.canvas = canvas
        const ctx = canvas.getContext("2d")!;
        if(!ctx){
            throw new Error("failed to get canvas context")
        }
        this.ctx = ctx;
        //!  non-null assertion operator
        //it can  also be private ctx:CanvasRenderingContext2D|null;
        this.existingShapes=[];
        this.roomId=roomId;
        this.socket=socket;
        this.clicked=false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    destroy(){
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup",this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove",this.mouseMoveHandler)
    }

    setTool(tool:"rect"|"circle"|"pencil"){
        this.selectedTool=tool;
    }

    async init(){
        this.existingShapes=await getExistingShapes(this.roomId)
        this.clearCanvas();
    }

    initHandlers(){
        this.socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                console.log("Received WebSocket message:", message); // Debug log
                
                if (message.type === "chat") {
                    if (typeof message.message === "string") {
                        try {
                            const parsedShape = JSON.parse(message.message);
                            this.existingShapes.push(parsedShape);
                            this.clearCanvas();

                        } catch (jsonError) {
                            console.error("Failed to parse message.message:", message.message);
                        }
                    } else {
                        console.log("message.message is not a string:", message.message);
                        this.existingShapes.push(message.message); // Directly push if already an object
                        this.clearCanvas();
                    }
                }
            } catch (error) {
                console.error("Failed to parse WebSocket event data:", event.data);
            }
        };

    }

    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        //We can also not use the above code line of clearRect becuse we are  essentially again fillingthe this.canvas with black colour it  has no real any use case
        this.ctx.fillStyle="rgba(0,0,0)";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    
        this.existingShapes.map((shape)=>{
            if(shape.type==="rect"){
                this.ctx.strokeStyle="rgba(255,255,255)"
                this.ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
            }
            else if(shape.type==="circle"){
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX,shape.centerY,Math.abs(shape.radius),0,Math.PI*2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        })
    
    }

    mouseDownHandler = (e: { clientX: number; clientY: number; }) => {
         // The this inside the arrow function is not the DOM element or window, it's whatever this was when initMouseHandlers() was called — and that is your Game class instance. when  we  write function(e) this is referred from window or  DDOM element. We can  also do by .bind(this)
         this.clicked=true;
         this.startX=(e.clientX);
         this.startY=(e.clientY);
    }

    mouseUpHandler = (e: { clientX: number; clientY: number; }) => {
            console.log("Tool used:", this.selectedTool); // debug log
            


            this.clicked=false;
            const Width = e.clientX-this.startX;
            const Height = e.clientY-this.startY;

            //@ts-ignore
            const selectedTool=this.selectedTool;
            let shape:Shape|null=null;
            if(selectedTool==="rect"){
                shape = {
                    type:"rect",
                    x:this.startX,
                    y:this.startY,
                    width:Width,
                    height:Height
                }
            }else if(selectedTool==="circle"){
                const radius = Math.max(Width, Height) / 2;
                shape = {
                    type:"circle",
                    centerX:this.startX+radius,
                    centerY:this.startY+radius,
                    radius : radius,
                }
            }
            if(!shape){
                return;
            }

            this.existingShapes.push(shape);
            

            this.socket.send(JSON.stringify({
                type:"chat",
                roomId:this.roomId,
                message: JSON.stringify({
                    shape
                })
                
            }))

    }

    mouseMoveHandler = (e: { clientX: number; clientY: number; }) => {
        if (this.clicked){
            const Width = e.clientX-this.startX;
            const Height = e.clientY-this.startY;
            this.clearCanvas();
            this.ctx.strokeStyle="rgba(255,255,255)"
            //@ts-ignore
            const selectedTool=this.selectedTool;

            if(selectedTool==="rect"){
                this.ctx.strokeRect(this.startX,this.startY,Width,Height);
            }else if(
                selectedTool==="circle"
            ){
                const absWidth = Math.abs(Width);
                const absHeight = Math.abs(Height);
                const radius = Math.max(absWidth, absHeight) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;

                // const  radius = Math.max(Width,Height)/2;
                this.ctx.beginPath();
                this.ctx.arc(centerX,centerY,Math.abs(radius),0,Math.PI*2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
            

        }

    }

    initMouseHandlers(){
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas.addEventListener("mouseup",this.mouseUpHandler)

        this.canvas.addEventListener("mousemove",this.mouseMoveHandler)
    }

    
}

