
import messagesData from '../chat_files/messages.json';
import { useState, useEffect } from 'react';
import React from 'react';
import data from '../games_and_locations.json';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {database} from '../utilities/firebase.js';
/*import 'firebase/database'; */





const WriteBox = () => {
    return(
      <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">With textarea</span>
      </div>
      <textarea class="form-control" aria-label="With textarea"></textarea>
    </div>
    )

}



const GoChatButton = () => {
    
    const {id} =useParams();  
    return (<button type="button" className="btn btn-secondary">
        <Link className="text-white text-decoration-none" to={`/game/${id}/game-${id}`}>Chat</Link>
    </button>)
  
  }


const Chat = () => {

  
    const {id} = useParams();
   // We dont' use {chat} : const {chat}  = useParams(); 
/*Note that ID was configured in game.js and it's extracted from the original matches json,
 especifically from the id-game property of such object*/

 //TEMPORALMENTE const currentGameChatObject = messagesData.[chat_game_id]
    const [gameChatData,  changeGameChat] = useState({});
    console.log('chat.js se ha cargado. Ojo sólo funciona hasta game 3')
  /*   console.log(Object.keys(gameChatData.{message-1)); */
    useEffect ( () => {     
            const chat_game_id =`game-${id}`;
            const currentGameChatObject = messagesData.messages[chat_game_id]
            changeGameChat(currentGameChatObject);
          
            }, [id] )

    function timeFormat(timenum) {
        
        var myDate = new Date(timenum);
        let newformatdate  = myDate.toGMTString()
        return newformatdate;
    }
        
    
    return (
        <div className="container">
                 <ul> {Object.keys(gameChatData).map(message => {
                        return(
                            <li>
                                <p>Timestamp: {timeFormat(gameChatData[message].timestamp)}</p>
                                <p>Autor: {gameChatData[message].author}</p>
                                <p>text: {gameChatData[message].text}</p>
                                
                           </li>
                             )
                            })
                        }
                </ul>
                <div> 
                   <WriteBox/> 
                </div>

        </div>         
                               
        )
}


export  {Chat,  GoChatButton};