import React from 'react';
import './css/dashboard.css';
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from './navBarComponent';
import SidebarComponent from './sideBarComponenet';
import { useNavigate } from 'react-router-dom';
import { checkIfSignedIn } from '../../Firebase';

function Dashboard() {
    const navigate = useNavigate();
    checkIfSignedIn(navigate);
    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <NavBarComponent />

            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            <div className="content">
                <h2>Here is a graph of your productivity over the 7 days</h2>
            </div>
        </div>
    );
}

export default Dashboard;
