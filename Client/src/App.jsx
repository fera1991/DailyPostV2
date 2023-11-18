import React from 'react';
import Login from './Pages/Login/Login';
import Checkin from './Pages/Checkin/Checkin';
import PrincipalAdmin from './Pages/Principal/Home';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Private from './Components/Private/Private';
import NewPost from './Pages/CreatePost/NewPost';
import PostCard from './Components/PostCard';
import SaveAdmin from './Components/AdminComponents/SaveAdmin'
import PostWithComments from './Components/PostWithComments';
const App = () => (
  
  <BrowserRouter>
    <Routes>
      <Route path ="/" element={ <Login/> }/>
      <Route path="/checkin" element={ <Checkin/>}/>
      <Route path="/newpost" element={ <NewPost/>}/>
      <Route path ="/home" element={ <PrincipalAdmin/> }/>
      <Route path="/404" element={<Private/>}/>
      <Route path="/savePost" element={<SaveAdmin/>}/>
      <Route path="/coment" element={<PostWithComments/>}/>
    </Routes>
  </BrowserRouter>

);

export default App;