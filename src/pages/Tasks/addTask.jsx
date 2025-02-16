import React, { useState } from "react";
import { query, collection, addDoc } from "firebase/firestore";
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
import { onAuthStateChanged } from "firebase/auth";
import DatePicker from "react-datepicker";

function AddTask() {
    const today = new Date().toISOString().split("T")[0];
    const [pickedDate, setPickedDate] = useState(today);



    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostDescription, setNewPostDescription] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("australia");
    const [subject, setSubject] = useState("");
    const [addedMilestones, setMilestones] = useState([]);
    const [newMilestone, setNewMilestone] = useState("");
    const navigate = useNavigate();

    const addMilestone = () => {
        if(newMilestone.trim() != "") {
            setMilestones([...addedMilestones, newMilestone]); 
            setNewMilestone("");
        }
    };
    
    const addTask = async () => {
        if(newPostTitle.trim() != "") {
            try {
                await addDoc(collection(db, "tasks"), {
                    user: auth.currentUser.uid,
                    title: newPostTitle,
                    milestone: addedMilestones,
                    completed: Array(addedMilestones.length).fill(false),
                    dueDate : pickedDate
                });
                    setNewPost(""); 
                } catch (error) {
                    console.error("Error adding document: ", error);
                }
            navigate("/tasks");
        }else{
            console.log("Error occured");
        }
    };

    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <NavBarComponent />

            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            <div className="forum-content">
                <h2>Here To Add Task</h2>

                {/* Form Input Section */}
                <div className="container">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="postTitle">Main Task</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    id="postTitle"
                                    placeholder="Enter Task Name"
                                    value={newPostTitle}
                                    onChange={(e) => setNewPostTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                        <div className="col-25">
                                <label htmlFor="duedate">Due Date</label>
                            </div>
                            {/*date picker here*/}
                            <input className='col-75' type="date" id="duedate" name="duedate" value={pickedDate} onChange={(e) => setPickedDate(e.target.value)} />
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="postDescription">Add Milestones</label>
                            </div>
                            <div className="col-50">
                            <input
                                    type="text"
                                    id="postTitle"
                                    placeholder="Enter Milestone"
                                    value={newMilestone}
                                    onChange={(e) => setNewMilestone(e.target.value)}
                                />
                            </div>

                            <div className="col-25">
                                <button onClick={addMilestone}>Add</button>
                            </div>
                        </div>

                        

                        {/* Sample Forum Post */}
                        <div className="forum-post">
                            
                            {addedMilestones.map((milestone, index) => (
                                <div key={index} className="forum-post">
                                    <div className="post-header">
                                    <h3 className="post-title col-75">{milestone}</h3>
                                    <button className="remove-btn col-25" aria-label="Remove post" onClick={() => {
                                        setMilestones((prevMilestones) => {
                                            const updatedMilestones = [...prevMilestones]; 
                                            updatedMilestones.splice(index, 1); 
                                            return updatedMilestones; 
                                        });
                                    }}>
                                        ❌ Remove
                                    </button>
                                </div>
                            </div>
                    ))}
                        </div>
                    </form>

                    {/* Post Button */}
                    <div className="new-post">
                        <button type="submit" onClick={()=>addTask()}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
