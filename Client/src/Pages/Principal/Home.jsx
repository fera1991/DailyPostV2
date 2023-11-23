import React from 'react';
import MenuAdmin from '../../Components/AdminComponents/MenuAdmin';
import PostCard from '../../Components/PostCard';
import { useState, useEffect } from "react";
import { useAPIContext } from "../../Context/Context";
// import { render } from '@testing-library/react';
// import { set } from 'react-hook-form';


export default function Post() {

    const [Options, setOptions] = useState(false);
    const [userOptions, setUserOptions] = useState(false);
    const context = useAPIContext();
    const [array, setArray] = useState([]);
    const [arrayFavorite, setArrayFavorite] = useState([]);
    const [num, setNum] = useState(0);
    const [maxpages, setmaxpages] = useState(0);
    const [user, setUser] = useState(null);

    const search = async (id) => {

        const data = [];
        const item = await context.getOne(id);
        if (item) {
            data.push(item);
            setArray(data);
        }

    }

    const sum = () => {
        if (num < maxpages) {
            setNum(num + 1);
        }
    }
    const subtraction = () => {
        if (num > 0) {
            setNum(num - 1);
        }
    }
    const reload = async () => {
        const data = await context.getAll(0);
        setArray(data.data);
        setNum(0);
    }

    const allData = async () => {
        const data = await context.getAll(num);
        const response = await context.getAllFavoriteEntirety();
        if (response) {
            setArrayFavorite(response);
        }
        //const pages = data.pages;
        const user = await context.whoami();
        setUser(user);

        const reversedArray = [...data.content].reverse();
        setmaxpages(data.total_pages);
        setArray(reversedArray)
    }

    const allFavorite = async () => {
        const data = await context.getFavorite();
        const id = data.favorites;
        const promise = id.map(data => renderFavorite(data))
        console.log(promise);
        Promise.all(promise).then(values => {
            const validate = values.filter(data => { return data != undefined })
            console.log(validate);
            setArray(validate);
        });

    }
    const renderFavorite = async (id) => {
        const data = await context.getOne(id);
        return data;

    }

    useEffect(() => {
        const username = "";
        setUserOptions(username);
        allData();
    }, [num]);

    const ownedData = async () => {
        const data = await context.getOwn(num);
        if (data) {
            setArray(data);
        }
    }

    const boolFunction = () => {
        reload();
    }



    return (
        <>
            <MenuAdmin props={search} func={reload} owned={ownedData} favorite={allFavorite} reload={boolFunction} />

            <div className="flex flex-col justify-center items-center min-h-screen bg-purple-50">

                <div className='mt-20'>
                    {array.map((data) => {
                        // Realiza la comprobación fuera del bloque JSX
                        if (data.archived === false) {
                            // Renderiza el componente solo si la condición se cumple
                            return <PostCard post={data} listSaved={arrayFavorite} userLogin={user} />;
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