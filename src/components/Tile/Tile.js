import React from 'react';
import "./Tile.css";

const Tile = props => {
    return (
        <div
            style={props.index === 3 ? { marginRight: 0 } : {}}
            className={props.number !== 0 ? "animated pulse number-block number-block-" + props.number : "number-block number-block-" + props.number}>
            <p className="number">{props.number !== 0 ? props.number : ""}</p>
        </div>
    );
};

export default Tile;