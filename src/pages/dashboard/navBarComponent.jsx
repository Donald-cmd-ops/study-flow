import React from 'react';
import './css/dashboard.css';
import studyFlowImage from '../../assets/Study FLOW-3.png';
import { logout } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

const NavBarComponent = () => {
    const navigate = useNavigate();
    const logoutAction = () => {
        logout();
        navigate('/');
    };
    return (
        <div className="topbar">
        <img src={studyFlowImage} />
        <a className="right_top" onClick={() => logoutAction()}>Logout</a>
    </div>
    );
  };
  
  export default NavBarComponent;