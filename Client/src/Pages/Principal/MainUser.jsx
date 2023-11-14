import React from 'react';
import Comments from '../../Components/Comments';
import NewComment from '../../Components/NewComments';
import MenuUser from '../../Components/UserComponents/MenuUser';
import PostIcons from '../../Components/PostIcons';
import Pagination from '../../Components/Pagination';
import { useState,useEffect } from "react";
import { useAPIContext } from "../../Context/Context";

export default function Post() {

    const context = useAPIContext();
    const [array,setArray] = useState([]);
    const [num,setNum]= useState(0);
    const [maxpages,setmaxpages]= useState(0);

    const search = async(id) =>{
            const data = [];
            const item = await context.getOne(id);
            data.push(item);
            setArray(data);

    }
    const sum = ()=>{
          if(num < maxpages)
          {
            setNum(num + 1);
            console.log(num);
          }
      }
      const subtraction = ()=>{
          if(num >0){
            setNum(num - 1);
            console.log(num);
          }
      }
    const allData = async () =>{
        const data = await context.getAll(num);
        const pages = data.pages;
        setmaxpages(pages);
        setArray(data.data)
    }
    
    const reload = async()=>{
        const data = await context.getAll(0);
        setArray(data.data)
        setNum(0);
    }
    const allFavorite = async () =>
    {
        const data = await context.getFavorite();
        const id = data.favorites;
        const promise =  id.map(data => renderFavorite(data))
        console.log(promise);
        Promise.all(promise).then(values => {
           const validate = values.filter(data => {return data != undefined})
           console.log(validate);
            setArray(validate);});
        
    }
    const renderFavorite = async (id)=>{
        const data = await context.getOne(id);
        return data;

    }

    useEffect(()=>{
        allData();
    },[num]);


    return(
        <>
        <MenuUser props={search} func = {reload} favorite={allFavorite}/>
            <div className="flex flex-col justify-center items-center min-h-screen bg-purple-50">
            
                <div className="flex w-full justify-center mt-8 p-9">
                <Pagination sumNum = {sum} subtractionNum={subtraction} /> 
                <div className="flex-col items-center  xl:w-2/5 md:w-2/5 sm:w-1/4 ">                    {
                        array.map(data => <article className="bg-white m-6 ">
                        <div className="px-4 py-3 flex items-center justify-between">
                            <h1 className="font-sans font-bold space-around">{data.user.username}</h1>
                        </div>
                        <img className="w-full h-70 object-cover my-1" src={`${data.image}`} alt="pic post"></img>
                        <div className="w-full flex flex-col font-mediun text-sn space-y-2 px-4 py-1">
                            <h1 className="font-sans font-bold space-around">{data.title}</h1>
                            <p className="font-normal text-sm text-gray-700 break-words overflow-y-auto">{data.description}</p>
                        </div>
                        <h3 className="font-normal text-xs text-gray-400 py-1 px-4">{data.updatedAt}</h3>
                        <PostIcons props = {data}/>
                        <Comments props = {data}/>
                        <NewComment props = {data}/>
                    </article>
                    )
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

