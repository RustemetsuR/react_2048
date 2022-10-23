import React from 'react';
import BoardScore from './BoardScore/BoardScore';
import "./BoardInterface.css";

const BoardInterface = props => {
    return (
        <div className="board-interface">
            <div className="board-score-block">
                <BoardScore title={"Score"} value={props.score} />
                <BoardScore title={"Best score"} value={props.bestScore} />
            </div>
            <button className="board-interface__reset-button" onClick={props.onClick}>
                <img
                    style={{ transform: "rotate(" + props.deg + "deg)" }}
                    className="board-interface__reset-img"
                    src={require("../../svg/spin-svgrepo-com.svg").default} 
                    alt="restart-icon"/>
            </button>
        </div>
    );
};

export default BoardInterface;