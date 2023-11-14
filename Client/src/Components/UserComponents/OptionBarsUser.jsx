import React from 'react';
import { useAPIContext } from '../../Context/Context';
import { useNavigate} from 'react-router-dom';

export default function OptionsBarsUser({favorite=()=>{}}) {

    const context = useAPIContext();
    const navigate = useNavigate();

    const logoutFuntion = () => {
        context.logout(); 
        navigate("/");  
    }
    
    return(
    <div className="bg-gray-200 flex flex-col mt-1 p-2 text-sm w-32 absolute top-0 right-28">
        <div><a href="#" className="px-2 py-1 hover:bg-gray-500" onClick={()=>{logoutFuntion()}}>Cerrar sesión</a></div>
        <div className="m-2"><a onClick={()=>{favorite()}} className="px-2 py-1 hover:bg-gray-500">Guardados</a></div>
    </div>
    )
}