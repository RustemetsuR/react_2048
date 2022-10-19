import React from 'react';
import "./App.css";
import Header from './components/Header/Header';
import Board from "./containers/Board/Board";

const App = () => {
    return (
        <div className="App">
            <Header />
            <Board />
        </div>
    );
};


export default App;