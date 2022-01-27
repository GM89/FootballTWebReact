import React from 'react';
import './App.css';

import {Home} from './components/Home.js';
import {Game} from './components/Game.js';
import {Game_id} from './components/Game_id.js';
import {ChatRoom} from './components/Chat.js';
import logo from "./img/nysl_logo.png";

import {Navbar} from "./components/Navbar.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="App">
      <header >
      <Container>
          <Container className="title-header">
                  <Row>
                      <div className="col">Northside Youth Soccer League</div>
                      <div className="col"></div>
                      <div className="col"></div>
                  </Row>
                  <Row>
                      <div className="col"></div>
                      <div className="col"></div>
                      <div className="col"></div>
                  </Row>
                  <Row>
                      <div className="col-3"><img  id="logo1" src={logo} alt="logo"/></div>
                      <div className="col-3"></div>
                      <div className="col-6"></div>
                  </Row>
            
            </Container>
        <Navbar/>
        </Container>
      </header>
      
        <Switch>
          <Route path="/game/:id/:chat">
            <ChatRoom/>
          </Route>
          <Route path='/game/:id'>
            <Game_id/>
          </Route>
          <Route path='/game'>
            <Game/>
          </Route>          
          <Route exact path='/'>
            <Home/>
          </Route>

        </Switch>

      
    
     
    </div>
    </Router>
  );
}

export default App;
