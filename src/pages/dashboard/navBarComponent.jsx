import React from 'react';
import './css/dashboard.css';
import studyFlowImage from '../../assets/Study FLOW-3.png';
import { logout } from '../../Firebase';

const NavBarComponent = () => {
    return (
        <div className="topbar">
        <img src={studyFlowImage} />
        <a className="right_top" onClick={() => logout()}>Logout</a>
    </div>
    );
  };
  
  export default NavBarComponent;