import React from 'react';
import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';
import User from './Pages/User/User';
import PrincipalAdmin from './Pages/Principal/MainAdmin';
import PrincipalUser from './Pages/Principal/MainUser';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Private from './Components/Private/Private';
const App = () => (
  
  <BrowserRouter>
    <Routes>
      <Route path ="/" element={ <Login/> }/>
      <Route path ="/home" element={ <PrincipalAdmin/> }/>
      <Route path="*" element={<Private/>}/>
    </Routes>
  </BrowserRouter>

);

export default App;