import React from 'react';
import logo from "../../assets/images/cd_2_icon.png";

function Header() {
  return (
    <header className="App-header">
      <h1>Jammming</h1>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
  );
}

export default Header;
