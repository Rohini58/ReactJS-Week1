import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Logo from './images/connect.png';
import gif from './images/Connect_Four.gif';

function Hole(props) {
  return <div className="Hole"><div className={props.value}></div></div>
}

function Slat(props) {
  return <div className="Slat" onClick={() => props.handleClick()}>
    {[...Array(props.holes.length)].map((x, j) =>
      <Hole key={j} value={props.holes[j]}></Hole>)}
  </div>
}

class Board extends Component {

  constructor() {
    super();
    this.state = {
      boardState: new Array(7).fill(new Array(6).fill(null)),//7 rows, 6 col grid
      playerTurn: 'Yellow',
      gameMode: '',
      gameSelected: false,//after starting the game it turns in to true
      winner: '',
      Player1: '',
      Player2: "",
      time: {}, 
      seconds: 180
    }
     
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    
    if(this.state.message=="Player 1 wins!" || this.state.message== 'Player 2  wins!' || this.state.message== 'Draw game.'){
      let seconds = this.state.seconds;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });

    }
    else{
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
     }
     let seconds = this.state.seconds - 1;
    // Check if we're at zero.
    if (seconds == 0) {
       
      clearInterval(this.timer);
      this.state.message="Time up"
    }
  }

  selectedGame(mode) {
    this.setState({
      gameMode: mode,
      gameSelected: true,//converting into true
      boardState: new Array(7).fill(new Array(6).fill(null))
    })
  }

  makeMove(slatID) {
    const boardCopy = this.state.boardState.map(function (arr) {
      return arr.slice();
    });
    if (boardCopy[slatID].indexOf(null) !== -1) {
      let newSlat = boardCopy[slatID].reverse()
      newSlat[newSlat.indexOf(null)] = this.state.playerTurn
      newSlat.reverse()
      this.setState({
        playerTurn: (this.state.playerTurn === 'Yellow') ? 'Blue' : 'Yellow',
        boardState: boardCopy//update to get new state one we added the color 
      })
    }
  }

  /*Only make moves if winner doesn't exist*/
  handleClick(slatID) {
    if (this.state.winner === '') {
      this.makeMove(slatID)
    }
  }

  componentDidUpdate() {
    let winner = checkWinner(this.state.boardState)
    if (this.state.winner !== winner) {
      this.setState({ winner: winner })
    }

  }
  updateResponse = (event) => {
    this.setState({ Player1: event.target.value })
  }
  updateResponse1 = (event) => {
    this.setState({ Player2: event.target.value })
  }

  render() {
    
    /*If a winner exists display the name*/
    let winnerMessage
    if (this.state.winner !== "") {
      winnerMessage = "winnerMessage appear"
    } else {
      winnerMessage = "winnerMessage"
    }
    

    /*Contruct slats allocating column from board*/
    let slats = [...Array(this.state.boardState.length)].map((x, i) =>
      <Slat
        key={i}
        holes={this.state.boardState[i]}
        handleClick={() => this.handleClick(i)}
      ></Slat>
    )

    return (
      <div>
        {this.state.gameSelected &&
          <div className="Board">
            {slats}
          </div>

        }
        {(!this.state.gameSelected) &&
          <div>
            <img id="img" src={gif} width="200" alt="logo" />

            <h1 >Please Enter the Player's Names </h1>
            <p><b>Player 1:</b></p>
            <input type="text" value={this.state.Player1} onChange={this.updateResponse} placeholder="Player1 " />
            <br></br>
            <br></br>
            <p><b>Player 2:</b></p>
            <input type="text" value={this.state.Player2} onChange={this.updateResponse1} placeholder="Player2 " />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <button value={this.state.play} onClick={() => this.selectedGame('Play')}>Play</button>
            

          </div>
        }
        {(this.state.playerTurn === "Yellow" && this.state.winner === '' && this.state.gameSelected) &&
          <div>
            <h2 >{this.state.Player1}'s Turn</h2>
            <p className="time"><button className="button" onClick={this.startTimer}>Start Game</button>&nbsp;&nbsp;<p className="button">M: {this.state.time.m} S: {this.state.time.s}</p><button className="button" onClick={() => {this.selectedGame()}}>play Again</button></p>

          </div>
        }
        {(this.state.playerTurn === "Blue" && this.state.winner === '' && this.state.gameSelected) &&
          <div>

            <h2>{this.state.Player2}'s' Turn</h2>
            <p className="time"><button className="button" onClick={this.startTimer}>Start Game</button>&nbsp;&nbsp;;<p className="button">M: {this.state.time.m} S: {this.state.time.s}</p>
   <button className="button" onClick={() => {this.selectedGame()}}>play Again</button></p>
          </div>
        }

        <div className={winnerMessage}>{this.state.winner}</div>
        {(this.state.winner !== '' && this.state.playerTurn==="Blue" ) &&
          <div>
            <h2 >Congratulations {this.state.Player1}</h2>
            <button  onClick={() => this.selectedGame('Play')}>Play Again</button>
          </div>
        }
        
        {(this.state.winner !== '' && this.state.playerTurn==="Yellow") &&
          <div>
            <h2 >Congratulations {this.state.Player2} </h2>
            <button onClick={() => this.selectedGame('Play')}>Play Again</button>            
          </div>
        }
     </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <Router>

        <div className="App">
          <ul className="ul">
            <button><NavLink to="/" exact activeStyle={
              { color: 'green' }
            }>Home</NavLink></button>
            <button><NavLink to="/play" exact activeStyle={
              { color: 'green' }
            }>play</NavLink></button>
          </ul>



          <Route path="/" exact strict render={// to create only in one page instead of gng to another page
            () => {
              return (
                <div>
                  <img src={Logo} width="180" height="180" alt="logo" />

                  <h1>Rules of the Game</h1>
                  <ol>
                    <li className="list">
                      Make sure there are two players to play.
                    </li>
                    <li className="list">
                      There are 21 red checkers and 21 white checkers in the game
                    </li>
                   
                    <li className="list">
                      Players will alternate turns after playing a checker.
                    </li>
                    <li className="list">
                      Drop one of your checkers down any of the slots in the top of the grid on your turn.
                    </li>
                    <li className="list">
                      Players alternates until one player gets 4 checkers of his color in a row.
                    </li>
                    <li className="list">
                      After reading all the rules, click on play button.
                   </li>
                  </ol>
                </div>

              );
            }
          } />
          <Route path="/play" exact strict render={
            () => {
              return (<div className="App">
                
                <div className="Game">
                  <Board></Board>
                </div>
              </div>);
            }
          } />

        </div>
      </Router>


    );
  }
}




