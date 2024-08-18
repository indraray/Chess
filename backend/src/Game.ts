import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./message";

export class Game{
   public player1:WebSocket;
   public player2: WebSocket;
   private board:   Chess;
   private startTime: Date;
   private moveCount = 1;

   constructor(player1:WebSocket, player2: WebSocket){
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.player1.send(JSON.stringify({
       type:INIT_GAME,
       payload: {
          color:"black"
       }
    }))
    this.player2.send(JSON.stringify({
      type:INIT_GAME,
      payload: {
         color:"white"
      }
   }))

   }

   
   makeMove(socket:WebSocket, move:{ from:string; to:string; }){  

      if(this.moveCount % 2 === 0 && socket !== this.player1){
         return;
      }
      if(this.moveCount % 2 === 1 && socket !== this.player2){
         return;
      }

      try{
         console.log('Check Move');
         this.board.move(move);
      }
      catch(e){
         console.log(e); 
         return;
      }
     
      //check the game is over
      console.log("checking game is over");
      if(this.board.isGameOver()){
         console.log("----------game over------------");
         this.player1.send(JSON.stringify({
            type:GAME_OVER,
            payload:{
               winner:this.board.turn()==="w"?"black":"white"
            }
         }))
         this.player2.send(JSON.stringify({
            type:GAME_OVER,
            payload:{
               winner:this.board.turn()==="w"?"black":"white"
            }
         }))
         return;
         }

         // update move
         if(this.moveCount % 2 === 1){
            console.log('player 1 moved');
            this.player1.send(JSON.stringify({
               type: MOVE,
               payload:move
            }))
         }else{
            console.log('player 2 moved');
            this.player2.send(JSON.stringify({
               type: MOVE,
               payload:move
            }))
         }
         this.moveCount++;
      }    
}