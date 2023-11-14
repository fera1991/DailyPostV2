import axios from "axios";

const URL = "https://posts-pw2021.herokuapp.com/api/v1";

export const services = {
    login: async (user,password) => {
        try {
              
            const data = await axios.post(`${URL}/auth/signin`,{username: user, password: password});
              console.log(data);
            if(data.statusText === 'OK')
            {
                return data.data
            }

        } catch (error) {
            console.log(error.response.status);
            return undefined;
        }
    }
    ,update: async (token,id,title,description,img)=>{
        try {
            const config = {
                method: 'PUT',
                url: `${URL}/post/update/${id}`,
                headers: {
                  Authorization: `Bearer ${token}`
                },
                data: {
                  title: title,
                  description: description,
                  image: img
                }
              };
              const data = await axios(config);
              return data;
        } catch (error) {
            console.error(error);
            return undefined;
        }
        
    }

    ,token: async (token) => {
        try {
            const data = await axios.get(`${URL}/auth/whoami`,{headers: {Authorization: `Bearer ${token}`}})
            if(data.statusText === 'OK')
            {
                return data.data
            }
        } catch (error) {
            console.error(error);
            return {};
        }
    }
    ,create: async (Token,title,descripcion,img) => {
        console.log(Token);
        const response = await fetch(`${URL}/post/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Token}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    description: descripcion,
                    image: img
                })
              });
            console.log(response);
            return response;
    }
    ,getAll: async (token,num) => {
        try {
            const data = await axios.get(`${URL}/post/all?&limit=${25}&page=${num}`,{headers:{Authorization: `Bearer ${token}`}});
            console.log(data.data);
            return data.data;
        } catch (error) {
            console.error(error);
            return {}; 
        }
    }
    ,getOne: async (token,id) => {
        try {
            const data = await axios.get(`${URL}/post/one/${id}`,{headers: {Authorization: `Bearer ${token}`}})
            return data.data
        } catch (error) {
            console.log(error);
            return undefined; 
        }
    }
    ,getOwned: async (token,num) => {
        try {
            const data = await axios.get(`${URL}/post/owned?limit=${25}&page=${num}`,{headers: {Authorization: `Bearer ${token}`}});
            return data.data.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    ,getFav: async (token) => {
        const data = await axios.get(`${URL}/post/fav`,{headers: {Authorization: `Bearer ${token}`}});
        return data.data;
    }
    ,favorite: async (token,id) => {
        try {
            const config = {
                method: 'PATCH',
                url: `${URL}/post/fav/${id}`,
                headers: {
                  Authorization: `Bearer ${token}`
                }
              };
            const data = await axios(config);
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    ,toggle: async (token,id) => {
       try {
        const config = {
            method: 'PATCH',
            url: `${URL}/post/toggle/${id}`,
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
        
        const data = await axios(config);
        return data;
       } catch (error) {
           console.log(error);
       }
    }
    ,comment: async(token,id,description) => {
        try {
              const data = await axios.patch(`${URL}/post/comment/${id}`,{description: description},{headers: {Authorization: `Bearer ${token}`}});
              console.log(data);
              return data;

        } catch (error) {
            console.log(error);
        }
    }
    ,like: async(token,id)=>{
        try {
            const config = {
                method: 'PATCH',
                url: `${URL}/post/like/${id}`,
                headers: {
                  Authorization: `Bearer ${token}`
                }
              };
            const data = await axios(config);
            return data;
        } catch (error) {
            
        }
    }
}
