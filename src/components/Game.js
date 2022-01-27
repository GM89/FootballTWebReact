//al importar el json es cuando le damos el nombre de variable, no dentro del json
import data from '../games_and_locations.json';
import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Switch, useParams} from 'react-router-dom';
import { useUserState } from "../utilities/firebase";

/* Object.keys(data_array[i]) */
    const Table_Data = () => {
        return data.game.map((x, i) =>{
            return(
                <tr key={i}>
                    <td className='matchesLinks'>{x.id_game}</td>
                    <td><Link  to={`/game/${x.id_game}`} className='matchesLinks'>{x.date}</Link></td>
                    <td><Link  to={`/game/${x.id_game}`} className='matchesLinks'>{x.teams}</Link></td>
                    <td><Link  to={`/game/${x.id_game}`} className='matchesLinks'>{x.location}</Link></td>
                    <td><Link  to={`/game/${x.id_game}`} className='matchesLinks'>{x.time}</Link></td>
                </tr>
            )
        })
    }
    



function Game () {
        return (
            <div className="container">
                <p>Game</p>
                <table className="table .table-responsive .table-bordered">
                    <thead className=".thead-dark">
                        <tr>
                            <th>Match</th>
                            <th>Date</th>
                            <th>Teams</th>
                            <th>Location</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody className=".table-hover">
                        <Table_Data/>
                    </tbody>
                </table>
            </div>
        );

    };




export {Game};