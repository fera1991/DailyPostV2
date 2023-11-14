import React from 'react';
import MenuPage from '../../Components/MenuPages';
import LikePostImg from '../../assets/img/LikePost.png';
import CommentPostImg from '../../assets/img/CommentPost.png';
import FavoritePostImg from '../../assets/img/SaveFavoritePost.png';
import { useNavigate} from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();
    return(
        <>
        <MenuPage />
        <div className="w-full font-sans flex justify-center items-center min-h-screen bg-purple-50">
            <div className="flex flex-row flex-wrap py-14 w-3/4 min-h-screen px-5">
                <div className="bg-white w-60 p-2 rounded-sm duration-300 shadow-lg hover:shadow-2xl mx-8 my-8">
                    <img className="w-full h-50 object-cover rounded-xl" src={LikePostImg} alt="Daily Post" ></img>
                    <div className="p-2">
                        <h2 className="font-sans font-bold text-xl text-center">Like a Post</h2>
                        <p className="text-gray-700 text-sm text-center">Como usuario podras interactuar con otros usuarios dando like a sus post.</p>
                    </div>
                </div>
                <div className="bg-white w-60 p-2 rounded-sm duration-300 shadow-lg hover:shadow-2xl mx-8 my-8 py-9">
                    <img className="w-full h-50 object-cover rounded-xl" src={CommentPostImg} alt="Daily Post" ></img>
                    <div className="p-2">
                        <h2 className="font-sans font-bold text-xl text-center">Comentar Post</h2>
                        <p className="text-gray-700 text-sm text-center">Como usuario podras interactuar con otros usuarios haciendo comentarios en sus post.</p>
                    </div>
                </div>
                <div className="bg-white w-60 p-2 rounded-sm duration-300 shadow-lg hover:shadow-2xl mx-8 my-8 py-9">
                    <img className="w-full h-50 object-cover rounded-xl" src={FavoritePostImg} alt="Daily Post" ></img>
                    <div className="p-2">
                        <h2 className="font-sans font-bold text-xl text-center">Guardar en Favoritos</h2>
                        <p className="text-gray-700 text-sm text-center">Como usuario podras guardar en favoritos los post que gustes para poder verlos luego.</p>
                    </div>
                </div>
            </div>
            <div className="PX-5 justify-center">
                <button onClick={()=>{navigate("/userInfo/data")}} className="font-sans bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 px-4 mt-4 rounded-sm mx-8 my-8">Continuar</button>
            </div>
        </div> 
        </>
       )
}