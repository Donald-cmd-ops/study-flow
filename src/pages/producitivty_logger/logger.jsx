import {React, useEffect, useState} from 'react';
import '../dashboard/css/dashboard.css'
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import { useNavigate } from 'react-router-dom';

function Logger() {
    const navigate = useNavigate();

    const [retrievedTasks, setRetrievedTasks] = useState([]);


    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <NavBarComponent />

            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            <div className="forum-content">
                <h2>🗂️ Productivity Logger</h2>

                {/* New Post Input */}
                <div className="new-post">
                    <button onClick={()=>addTask()}>Edit Weekly Schedule</button>
                </div>

                {/* Discussion List */}
                
        </div></div>
    );
}

export default Logger;