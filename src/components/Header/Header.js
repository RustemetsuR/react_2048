import React from 'react';
import Container from '../Container/Container';
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <Container>
                <h1 className="header__logo">
                    <a href="https://rustemetsur.github.io/zeon_project_3/">2048</a>
                </h1>
            </Container>
        </div>
    );
};

export default Header;