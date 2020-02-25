import { SquareProps } from "../models/interfaces.model";
import React from "react";


export function Square(props: SquareProps) {
    return (
        <button
            className={"square " + (props.highlight ? 'highlight' : '')}
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    );
}