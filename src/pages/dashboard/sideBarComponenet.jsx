import React from 'react';
import './css/dashboard.css';
import studyFlowImage from '../../assets/Study FLOW-3.png';
import { Link } from "react-router-dom";

const SidebarComponent = () => {
    return (
        <div className="sidebar">
                <Link to="/dashboard">Home</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/quizzlets">Quizzlets</Link>
                <Link to="/forum">Forum</Link>
            </div>
    );
  };
  
  export default SidebarComponent;