import React from 'react';
import Login from './Pages/Login/Login';
import Checkin from './Pages/Checkin/Checkin';
import PrincipalAdmin from './Pages/Principal/Home';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Private from './Components/Private/Private';
import NewPost from './Pages/CreatePost/NewPost';

import SavePost from './Pages/Principal/SavePost';
import UpdatePost from './Pages/CreatePost/updatePost';

import PostMe from './Pages/Principal/PostMe';
const App = () => (
  
  <BrowserRouter>
    <Routes>
      <Route path ="/" element={ <Login/> }/>
      <Route path="/checkin" element={<Checkin/>}/>
      <Route path="/newpost" element={<Private><NewPost/> </Private>}/>
      <Route path ="/home" element={<Private> <PrincipalAdmin/> </Private>}/>
      <Route path="*" element={<Private/>}/>
      <Route path="/savePost" element={<Private><SavePost/></Private>}/>
      <Route path="/updatePost/:id" element={<Private><UpdatePost/></Private>}/>
      <Route path="/postMe" element={<Private><PostMe/></Private>}/>
    </Routes>
  </BrowserRouter>

);

export default App;