function checkLine(a, b, c, d) {//besides are same or not
  return ((a !== null) && (a === b) && (a === c) && (a === d));
}

function checkWinner(bs) {//Horizontal
  for (let c = 0; c < 7; c++)
    for (let r = 0; r < 4; r++)
      if (checkLine(bs[c][r], bs[c][r + 1], bs[c][r + 2], bs[c][r + 3]))
        return bs[c][r] + ' wins!'

  for (let r = 0; r < 6; r++)//vertical same or not
    for (let c = 0; c < 4; c++)
      if (checkLine(bs[c][r], bs[c + 1][r], bs[c + 2][r], bs[c + 3][r]))
        return bs[c][r] + ' wins!'

  for (let r = 0; r < 3; r++)//right diagional
    for (let c = 0; c < 4; c++)
      if (checkLine(bs[c][r], bs[c + 1][r + 1], bs[c + 2][r + 2], bs[c + 3][r + 3]))
        return bs[c][r] + ' wins!'

  for (let r = 0; r < 4; r++)//left diagonal 
    for (let c = 3; c < 6; c++)
      if (checkLine(bs[c][r], bs[c - 1][r + 1], bs[c - 2][r + 2], bs[c - 3][r + 3]))
        return bs[c][r] + ' wins!'

  return "";
}

export default App;
