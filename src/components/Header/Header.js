import React from 'react';
import Container from '../Container/Container';
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <Container>
                    <h1 className="header__logo"><a href="#">2048</a></h1>
            </Container>
        </div>
    );
};

export default Header;