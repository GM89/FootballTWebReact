import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
import 'firebase/auth';


//server
const firebaseConfig = {
  apiKey: "AIzaSyAhPioguh5btj22K00lQCygfnu6efiWGIQ",
  authDomain: "project-3-firebase-firestore.firebaseapp.com",
  projectId: "project-3-firebase-firestore",
  storageBucket: "project-3-firebase-firestore.appspot.com",
  messagingSenderId: "935075082623",
  appId: "1:935075082623:web:3946dafe9d470312e82a4a",
  measurementId: "G-8HXBCGMWJP"
};

const firebase = initializeApp(firebaseConfig);
//login and logut
const firebaseSignOut = () => signOut(getAuth(firebase));

 const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
    console.log("singin out");
  };

//buttons for login and logout
const SignInButton = () => (
  <button className="navbar-brand bg-dark"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
<button className="navbar-brand bg-dark"
    onClick={() => firebaseSignOut()}>
  Sign Out
</button>
);

 const useUserState = () => {
    const [user, setUser] = useState();
    // on id token changed, detecta cambios en id de la databade(que aquí llamamos firebase)  y lanza el id en setUser
    useEffect(() => {
      onIdTokenChanged( getAuth(firebase), setUser);
    }, []);

    return [user];
  };



export { SignInButton, SignOutButton, getAuth, useUserState, signInWithGoogle};
export { firebaseConfig }