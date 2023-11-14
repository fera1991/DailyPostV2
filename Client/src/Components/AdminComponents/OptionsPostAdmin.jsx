import React from 'react';
import { useState } from 'react';
import { useAPIContext } from '../../Context/Context';
import FormPost from './FormPostAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

export default function OptionsPots({props ,boolFunction=()=>{}}) {
    const [bool,setBool] = useState(false)
    const context = useAPIContext();
    const hide = async () => {
        const data = await context.toggle(props._id);
        console.log(data);
        boolFunction();
        OcultarConfirmacion();
    }
    
    const bottonfunction = () =>{
        setBool(!bool)
        boolFunction();
    }

    const OcultarConfirmacion=()=>{
        swal({
            title: "Vista Post",
            text: "Actualizando vista de Post",
            icon: "success",
            timer: "2000"
            
        });
    }

    return(
    <div className="justify-between">
        <button  onClick={()=>{hide()}}  className="text-gray-500 px-1"><FontAwesomeIcon icon={faEyeSlash}/></button>
        <button className="text-gray-500" onClick={()=>{setBool(!bool)}}><FontAwesomeIcon icon={faEdit}/></button>
        {bool && <FormPost props={props} bottonfunction={bottonfunction}/>}
    </div>
    )
}