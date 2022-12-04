import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogOut = ()=>{
        localStorage.removeItem('authToken');
        navigate('/login');
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="\">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className={`nav-item ${location.pathname==="/"?"active":""}`}>
                    <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className={`nav-item ${location.pathname=="/about"?"active":""}`}>
                    <Link className="nav-link" to="/about">About</Link>
                </li>
            </ul>
                {!localStorage.getItem('authToken')? 
                    <form className='d-flex'>
                        <Link className='btn btn-primary mx-2' to='/login' type='submit'>Log In</Link>
                        <Link className='btn btn-primary mx-2' to='/signup' type='submit'>Sign Up</Link>:
                    </form>
                    :
                    <form className='d-flex'>
                        <a className='btn btn-primary mx-2' onClick={handleLogOut} type='submit'>Log Out</a>
                    </form>
            }
        </div>
    </nav>
  )
}
