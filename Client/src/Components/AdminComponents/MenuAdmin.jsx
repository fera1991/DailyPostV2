import React, { useEffect } from 'react';
import DailyPost_logo from '../../assets/img/DailyPost_logo.png';
import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAPIContext } from '../../Context/Context';
import UserList from '../UserList';
import Swal from 'sweetalert2';


export default function MenuAdmin() {
    const context = useAPIContext();
    const [add, setAdd] = useState(false);
    const [bar, setBar] = useState(false);
    const [post, setPost] = useState('');
    const navigate = useNavigate();


    //Busqueda de usuario --->
    const onSearch = () => {
        console.log(post);
        setShowUserList(true);
    }

    const handleBlur = () => {
        setPost('');
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };
    //Busqueda de usuario <---

    const logoutFuntion = () => {

        Swal.fire({
            title: "Estas seguro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Sesion cerrada!",
                    icon: "success"
                });
                context.logout();
                navigate("/");
            }

        });

    }

    const location = useLocation();
    const [Save, setSave] = useState(false);
    const [Home, setHome] = useState(false);
    const [PostMe, setPostMe] = useState(false);

    useEffect(() => {
        // Verificar si la ruta actual es "/ejemplo"
        setHome(location.pathname === '/home');
        setSave(location.pathname === '/savePost');
        setPostMe(location.pathname === '/postMe')
    }, [location.pathname, Home, Save]);


    const [showMenu, setShowMenu] = useState(true);
    let lastScrollY = window.scrollY;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                setShowMenu(false);
            } else {
                // Scrolling up
                setShowMenu(true);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    //Busqueda de usuario --->
    const [showUserList, setShowUserList] = useState(false);
    const [userList, setUserList] = useState([
        { id: 1, username: 'usuario1' },
        { id: 2, username: 'usuario2' },
        { id: 3, username: 'usuario3' },
        { id: 4, username: 'usuario4' },
        { id: 5, username: 'usuario5' },
        // ... Agrega más usuarios según sea necesario
    ]);

    const handleUserClick = (username) => {
        // Aquí puedes realizar alguna acción con el nombre de usuario seleccionado
        console.log(`Usuario seleccionado: ${username}`);
    };

    const closeUserList = () => {
        setShowUserList(false);
        setUserList([]);
    };
    //Busqueda de usuario <---

    return (
        <nav className={`bg-white dark:bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-purple-50 ${!showMenu && 'hidden'}`}>
            <div className="flex flex-wrap items-center object-center justify-between mx-auto p-4">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={DailyPost_logo} className="h-12" alt="Logo" />
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link to="/newpost">
                        <button
                            data-modal-target="crud-modal"
                            data-modal-toggle="crud-modal"
                            type="button"
                            className="mr-2 text-black bg-purple-50 focus:ring-4 focus:outline-none focus:ring-purple-50 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-50 dark:hover:bg-purple-100 dark:focus:ring-purple-100 border"
                        >
                            Crear Post
                        </button>
                    </Link>
                    <button
                        type="button"
                        className="text-black bg-purple-50 focus:ring-4 focus:outline-none focus:ring-purple-50 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-50 dark:hover:bg-purple-100 dark:focus:ring-purple-100 border"
                        onClick={() => {
                            logoutFuntion();
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                        <Link to="/home"
                                    href="#"
                                    className={` ${Home
                                        ? 'text-xl block py-2 px-3 text-black bg-purple-100 rounded md:bg-transparent md:text-purple-50 md:p-0 md:dark:text-black'
                                        : 'text-xl block py-2 px-3 text-black rounded hover:bg-black md:hover:bg-transparent md:hover:text-black md:p-0 md:dark:hover:text-black dark:text-purple-300 dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent dark:border-black'
                                        }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-10 h-10"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </svg>
                            </Link>
                        </li>

                        <li>
                                <Link to="/savePost"
                                    href="#"
                                    className={` ${Save
                                        ? 'text-xl block py-2 px-3 text-black bg-purple-100 rounded md:bg-transparent md:text-purple-50 md:p-0 md:dark:text-black'
                                        : 'text-xl block py-2 px-3 text-black rounded hover:bg-black md:hover:bg-transparent md:hover:text-black md:p-0 md:dark:hover:text-black dark:text-purple-300 dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent dark:border-black'
                                        }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-10 h-10"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                        />
                                    </svg>
                                </Link>
                        </li>
                        <li>
                                <Link to="/postMe"
                                    className={` ${PostMe
                                        ? 'text-xl block py-2 px-3 text-black bg-purple-100 rounded md:bg-transparent md:text-purple-50 md:p-0 md:dark:text-black'
                                        : 'text-xl block py-2 px-3 text-black rounded hover:bg-black md:hover:bg-transparent md:hover:text-black md:p-0 md:dark:hover:text-black dark:text-purple-300 dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent dark:border-black'
                                        }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-10 h-10"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </Link>
                        </li>
                        <li>
                            <div
                                className="relative mb-1"
                                data-te-input-wrapper-init
                            >
                                <input
                                    type="search"
                                    className="peer block min-h-[auto] w-full rounded-lg border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleSearch2"
                                    placeholder="Type query"
                                    value={post}
                                    onChange={(e) => setPost(e.target.value)}
                                    onKeyDown={handleEnterKey}
                                    onBlur={handleBlur}
                                />
                                <label
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-primary"
                                >
                                    Buscar usuario...
                                </label>
                                {showUserList && (
                                    <UserList users={userList} onItemClick={handleUserClick} onClose={closeUserList} />
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}