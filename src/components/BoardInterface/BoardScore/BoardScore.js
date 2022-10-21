import React from 'react';
import "./BoardScore.css";

const BoardScore = props => {
    return (
        <div className="board-score">
            <h4>{props.title}</h4>
            <p>{props.value}</p>
        </div>
    );
};

export default BoardScore;