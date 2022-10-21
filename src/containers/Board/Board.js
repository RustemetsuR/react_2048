import React, { useEffect, useRef, useState } from 'react';
import "./Board.css";
import Tile from "../../components/Tile/Tile";
import Container from "../../components/Container/Container";
import Modal from "../../components/Modal/Modal";
import {
    onClickUp,
    onClickDown,
    onClickRight,
    onClickLeft
} from '../../MOVE_FUNCTIONS';
import { useSwipeable } from 'react-swipeable';
import BoardInterface from '../../components/BoardInterface/BoardInterface';

const Board = () => {

    const emptyBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    const allowedKeys = [" ", "enter", "r", "w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"]

    const [board, setBoard] = useState(emptyBoard);
    const [deg, setDeg] = useState(0 - 360);
    const [modal, setModal] = useState(false);
    const [isWin, setIsWin] = useState("lose");
    const [activeKeyboard, setActiveBoard] = useState(true);
    const score = useRef(0)
    const [bestScore, setBestScore] = useState(localStorage.getItem("bestScore") ? localStorage.getItem("bestScore") : 0);

    const swipeHandlers = useSwipeable({
        onSwiped: (eventData) => {
            const newBoard = [...board];
            const oldBoard = newBoard.map(item => ([...item]));
            let newScore = 0;
            if (eventData.dir === "Up") {
                newScore = onClickUp(newBoard);
            } else if (eventData.dir === "Left") {
                newScore = onClickLeft(newBoard);
            } else if (eventData.dir === "Down") {
                newScore = onClickDown(newBoard);
            } else if (eventData.dir === "Right") {
                newScore = onClickRight(newBoard);
            }

            const newStateScore = score.current + newScore;
            score.current = newStateScore;
            
            if (newStateScore > localStorage.getItem("bestScore", newStateScore)) {
                setBestScore(newStateScore);
                localStorage.setItem("bestScore", newStateScore);
            }

            setBoard(newBoard);
            if (!equals(board, oldBoard)) {
                spawnNumber();
            }
            ifWinOrLose();
        }
    });

    useEffect(() => {
        if (!localStorage.getItem("bestScore")) {
            localStorage.setItem("bestScore", bestScore);
        }
        initializeBoard();
        document.addEventListener('keydown', moveTiles, true);
    }, []);

    const moveTiles = event => {
        if (activeKeyboard === true) {
            const key = event.key.toLowerCase();
            if (allowedKeys.includes(key)) {
                let newScore;
                const newBoard = [...board];
                const oldBoard = newBoard.map(item => ([...item]));
                if (key === "r" || key === " " || key === "enter") {
                    restart();
                } else {
                    if (key === "w" || key === "arrowup") {
                        newScore = onClickUp(newBoard);
                    } else if (key === "a" || key === "arrowleft") {
                        newScore = onClickLeft(newBoard);
                    } else if (key === "s" || key === "arrowdown") {
                        newScore = onClickDown(newBoard);
                    } else if (key === "d" || key === "arrowright") {
                        newScore = onClickRight(newBoard);
                    }

                        const newStateScore = score.current + newScore;
                        score.current = newStateScore;

                        if (newStateScore > localStorage.getItem("bestScore", newStateScore)) {
                            setBestScore(newStateScore);
                            localStorage.setItem("bestScore", newStateScore);
                        }
                    

                    setBoard(newBoard);
                    if (!equals(board, oldBoard)) {
                        spawnNumber();
                    }
                }
                ifWinOrLose();
            }
        }
    }

    const ifWinOrLose = () => {
        board.map(row => {
            row.map(el => {
                if (el === 2048) {
                    popUpModal("win");
                }
            })
        });

        const testBoardUp = board.map(item => ([...item]));
        const testBoardDown = testBoardUp;
        const testBoardLeft = testBoardUp;
        const testBoardRight = testBoardUp;

        let testsConfirmed = 0;

        onClickDown(testBoardDown);
        if (equals(testBoardDown, board)) {
            testsConfirmed++;
        }
        onClickUp(testBoardUp);
        if (equals(testBoardUp, board)) {
            testsConfirmed++;
        }
        onClickLeft(testBoardLeft);
        if (equals(testBoardLeft, board)) {
            testsConfirmed++;
        }
        onClickRight(testBoardRight);
        if (equals(testBoardRight, board)) {
            testsConfirmed++;
        }

        if (testsConfirmed === 4) {
            popUpModal("lose");
        }
    }

    const popUpModal = (isWin) => {
        setActiveBoard(false);
        setIsWin(isWin);
        setTimeout(() => {
            setModal(true);
        }, 1000);
    }

    const restart = () => {
        setActiveBoard(true);
        initializeBoard();
        setModal(false);
        score.current = 0;
    }

    const initializeBoard = () => {
        const newBoard = [...board];
        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard.length; j++) {
                newBoard[i][j] = 0;
            }
        }

        let i = 2;
        while (i !== 0) {
            spawnNumber();
            i--;

        }
        setBoard(newBoard);
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

    return (
        <div className="board-block">
            <Container>
                <div className="board-block__inner">
                    <BoardInterface score={score.current} bestScore={bestScore} deg={deg} onClick={() => {
                        setDeg(deg - 360);
                        restart();
                    }} />

                    <div className="board-game" {...swipeHandlers}>
                        {board.map((boardElement, boardIndex) => {
                            return <div
                                key={boardIndex + "" + boardElement}
                                className="row-block">
                                {boardElement.map((el, index) => {
                                    return <Tile key={index + "" + boardIndex}
                                        index={index}
                                        number={el}
                                    />
                                })}
                            </div>
                        })}
                        <Modal modal={modal} onClick={() => restart()} gameResults={isWin} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Board;