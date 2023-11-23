import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAPIContext } from "../Context/Context";

const PostCard = ({ post, listSaved, userLogin , archivePost }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showPrimaryCard, setShowPrimaryCard] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const context = useAPIContext();

  const searchAndActivate = async () => {
    const result = await context.getAllLikes(post.code);
    if (result) {
      setLikes(result.length);
      const bollLiked = result.some(data => data.user.code === userLogin.code);
      if (bollLiked) {
        setIsLiked(true);
      }
    }
    const boolSaved = listSaved.some(data => data.post.code === post.code);
    if (boolSaved) {
      setIsSaved(true);
    }
  }

  useEffect(() => {
    searchAndActivate();
  }, [])

  const handleLike = async () => {
    const response = await context.likePost(post.code);
    if (response) {
      setLikes(prevLikes => prevLikes + (isLiked ? -1 : 1));
      setIsLiked(!isLiked);
    }
  };

  const handleCommentClick = () => {
    setShowPrimaryCard(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleBookmark = async () => {
    const response = await context.savePost(post.code);
    if (response) {
      setIsSaved(!isSaved);
    }
  };

  const handleEliminarClick = async () => {
    const response = await context.toggle(post.code);
    console.log(response);
    toggleOptions();
    if(response.message !== "Post active"){
      archivePost(post.code);
    }
  }




  const PrimaryCard = () => (
    <div className="container mx-auto px-20 post-card flex justify-center items-center">
      <div className="flex items-center justify-center p-7 px-6" style={{ width: '90%', height: '90%', maxWidth: '600px', minHeight: '300px' }}>
        <div className="bg-gray-100 text-black rounded-md shadow-md sm:w-full" style={{ width: '90%', height: '80%' }}>
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-2">
              <div className="-space-y-1">
                <h2 className="text-sm font-semibold leading-none">{post.user.username}</h2>
                <span className="inline-block text-xs leading-none text-gray-500">{post.title}</span>
              </div>
            </div>
            { post.user.code === userLogin.code && (
              <button onClick={toggleOptions} title="Open options" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

            </button>
            )}
            {showOptions && (
              <div className="absolute bg-white rounded shadow-md mt-7" style={{ marginLeft: '300px' }}>
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to={`/updatePost/${post.code}`}>Editar</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                   onClick={handleEliminarClick}
                  >Eliminar</li>
                </ul>
              </div>
            )}
          </div>
          <img src={post.image} alt="" className="bg-coolGray-500 w-full object-cover object-center" style={{
            width: '100%',
            height: '60%',
            objectFit: 'cover', // o 'contain', según prefieras
            maxHeight: '50%'
          }} />

          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button onClick={handleLike} type="button" title="Like post" className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${isLiked ? 'red-700' : 'currentColor'}`} className={`w-6 h-6 ${isLiked ? 'fill-red-700' : 'fill-none'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>


                <button onClick={handleCommentClick} title="Add a comment" className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 fill-current">
                    <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                  </svg>
                </button>


              </div>
              <button onClick={handleBookmark} title="Bookmark post" className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${isSaved ? 'yellow-400' : 'currentColor'}`} className={`w-6 h-6 ${isSaved ? 'fill-yellow-400' : 'fill-none'}`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>

              </button>


            </div>
            <div className="flex flex-wrap items-center pb-1 pt-3">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold">{likes} Me gusta</div>
              </div>
            </div>
            <span className="mt-2 font-bold">{post.user.username}: </span>{post.description}
          </div>
        </div>
      </div>
    </div>
  );

  const SecondaryCard = () => {

    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]); // Nuevo estado para los comentarios

    const handleCommentChange = (event) => {
      setCommentText(event.target.value); // Simplemente actualiza el estado con el valor actual del input
    };

    const submitComment = async () => {
      if (commentText.trim()) {
        const result = await context.saveComment(post.code, commentText.trim());
        if (result) {
          setComments((prevComments) => [...prevComments, result]);
          setCommentText('');
        }
      }
    };

    const getComments = async () => {
      const result = await context.comment(post.code);
      if (result) {
        console.log(result);
        setComments(result.comments);
      }
    }

    useEffect(() => {
      getComments();
    }, [])



    return (
      <div className=" text-black post-card">
        <div className="container relative mx-auto min-h-48 flex items-center justify-center p-10 px-6" style={{ padding: '20px' }}>
          <button onClick={() => setShowPrimaryCard(true)} className="absolute top-5 right-[-20px] mt-2 mr-2 text-xl font-bold text-black hover:text-red-500" title="close post">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <div className="flex overflow-hidden rounded-lg bg-gray-100 shadow-lg " style={{ maxWidth: '700px', minHeight: '500px' }}>
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <img src={post.image} alt="PC Build" className="object-cover object-center" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>

            <div className="flex w-full flex-col md:w-1/2">
              <div className="flex items-center justify-between border-b border-black p-2">
                <div className="flex items-center">
                  <div className="-space-y-1">
                    <h2 className="text-sm font-semibold leading-none">{post.user.username}</h2>
                    <span className="inline-block text-xs leading-none text-gray-500">{post.title}</span>
                  </div>
                </div>
                <button onClick={toggleOptions} title="Open options" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>

                </button>
                {showOptions && (
                  <div className="absolute bg-white rounded shadow-md mt-7" style={{ marginLeft: '220px' }}>
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Editar</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Eliminar</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                <div className="mb-2">
                  <span className="font-bold">{post.user.username}: </span>{post.description}
                </div>

                {comments.map((comment) => (
                  <div className="mb-2">
                    <span className="font-bold">{comment.user.username}: </span>{comment.text}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-black p-2">
                <div className="flex space-x-4">
                  <button onClick={handleLike} type="button" title="Like post" className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${isLiked ? 'red-700' : 'currentColor'}`} className={`w-6 h-6 ${isLiked ? 'fill-red-700' : 'fill-none'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                  <button type="button" title="Add a comment" className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5 fill-current">
                      <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                    </svg>
                  </button>
                </div>
                <button onClick={handleBookmark} title="Bookmark post" className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${isSaved ? 'yellow-400' : 'currentColor'}`} className={`w-6 h-6 ${isSaved ? 'fill-yellow-400' : 'fill-none'}`}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>

                </button>
              </div>
              <div className="mb-2 ml-2 flex items-center space-x-2">
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
    )
  };

  return (
    <div className="container mx-auto px-20">
      <div className="min-h-48 flex items-center justify-center p-5 px-6">
        {showPrimaryCard ? <PrimaryCard /> : <SecondaryCard />}
      </div>
    </div>
  );
};

export default PostCard;
