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
                <h2>Welcome to My Website</h2>
                <p>This is the main content area.</p>
            </div>
        </div>
    );
}

export default Dashboard;
