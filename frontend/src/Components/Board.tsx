import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../Pages/Game";

interface BoardProps {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}

export const Board = ({ board, socket }: BoardProps) => {
    const [from, setFrom] = useState<null | Square>(null);
    const [to, setTo] = useState<null | Square>(null);

    const handleSquareClick = (square: Square | null) => {
        if (!from) {
            setFrom(square);
        } else {
            setTo(square);
            if (square) {
                socket.send(JSON.stringify({
                    type: MOVE,
                    payload: {
                        from,
                        to: square,
                    }
                }));
                setFrom(null);
                setTo(null);
            }
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 50px)', gap: '2px' }}>
            {board.flat().map((cell, index) => {
                const squareColor = (Math.floor(index / 8) + (index % 8)) % 2 === 0 ? 'white' : '#7D9971';
                return (
                    <div
                        onClick={() => handleSquareClick(cell?.square ?? null)}
                        key={index}
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: squareColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #738D68',
                        }}
                    >
                        {cell ? (
                            <span style={{ color: cell.color === 'w' ? '#151A13' : '#151A13' }}>
                                {cell.type.toUpperCase()}
                            </span>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};
