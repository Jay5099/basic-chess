import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({chess,board,socket,setBoard}:{
    chess:any;
    setBoard:any;
    board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    }|null)[][];
    socket:WebSocket;
}) => {

    const [from,setFrom] = useState<null|Square>(null)
    return(
        <div className="text-white ">

                {board.map((row,i) => {
                    return <div key={i} className="flex">
                        {row.map((square,j) => {
                            const squareRepresention = String.fromCharCode(97+(j%8))+""+(8-i) as Square
                            return (
                                <div
                                    onClick={()=>{
                                        if(!from){
                                            setFrom(squareRepresention);
                                        }else{

                                            socket.send(JSON.stringify({
                                                type: MOVE,
                                                payload: {
                                                    move:{
                                                        from, 
                                                        to:squareRepresention
                                                    }
                                                }
                                            }))
                                            setFrom(null)
                                            chess.move({
                                                from,
                                                to:squareRepresention
                                            })
                                            setBoard(chess.board())
                                            console.log({
                                                from,
                                                to:squareRepresention 
                                            })
                                        }
                                    }}
                                    key={j} className={`w-16 h-16 ${(i+j)%2===0?'bg-[#69923e]':'bg-amber-50'}`}>
                                    <div className="w-full h-full flex justify-center text-black">
                                        <div className="h-full flex justify-center flex-col">
                                            {
                                                square?
                                                <img className="w-16" src={`/${square?.color==="b"?
                                                    `b${square?.type}` : `w${square?.type}`}.png`} />:null
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                })}
            
        </div>
    )
}