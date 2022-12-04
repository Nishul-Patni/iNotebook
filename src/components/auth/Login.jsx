import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

export default function Login() {
    
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        console.log(localStorage.getItem('authToken'));
      if(localStorage.getItem('authToken')){
        navigate('/');
      }
    }, [])

    const host = "http://localhost:5000/api";

    const handleOnSumbit = async (event)=>{
        event.preventDefault();
        let url = host+'/auth/login'
        
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({email, password})
        });
        let json = await response.json()

        if(json.error){
            alert("Invalid Credentials");
        }else{
            localStorage.setItem('authToken',json.authToken);
            navigate('/');
        }
    }

  return (
    <div className='container my-3'>
        <form onSubmit={handleOnSumbit}>
            <div className="form-group">
                <label htmlFor= "exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your E-mail' value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor= "exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
