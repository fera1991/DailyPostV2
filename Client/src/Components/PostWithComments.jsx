import React, { useState } from 'react';

const PostWithComments = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // New state variable for like status
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]); // Nuevo estado para los comentarios

  const [showOptions, setShowOptions] = useState(false);


  const handleLike = () => {
    setLikes(prevLikes => prevLikes + (isLiked ? -1 : 1)); // Increment or decrement likes
    setIsLiked(!isLiked); // Toggle the like state
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };


  const submitComment = () => {
    if (commentText) {
      setComments([...comments, commentText]); // Agrega el comentario al estado
      setCommentText(''); // Limpia el campo de texto
    }
  };



  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className=" text-black">
      <div className="container relative mx-auto min-h-48 flex items-center justify-center p-20 px-6">


        <div className="flex overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="w-full md:w-1/2">
            <img src="https://i.pinimg.com/564x/1c/02/67/1c02674dcd5747a0258694d69ab84572.jpg" alt="PC Build" className="h-full w-full object-cover object-center" />
          </div>

          <div className="flex w-full flex-col md:w-1/2">
            <div className="flex items-center justify-between border-b border-black p-4">
              <div className="flex items-center">
                <img src="https://media.gq.com.mx/photos/5fd51c587938a266e30f81d1/16:9/w_1920,c_limit/Deadpool.jpg" alt="User Profile" className="h-10 w-10 rounded-full  object-cover" />
                <div className="ml-3">
                  <h2 className="text-sm font-bold">nameUser</h2>
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
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Editar</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Eliminar</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {comments.map((comment, index) => (
                <div key={index} className="mb-2">
                  <span className="font-bold">nameUser: </span>{comment}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-black p-2">
              <div className="flex space-x-4">
                <button onClick={handleLike} type="button" title="Like post" className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${isLiked ? 'fill-red-500' : 'fill-none'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
                <button type="button" title="Add a comment" className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5 fill-current">
                    <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                  </svg>
                </button>
              </div>
              <button type="button" title="Bookmark post" className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5 fill-current">
                  <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
                </svg>
              </button>
            </div>
            <div className="mb-2 ml-4 flex items-center space-x-2">
              <div className="text-sm font-semibold">{likes} Me gusta</div>
            </div>


            <div className="text-black">
              {/* Input para comentarios */}
              <div className="border-t border-black p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Agregar comentario..."
                    className="flex-1 bg-transparent text-sm placeholder-gray-400 outline-none"
                    value={commentText}
                    onChange={handleCommentChange}
                  />
                  <button onClick={submitComment} type="submit" className="text-sm text-blue-400">Publicar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWithComments;
