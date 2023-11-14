import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useAPIContext } from "../Context/Context";
import { useEffect, useState } from "react";
import swal from 'sweetalert';

export default function NewComment(props){

    const [likes,setLikes] = useState(0);

    useEffect(()=>{
        setLikes(props.props.likes.length);
        console.log(likes)
    },[props])

    const context = useAPIContext();
    const like = async() =>{
        const data = await context.like(props.props._id);
        const amount = await context.getOne((props.props._id));
        setLikes(amount.likes.length);
    }

    const GuardarConfirmacion=()=>{
        swal({
            title: "Has guardado este post como Favorito",
            text: "Puedes verlo en Guardado",
            icon: "success",
            timer: "2000"
        });
    }

    const favorite = async() => {
        const data = await context.favorite(props.props._id);
        GuardarConfirmacion();
        console.log(data);
    }

    
    return(
        <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                     <button disabled={!props.props.active} onClick={()=>{like()}} className="float-right"><FontAwesomeIcon icon={faHeart}/>{likes}</button>
                        <p className="float-right"><FontAwesomeIcon icon={faComment}/>{props.props.comments.length}</p>
                    <button disabled={!props.props.active} onClick={()=>{favorite()}} className="float-right"><FontAwesomeIcon icon={faBookmark}/></button>
            </div>
        </div>
    )
}