import {React, useEffect, useState} from 'react';
import '../dashboard/css/dashboard.css'
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import { useNavigate } from 'react-router-dom';
import { checkIfSignedIn } from '../../Firebase';
import './css/tasks_main.css'
import { query, collection, onSnapshot, where } from 'firebase/firestore';
import { db, auth } from '../../Firebase';

function Tasks() {
    const navigate = useNavigate();
    const addTask = () => {
        navigate('/tasks/add');
    };
    const [retrievedTasks, setRetrievedTasks] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "tasks"), where("user", "==", auth.currentUser?.uid));
      
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            list.push({
                uid : doc.id,
                user: data.user,
                title: data.title,
                milestone: data.milestone,
                completed: data.completed
            });
          });
          setRetrievedTasks(list);
          console.log("Current cities in CA: ", list);
        });
      
        return () => unsubscribe(); 
      }, []);

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
                    <button onClick={()=>addTask()}>Add Task</button>
                </div>

                {/* Discussion List */}
                <div className="grid-container">

                            
                            {retrievedTasks.map((Task, index) => (
                                <div key={index} className="grid-column">
                                    <div className="post-header">
                                    <h3 className="post-title col-75">{Task.title}</h3>
                                </div>
                            </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Tasks;