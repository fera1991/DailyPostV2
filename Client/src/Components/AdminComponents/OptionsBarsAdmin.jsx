import React from 'react';
import { useAPIContext } from '../../Context/Context';
import { useNavigate} from 'react-router-dom';

export default function OptionsBarsUser({owned=()=>{},favorite=()=>{}}) {

    const context = useAPIContext();
    const navigate = useNavigate();

    const logoutFuntion = () => {
        context.logout(); 
        navigate("/");  
    }
    
    return(
    <div className="bg-gray-200 flex flex-col mt-1 p-2 text-sm w-32 absolute top-0 right-36">
        <div><button  className="px-2 py-1 hover:bg-gray-500" onClick={()=>{logoutFuntion()}}>Cerrar sesión</button></div>
        <div className="m-2"><button onClick={()=>{favorite()}} className="px-2 py-1 hover:bg-gray-500">Guardados</button></div>
        <div className="m-2"><button onClick={()=>{owned()}} className="px-2 py-1 hover:bg-gray-500">POST</button></div>
    </div>
    )
}