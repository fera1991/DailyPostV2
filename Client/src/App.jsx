import React from 'react';
import Login from './Pages/Login/Login';
import Checkin from './Pages/Checkin/Checkin';
import PrincipalAdmin from './Pages/Principal/Home';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Private from './Components/Private/Private';
import NewPost from './Pages/CreatePost/NewPost';
import Load from './Components/Load';

import SavePost from './Pages/Principal/SavePost';
import UpdatePost from './Pages/CreatePost/updatePost';

import PostMe from './Pages/Principal/PostMe';
const App = () => (
  
  <BrowserRouter>
    <Routes>
      <Route path ="/" element={ <Login/> }/>
      <Route path="/checkin" element={ <Checkin/>}/>
      <Route path="/newpost" element={ <NewPost/>}/>
      <Route path ="/home" element={ <PrincipalAdmin/> }/>
      <Route path="/404" element={<Private/>}/>
      <Route path="/savePost" element={<SavePost/>}/>
      <Route path="/updatePost/:id" element={<UpdatePost/>}/>
      <Route path="/postMe" element={<PostMe/>}/>
      <Route path="/load" element={<Load/>}/>
    </Routes>
  </BrowserRouter>

);

export default App;