import React from 'react';
import logo from './logo.svg';
import './App.css';

let numberOfPlayers: number; //bound

function numberOfPlayersChangeHandler(event: any) {
  numberOfPlayers = event.target.value as number;
}

let sidelength: number = 0;
let imageSize: number = 4000;
let circleSize: number = 1;

let colors: string[] = [
  "blue",
  "Firebrick",
  "lime",
  "BlueViolet",
  "HotPink",
  "DodgerBlue",
  "Silver",
  "SaddleBrown"
];
let shapeCount: number = 16;

function App() {
  return (

    <div className="App">

      <h1>Ludo Generator</h1>

      <Builder></Builder>
    </div>
  );
}

function Builder() {
  return (
    <div className="Builder">

    <p>Put in a number of players, and a board will be generated</p>
    
    <input type="number" value={numberOfPlayers} onChange={numberOfPlayersChangeHandler} /><br />
    <br />
    <br />

    <Board></Board>
    </div>
  );
}

function Board() {
  if (numberOfPlayers <= 2) {
    return (
      <p><em>Insert a number larger than 2...</em></p>
    );
  } else {
    return (
      <svg width={imageSize} height={imageSize} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      </svg>
    );
  }
}

export default App;
