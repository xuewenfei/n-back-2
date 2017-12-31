import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './grid.css';


let colors = ['blue','red','green'];

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
const ContainerRow = ({ colors }) => {
  return (
    <div className="containerRow">
      < Block color={colors[0]} />
      < Block color={colors[1]} />
      < Block color={colors[2]} />
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
      {blocks.slice(i*3, i*3 + 3)}
    </div>)
  }
  return grid;
}


/**
 * 
 */
class Grid extends Component {
  render() {
    return (
      <div className="container">
        < ContainerRow colors={colors} />
        < ContainerRow colors={colors} />
        < ContainerRow colors={colors} />
      </div>
    )
  }
}

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
    let { color, position } = calculateSquare();
    this.setState({
      color,
      position,
    })
  }

  /**
   * 
   */
  //each interval go through and set the current square, flash the current square
  runGame = () => {
    let newTimer = setInterval(this.position, 1000);
    this.setState({
      timer: newTimer
    })
  }
  /**
   * 
   */


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
    let grid = renderGrid(this.state.color, this.state.position)
    return (
      <div>
        {grid}
        <button onClick={this.runGame}>Start Game</button>
        <button onClick={this.stopGame}>Stop Game</button>
        <button onClick={this.position}>Test Position</button>
      </div>
    )
  }
}



export default Game;