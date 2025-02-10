import React from 'react';
import './css/dashboard.css';
import studyFlowImage from '../../assets/Study FLOW-3.png';

const NavBarComponent = () => {
    return (
        <div className="topbar">
        <img src={studyFlowImage} />
        <a className="right_top">Logout</a>
    </div>
    );
  };
  
  export default NavBarComponent;