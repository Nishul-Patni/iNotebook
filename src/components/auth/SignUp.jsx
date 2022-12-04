import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    let [credentials, setCredentials] = useState({name:'', email:'', password:''});
    const navigate = useNavigate();
    const host = "http://localhost:5000/api";

    const handleCredentialInput = (event)=>{
        setCredentials({...credentials, [event.target.name]:event.target.value});
    }

    const handleOnSumbit = async (event)=>{
        event.preventDefault();
        
        const {name, email, password} = credentials;
        const url = host+'/auth/signup'
        
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({name, email, password})
        });

        const json = await response.json();
        if(json.error){
            console.log(json.error)
            alert(json.error);
            console.log(json.error.errors[0].msg);
        }else{
            console.log(json.authToken);
            localStorage.setItem('authToken', json.authToken);
            navigate('/');
        }
    }

  return (
    <div className='container my-3' >
        <form onSubmit={handleOnSumbit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input name='name' type="text" className="form-control" id="name" placeholder='Enter Your Name' value={credentials.name} onChange={handleCredentialInput}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input name='email' type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Enter a valid Email' value={credentials.email} onChange={handleCredentialInput}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="password1">Password</label>
                <input name='password' type="password" className="form-control" id="password1" placeholder='Enter Password' value={credentials.password} onChange={handleCredentialInput}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    </div>
  )
}
