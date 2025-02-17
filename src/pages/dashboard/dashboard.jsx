import React, { useEffect, useState } from 'react';
import './css/dashboard.css';
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from './navBarComponent';
import SidebarComponent from './sideBarComponenet';
import { useNavigate } from 'react-router-dom';
import { checkIfSignedIn, db, auth } from '../../Firebase';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from "@syncfusion/ej2-react-schedule";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import { query, collection, where, onSnapshot } from 'firebase/firestore';

function Dashboard() {
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "tasks"), where("user", "==", auth.currentUser?.uid));
      
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            list.push({
                Id : doc.id,
                Subject: data.title,
                StartTime: new Date(data.dueDate),
                EndTime: new Date(data.dueDate)
            });
          });
          setEventData(list);
          console.log("Current cities in CA: ", list);
        });
      
        return () => unsubscribe(); 
      }, []);
    const navigate = useNavigate();
    checkIfSignedIn(navigate);
    
    {/*}
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
      ]; */}
    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <NavBarComponent />

            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            <div className="content">
                <h2>Here is a calendar of your sechdule</h2>
                <ScheduleComponent
                          height="550px"
                          eventSettings={{ dataSource: eventData }}
                          selectedDate={new Date()}
                        >
                          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                        </ScheduleComponent>
            </div>
        </div>
    );
}

export default Dashboard;
