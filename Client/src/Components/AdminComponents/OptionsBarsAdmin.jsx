import React from 'react';
import { useAPIContext } from '../../Context/Context';
import { useNavigate} from 'react-router-dom';

export default function OptionsBarsUser({owned=()=>{},favorite=()=>{}}) {

    const context = useAPIContext();
    const navigate = useNavigate();

    const logoutFuntion = () => {
        //context.logout(); 
        navigate("/");  
    }

        return (
         <div className="text-right justify-evenly bg-purple-150 flex-row-reverse rounded-b-lg text-sm absolute top-10">
         <div className="pt-auto ps-auto overflow-visible  w-full sm:w-full  inset-x-0 absolute top-20 bottom-0">
           <ul className="space-y-2 font-medium">
               <li>
                 <a
                   href="#"
                   className="flex items-center p-2 text-purple-100 rounded-lg dark:text-black hover:bg-purple-100 dark:hover:bg-purple-200 group"
                 >
                   <button className="flex-1 ms-3 whitespace-nowrap pr-2" onClick={()=>{owned()}}>POST</button>
                   <svg
                     className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-black group-hover:text-purple-100 dark:group-hover:text-black"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor"
                     viewBox="0 0 18 18"
                   >
                     <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                   </svg>
                 </a>
               </li>
               <li>
                 <a
                   href="#"
                   className="flex items-center p-2 text-purple-100 rounded-lg dark:text-black hover:bg-purple-100 dark:hover:bg-purple-200 group"
                 >
                   <button className="flex-1 ms-3 whitespace-nowrap pr-2"  onClick={()=>{favorite()}}>Guardados</button>
                   <svg
                     className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-black group-hover:text-purple-100 dark:group-hover:text-black"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 14 20"
                   >
                     <path
                       stroke="currentColor"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                       d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
                     />
                   </svg>
                 </a>
               </li>
               <li>
                 <a
                   href="#"
                   className="flex items-center p-2 text-purple-100 rounded-lg dark:text-black hover:bg-purple-100 dark:hover:bg-purple-200 group"
                 >
                   <button className="flex-1 ms-3 whitespace-nowrap pr-2" onClick={()=>{logoutFuntion()}} >Cerrar sesion</button>
                   <svg
                     className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-black group-hover:text-purple-100 dark:group-hover:text-black"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 18 16"
                   >
                     <path
                       stroke="currentColor"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                       d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                     />
                   </svg>
                 </a>
               </li>
             </ul>
           </div>
         </div>
       );
       
}