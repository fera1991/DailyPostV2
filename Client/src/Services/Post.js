import axios from "axios";

const URL = "https://dailypost-api.onrender.com";

export const Post = {
    getAll: async (token,num) => {
        try {
            const data = await axios.get(`${URL}/post/all?page=${num}&size=${15}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    create: async (token,title,description,image) => {

        try {
            const data = await axios.post(`${URL}/post/create`,{title: title,image: image,description: description},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });
            if(data.status === 201)
            {
                return data.data
            }

        } catch (error) {
            console.log(error);
            return undefined;
        }
    },
    update: async (token,title,description,image,id) => {

        try {
            const data = await axios.put(`${URL}/post/update/${id}`,{title: title,image: image,description: description},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });
            if(data.status === 200)
            {
                return data
            }

        } catch (error) {
            console.log(error);
            return undefined;
        }
    },
    findOwn: async (token,num) => {
        try {
            const data = await axios.get(`${URL}/post/owned?page=${num}&size=${15}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    findOne: async (token,id) => {
        try {
            const data = await axios.get(`${URL}/post/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    like: async (token,id) => {
        try {
            const data = await axios.patch(`${URL}/post/like/${id}`,{},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    toggle: async (token,id) => {
        try {
            const data = await axios.patch(`${URL}/post/toggle/${id}`,{},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    favorite: async (token,id) => {
        try {

            const data = await axios.patch(`${URL}/post/fav/${id}`,{},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    Allfavorite: async (token) => {
        try {
            const data = await axios.get(`${URL}/post/fav/entirety`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    AllLikes: async (token,id) => {
        try {
            const data = await axios.get(`${URL}/post/like/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    
    comment: async (token,id) => {
        try {
            const data = await axios.get(`${URL}/post/comment/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    saveComment: async (token,id,text) => {
        try {
            const data = await axios.post(`${URL}/post/comment/${id}`,{text: text},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    getAllFavorite: async (token,num) => {
        try {
            const data = await axios.get(`${URL}/post/fav/all?page=${num}&size=${15}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },

}