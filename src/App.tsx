import { Routes, Route, Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import {User} from './types';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './components/register';
import Header from './components/Header'
import Home from './components/home'
import Login from './components/login';
import UserService from './services/UserService';
import { Navigate } from 'react-router-dom';



function App() {

    
    
   
    

    return (
        <>
            
            
            <Routes>
               
               
                 <Route path='/' element={ <Home />} />
                 <Route path='/register' element={<Register />} />
                
               
            </Routes>
            
        
        </>
    );
}
export default App;