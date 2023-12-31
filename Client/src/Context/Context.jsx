import react from "react";
import { useMemo,useEffect,useState,createContext} from "react";
import { Auth } from "../Services/Auth";
import { Post } from "../Services/Post";
import { User } from "../Services/User"
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
                const user = whoami();
                if(user){
                    setUsername(user);
                }
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

      const findAllByUsername = async (fragment) => {
        const response = User.findAllByUsername(token,fragment);
        return response;
      }

      const findAllPostByUser = async (id) => {
        const response = User.findAllPostByUser(token,id);
        return response;
      }

      const register = async (username, email, password)=>{
        try{
            const data = await Auth.register(username,email,password);
            console.log(data);
            if(data){
                return data;
            }
            return false;

        } catch (error) {
            console.log(error)
            return error;
        }
      }
      const update = async (title,description,image,id)=>{
        try {
            const data = await Post.update(token,title,description,image,id);
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

      const toggle = async (id)=>{
        const tokenData = localStorage.getItem("TOKEN");
        const data = Post.toggle(tokenData,id);
        return data
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
        const data = Post.findOne(tokenData,id);
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
            saveComment:saveComment,
            toggle:toggle,
            update:update,
            findAllByUsername:findAllByUsername,
            findAllPostByUser:findAllPostByUser
        }),[token,username,login,logout,getAll,create,getToken,getAllOwn,getAllFavorite,findOne,savePost,likePost,getAllFavoriteEntirety,comment,saveComment,findAllByUsername,findAllPostByUser]
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