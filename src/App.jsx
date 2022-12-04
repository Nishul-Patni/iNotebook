import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import NotesState from './components/contexts/notesContextsHere/NotesState';


export default function App() {
  return (
    <>
        <NotesState>
          <Router>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/about" element={<About />}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/signup' element={<SignUp/>}/>
              </Routes>
          </Router>
        </NotesState>
    </>
  )
}
