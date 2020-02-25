export interface Winner {
    winner: string;
    winningLine: number[] | null;
}
export interface MoveLocation {
    column: number,
    row: number
}
export interface HistoryItem {
    squares: string[],
    moveLocation: MoveLocation | null,
    winner: Winner | null
}
export interface GameState {
    history: HistoryItem[];
    xIsNext: boolean;
    stepNumber: number;
    ascendingMoves: boolean;
}
export interface GameProps { }
export interface BoardProps {
    squares: string[];
    winner: Winner | null;
    onClick: Function;
}
export interface BoardState {
    squares: string[]
    xIsNext: boolean
}
export interface SquareProps {
    value: string;
    highlight: boolean;
    onClick: Function;
}