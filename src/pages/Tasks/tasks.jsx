import React from 'react';
import '../dashboard/css/dashboard.css'
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import { useNavigate } from 'react-router-dom';
import { checkIfSignedIn } from '../../Firebase';
import './css/tasks_main.css'

function Tasks() {
    const navigate = useNavigate();
    const addTask = () => {
        navigate('/addTasks');
    };

    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <NavBarComponent />

            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            <div className="forum-content">
                <h2>📝 My Tasks</h2>

                {/* New Post Input */}
                <div className="new-post">
                    <button>Add Task</button>
                </div>

                {/* Discussion List */}
                <div className="forum-posts">
                    
                </div>
            </div>
        </div>
    );
}

export default Tasks;