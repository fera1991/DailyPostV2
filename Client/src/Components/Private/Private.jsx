import React, { useState, useEffect } from 'react';
import { useAPIContext } from "../../Context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import error404 from '../../assets/img/error404.png';

const Private = ({ children }) => {
    const navigate = useNavigate();
    const context = useAPIContext();
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);

    const logoutFunction = () => {
        context.logout();
        navigate("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resolvedUsername = await context.username;
                setUsername(resolvedUsername);
            } catch (error) {
                setError(error);  // Capturamos el error y lo almacenamos en el estado
            }
        }

        fetchData();
    }, [context.username]);

    const verifyUser = () => {
        try {
            if (username === null || username === false) {
                console.log("hola",username);
                return (
                    <div className="flex justify-center items-center min-h-screen bg-purple-50">
                        <div className="flex flex-col justify-center transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0">
                            <img src={error404} className="h-80" alt="error" />
                            <h3 className="text-4xl font-sans font-medium text-center py-1 px-4 mt-4">Lo sentimos mucho, página no encontrada :(.</h3>
                            <p className="text-lg font-sans font-normal text-center py-1 px-4 mt-4">La página que buscas no existe o se produjo otro error.</p>
                            <button onClick={() => { logoutFunction() }} type="button" className="font-sans bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 px-4 mt-4 rounded-sm">Regresar</button>
                        </div>
                    </div>
                );
            } else {
                console.log("adios",username);
                return children;
            }
        } catch (error) {
            setError(error);  // Capturamos cualquier otro error y lo almacenamos en el estado
            return (
                <div>
                    <p>Ocurrió un error: {error.message}</p>
                </div>
            );
        }
    }

    if (error) {
        return (
            <div>
                <p>Ocurrió un error: {error.message}</p>
            </div>
        );
    }

    return verifyUser();
}

export default Private;
