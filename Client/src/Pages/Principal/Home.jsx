import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHeart, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Comments from '../../Components/Comments';
import NewComment from '../../Components/NewComments';
import OptionsPots from '../../Components/AdminComponents/OptionsPostAdmin';
import MenuAdmin from '../../Components/AdminComponents/MenuAdmin';
import PostCard from '../../Components/PostCard';
import SaveAdmin from '../../Components/AdminComponents/SaveAdmin'
import PostIcons from '../../Components/PostIcons';
import { useState,useEffect  } from "react";
import { useAPIContext } from "../../Context/Context";
import Pagination from '../../Components/Pagination';
// import { render } from '@testing-library/react';
// import { set } from 'react-hook-form';


export default function Post() {

    const [Options,setOptions] = useState(false);
    const [userOptions,setUserOptions] = useState(false);
    const context = useAPIContext();
    const [array,setArray] = useState([]);
    const [num,setNum]= useState(0);
    const [maxpages,setmaxpages]= useState(0);

    const search = async(id) =>{
        
            const data = [];
            const item = await context.getOne(id);
            console.log(item);
            if (item) {
            data.push(item);
            setArray(data);
            }
            
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
    const reload = async()=>{
        const data = await context.getAll(0);
        setArray(data.data);
        setNum(0);
    }

    const allData = async () =>{
        const data = await context.getAll(num);
        const pages = data.pages;
        setmaxpages(pages);
        setArray(data.data)
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
        const username = "";
        setUserOptions(username);
        allData();
    },[num]);

    const ownedData = async () => {
        const data = await context.getOwn(num);
        console.log(data);
        if(data){
            setArray(data);
        }
    }

    const boolFunction = () =>{
        reload();
    }

    

    return(
        <>
        <MenuAdmin props={search} func = {reload} owned={ownedData} favorite={allFavorite} reload={boolFunction}/>
        
            <div className="flex flex-col justify-center items-center min-h-screen bg-purple-50">

                <div>
                <PostCard />
                </div>

            </div>
        </>

    )
}