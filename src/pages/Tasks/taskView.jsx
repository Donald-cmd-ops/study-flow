import React, { useState, useEffect } from "react";
import { query, collection, addDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, checkIfSignedIn } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import "../dashboard/css/dashboard.css";
import "../dashboard/css/dashboard.css";
import studyFlowImage from "../../assets/Study FLOW-3.png";
import NavBarComponent from "../dashboard/navBarComponent";
import SidebarComponent from "../dashboard/sideBarComponenet";
import "./css/tasks_main.css";
import "./css/add_task.css";
import { auth } from "../../Firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import './css/checkBox.css';

const TaskView = () => {
  const { taskID } = useParams();  
  const [retrievedTask, setRetrievedTask] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);  
  const [comment, setComment] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const auth = getAuth();

  const updateCompleted = () => {
      const taskDocRef = doc(db, 'tasks', taskID);
      updateDoc(taskDocRef, {completed : retrievedTask.completed}).then(() => setComment(""))
      .catch((error) => console.error("Comment unable to be added successfully", error));
    };

  useEffect(() => {
    if (!taskID) {
      console.log("No threadID found in the URL");
      return;  
    }

    const taskRef = doc(db, "tasks", taskID); 

    const unsub = onSnapshot(taskRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();  
        setRetrievedTask({id: docSnapshot.id,
            user: data.user,  // Store the user ID
            title: data.title,
            milestone: data.milestone,  // Retrieve the milestones
            completed: data.completed});
      } else {
        console.log("No such thread!");
      }
      setIsLoading(false);  
    });
    return () => unsub();  
  }, [taskID]);  
  
  const addComment = () => {
    const threadDocRef = doc(db, 'threads', threadID);
    updateDoc(threadDocRef, {replies : arrayUnion(userFullName+" : "+comment)}).then(() => setComment(""))
    .catch((error) => console.error("Comment unable to be added successfully", error));
  };


  if (isLoading) {
    return <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <NavBarComponent />

            {/* Sidebar */}
            <SidebarComponent />
            <div className="forum-content">
                <h2>Loading</h2>
            </div>

            
        </div>;
  }

  return (
    <div className="dashboard-container">
    {/* Top Navigation Bar */}
    <NavBarComponent />

    {/* Sidebar */}
    <SidebarComponent />

    {/* Main Content */}
    <div className="forum-content">
        <h2 style={{ marginBottom: '15px' }}>{retrievedTask.title}</h2>
        {retrievedTask.milestone.map((milestone, index) => (
                                <label key={index} class="checkbox-container" 
                                    onChange={()=>{
                                    const updatedMilestones = [...retrievedTask.completed]; 
                                    if (updatedMilestones[index]==false){
                                        updatedMilestones[index] = true
                                    } else{
                                        updatedMilestones[index] = false
                                    }
                                            
                                            retrievedTask.completed = updatedMilestones
                                            console.log(retrievedTask.completed)
                                            updateCompleted()
                                }
                                    
                                }>{milestone}
                                <input checked={retrievedTask.completed[index]} type="checkbox"/>
                                <span class="checkmark"></span>
                              </label>
                    ))}

    </div>            
</div>

  );
};

export default TaskView;
