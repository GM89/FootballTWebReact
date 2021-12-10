import React, { useRef, useState } from 'react';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import logo from '../assets/img/nysl_logo.png'
import { 
  collection,
  query,
  orderBy,
  limit,
  where,
  getFirestore,
  addDoc,
  serverTimestamp
} from "firebase/firestore";


const auth = getAuth();





//db conection
function ChatRoom() {
  const {id} = useParams();
  const dummy = useRef();
  const db = getFirestore();
  const messagesRef = collection(db,'messages');


//
  const q = query(messagesRef, where("game","==",`${id}`), orderBy('timestamp'))
// esto da un id random a cada documento del collection!
  const [messages] = useCollectionData(q, { idField: 'id' });
  const [formValue, setFormValue] = useState('');


  //message writing
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;
    //addDoc push all the messages, await para que espere a que es escriba el emnsaje
    await addDoc(collection(db,'messages'),{
      uid,
      text: formValue,
      timestamp: serverTimestamp(),
      game: id,
      photoURL,
      displayName
    })
    //scroll down when new message and message button
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>⚽</button>

    </form>
  </>)
};


//message body
//uid es una id de usuario, alfanumérico
function ChatMessage(props) {
  const { text, uid, photoURL, displayName } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img alt='userPhoto' src={photoURL || logo} />

      <div style={{flexDirection: 'column'}}>
        <p id='userName'>{displayName}</p>
        <p>{`${text}`}</p>
      </div>
    </div>
  </>)
};

export {ChatRoom};

