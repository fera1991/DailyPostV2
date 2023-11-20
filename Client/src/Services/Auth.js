import axios from "axios";

const URL = "https://dailypost-api.onrender.com/auth";

export const Auth = {
    login: async (user,password) => {
        try {
              
            const data = await axios.post(`${URL}/signin`,{username: user, password: password});
              console.log(data);
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
            console.log(data);
            return data.data;
        } catch (error) {
            console.error(error);
            return false; 
        }
    },

    register: async (username, email, password) => {
        try {
              
            const data = await axios.post(`${URL}/register`,{username: username, email: email, password: password});
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

}