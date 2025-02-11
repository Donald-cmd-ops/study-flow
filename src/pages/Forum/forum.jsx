import React, { useState, useEffect } from 'react';
import '../dashboard/css/dashboard.css';
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import './css/forum.css'
import { Thread } from '../../classObjects/thread';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase';

function Forum() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Best study techniques?", author: "Alice", replies: 2 },
        { id: 2, title: "How to stay focused while studying?", author: "Bob", replies: 5 }
    ]);

    const [newPost, setNewPost] = useState("");
    const [threadPosts, setThreadsPosted] = useState([]);
    
    const addPost = () => {
        if (newPost.trim() !== "") {
            const newPostObj = { id: posts.length + 1, title: newPost, author: "You", replies: 0 };
            setPosts([...posts, newPostObj]);
            setNewPost("");
        }
    };

    useEffect(() => {
        const q = query(collection(db, "threads"));
      
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const threadList = [];
          querySnapshot.forEach((doc) => {
            //threadList.push(doc.data().name);
            //uid, title, description, replies
            const data = doc.data();
            threadList.push(new Thread(doc.id, data.title, data.description, data.replies, data.author));
          });
          setThreadsPosted(threadList);
          console.log("Current cities in CA: ", threadList);
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
                <h2>📢 StudyFlow Forum</h2>

                {/* New Post Input */}
                <div className="new-post">
                    <input 
                        type="text" 
                        placeholder="Start a discussion..." 
                        value={newPost} 
                        onChange={(e) => setNewPost(e.target.value)} 
                    />
                    <button onClick={addPost}>Post</button>
                </div>

                {/* Discussion List */}
                <div className="forum-posts">
                    {threadPosts.map((thread) => (
                        <div key={thread.uid} className="forum-post">
                            <h3>{thread.title}</h3>
                            <p>Posted by {}</p>
                            <button>View Discussion</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Forum;
