import React, { useEffect, useState } from 'react';
import "./Board.css";
import Tile from "../../components/Tile/Tile";

const Board = () => {
    const emptyBoard = [[0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]];
    const [board, setBoard] = useState(emptyBoard);
    
    let keyDetection = false;

    useEffect(() => {
        for (let i = 0; i < 2; i++) {
            spawnNumber();
        };

        document.addEventListener('keydown', moveTiles, true);
        document.addEventListener('keyup', blockKeyDetection, true);
    }, []);

    const moveTiles = event => {
        if(!keyDetection){
            keyDetection = true;
            const key = event.key.toLowerCase();
            const newBoard = [...board];
            const oldBoard = newBoard.map(item => ([...item]));
            if (key === "w" || key === "arrowup") {
                for (let i = 0; i < 4; i++) {
                    moveUp(newBoard);
                }
                combineUp(newBoard);
                moveUp(newBoard);
            } else if (key === "a" || key === "arrowleft") {
                for (let i = 0; i < 4; i++) {
                    moveLeft(newBoard);
                }
                combineLeft(newBoard);
                moveLeft(newBoard);
            } else if (key === "s" || key === "arrowdown") {
                for (let i = 0; i < 4; i++) {
                    moveDown(newBoard);
                }
                combineDown(newBoard);
                moveDown(newBoard);
            } else if (key === "d" || key === "arrowright") {
                for (let i = 0; i < 4; i++) {
                    moveRight(newBoard);
                }
                combineRight(newBoard);
                moveRight(newBoard);
            }
            setBoard(newBoard);
            if (!equals(board, oldBoard)) {
                spawnNumber();
            }
        }
    }
    
    const blockKeyDetection = () => {
        keyDetection = false;
    }

    const spawnNumber = () => {
        const newBoard = [...board];
        while (true) {
            const row = Math.floor(Math.random() * 4);
            const col = Math.floor(Math.random() * 4);
            if (newBoard[row][col] === 0) {
                const chanceOfNum = Math.floor(Math.random() * 10);
                if (chanceOfNum === 0) {
                    newBoard[row][col] = 4;
                } else {
                    newBoard[row][col] = 2;
                }
                setBoard(newBoard);
                break;
            }
        }
    }

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    const moveLeft = arr => {
        for (let row = 0; row < arr.length; row++) {
            for (let col = 1; col < arr.length; col++) {
                if (arr[row][col - 1] === 0) {
                    arr[row][col - 1] = arr[row][col];
                    arr[row][col] = 0;
                }
            }
        }
    }
    const moveRight = arr => {
        for (let row = 0; row < arr.length; row++) {
            for (let col = 2; col >= 0; col--) {
                if (arr[row][col + 1] === 0) {
                    arr[row][col + 1] = arr[row][col];
                    arr[row][col] = 0;
                }
            }
        }
    }
    const combineLeft = arr => {
        for (let row = 0; row < arr.length; row++) {
            for (let col = 0; col < arr.length - 1; col++) {
                if (arr[row][col + 1] === arr[row][col]) {
                    arr[row][col] = 2 * arr[row][col];
                    arr[row][col + 1] = 0;
                }
            }
        }
    }
    const combineRight = arr => {
        for (let row = 0; row < arr.length; row++) {
            for (let col = 3; col >= 0; col--) {
                if (arr[row][col - 1] === arr[row][col]) {
                    arr[row][col] = 2 * arr[row][col];
                    arr[row][col - 1] = 0;
                }
            }
        }
    }
    const moveUp = arr => {
        for (let row = 1; row < arr.length; row++) {
            for (let col = 0; col < arr.length; col++) {
                if (arr[row - 1][col] === 0) {
                    arr[row - 1][col] = arr[row][col];
                    arr[row][col] = 0;
                }
            }
        }
    }
    const moveDown = arr => {
        for (let row = 2; row >= 0; row--) {
            for (let col = 0; col < arr.length; col++) {
                if (arr[row + 1][col] === 0) {
                    arr[row + 1][col] = arr[row][col];
                    arr[row][col] = 0;
                }
            }
        }
    }
    const combineUp = arr => {
        for (let row = 0; row < arr.length - 1; row++) {
            for (let col = 0; col < arr.length; col++) {
                if (arr[row + 1][col] === arr[row][col]) {
                    arr[row][col] = 2 * arr[row][col];
                    arr[row + 1][col] = 0;
                }
            }
        }
    }
    const combineDown = arr => {
        for (let row = 3; row > 0; row--) {
            for (let col = 0; col < arr.length; col++) {
                if (arr[row - 1][col] === arr[row][col]) {
                    arr[row][col] = 2 * arr[row][col];
                    arr[row - 1][col] = 0;
                }
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