import {React, useEffect, useState} from 'react';
import '../dashboard/css/dashboard.css'
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import { useNavigate } from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from "@syncfusion/ej2-react-schedule";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";

function Logger() {
    const navigate = useNavigate();

    const [retrievedTasks, setRetrievedTasks] = useState([]);

    const eventData = [
        {
          Id: 1,
          Subject: "Meeting",
          StartTime: new Date(2024, 1, 17, 10, 0),
          EndTime: new Date(2024, 1, 17, 12, 0),
        },
        {
          Id: 2,
          Subject: "Conference",
          StartTime: new Date(2024, 1, 18, 9, 0),
          EndTime: new Date(2024, 1, 18, 11, 0),
        },
      ];

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
                <ScheduleComponent
          height="550px"
          eventSettings={{ dataSource: eventData }}
          selectedDate={new Date(2024, 1, 17)}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
                
        </div></div>
    );
}

export default Logger;