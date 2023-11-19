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
    }
}