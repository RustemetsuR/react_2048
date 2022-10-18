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
        </div>
    );
};


export default App;