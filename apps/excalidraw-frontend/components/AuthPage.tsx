"use client";

import Input from "@repo/ui/Input";
import { useState } from "react";

export function AuthPage({isSignin}:{
    isSignin:boolean
}) {
    //centralised div with the below statement
    //ideadly input should be insid ethe ui packages components box 
    return( 
    <div className="w-screen h-screen  flex justify-center items-center">
        <div className="p-6 m-2 bg-white rounded">
            <div className="pt-2 text-black">
                <Input type="text" placeholder="Email"/>
            </div>
            <div className="pt-2 text-black">
                <Input type="password" placeholder="Password"/>
            </div>
            <div className="pt-2 text-black">
                <button onClick={()=>{

                }} >{isSignin?"SignIn":"SignUp"}</button>
            </div>
            
        </div>
        
 
    </div>
    )
}