import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ userProfilePic, postImage, initialLikes, postDescription }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // New state variable for like status
  const [showOptions, setShowOptions] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Estado para controlar si está guardado

  const handleBookmark = () => {
    setIsSaved(!isSaved); // Cambia el estado de isSaved
  };

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + (isLiked ? -1 : 1)); // Increment or decrement likes
    setIsLiked(!isLiked); // Toggle the like state
  };

  const handleComment = () => {
    // Logic to handle comment action
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="container mx-auto px-20">
      <div className="min-h-48 flex items-center justify-center p-20 px-6">
        <div className="bg-coolGray-900 text-coolGray-100 rounded-md shadow-md sm:w-96">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-2">
              <div className="-space-y-1">
                <h2 className="text-sm font-semibold leading-none">nameUser</h2>
              </div>
            </div>
            <button onClick={toggleOptions} title="Open options" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

            </button>
            {showOptions && (
              <div className="absolute bg-white rounded shadow-md ml-64">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                </ul>
              </div>
            )}
          </div>
          <img src="https://i.pinimg.com/564x/1c/02/67/1c02674dcd5747a0258694d69ab84572.jpg" alt="" className="bg-coolGray-500 h-70 w-full object-cover object-center" />
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button onClick={handleLike} type="button" title="Like post" className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${isLiked ? 'red' : 'currentColor'}`} className={`w-6 h-6 ${isLiked ? 'fill-red-500' : 'fill-none'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
                
                <Link to={"/coment"}>
                  <button onClick={handleComment} title="Add a comment" className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 fill-current">
                      <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                    </svg>
                  </button>
                </Link>

              </div>
              <button onClick={handleBookmark} title="Bookmark post" className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${isSaved ? 'fill-black' : 'fill-none'}`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>

              </button>


            </div>
            <div className="flex flex-wrap items-center pb-1 pt-3">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold">{likes} Me gusta</div>
              </div>
            </div>
            <div className="mt-2 text-sm font-semibold">-----------Descripcion----------</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;