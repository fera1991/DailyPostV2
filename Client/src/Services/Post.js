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
    }
}