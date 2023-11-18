import React from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { useAPIContext } from "../../Context/Context";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NewPost() {


    return (
        <main>
        <div class="container ml-auto mr-auto flex flex-wrap items-start mt-8 ">
          <div class="w-full pl-2 pr-2 mb-4 mt-4  ">
          <a class="text-3xl font-extrabold center flex items-center justify-center ">
            <img src={DailyPost_logo} class="h-8" />
            </a>
            <h1 class="text-3xl font-extrabold text-center"> Crear Post </h1>
          </div>
        </div>
        <div class="container ml-auto mr-auto flex items-center justify-center ">
          <div class="w-full md:w-1/2  shadow-purple-200 rounded-lg shadow-2xl">
            <form class="bg-white px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <div class="grid grid-flow-row sm:grid-flow-col gap-3">
                  <div class="sm:col-span-4 justify-center">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="nya"> Titulo</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nya" type="text"  required/>
                  </div>
                </div>
                <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="mensaje"> Descripcion </label>
                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mensaje" rows="5"  required></textarea>
              </div>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold " for="asunto"> Imagen</label>  
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
              </div>
              
              <div class="flex items-center justify-between">
                <Link to="/home">
                <button class="bg-yellow-200 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                     Postear </button>  </Link>
                     <Link to="/home">
                <button class="bg-purple-300 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                     Cancelar </button>
                     </Link>
              </div>
            </form>
       
          </div>
        </div>
       
      </main>

    )
}