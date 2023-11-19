import axios from "axios";

const URL = "http://localhost:8080";

export const Post = {
    getAll: async (token,num) => {
        try {
            const data = await axios.get(`${URL}/post/all?page=${num}&size=${15}`,{headers:{Authorization: `Bearer ${token}`}});
            console.log(data.data);
            return data.data;
        } catch (error) {
            console.error(error);
            return {}; 
        }
    }
}