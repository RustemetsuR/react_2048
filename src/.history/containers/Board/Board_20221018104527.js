import React from 'react';
import "./Board.css";

const Board = () => {

    const [board, setBoard] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]);

    const spawnNumber = () => {
        const newBoard = [...board];
        while(true){
            const row = Math.floor(Math.random() * 4);
            const col = Math.floor(Math.random() * 4);
            if(newBoard[row][col] == 0){
                const chanceOfNum = Math.floor(Math.random() * 10);
                if(chanceOfNum == 0){
                    newBoard[row][col] = 4;
                }else{
                    newBoard[row][col] = 2;
                }
                setBoard(newBoard);
                break;
            }
        }
    }

    return (
        <div className="board">
        {board.map((boardElement, boardIndex) => {
            return <div key={boardIndex + "" + boardElement} className="row-block">
                {boardElement.map((el, index) => {
                    return <Tile key={index + "" + boardIndex}
                        index={index}
                        number={el}
                    />
                })}
            </div>
        })}
    </div>
    );
};

export default Board;