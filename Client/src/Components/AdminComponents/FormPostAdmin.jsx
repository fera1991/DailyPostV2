import React from 'react';
import { useAPIContext } from '../../Context/Context';
import { useState } from 'react';
import  {useForm} from "react-hook-form";
import { services } from '../../Services/Services';
import swal from 'sweetalert';

export default function FormPost({props,bottonfunction=()=>{}}) {
    const context = useAPIContext();
    const {register,handleSubmit,} = useForm();

    const [Error, setError] = useState(false);

    const ActualizadoConfirmacion=()=>{
        swal({
            title: "Tu post ha sido actualizado",
            icon: "success",
            timer: "2000"
        });}

    const update = async(data,e) => {
        e.preventDefault();
        e.target.reset();
        console.log(props);
        const updataData = data;
        if(updataData.description === "" && updataData.img === "" && updataData.title === ""){
            setError(!Error)
            console.log("hola")
        }
        if (updataData.title === "") {
            updataData.title = props.title
        }
        if (updataData.description === "") {
            updataData.description = props.description
        }
        if (updataData.img === "") {
            updataData.img = props.image 
        }
        
            if(!Error){
            const res = await services.update(context.token,props._id,data.title,data.description,data.img);
            ActualizadoConfirmacion();
            console.log(res);
            bottonfunction();
            }
        
        
    }

    return(
        <main className="bg-white mt-4 p-4 rounded-sm shadow-2xl m-4 fixed top-52 ">
            <label className="font-sans text-gray-500 pt-2 mt-4 text-center">Actualizar Post</label>
            <form className="flex flex-col justify-center" onSubmit={handleSubmit(update)}>
                {Error === true && <div className="text-red-500 text-xs break-all">Error Agregre por lo menos uno o digite mas de 8 caracteres.</div> }
                <input {...register("title",{required:false})} className="font-sans bg-gray-100 border w-full h-5 px-3 py-4 mt-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="text" placeholder="Titulo">
                </input>
                <input {...register("description",{required:false})} className="font-sans bg-gray-100 border w-full h-5 px-3 py-4 mt-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="text" placeholder="Descripcion">
                </input>
                <input {...register("img",{required:false})} className="font-sans block bg-gray-100 border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="text" placeholder="Imagen">
                </input>
                <button  className="font-sans bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 px-4 mt-4 rounded-sm" type="submit">Publicar</button>
            </form>
        </main>
    )
}