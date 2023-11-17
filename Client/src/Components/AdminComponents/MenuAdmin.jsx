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
<nav class="bg-white dark:bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-purple-50">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={DailyPost_logo} class="h-8" />
  </a>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <Link to="/newpost">
      <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="button" class="text-black bg-purple-50  focus:ring-4 mr-4 focus:outline-none focus:ring-purple-50 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-50 dark:hover:bg-purple-100 dark:focus:ring-purple-100">
        Crear Post</button>
        </Link>
        <Link to="/">
        <button type="button" class="text-black bg-purple-50  focus:ring-4 ml-4 focus:outline-none focus:ring-purple-50 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-50 dark:hover:bg-purple-100 dark:focus:ring-purple-100">
        Cerrar sesion</button>
        </Link>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" >
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
      <li>
        <Link to="/home">
        <a href="#" class="block py-2 px-3 text-black bg-purple-100 rounded md:bg-transparent md:text-purple-50 md:p-0 md:dark:text-black" aria-current="page" placeholder="Home">
        {/* <svg viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 22L2 22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M4 22V9.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M20 9.5V13.5M20 22V17.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="#1C274C" stroke-width="1.5"></path> </g></svg> */}
        🏠</a> </Link>
      </li>
      {/* <li>
        <a href="#" class="block py-2 px-3 text-black rounded hover:bg-black md:hover:bg-transparent md:hover:text-black md:p-0 md:dark:hover:text-black dark:text-purple-300 dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent dark:border-black">
        {/* <svg viewBox="0 -0.5 18 22" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fill-rule="evenodd"
         d="M532,254.954383 L532,247.775909 L520,247.775909 L520,258.615121 L522.848655,255.813199 C523.24044,255.427841 523.87547,255.423851 524.271358,255.808487 L525.05481,256.569671 L528.568706,253.033719 C528.958829,252.641147 529.59365,252.630547 530.001301,253.024219 L532,254.954383 Z M533,259.406871 L533.960593,259.541874 C534.51207,259.619379 535.020377,259.235606 535.097766,258.684953 L536.765938,246.815293 C536.843443,246.263816 536.459671,245.75551 535.909017,245.678121 L524.039358,244.009949 C523.487881,243.932444 522.979574,244.316216 522.902185,244.86687 L522.633887,246.775909 L520.006845,246.775909 C519.449949,246.775909 519,247.226689 519,247.782754 L519,259.769063 C519,260.32596 519.45078,260.775909 520.006845,260.775909 L531.993155,260.775909 C532.550051,260.775909 533,260.325128 533,259.769063 L533,259.406871 Z M533,258.397037 L534.10657,258.552556 L535.776647,246.669339 L523.89343,244.999262 L523.643739,246.775909 L531.993155,246.775909 C532.54922,246.775909 533,247.225857 533,247.782754 L533,258.397037 Z" transform="translate(-519 -244)"></path> </g></svg> */}
        {/*   📷</a>
      </li> */}
      
      <li>
        <a href="#" class="block py-2 px-3 text-black rounded hover:bg-black md:hover:bg-transparent md:hover:text-black md:p-0 md:dark:hover:text-black dark:text-purple-300 dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent dark:border-black">
        {/* <svg viewBox="0 0 52 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 12H11" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 14V10" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> */}
        💾</a>
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
    >Search</label
  >
</div>
        {/* <a href="#" class="block py-2 px-3 text-black rounded hover:bg-black md:hover:bg-transparent md:hover:text-black md:p-0 md:dark:hover:text-black dark:text-purple-300 dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent dark:border-black">
        {/* <svg viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> */}
        {/* 🔍</a> */} 
      </li>
      
    </ul>
  </div>
  </div>
</nav>

    )
}