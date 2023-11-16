import React from 'react';
import Login from './Pages/Login/Login';
import Checkin from './Pages/Checkin/Checkin';
import PrincipalAdmin from './Pages/Principal/MainAdmin';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Private from './Components/Private/Private';
const App = () => (
  
  <BrowserRouter>
    <Routes>
      <Route path ="/" element={ <Login/> }/>
      <Route path="/checkin" element={ <Checkin/>}/>
      <Route path ="/home" element={ <PrincipalAdmin/> }/>
      <Route path="/404" element={<Private/>}/>
    </Routes>
  </BrowserRouter>

);

export default App;