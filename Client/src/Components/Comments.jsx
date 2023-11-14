import React from "react";
import { useEffect, useState } from "react";

export default function Comment(props){

    const [commnets,setComments] = useState([]);

    useEffect(()=>{
        setComments(props.props.comments);
        },[props]);

        
    const commentRender = () => {
        return commnets.map(data => 
                    
            <div className="border-t my-3 py-1">
            <h1 className="font-sans pl-6 text-sm font-semibold text-black">{ data.user && data.user.username}</h1>
            <p className="text-xs pl-6 font-normal font-sans break-words">{data.description}</p>
            </div>);
    }

   

    return(
        <div className="flex flex-col overflow-y-auto max-h-40">
            
            {
                commentRender()
            }
        
        </div>
    )
}