import React from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { useAPIContext } from "../../Context/Context";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function previewImage(e) {
  const input = e.target;
  const preview = document.getElementById('image-preview');

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.remove('hidden');
    };

    reader.readAsDataURL(input.files[0]);
  }
}

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
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nya" type="text" required />
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="mensaje"> Descripcion </label>
                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mensaje" rows="5" required></textarea>
              </div>
            </div>

            <div class="flex items-center justify-center w-full">
              <label for="dropzone-file" class="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white hover:bg-gray-100 dark:border-purple-50 dark:hover:border-gray-200 dark:hover:bg-gray-200">
                <img id="image-preview" class="absolute top-0 left-0 w-full h-full object-contain rounded-lg" />
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Haga clic para cargar</span> o arrastrar y soltar</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG o GIF</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={previewImage} accept="image/*" />
              </label>
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