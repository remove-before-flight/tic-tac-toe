import React from "react";
import { GameProps, GameState, Winner } from "../models/interfaces.model";
import { Board } from "./board";

export class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moveLocation: null,
                winner: null
            }],
            xIsNext: true,
            stepNumber: 0,
            ascendingMoves: true
        }
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        if (current.winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                moveLocation: {
                    column: (i % 3) + 1,
                    row: ((i / 3) >> 0) + 1
                },
                winner: calculateWinner(squares)
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    ascendingOrDescendingMoves(){
        this.setState({
            ascendingMoves: !this.state.ascendingMoves
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        
        let moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move  + ' Location(' + step.moveLocation?.column +',' + step.moveLocation?.row + ')':
                'Go to game start';
            return (
                <li key={move}>
                    <button 
                        onClick={() => this.jumpTo(move)}
                        className={move === this.state.stepNumber ? 'boldButton' : ''}
                    >{desc}</button>
                </li>
            );
        });
        if(!this.state.ascendingMoves){
            moves = moves.reverse();
        }

        let status;
        if (current.winner) {
            if(current.winner.winningLine){
                status = 'Winner: ' + current.winner.winner;
            } else {
                status = 'Draw: No one wins'
            }
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winner={current.winner}
                        onClick={(i: number) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.ascendingOrDescendingMoves()}>{this.state.ascendingMoves ? 'Ascending Moves' : 'Descending Moves'}</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares: string[]): Winner | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winningLine: lines[i]
            };
        }
    }
    const emptySquares = squares.filter(i => i === null).length;
    if(emptySquares === 0){
        return {
            winner: '',
            winningLine: null
        };
    }

    return null;
}
