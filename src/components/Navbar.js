
import { useUserState, SignOutButton, SignInButton} from '../utilities/firebase.js';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';


/* const  CurrentUser = () =>{
    const user = useUserState();
    const auth = getAuth();  
    return auth.currentUser;
} */



function Navbar(){
    const [user] = useUserState()
/*    const auth_id = getAuth();  
   const user = auth_id.currentUser; */


   console.log(user? true: false , "hay user en navbar?")
   
  

    console.log(user? 'signed in': 'no conectado')
 return(
    <nav className="navbar sticky-top navbar-dark bg-primary">
        <div className="container-fluid d-flex justify-content-around nav-height">

            <Link className="navbar-brand" to="/">Home</Link>
            <Link className="navbar-brand" to="/about">About</Link>
            <Link className="navbar-brand" to="/rules">Rules and Policies</Link>
            <Link className="navbar-brand" to="/game">Game Information</Link>
            <Link className="navbar-brand" to="/registration">Registration Form</Link>
            { user ? <SignOutButton />: <SignInButton />   }
        </div>
    </nav>
    )


}

export {Navbar};