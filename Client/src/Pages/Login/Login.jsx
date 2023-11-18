import React from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser} from '@fortawesome/free-solid-svg-icons';
// import { useAPIContext } from "../../Context/Context";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {

  // const context = useAPIContext();
  const navigate = useNavigate();
  const [Error, setError] = useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    e.target.reset();

    const role = data.user;
    console.log(data.user, data.password);
    if (role) {
      console.log("loggeo completado")
      role === "admin" && navigate("/home")
      role === "user" && navigate("/home")
    }
    else {
      console.log("loggeo fallido")
      setError(true);
    }
  }

  //   if(context.token){
  //     console.log("ya existe su loggeo")
  //     context.role === "admin" && navigate("/adminInfo")
  //     context.role === "user" && navigate("/userInfo")
  //     }

  const { register, handleSubmit, } = useForm();

  return (

    <div className=" flex justify-center items-center min-h-screen bg-purple-50">
      <main className="bg-white max-w-lg p-8 md:p-12 my-10 rounded-sm shadow-2xl m-4">
        <img src={DailyPost_logo} alt="Daily Post"></img>
        <label className="font-sans text-gray-500 pt-2 mt-4">Login to your acount</label>
        <form className="flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
          {Error === true && <div className="text-red-500 text-xs">Inicio de sesion fallido</div>}
          <div className=" flex items-center">
            <div className="grid-rows ">
              <FontAwesomeIcon className="w-5 h-5 mr-2  mt-3" icon={faUser} />
            </div>
            <div>
              <input className=" font-sans bg-gray-100 border h-5 w-96 py-4 mt-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="text" placeholder="User or email" {...register("user", { required: true })}>
              </input>
            </div>
          </div>
          <div className="flex items-center">
            <div className="grid-rows">
              <FontAwesomeIcon className=" w-5 h-5 mr-2 mt-5" icon={faKey} />
            </div>
            <div className='text-left'>
              <input className="font-sans block bg-gray-100 border h-5 w-96 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="password" placeholder="Password"  {...register("password", { required: true })}>
              </input>
            </div>
          </div>
          <button className="font-sans bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 px-4 mt-4 rounded-sm">SING IN</button>
        </form>
        <div className='mt-4'>
          <Link to="/checkin">
          <p href="">¿No tiene una cuenta? <a class="#" className='ml-1 text-blue-500' href="http://">Registrate</a></p></Link>
        </div>
      </main>
    </div>
  )
}