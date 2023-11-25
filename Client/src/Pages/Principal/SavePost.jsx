import React from 'react';
import MenuAdmin from '../../Components/AdminComponents/MenuAdmin';
import PostCard from '../../Components/PostCard';
import { useState, useEffect } from "react";
import { useAPIContext } from "../../Context/Context";
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import { set } from 'react-hook-form';


export default function SavePost() {

    const [Options, setOptions] = useState(false);
    const [userOptions, setUserOptions] = useState(false);
    const context = useAPIContext();
    const [array, setArray] = useState([]);
    const [arrayFavorite, setArrayFavorite] = useState([]);
    const [num, setNum] = useState(0);
    const [pages, setPages] = useState(0);
    const [user, setUser] = useState(null);
    

    const allData = async () => {
        const data = await context.getAllFavorite(num);
        console.log(data.content);
        const response = await context.getAllFavoriteEntirety();
        console.log(response);
        if (response) {
            setArrayFavorite(response);
        }
        const userData = await context.whoami();
        setUser(userData);
        setPages(data.total_pages);
        setArray(data.content)
    }


    useEffect(() => {
        const username = "";
        setUserOptions(username);
        allData();
    }, [num]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
      
            // Si la posición de desplazamiento más la altura de la ventana es igual a la altura total del contenido,
            // entonces estamos en el final de la página.
            if (scrollTop + clientHeight >= scrollHeight) {
              console.log('¡Has llegado al final de la página!');
              addNewPosts();
              // Aquí puedes ejecutar la lógica que deseas al llegar al final de la página.
            }
          };
      
          // Agrega el evento de desplazamiento al elemento 'window'
          window.addEventListener('scroll', handleScroll);
      
          // Elimina el evento de desplazamiento al desmontar el componente
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    })

    const pageBool = () => {
        return num < pages-1;
    }

    const message = (data) => {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: data,
          showConfirmButton: false,
          timer: 1500
        });
  }

    const addNewPosts = async () => {
        if (pageBool()) {
            message("Cargando Nuevos Posts");
            const data = await context.getAllFavorite(num + 1);
            const response = await context.getAllFavoriteEntirety();
            if (response) {
                setArrayFavorite(response);
            }
            if(data){
            setNum(num + 1);
            setPages(data.total_pages);
            setArray(data.content);
            }
        }
        else{
           //message("No hay mas posts")
        }
    }

    const archivePost = (code) => {
        const newList = array.filter(objet => objet.code !== code);
        setArray(newList);
    }


    return (
        <>
            <MenuAdmin realoadSave={allData}/>

            <div className="flex flex-col justify-center items-center min-h-screen bg-purple-50">
                <div className='mt-20'>
                    {array.map((data) => {
                        // Realiza la comprobación fuera del bloque JSX
                        if (data.post.archived === false) {
                            // Renderiza el componente solo si la condición se cumple
                            return <PostCard key={data.code} post={data.post} listSaved={arrayFavorite} userLogin={user} archivePost={archivePost} />;
                        } else {
                            // Si no se cumple la condición, puedes decidir hacer algo más o simplemente no renderizar nada
                            return null;
                        }
                    })}
                </div>
            </div>
        </>

    )
}