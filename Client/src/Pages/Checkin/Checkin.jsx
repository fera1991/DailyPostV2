import React from 'react';
import { useForm, Controller} from 'react-hook-form';
import { useState } from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAPIContext } from "../../Context/Context";
import Swal from 'sweetalert2';
import LoadingOverlay from "../../Components/LoadingOverlay";

// ... (importaciones y código previo)

export default function Checkin() {
    const { handleSubmit, control, setError } = useForm();
    const navigate = useNavigate();
    const context = useAPIContext();
    const [loading, setLoanding] = useState(false);

    const onSubmit = async (data) => {
        const { username, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Las contraseñas no coinciden',
            });
            return;
        }
        setLoanding(true);
        const result = await context.register(username, email, password)
        console.log(result)
        if( result ){
            if(result.status === 201){
                setLoanding(false);
                Swal.fire("Registro completado!!");
                navigate('/');
            }
            if(result.status === 409){
                setLoanding(false);
                if(result.data.message === "Email already exists"){
                    Swal.fire({
                        icon: "error",
                        title: "El correo ya existe",
                        text: "Algo salió mal!",
                      });
                    console.log("error");
                }
                if(result.data.message === "Username already exists"){
                    setLoanding(false);
                    Swal.fire({
                        icon: "error",
                        title: "EL nombre de usuario ya existe",
                        text: "Algo salió mal!",
                      });
                    console.log("error");
                }
            }
        }
        else{
            setLoanding(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!",
              });
            console.log("error");
        }
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-50">
            { loading && <LoadingOverlay/>}
            <main className="bg-white max-w-md p-8 md:p-12 my-10 rounded-sm shadow-2xl m-4">
                <img src={DailyPost_logo} alt="Daily Post" className="mx-auto mb-6" />

                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    {/* Full Name */}
                    <div className="flex-col items-center mb-4">
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'El nombre de usuario es requerido',
                                pattern: {
                                    value: /^[^\s]+$/,
                                    message: 'No se permiten espacios en blanco',
                                },
                                minLength: {
                                    value: 5,
                                    message: 'El nombre de usuario debe tener al menos 5 caracteres',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'El nombre de usuario no puede tener más de 15 caracteres',
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <div className="flex-row items-center">
                                        <FontAwesomeIcon className="w-5 h-5 mr-2 mt-3 text-gray-600" icon={faUser} />
                                        <input
                                            {...field}
                                            className={`bg-gray-100 border flex-1  h-12 w-5/6 py-2 mt-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" ${fieldState.invalid ? 'border-red-500' : ''}`}
                                            type="text"
                                            placeholder="Nombre de usuario"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <span className="text-red-500 mt-1">{fieldState.error.message}</span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex-col items-center mb-4">
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'El correo electrónico es requerido',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Dirección de correo electrónico no válida',
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <div className="flex-row items-center">
                                        <FontAwesomeIcon className="w-5 h-5 mr-2 mt-3 text-gray-600" icon={faEnvelope} />
                                        <input
                                            {...field}
                                            className={`bg-gray-100 border flex-1  h-12 w-5/6 py-2 mt-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"${fieldState.invalid ? 'border-red-500' : ''}`}
                                            type="text"
                                            placeholder="Correo electrónico"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <span className="text-red-500 mt-1">{fieldState.error.message}</span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex-col items-center mb-4">
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'La contraseña es requerida',
                                minLength: {
                                    value: 8,
                                    message: 'La contraseña debe tener al menos 8 caracteres',
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <div className="flex-row items-center">
                                        <FontAwesomeIcon className="w-5 h-5 mr-2 mt-5 text-gray-600" icon={faKey} />
                                        <input
                                            {...field}
                                            className={`font-sans bg-gray-100 border flex-1  h-12 w-5/6 py-2 mt-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" ${fieldState.invalid ? 'border-red-500' : ''}`}
                                            type="password"
                                            placeholder="Contraseña"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <span className="text-red-500 mt-1">{fieldState.error.message}</span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="flex-row items-center mb-4">
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Por favor, confirme su contraseña',
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <div className="flex-row items-center">
                                        <FontAwesomeIcon className="w-5 h-5 mr-2 mt-5 text-gray-600" icon={faKey} />
                                        <input
                                            {...field}
                                            className={`font-sans bg-gray-100 border flex-1  h-12 w-5/6 py-2 mt-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" ${fieldState.invalid ? 'border-red-500' : ''}`}
                                            type="password"
                                            placeholder="Confirmar contraseña"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <span className="text-red-500 mt-1">{fieldState.error.message}</span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    {/* Registration Button */}
                    <button
                        type="submit"
                        className="w-5/6 mx-auto font-sans bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 mt-4 rounded-sm"
                    >
                        REGISTRARSE
                    </button>
                </form>

                {/* Existing Account Link */}
                <div className='mt-4'>
                    <Link to="/">
                        <p>¿Ya tienes una cuenta? <a className='ml-1 text-blue-500' href="#">Inicia sesión</a></p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
