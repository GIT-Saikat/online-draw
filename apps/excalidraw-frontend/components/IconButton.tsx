// import { LineChart } from "lucide-react";

import { ReactNode } from "react"


export function Icon_Button({icon,onClick,activated}:{
    icon: ReactNode,
    onClick: ()=>void,
    activated:boolean
}){
    return <div className={`m-2 cursor-pointer rounded-full border-2 p-3 transition-colors duration-200
        ${activated ? "border-red-500 bg-white text-red-500" : "border-white bg-black text-white"}
        hover:bg-gray-100`} onClick={onClick}>
        {icon}
    </div>
    
}
