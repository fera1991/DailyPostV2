import React, { useEffect } from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAPIContext } from "../../Context/Context";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2'

export default function Login() {

  const context = useAPIContext();
  const navigate = useNavigate();
  const [Error, setError] = useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    e.target.reset();

    const role = data.user;
    console.log(data.user, data.password);
    const info = await context.login(data.user, data.password);
    if (info) {
      console.log("loggeo completado")
      navigate("/home")
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      console.log("loggeo fallido")
      setError(true);
    }
  }

  const verifyUserToken = async () => {
    try {
    const userData = await context.whoami();
    if (userData.username) {
      console.log(userData.username);
        navigate("/home")
    }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    verifyUserToken();
  },[]);

  const { register, handleSubmit, } = useForm();

  return (

    <div className="flex justify-center items-center min-h-screen bg-purple-50 px-4">
      <main className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
        <img src={DailyPost_logo} alt="Daily Post" className="mx-auto w-32 md:w-48"></img>
        <h2 className="text-gray-700 text-lg md:text-xl text-center mt-4 mb-6">Inicie sesión en su cuenta</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {Error && <div className="text-red-500 text-sm text-center">Inicio de sesión fallido</div>}

          <div className="flex items-center space-x-2">
            <FontAwesomeIcon className="w-5 h-5 text-gray-600" icon={faUser} />
            <input className="bg-gray-100 border flex-1 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" type="text" placeholder="Usuario o correo electrónico" {...register("user", { required: true })}></input>
          </div>

          <div className="flex items-center space-x-2">
            <FontAwesomeIcon className="w-5 h-5 text-gray-600" icon={faKey} />
            <input className="bg-gray-100 border flex-1 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" type="password" placeholder="Contraseña" {...register("password", { required: true })}></input>
          </div>

          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md w-full mt-6">INICIAR SESIÓN</button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          ¿No tiene una cuenta? <Link to="/checkin" className='text-blue-500'>Registrate</Link>
        </p>
      </main>
    </div>


  )
}