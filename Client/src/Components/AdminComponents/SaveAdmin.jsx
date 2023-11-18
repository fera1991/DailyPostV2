import React from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { faHome, faPlusSquare, faBars,faSearch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormPost from "./FormPostAmin";
import OptionsBarsAdmin from './OptionsBarsAdmin';
import { useState } from "react";
import { Link } from 'react-router-dom';


export default function MenuAdmin({ props = () => {} ,func=()=>{},owned=()=>{},favorite=()=>{},reload=()=>{}}) {
    const[add, setAdd] = useState(false);
    const[bar, setBar] = useState(false);
    const[post, setPost] = useState('')

    const onSearch = () =>{
        if (post.length > 5) {
            props(post);
            setPost('')
        }
        else{
            console.log("no")
        }
    }
  

    return(
<nav class="bg-white dark:bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-purple-50 ">
  <div class=" flex flex-wrap items-center object-center justify-between mx-auto p-4">
  <a class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={DailyPost_logo} class="h-12" />
  </a>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <Link to="/newpost">
      <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="button" class="text-black bg-purple-50  focus:ring-4  focus:outline-none focus:ring-purple-50 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-50 dark:hover:bg-purple-100 dark:focus:ring-purple-100">
        Crear Post</button>
        </Link>
        <Link to="/">
        <button type="button" class="text-black bg-purple-50  focus:ring-4  focus:outline-none focus:ring-purple-50 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-50 dark:hover:bg-purple-100 dark:focus:ring-purple-100">
        Cerrar sesion</button>
        </Link>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 " >
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
      <li>
        {/* icono home */}
        <Link to="/home">
        <a href="#" class="text-xl block py-2 px-3  text-black rounded hover:bg-black md:hover:bg-transparent md:hover:text-black md:p-0 md:dark:hover:text-black dark:text-purple-300 dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent dark:border-black" aria-current="page" placeholder="Home">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
</a> </Link>
      </li>
      
      <li>
        {/* icono save */}
        <a href="#" class="text-xl block py-2 px-3  text-black bg-purple-100 rounded md:bg-transparent md:text-purple-50 md:p-0 md:dark:text-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
</svg>

        </a>
      </li>
      <li>
      <div class="relative mb-1 " data-te-input-wrapper-init>
  <input
    type="search"
    class="peer block min-h-[auto] w-full rounded-lg border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleSearch2"
    placeholder="Type query" />
  <label
    for="exampleSearch2"
    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-primary"
    >Search</label>
      </div>    
      </li>
      
    </ul>
  </div>
  </div>
</nav>

    )
}