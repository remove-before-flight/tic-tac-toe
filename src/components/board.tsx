import React from "react";
import { Square } from "./square";
import { BoardProps, BoardState } from "../models/interfaces.model";

export class Board extends React.Component<BoardProps, BoardState> {
    renderSquare(i: number) {
        let highlight = false;
        if(this.props.winner?.winningLine){
            highlight = this.props.winner.winningLine.findIndex(j => j === i) !== -1;
        }

        return <Square key={i}
            value={this.props.squares[i]}
            highlight={highlight}
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
