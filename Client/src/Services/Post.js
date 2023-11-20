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
            console.log(data);
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    create: async (token,title,description,image) => {
        console.log(token);

        try {
            const data = await axios.post(`${URL}/post/create`,{title: title,image: image,description: description},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });
            console.log(data);
            if(data.status === 201)
            {
                return data.data
            }

        } catch (error) {
            console.log(error);
            return undefined;
        }
    },
    update: async (token,title,description,image, id) => {
        console.log(token);

        try {
            const data = await axios.put(`${URL}/post/create/${id}`,{title: title,image: image,description: description},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });
            console.log(data);
            if(data.status === 201)
            {
                return data.data
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
            console.log(data);
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
            console.log(data);
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    like: async (token,id) => {
        try {
            const data = await axios.patch(`${URL}/post/like/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            console.log(data);
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    toggle: async (token,id) => {
        try {
            const data = await axios.patch(`${URL}/post/toggle/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            console.log(data);
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },
    favorite: async (token,id) => {
        try {
            const data = await axios.patch(`${URL}/post/fav/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
            );
            console.log(data);
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
            console.log(data);
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
            console.log(data);
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
            console.log(data);
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },

}