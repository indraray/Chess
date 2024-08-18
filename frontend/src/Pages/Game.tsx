import { useEffect, useState } from "react";

import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";
import { Board } from "../Components/Board";


// Repetation of code
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";


export const Game = ()=>{
    const socket = useSocket();
    const [chess, setChess]=useState(new Chess());
    const [board, setBoard]=useState(chess.board());

   useEffect (()=>{
    if(!socket)  return;

    socket.onmessage=(event)=>{
        const message = JSON.parse(event.data);
        switch (message.type){
            case INIT_GAME:
                setChess(new Chess());
                setBoard(chess.board);
                console.log("INITIATED");
                break;
            case MOVE:
                const move = message.payload;
                chess.move(move);
                setBoard(chess.board());
                console.log("INITIATED");
                break;
            case GAME_OVER:
                console.log("INITIATED");
                break;
        }
    }
   },[socket]);



    return <div>
         
         
        
        <Board board={board} socket={undefined}/>
       <button onClick={()=>{
        socket?.send(JSON.stringify({
            type:INIT_GAME
        }))
       }}>Start</button>
    </div>
}