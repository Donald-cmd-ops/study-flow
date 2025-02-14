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

function AddTask() {
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostDescription, setNewPostDescription] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("australia");
    const [subject, setSubject] = useState("");
    const [addedMilestones, setMilestones] = useState([]);
    const navigate = useNavigate();

    const addMilestone = () => {
        setMilestones([...addedMilestones, "Grapes"]); 
    };
    
    const addTask = async () => {
        navigate("/tasks/add");
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
                                    placeholder="Enter Title"
                                    value={newPostTitle}
                                    onChange={(e) => setNewPostTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-75">
                                <label htmlFor="postDescription">Add Milestones</label>
                            </div>
                            <div className="col-25">
                                <button onClick={addMilestone}>Add</button>
                            </div>
                        </div>

                        {/* Sample Forum Post */}
                        <div className="forum-post">
                            <div className="post-header">
                                <h3 className="post-title col-75">How to Learn JavaScript?</h3>
                                <button className="remove-btn col-25" aria-label="Remove post">
                                    ❌ Remove
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Post Button */}
                    <div className="new-post">
                        <button type="submit">Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
