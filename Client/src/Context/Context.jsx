import react from "react";
import { useMemo,useEffect,useState,createContext} from "react";
import { Auth } from "../Services/Auth";
import { Post } from "../Services/Post";
import { Result } from "postcss";

const APIContext = createContext();

export const APIProvider = (prop) => {

    const [token, setToken] = useState("");
    const [username,setUsername] = useState(null);
    
    const getToken = () => {
        const tokenData = localStorage.getItem("TOKEN");
        if (tokenData !== "undefined") {
          setToken(tokenData);
          console.log(token);
        }
      };

    useEffect(() => {
        getToken();
        const user = whoami();
        if(user){
            setUsername(user);
        }
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

      const whoami = async ()=>{
        try{
            const tokenData = localStorage.getItem("TOKEN");
            const data = await Auth.whoami(tokenData);
            return data;

        } catch (error){
            console.log(error);
            return false;
        }
      }

      const register = async (username, email, password)=>{
        try{
            const data = await Auth.register(username,email,password);
            console.log(data);
            if(data){
                return true;
            }
            return false;

        } catch (error) {
            return false;
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
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.getAll(tokenData,num);
        return data;
    }

    const getAllOwn = async (num)=>{
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.findOwn(tokenData,num);
        return data;
    }

    const getAllFavorite = async (num)=>{
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.getAllFavorite(tokenData,num);
        return data;
    }

    const getAllFavoriteEntirety = async ()=>{
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.Allfavorite(tokenData);
        return data;
    }

    const getAllLikes = async (id)=>{
        const tokenData =localStorage.getItem("TOKEN");
        const data = Post.AllLikes(tokenData,id);
        return data;
    }

    const findOne = async (id)=>{
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.findOne(token,id);
        return data;
    }

    const savePost = async (id)=>{
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.favorite(tokenData,id);
        return data;
    } 

    const likePost = async (id)=>{
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.like(tokenData,id);
        return data;
    }

    const logout = () => {
          localStorage.setItem("TOKEN",undefined);
          setToken(undefined);
          setUsername(undefined);
      }
    
    const comment = (id) => {
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.comment(tokenData,id);
        return data;
    }
    const saveComment = (id,text) => {
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.saveComment(tokenData,id,text);
        return data;
    }

    const data = useMemo(
        ()=> ({
            token:token,
            username:username,
            login:login,
            logout:logout,
            getAll:getAll,
            create:create,
            getToken:getToken,
            getAllOwn:getAllOwn,
            getAllFavorite:getAllFavorite,
            register:register,
            whoami:whoami,
            findOne:findOne,
            savePost:savePost,
            likePost:likePost,
            getAllFavoriteEntirety:getAllFavoriteEntirety,
            getAllLikes:getAllLikes,
            comment:comment,
            saveComment:saveComment
        }),[token,username,login,logout,getAll,create,getToken,getAllOwn,getAllFavorite,findOne,savePost,likePost,getAllFavoriteEntirety,comment,saveComment]
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