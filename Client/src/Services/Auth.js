import axios from "axios";

const URL = "https://dailypost-api.onrender.com/auth";

export const Auth = {
    login: async (user,password) => {
        try {
              
            const data = await axios.post(`${URL}/signin`,{username: user, password: password});
            if(data.status === 200)
            {
                return data.data
            }

        } catch (error) {
            console.log(error);
            return undefined;
        }
    },
    whoami: async (token) => {
        try {
            const data = await axios.get(`${URL}/whoami`,
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

    register: async (username, email, password) => {
        try {
              
            const data = await axios.post(`${URL}/register`,{username: username, email: email, password: password});
            if(data.status === 201)
            {
                return data
            }

        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    },

}