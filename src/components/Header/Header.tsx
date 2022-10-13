import './Header.scss';
import logo from '../../images/logo.svg';
import { AnchorLink } from '../AnchorLink/AnchorLink';
import React from 'react';

export const Header:React.FC = React.memo(() => {
  return (
    <header className="Header" id="header">
      <div className="HeaderContainer">
          <div className="Header__logo">
            <img src={logo} alt="Logo" />
          </div> 
        
        <nav className='Header__nav'>
            <AnchorLink href={"#UserList"}>
              Users
            </AnchorLink>

            <AnchorLink href={"#NewUser"}>
              Sign up
            </AnchorLink>
        </nav>
      </div>
    </header>
  )}
)
