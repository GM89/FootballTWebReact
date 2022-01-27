// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

import { getDatabase, onValue, ref, set } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAVxN35gSdmX2Ih_dUSCfCr74u0-R-l7O4",
  authDomain: "project-iii-bf1a8.firebaseapp.com",
  databaseURL: "https://project-iii-bf1a8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-iii-bf1a8",
  storageBucket: "project-iii-bf1a8.appspot.com",
  messagingSenderId: "156972537003",
  appId: "1:156972537003:web:608ef8a18a7a6e0db753ee"

};


// Initialize Firebase and obtain its database 

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//-------------------------------------------------
const path = '/messages'




const useData = (path, transform) => {
  const [data, setData] = useState();//Neither of the above is true. Your app should display what's in data.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
console.log("is there a loop in useData?");
          useEffect(() => {
            //refernce to a database, but not its data.d path refers to some part of your JSON object
              const dbRef = ref(database, path);

              /*? qué es devMOde ? permet gestionar la teva base de dades  temps real a traves de Node.js
              production = quan els usuaris la poden utilitzar
              development = quan encara s'hi està treballant i no està preparada per ser llançada al públic.
              */
              const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
              if (devMode) { console.log(`loading ${path}`); }

              /*the function will be sent a snapshot object. 
              The val() method of this object will contain the new data.
              This is the primary way to read data from a Database. Your callback will be triggered for the initial data and again whenever the data changes. Invoke the returned unsubscribe callback to stop receiving updates */
              return onValue(dbRef, (snapshot) => {

              const val = snapshot.val();
              //cuando el schedule times ha cambiado, se actualiza el valor
              if (devMode) { console.log(val); }
                setData(transform ? transform(val) : val);
                setLoading(false);
                setError(null);
              }, (error) => {
                setData(null);
                setLoading(false);
                setError(error);
              });
          }, [path, transform]); //el código se actualiza cuando path y transform canvian. 
          
      return [data, loading, error];
  };

























/*

//ref(database, /messages)

//const chat_game_id =`game-${id}`;

  const chat_game_id =game-1";

function chat() {
  const {gameChat, setGameChat}  = useState({});

  useEffect( () => {
    database.collection('messages').onSnapShot(snapshot => (
      setGameChat(snapshot.docs.map(doc => doc.data())
        )))
  }, [])

}





*/

//the authentication  in the database
const auth = getAuth(app);  
const user = auth.currentUser;
 // the authentication provide in this case is Google, but could had been facebook
const provider = new GoogleAuthProvider() ;
//sign in function 
  const signInWithGoogle = () => {
    console.log("signInWithGoogle")
  signInWithPopup(getAuth(app), new GoogleAuthProvider() )
  };
  
 //sign out  function
  const signOutWithGoogle = () => {
    console.log("sign OUT WithGoogle")
   signOut(getAuth(app))
  }

 
  //---------------------------

  /*  onIdTokenChanged Adds an observer for changes to the signed-in user's ID token, which includes sign-in, sign-out, and token refresh events. This method has the same behavior as */
// it tells if the current user is authenticated or not-----------------
const useUserState = () => {
 
  const [user, setUser] = useState();
    //useEffect:  []  If an empty list is given, then React runs the function only when the component is first added.
  useEffect(() => {
    onIdTokenChanged(getAuth(app), setUser);

  },);
   return [user];
};



  
//----------Buttons--------------------------------------------------------------------

  const SignInButton = () => {
  return (<button className="btn btn-light btn-outline-dark" onClick={signInWithGoogle}>Sign in</button>)
  }

  const SignOutButton = () => {
      return (<button className="btn btn-light btn-outline-secondary" onClick={signOutWithGoogle}>Sign Out</button>)
    }

/*  firebase.auth.GoogleAuthProvider -- this object holds information needed to use Google as a provider
    firebase.auth().signInWithPopup(provider) - this function, given a provider object, pops up a dialog box to let a user sign in with that provider.
    firebase.auth().signOut() -- this function signs the user out.
    Note that some things are under firebase.auth and some are under the object returned by calling firebase.auth().
    
    signInWithGoogle 
    Calling this should cause a pop-up dialog box to appear asking the user to sign in with Google.
    When the user finishes this, an authentication state change will occur and your code will be able to get the user information.
    signOut
    Calling this should sign out, i.e., the authentication state should change, and the user should become null.


    */

   //-----------------------------------------
   


     
   function writeChat(game_num, message_num, message_author, message_text, message_timestamp) {
    const db = database;
     set(ref(db, 'messages/' + game_num + message_num), {
       author: message_author,
       text: message_text,
       timestapm : message_timestamp
     });
}




export {useUserState, SignInButton, SignOutButton, database}
