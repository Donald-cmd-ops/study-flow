import React, { useState, useEffect } from 'react';
import '../dashboard/css/dashboard.css';
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import './css/forum.css'
import { Thread } from '../../classObjects/thread';
import { query, collection, where, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { Link, useNavigate } from 'react-router-dom';

function ForumPost() {

    const [newPost, setNewPost] = useState("");
    const [threadPosts, setThreadsPosted] = useState([]);
    const navigate = useNavigate();
    
    const addPost = async () => {
        if (newPost.trim() !== "") {
            const docRef = await addDoc(collection(db, "threads"), {
                title: newPost,
              });
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
                <h2>Here To Post Your Question</h2>

                {/* New Post Input */}
                <div className="new-post">
                    <button type="submit" onClick={addPost}>Post</button>
                </div>

            </div>
        </div>
    );
}

export default ForumPost;
