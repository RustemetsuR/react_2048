import React from 'react';
import "./Tile.css";

const Tile = props => {
    return (
        <div
            style={props.index === 3 ? { marginRight: 0 } : {}}
            className={"number-block number-block-" + props.number}>
            <p className="number">{props.number !== 0 ? props.number : ""}</p>
        </div>
    );
};

export default Tile;