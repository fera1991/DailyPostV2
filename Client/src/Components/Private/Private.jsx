// import { useAPIContext } from "../../Context/Context";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate} from 'react-router-dom';

export default function Private({role,children}){
    const navigate = useNavigate();
    // const context = useAPIContext();
    const logoutFuntion = () => {
        // context.logout(); 
        navigate("/"); 
    }

        return <div className="flex justify-center items-center  min-h-screen bg-purple-50">
        <div className="flex flex-col justify-center">
            <h2 className="text-8xl font-sans font-bold text-center mb-6 text-yellow-400 px-4"><FontAwesomeIcon icon={faExclamationCircle}/>404</h2>
            <h3 className="text-4xl font-sans font-medium text-center py-1 px-4 mt-4">Page not found.</h3>
            <p className="text-lg font-sans font-normal text-center py-1 px-4 mt-4">The page you are looking for doesn't exist or an other error occurred.</p>
            <button onClick={()=>{logoutFuntion()}} type="button" className="font-sans bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 px-4 mt-4 rounded-sm">Go to Login</button>
        </div>
    </div>

    //return children;
}
