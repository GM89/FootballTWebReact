
import {useUserState, SignOutButton, SignInButton} from '../utilities/firebase.js';
import { Link } from 'react-router-dom';
function Navbar(){
    const user = useUserState();
 console.log(user, "user en Navbar");


  return(
    <nav className="navbar sticky-top navbar-dark bg-primary">
        <div className="container-fluid d-flex justify-content-around nav-height">

            <Link className="navbar-brand" to="/">Home</Link>
            <Link className="navbar-brand" to="/about">About</Link>
            <Link className="navbar-brand" to="/rules">Rules and Policies</Link>
            <Link className="navbar-brand" to="/game">Game Information</Link>
            <Link className="navbar-brand" to="/registration">Registration Form</Link>
            { user ? <SignInButton/> : <SignOutButton/> }
        </div>
    </nav>
    )


}

export {Navbar};