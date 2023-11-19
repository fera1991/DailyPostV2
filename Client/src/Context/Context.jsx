import react from "react";
import { useMemo,useEffect,useState,createContext} from "react";
import { Auth } from "../Services/Auth";
import { Post } from "../Services/Post";

const APIContext = createContext();

export const APIProvider = (prop) => {

    const [token, setToken] = useState("");
    const [username,setUsername] = useState("");
    
    const getToken = () => {
        const tokenData = localStorage.getItem("TOKEN");
        if (tokenData !== "undefined") {
          setToken(tokenData);
          console.log(token);
        }
      };

    useEffect(() => {
        getToken();
      }, [token]); 

    const login = async (user ,password)=>{
        
        try {
            const data = await Auth.login(user,password);
            console.log(data);
            if(data)
            {
                localStorage.setItem("TOKEN",data.token);
                setToken(data.token);
        
                return true
            }
            return false;

        } catch (error) {
            console.log(error);
        }
      }

      const create = async (title,description,image)=>{
        try {
            const data = await Post.create(token,title,description,image);
            console.log(data);
            if(data)
            {
                return true
            }
            return false;

        } catch (error) {
            console.log(error);
        }
      }

      const getAll = async (num)=>{
        const data = Post.getAll(token,num);
        return data
    }


      

      const logout = () => {
          localStorage.setItem("TOKEN",undefined);
          setToken(undefined);
          setUsername(undefined);
      }
    

    const data = useMemo(
        ()=> ({
            token:token,
            username:username,
            login:login,
            logout:logout,
            getAll:getAll,
            create:create
        }),[token,username,login,logout,getAll,create]
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