import React from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { faHome, faBars, faSearch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OptionsBarsAdmin from './OptionBarsUser';
import { useState } from "react"; 


export default function MenuAdmin({ props = () => {} ,func=()=>{},favorite=()=>{}}) {
    const[bar, setBar] = useState(false);
    const[post, setPost] = useState('')
    const onSearch = () =>{
        if (post.length > 5) {
            props(post);
        }
        else{
            console.log("no")
        }
    }

    return(
        <div className="flex justify-between items-center bg-white fixed w-screen px-2">
            <img className="w-1/6" src={DailyPost_logo} alt="Daily Post"></img>
            <div className= "flex justify-center">
                <input required onSubmit={()=>{onSearch()}} onChange={event => setPost(event.target.value)} type="text" className="font-sans bg-gray-100 border w-full h-5 px-1 py-3 mt-3 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-lg" placeholder="Buscar"></input>
                <button onClick={()=>{onSearch()}}  className="py-1 mt-2 px-2"><FontAwesomeIcon icon={faSearch}/></button>
            </div>
            <div className="justify-between flex">
                <button className="py-1 px-4 mt-1 display-none" onClick={()=>{func()}} ><FontAwesomeIcon icon={faHome}/></button>
                <button className="py-1 px-4 mt-1" onClick={()=>{setBar(!bar)}}><FontAwesomeIcon icon={faBars}/>
                </button>
                {bar && <OptionsBarsAdmin favorite={favorite}/>}
            </div>
        </div>
    )
}