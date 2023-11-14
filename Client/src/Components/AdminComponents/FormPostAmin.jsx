import React from 'react';
import { useAPIContext } from '../../Context/Context';
import { useState } from 'react';
import  {useForm} from "react-hook-form";
import { services } from '../../Services/Services';
import swal from 'sweetalert';

export default function FormPost({reload=()=>{}}) {
    const context = useAPIContext();
    const {register,handleSubmit,} = useForm();
    const [Error,setError] = useState(false);

    const PublicadoConfirmacion=()=>{
        swal({
            title: "Tu post ha sido publicado",
            icon: "success",
            timer: "2000"
        });
    }

    const addPost = async(data,e) => {
        e.preventDefault();
        e.target.reset();
       
            if (data.title.length > 8 && data.title.length < 32 && data.description.length > 8) {
                const res = await services.create(context.token,data.title,data.description,data.img);
            reload();
            console.log(res);
            setError(false);
            PublicadoConfirmacion();
            }
            else{
                setError(true);
            }
        
    }

    return(
        <main className="bg-white mt-4 p-4 rounded-sm shadow-2xl m-4 fixed top-10 right-px">
            <label className="font-sans text-gray-500 pt-2 mt-4 text-center">Nuevo Post</label>
            <form className="flex flex-col justify-center" onSubmit={handleSubmit(addPost)}>
                {Error === true && <div className="text-red-500 text-xs">Error al crear post</div>}
                <input {...register("title",{required:true})} className="font-sans bg-gray-100 border w-full h-5 px-3 py-4 mt-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="text" placeholder="Titulo">
                </input>
                <input {...register("description",{required:true})} className="font-sans bg-gray-100 border w-full h-5 px-3 py-4 mt-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="text" placeholder="Descripcion">
                </input>
                <input {...register("img",{required:true})} className="font-sans block bg-gray-100 border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="text" placeholder="Imagen">
                </input>
                <button className="font-sans bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 px-4 mt-4 rounded-sm" type="submit">Publicar</button>
            </form>
        </main>
    )
}