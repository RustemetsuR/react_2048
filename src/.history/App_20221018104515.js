import React, { useEffect, useState } from 'react';
import "./App.css";
import Tile from './components/Tile/Tile';

const App = () => {

    useEffect(() => {
        for(let i = 0; i < 2; i++){
            spawnNumber();
        }
    }, []);

    return (
        <div className="App">
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
        </div>
    );
};


export default App;