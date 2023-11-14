import react from "react";
import { useMemo,useEffect,useState,createContext} from "react";
import { services } from "../Services/Services";

const APIContext = createContext();

export const APIProvider = (prop) => {

    const [token, setToken] = useState("");
    const [username,setUsername] = useState("");
    const [userRole,setUserRole] = useState("");
    

    const comment = async (id,description)=> {
        const data = await services.comment(token,id,description)
        console.log(data);
    }
    const toggle = async (id) => {
        try {
            const data = await services.toggle(token,id);
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const favorite = async (id)=>{
        const data = await services.favorite(token,id);
        return data;
    }

    const like = async (id)=>{
    const data = await services.like(token,id);
    console.log(data);
    return data;
    }

    const getFavorite = async ()=>{
        const data = await services.getFav(token);
        return data;
    }

    const getOne = async (id)=>{
        const data = await services.getOne(token,id);
        return data;
    }
    const getOwn = async (num)=>{
        const data = await services.getOwned(token,num);
        return data
    }

    const getAll = async (num)=>{
        const data = await services.getAll(token,num);
        return data
    }

    const login = async (user ,password)=>{
        
        try {
            
            const data = await services.login(user,password);
            console.log(data);
            if(data)
            {
                localStorage.setItem("TOKEN",data.token);
                setToken(data.token);
                const role = data.role;
                if(role){
                    setUserRole({role});
                    console.log(role);
                }
                return data.role;
            }
            return false;

        } catch (error) {
            console.log(error);
        }
      }

      
      useEffect( async () =>{
            const tokenData = localStorage.getItem("TOKEN");
        if(tokenData != "undefined")
        {
            const userVerification = await services.token(tokenData);
            if(userVerification)
            {
                setUserRole(userVerification.role);
                setToken(tokenData);
                localStorage.setItem("TOKEN",tokenData);
                setUsername(userVerification.username);
            } 
        }
      },[token,userRole]);
      

      const logout = () => {
          localStorage.setItem("TOKEN",undefined);
          setToken(undefined);
          setUsername(undefined);
          setUserRole(undefined);
      }
      
      
      

    const data = useMemo(
        ()=> ({
            token:token,
            username:username,
            role: userRole,
            login:login,
            logout:logout,
            getAll:getAll,
            like:like,
            getOne:getOne,
            favorite:favorite,
            comment:comment,
            getOwn:getOwn,
            getFavorite:getFavorite,
            toggle: toggle
        }),[token,username,userRole,login,logout,getAll,like,getOne,favorite,comment,getOwn,getFavorite,toggle]
    );
    return <APIContext.Provider value={data}>
            {prop.children}
        </APIContext.Provider>
}

//funcion para  usear el context
export const useAPIContext = () => {
    const context =  react.useContext(APIContext);

    return context;
};