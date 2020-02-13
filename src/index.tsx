import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface SquareProps {
    value: string;
    onClick: Function;
}

function Square(props: SquareProps) {
    return (
        <button
            className="square"
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    );
}

interface BoardProps {
    squares: string[];
    onClick: Function;
}
interface BoardState {
    squares: string[]
    xIsNext: boolean
}
class Board extends React.Component<BoardProps, BoardState> {
    renderSquare(i: number) {
        return <Square key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }
    renderBoard(){
        const rows = [];
        for (let i = 0; i < 3; i++) {
            const cols = [];
            for (let j = 0; j < 3; j++) {
                cols.push(this.renderSquare(i*3+j));   
            }
            rows.push(<div key={i} className='board-row'>{cols}</div>)
        }
        return rows;
    }
    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}

interface MoveLocation {
    column: number,
    row: number
}
interface HistoryItem {
    squares: string[],
    moveLocation: MoveLocation | null
}
interface GameState {
    history: HistoryItem[];
    xIsNext: boolean;
    stepNumber: number;
    ascendingMoves: boolean;
}
interface GameProps { }
class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moveLocation: null
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

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                moveLocation: {
                    column: (i % 3) + 1,
                    row: ((i / 3) >> 0) + 1
                }
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
        const winner = calculateWinner(current.squares);

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
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
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

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares: string[]) {
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
            return squares[a];
        }
    }
    return null;
}