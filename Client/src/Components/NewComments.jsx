import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useAPIContext } from "../Context/Context";
import swal from 'sweetalert';

export default function NewComment({props}){
    const[comment, setComment] = useState('')
    const context = useAPIContext();
    const [Error, setError] = useState(false);
    const add = async () =>{
        if (comment.length > 8) {
            console.log(props._id)
            console.log(comment)
            const data = await context.comment(props._id,comment);
            console.log(data);
            setError(false);
            setComment('');
            ComentarioConfirmacion();
        }
        else{
            console.log("no")
            setError(true);
        }
    }

    const ComentarioConfirmacion=()=>{
        swal({
            title: "Has hecho un comentario",
            text: "Refresca la pagina para poder ver tu comentario",
            icon: "success",
            timer: "2000"
        });
    }

    return(
        <div className="flex justify-between items-center mx-4 py-1 ">
            {Error === true && <div className="text-red-500 text-xs">Digite mas de 8 caracteres</div>}
            <input onChange={event => setComment(event.target.value)} value={comment} type="text" className="font-sans block bg-gray-100 border w-full h-5 px-2 py-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" placeholder="Agregar un comentario"></input>
            <button type="button" disabled={!props.active} onClick={()=>{add()}} className="py-1 px-2 mt-1"><FontAwesomeIcon icon={faShare}/></button>
        </div>
    )
}