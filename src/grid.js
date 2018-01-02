import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './grid.css';


let colors = ['blue'];

/**
 * 
 * @param {*} max 
 * @param {*} min 
 */
const random = (max, min = 0) => {
  //exclusive of end point
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * 
 * @param {*} colors 
 */
const randomColor = () => {
  return random(colors.length);
}
/**
 * 
 * @param {*} param0 
 */
const Block = ({ color }) => {
  return (
    <div className="block" style={{ backgroundColor: `${color}` }}></div>
  )
}
/**
 * 
 * @param {*} param0 
 */
const ContainerRow = () => {
  return (
    <div className="containerRow">
      < Block color={'#fff'} />
      < Block color={'#fff'} />
      < Block color={'#fff'} />
    </div>
  )
}

const renderGrid = (color, position) => {
  let blocks = [];
  for (let i = 0; i < 9; i++) {
    if (i == position) {
      blocks.push(
        < Block key={i} color={colors[color]} />
      )
    } else {
      blocks.push(
        < Block key={i} color={'#fff'} />
      )
    }
  }
  let grid = [];
  for (let i = 0; i < 3; i++) {
    grid.push(<div key={i} className="containerRow">
      {blocks.slice(i * 3, i * 3 + 3)}
    </div>)
  }
  return grid;
}


/**
 * 
//  */
// const Container = ({color, position}) => {
//   return (
//     <div className="container">
//       < Block color={'#fff'} />
//       < Block color={'#fff'} />
//       < Block color={'#fff'} />
//       < Block color={'#fff'} />
//       < Block color={'#fff'} />
//       < Block color={'#fff'} />
//       < Block color={'#fff'} />
//       < Block color={'#fff'} />
//       < Block color={'#fff'} />
//     </div>
//   )
// }

const calculateSquare = () => {
  let color = randomColor();
  let position = random(9, 0);
  return { color, position }
}
/**
 * 
 */
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      timer: null, 
      color: null,
      position: null,
      round:0,
    }
  }
  /**
   * 
   */
  handleClick = () => {
    this.setState({
      started: !this.state.started
    });
    console.log(this.state);
  }


  position = () => {
    console.log(this.state);
    if(this.state.round == 0){
      let { color, position } = calculateSquare();
      this.setState({
        color:colors[color],
        position,
        round: 1
      })
    }else if(this.state.round == 4){
      this.setState({
        color:null,
        position:null,
        round:0
      })
    }else{
      this.setState({
        round: this.state.round + 1
      })
    }
  }

  /**
   * 
   */
  //each interval go through and set the current square, flash the current square
  runGame = () => {
    let timer = setInterval(this.position, 500);
    this.setState({
      timer
    })
  }

  /**
   * 
   */
  stopGame = () => {
    clearInterval(this.state.timer);
    this.setState({
      started: !this.state.started
    });
  }
  render() {
    let color = this.state.color;
    let position = this.state.position;
    let blocks = [];
    for (let i = 0; i < 9; i++) {
      if (i == position) {
        blocks.push(<Block key={i} color={color} />)
      } else {
        blocks.push(<Block key={i} color={'#fff'} />)
      }
    }
    return (
      <div>
        <div className="container">
          {blocks}
        </div>
        <button onClick={this.runGame}>Start Game</button>
        <button onClick={this.stopGame}>Stop Game</button>
        <button onClick={this.position}>Test Position</button>
      </div>
    )
  }
}



export default Game;