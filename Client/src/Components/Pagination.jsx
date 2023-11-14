import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Pagination({ sumNum = () => {} ,subtractionNum = ()=>{}}){
    return(
        <div className="flex justify-start items-center fixed w-screen px-4 p-1">
            <button onClick={()=>{subtractionNum()}} className="text-sm bg-purple-400 hover:bg-purple-500 text-white font-bold py-0.5 px-2 mt-4 rounded-sm mx-1" type="submit"><FontAwesomeIcon icon={faArrowLeft}/></button>
            <button onClick={()=>{sumNum()}} className="text-sm bg-purple-400 hover:bg-purple-500 text-white font-bold py-0.5 px-2 mt-4 rounded-sm mx-1" type="submit"><FontAwesomeIcon icon={faArrowRight}/></button>
        </div>
    )
}