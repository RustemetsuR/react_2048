import React from 'react';
import "./App.css";
import Layout from './components/Layout/Layout';
import Board from "./containers/Board/Board";

const App = () => {
    return (
        <div className="App">
            <Layout>
                <Board />
            </Layout>
        </div>
    );
};


export default App;