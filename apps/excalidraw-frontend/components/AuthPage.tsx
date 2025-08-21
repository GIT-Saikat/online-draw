// "use client";

// import Input from "@repo/ui/Input";
// import { useState } from "react";

// export function AuthPage({isSignin}:{
//     isSignin:boolean
// }) {
//     //centralised div with the below statement
//     //ideadly input should be insid ethe ui packages components box 
//     return( 
//     <div className="w-screen h-screen  flex justify-center items-center">
//         <div className="p-6 m-2 bg-white rounded">
//             <div className="pt-2 text-black">
//                 <Input type="text" placeholder="Email"/>
//             </div>
//             <div className="pt-2 text-black">
//                 <Input type="password" placeholder="Password"/>
//             </div>
//             <div className="pt-2 text-black">
//                 <button onClick={()=>{

//                 }} >{isSignin?"SignIn":"SignUp"}</button>
//             </div>
            
//         </div>
        
 
//     </div>
//     )
// }














"use client";

import Input from "@repo/ui/Input";
import { useState } from "react";

export function AuthPage({ isSignin }: {
    isSignin: boolean
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAuth = () => {
        if (isSignin) {
            // Logic for Sign In
            console.log("Signing In with:", { email, password });
            // API call to sign in endpoint
        } else {
            // Logic for Sign Up
            console.log("Signing Up with:", { email, password });
            // API call to sign up endpoint
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-6 m-2 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{isSignin ? "Sign In" : "Sign Up"}</h2>
                <div className="pt-2 text-black">
                    <Input 
                        type="text" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="pt-2 text-black">
                    <Input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="pt-4">
                    <button 
                        onClick={handleAuth}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        {isSignin ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
}