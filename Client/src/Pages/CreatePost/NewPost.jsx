import React from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useAPIContext } from "../../Context/Context";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { uploadFile} from '../../firebase/config'
import Swal from 'sweetalert2'

export default function NewPost() {
const navigate = useNavigate();
const context = useAPIContext(); 
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

const [imageFile, setImageFile] = React.useState(null);

const onSubmit = async (data) => {
  const {title, description } = data;
  console.log(data);
  if (!imageFile) {
    console.error('Selecciona una imagen antes de postear.');
    return;
  }

  if (!title || !description) {
    console.error('Asegúrate de completar todos los campos.');
    return;
  }

  try {
    const url = await uploadFile(imageFile);
    console.log(url);
    const info = await context.create(data.title,data.description,url);
    if (info) {
      Swal.fire("Publicación creada!");
      navigate("/home")
    }
    else {
      console.log("Creacion fallido")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }

  } catch (error) {
    console.error(error);
  }
};

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
    setImageFile(input.files[0]);
  }
}


return (
  <main>
    <div className="container ml-auto mr-auto flex flex-wrap items-start mt-8 ">
      <div className="w-full pl-2 pr-2 mb-4 mt-4  ">
        <a className="text-3xl font-extrabold center flex items-center justify-center ">
          <img src={DailyPost_logo} className="h-8" alt="DailyPost Logo" />
        </a>
        <h1 className="text-3xl font-extrabold text-center">Crear Post</h1>
      </div>
    </div>
    <div className="container ml-auto mr-auto flex items-center justify-center ">
      <div className="w-full md:w-1/2  shadow-purple-200 rounded-lg shadow-2xl">
        <form
          className="bg-white px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <div className="grid grid-flow-row sm:grid-flow-col gap-3">
              <div className="sm:col-span-4 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Titulo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  {...register('title', { required: true, minLength: 5, maxLength: 20 })}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs italic">
                  {errors.title.type === 'required'
                    ? 'Este campo es requerido.'
                    : ''}
                  {errors.title.type === 'minLength' &&
                    'La longitud mínima es de 5 caracteres.'}
                  {errors.title.type === 'maxLength' &&
                    'La longitud máxima es de 20 caracteres.'}
                </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Descripcion
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                rows="5"
                {...register('description', { required: true, minLength: 5, maxLength: 200 })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs italic">
                {errors.description.type === 'required'
                  ? 'Este campo es requerido.'
                  : ''}
                {errors.description.type === 'minLength' &&
                  'La longitud mínima es de 5 caracteres.'}
                {errors.description.type === 'maxLength' &&
                  'La longitud máxima es de 200 caracteres.'}
              </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white hover:bg-gray-100 dark:border-purple-50 dark:hover:border-gray-200 dark:hover:bg-gray-200"
            >
              <img id="image-preview" class="absolute top-0 left-0 w-full h-full object-contain rounded-lg" />
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    Haga clic para cargar
                  </span>{' '}
                  o arrastrar y soltar
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG o GIF
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={previewImage}
                accept="image/*"
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-200 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Postear
            </button>
            <Link to="/home">
              <button
                className="bg-purple-300 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  </main>
);

}