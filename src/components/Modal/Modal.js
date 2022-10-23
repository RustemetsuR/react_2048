import React from 'react';
import "./Modal.css";

const Modal = props => {

    return (
        <div
            className="modal"
            style={{
                opacity: !props.modal ? "0" : "1",
                transition: "all 1s",
                visibility: !props.modal ? "hidden" : "visible",
               
            }}>
            <div className="modal__inner">
                <h3 className="modal__title">
                    {props.gameResults === "win" ? "You win!" : "Game over!"}
                </h3>

                <button className="modal__restart" onClick={props.onClick}>
                    Restart
            </button>
            </div>
        </div>
    );
};

export default Modal;