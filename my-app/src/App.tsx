import React from 'react';
import logo from './logo.svg';
import './App.css';

let numberOfPlayers: number; //bound

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

class Builder extends React.Component {
  constructor(props: any){
    super(props);
    this.state = {numberOfPlayers: 4};

    //This binding is necessary to make `this` work in the callback
    this.numberOfPlayersChangeHandler = this.numberOfPlayersChangeHandler.bind(this);
  }

  numberOfPlayersChangeHandler(event: any) {
    numberOfPlayers = event.target.value as number;
    this.setState(() => ({
      numberOfPlayers: event.target.value
    }));
  }

  render(): React.ReactNode {    
    return (
      <div className="Builder">

      <p>Put in a number of players, and a board will be generated</p>
      
      <input type="number" value={numberOfPlayers} onChange={this.numberOfPlayersChangeHandler} /><br />
      <br />
      <br />

      <Board></Board>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor (props: any) {
    super(props);
  }
  render(): React.ReactNode {
      
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
}

export default App;
