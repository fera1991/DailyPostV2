import React from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { useAPIContext } from "../../Context/Context";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Checkin() {


    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-50">
            <main className="bg-white max-w-lg p-8 md:p-12 my-10 rounded-sm shadow-2xl m-4">
                <img src={DailyPost_logo} alt="Daily Post"></img>
                <label className="font-sans text-gray-500 pt-2 mt-4"></label>
                <form className="flex flex-col" >
                    <div className=" flex items-center">
                        <div className="grid-rows">
                            <FontAwesomeIcon className="w-5 h-5 mr-2  mt-3" icon={faUser} />
                        </div>
                        <div>
                            <input className=" font-sans bg-gray-100 border h-5 w-96 py-4 mt-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="text" placeholder="Name Complete">
                            </input>
                        </div>
                    </div>
                    <div className=" flex items-center">
                        <div className="grid-rows">
                            <FontAwesomeIcon className="w-5 h-5 mr-2 mt-3" icon={faEnvelope} />
                        </div>
                        <div className='text-left'>
                            <input className=" font-sans bg-gray-100 border h-5 w-96 py-4 mt-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="text" placeholder="Email">
                            </input>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="grid-rows">
                            <FontAwesomeIcon className=" w-5 h-5 mr-2 mt-5" icon={faKey} />
                        </div>
                        <div className='text-left'>
                            <input className=" font-sans bg-gray-100 border h-5 w-96 py-4 mt-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="password" placeholder="Password">
                            </input>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="grid-rows">
                            <FontAwesomeIcon className=" w-5 h-5 mr-2 mt-5" icon={faKey} />
                        </div>
                        <div className='text-left'>
                            <input className=" font-sans bg-gray-100 border h-5 w-96 py-4 mt-4 hover:outline-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" type="password" placeholder="Validate password">
                            </input>
                        </div>
                    </div>
                    <Link to="/"><button className="w-full font-sans bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 px-4 mt-4 rounded-sm">CHECK IN</button></Link>
                   
                </form>
                <div className='mt-4'>
                <Link to="/">
                    <p href="">¿Ya tienes una cuenta? <a class="#" className='ml-1 text-blue-500'  href="">Login</a></p> </Link>
                </div>
            </main>
        </div>

    )
}