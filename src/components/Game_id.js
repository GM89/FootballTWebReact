import React from 'react';
import {useState, useEffect} from 'react';
import data from '../games_and_locations.json';
import {useParams} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';



import { useUserState } from "../utilities/firebase";




const GoBackButton = () => {

    let history = useHistory();
      function handleClick() {
      history.push("/game");
    }
  
    return (
      <button type="button" className="btn btn-secondary" onClick={handleClick}>
        Go back
      </button>
    );
  }


  

  //<Route path='/game/:id'>
const Game_id = () => {
    const {id} =useParams();  
    const [user] = useUserState(); 
/*    const auth = getAuth();
   const user = auth.currentUser; */
   console.log(user? "hay user": "no hay user" , "  en game_id?")

    console.log(id, "el id");
   const [gameData,  changeGameState] = useState({});
   const [gameMap, changeGameMapState] = useState({});

    useEffect ( () => {     
                    let gameObject = {
                         id_date: data.game[id-1].date,
                         id_time: data.game[id-1].time,
                         id_teams: data.game[id-1].teams,
                         id_location : data.game[id-1].location,
                        }
                    let gameMapObject = {
                        mapName:[gameObject.id_location],
                        mapFullName: data.locations[0][gameObject.id_location].url,
                        mapAddress: data.locations[0][gameObject.id_location].address,
                        url: data.locations[0][gameObject.id_location].url,
                    }

                        
                        changeGameState(gameObject);
                        changeGameMapState(gameMapObject);
                        }, [id] )



   
    return (
        <div className="container">
             <h1>Match data: </h1>
                <p> Date: {gameData.id_date}</p>
                <p>Time: {gameData.id_time}</p>
                <p>Teams: {gameData.id_teams}</p>
                <p>Location: {gameData.id_location} </p> 
                <br/>
            <h3> Address of {gameData.id_location}:</h3> 
                <p>{gameMap.mapAddress} </p>
                <div> 
                    <iframe  src={gameMap.url} width="600" height="450" frameborder="0" style={{border:0}}  loading="lazy"  allowfullscreen=""></iframe>
                </div>
                <br/>
              

                  <div className="d-flex justify-content-around">
                      {user == null ? 'Please, log in': <ChatButton/> }
                      <GoBackButton/>
                  </div>
                    
               
                <br/>
        </div>

    )
}

const ChatButton = () => {
  const {id} = useParams();
  return (
      <div>
          <Link to={`/game/${id}/game${id}`}><button className="btn btn-primary">Game Chatroom</button></Link>
      </div>
  )
};





export {Game_id};

