import React from 'react';
import logo from './logo.svg';
import './App.css';
import globeImg from "./images/Simple_Globe.png";
import starImg from "./images/star_pictogram.png";


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
        
        let ret = [];

        for(let i = 0; i < numberOfPlayers; i++){
          let x1: number = Math.sin(i*2*Math.PI/numberOfPlayers);
          let y1: number = Math.cos(i*2*Math.PI/numberOfPlayers);

          let x2: number= Math.sin((i+1)*2*Math.PI/numberOfPlayers);
          let y2: number= Math.cos((i+1)*2*Math.PI/numberOfPlayers);

          if(i == 0){
            const circleFraction: number = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            const armLength: number = circleFraction * 3.5;
            const circleRatio: number = 1.0/(1.0 + armLength);
            circleSize = circleRatio * imageSize/2.0;
          }

          x1 *= circleSize;
          y1 *= circleSize;
          x2 *= circleSize;
          y2 *= circleSize;
          sidelength = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

          const offset: number = imageSize/2;

          
          x1 += offset;
          y1 += offset;
          x2 += offset;
          y2 += offset;
          
          
          let points: string = 
          offset.toString().replace(",", ".") + "," + offset.toString().replace(",", ".") + " " + 
          x1.toString().replace(",", ".")  + "," + y1.toString().replace(",", ".") + " " + 
          x2.toString().replace(",", ".")  + "," + y2.toString().replace(",", ".") + " " + 
          offset.toString().replace(",", ".") + "," + offset.toString().replace(",", ".");

          ret.push(
                <polygon points={points} style={{fill: colors[i % colors.length], stroke: "black", strokeWidth: 1}}/>
          );

          const cellX: number = (x1 - x2) / 3;
          const cellY: number = (y1 - y2) / 3; 

          for(var j = 0; j < 9; j++){
              for(var k = 0; k < 3; k++){
                  
                  points = 
                  (x2+k*cellX+j*cellY).toString().replace(",", ".") + "," + (y2+k*cellY+j*-cellX).toString().replace(",", ".") + " " + 
                  (x2+(k+1)*cellX+j*cellY).toString().replace(",", ".") + "," + (y2+(k+1)*cellY+j*-cellX).toString().replace(",", ".") + " " + 
                  (x2+(k+1)*cellX+(j+1)*cellY).toString().replace(",", ".") + "," + (y2+(k+1)*cellY+(j+1)*-cellX).toString().replace(",", ".") + " " + 
                  (x2+k*cellX+(j+1)*cellY).toString().replace(",", ".") + "," + (y2+k*cellY+(j+1)*-cellX).toString().replace(",", ".");
                  
                  if(j < 6){
                      if((k == 1 && j!=5) || (k == 2 && j == 4)){
                        ret.push(
                            <polygon points={points} style={{fill: colors[i % colors.length], stroke: "black", strokeWidth: 1}}/>
                          );
                      }else{
                        ret.push(
                            <polygon points={points} style={{fill: "white", stroke: "black", strokeWidth: 1}}/>
                          );
                      }
                      const ics: number = (sidelength / 5.0);
                      const insideX: string = ((x2+(k+0.5)*cellX+(j+0.5)*cellY)-ics/2.0).toString().replace(",", ".");
                      const insideY: string = ((y2+(k+0.5)*cellY+(j+0.5)*-cellX)-ics/2.0).toString().replace(",", ".");
                      const iconSize: string = ics.toString().replace(",", ".");
                      
                      if((k == 2 && j == 4) || (k == 0 && j == 3)){ /* Globe */
                          ret.push(
                            <image href={globeImg} x={insideX} y={insideY} width={iconSize} height={iconSize}></image>
                          );
                      }else if((k == 0 && j == 0) || (k == 1 && j == 5)){ /* star */
                          ret.push(
                            <image href={starImg} x={insideX} y={insideY} width={iconSize} height={iconSize}></image>
                          );
                      }
                  }else if(k % 2 == 0 && j % 2 == 0){
                      const insideX: number = (x2+(k+0.5)*cellX+(j+1)*cellY);
                      const insideY: number = (y2+(k+0.5)*cellY+(j+1)*-cellX);
                      const radius: number = sidelength/6;

                      ret.push(
                        <circle cx={insideX.toString().replace(",", ".")} cy={insideY.toString().replace(",", ".")} r={radius.toString().replace(",", ".")} style={{fill: colors[i % colors.length], stroke: "black", strokeWidth: 1}}/>
                      );

                  }

                  
              }
          }
        }

        return (
          <svg width={imageSize} height={imageSize} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            {ret}
          </svg>
        );
      }
  }
}

export default App;
