// import { useAPIContext } from "../../Context/Context";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate} from 'react-router-dom';
import error404 from '../../assets/img/error404.png';
export default function Private({role,children}){
    const navigate = useNavigate();
    // const context = useAPIContext();
    const logoutFuntion = () => {
        // context.logout(); 
        navigate("/"); 
    }

        return <div className="flex justify-center items-center  min-h-screen bg-purple-50">
        <div className="flex flex-col justify-center  transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0">
        <img src={error404} class="h-80" alt="error" />
            <h3 className="text-4xl font-sans font-medium text-center py-1 px-4 mt-4">Lo sentimos mucho, pagina no encontrada :(.</h3>
            <p className="text-lg font-sans font-normal text-center py-1 px-4 mt-4">La página que buscas no existe o se produjo otro error.</p>
            <button onClick={()=>{logoutFuntion()}} type="button" className="font-sans bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 px-4 mt-4 rounded-sm">Regresar</button>
        </div>
    </div>

    //return children;
}
