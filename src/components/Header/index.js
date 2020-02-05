import React from 'react';

import './styles.css';
import logo from '../../assets/hostgator-logo.svg';

function Header() {
    return (

        <header id="main-header">
            <img className="logo" src={logo} alt="logo"></img>
        </header>

    )
}

export default Header;