import axios from "axios";

const URL = "https://dailypost-api.onrender.com/user";

export const Auth = {
    findAllByUsername: async (token, fragment) => {
        try {
            const data = await axios.get(`${URL}/username?fragment=${fragment}`,
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
    
    findAll: async (token) => {
        try {
            const data = await axios.get(`${URL}/`,
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