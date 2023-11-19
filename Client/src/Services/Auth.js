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
    }
}