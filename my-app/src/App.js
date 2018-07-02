import React, { Component } from 'react';
import './App.css';

/**
 * 定义棋子
 */
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/**
 * 判断输赢情况
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let item of lines) {
    const [a, b, c] = item;
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * 定义棋盘
 */
class Board extends Component {
  renderSquare (i) {
    return (
      <Square 
        value={this.props.square[i]}
        onClick={(e) => this.props.onClick(i, e)}
      />
    );
  }

  render () {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
/**
 * 定义游戏
 */
class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [
        Array(9).fill(null)
      ],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  handelClick (i,e) {
    console.log(e.target)
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    const curSquare = history[this.state.stepNumber];
    const square = history[this.state.stepNumber].slice();
    if(this.state.stepNumber >= 9 || curSquare[i] || calculateWinner(curSquare)) {
      return;
    }
    square[i] = this.state.xIsNext ? 'x' : 'o';
    history[this.state.stepNumber + 1] = square
    this.setState({
      history: history,
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1
    })
  }

  moveTo (i) {
    console.log(i)
    this.setState({
      stepNumber: i,
      xIsNext: i % 2 ? true : false
    })
  }

  render () {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const square = history[this.state.stepNumber];
    let status = '';
    const win = calculateWinner(square);
    const next = this.state.xIsNext ? 'x' : 'o';
    if(win) {
      status = `winner is: ${win}`;
    }else {
      status = `next is: ${next}`;
    }

    const moves = history.map((item, i)=> {
      const text = i === 0 ? 'go to start' : `move to ${i}`;
      return <button key={i} onClick={() => this.moveTo(i)}>{text}</button>
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board
            square={square}
            onClick={(i, e) => this.handelClick(i, e)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
