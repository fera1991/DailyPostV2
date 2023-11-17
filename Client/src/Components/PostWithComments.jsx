import { useAPIContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

export default function PostWithComments() {

    return (
        <body class="bg-gray-900 text-white">
            <div class="container relative mx-auto px-4 py-6">
                <button title="Close" type="button" class="absolute left-full top-0 mr-10 mt-6 rounded-md bg-gray-200 p-2 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="flex overflow-hidden rounded-lg bg-white shadow-lg">
                    <div class="w-full md:w-1/2">
                        <img src="https://i.pinimg.com/564x/1c/02/67/1c02674dcd5747a0258694d69ab84572.jpg" alt="PC Build" class="h-full w-full object-cover object-center" />
                    </div>

                    <div class="flex w-full flex-col md:w-1/2">
                        <div class="flex items-center justify-between border-b border-black p-4">
                            <div class="flex items-center">
                                <img src="https://media.gq.com.mx/photos/5fd51c587938a266e30f81d1/16:9/w_1920,c_limit/Deadpool.jpg" alt="User Profile" class="h-10 w-10 rounded-full border-2 border-black object-cover" />
                                <div class="ml-3">
                                    <h2 class="text-sm font-bold">nameUser</h2>
                                </div>
                            </div>
                            <button title="Open options" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 fill-current" style="cursor: auto;">
                                    <path d="M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z"></path>
                                    <path d="M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z"></path>
                                    <path d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z"></path>
                                </svg>
                            </button>
                        </div>

                        <div class="flex-1 overflow-y-auto p-4">
                            <p><span class="font-bold">nameUser</span> Descripcion -----------</p>
                        </div>

                        <div class="mt-4 flex items-center justify-between border-t border-black p-2">
                            <div class="flex space-x-4">
                                <button type="button" title="Like post" class="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 fill-current">
                                        <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                    </svg>
                                </button>
                                <button type="button" title="Add a comment" class="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 fill-current">
                                        <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                                    </svg>
                                </button>
                            </div>
                            <button type="button" title="Bookmark post" class="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 fill-current">
                                    <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="mb-2 ml-4 flex items-center space-x-2">
                            <div class="text-sm font-semibold">0 likes</div>
                        </div>

                        <div class="border-t border-black p-4">
                            <div class="flex items-center space-x-3">
                                <input type="text" placeholder="Add a comment..." class="flex-1 bg-transparent text-sm placeholder-gray-400 outline-none" />
                                <button type="submit" class="text-sm text-blue-400">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}