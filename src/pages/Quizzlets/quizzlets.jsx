import React from 'react';
import '../dashboard/css/dashboard.css'
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import { checkIfSignedIn } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

function Quizzlets() {
    const navigate = useNavigate();
    checkIfSignedIn(navigate);
    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <NavBarComponent />

            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            
        </div>
    );
}

export default Quizzlets;
