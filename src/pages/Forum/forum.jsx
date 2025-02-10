import React, { useState } from 'react';
import '../dashboard/css/dashboard.css';
import studyFlowImage from '../../assets/Study FLOW-3.png';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import './css/forum.css'

function Forum() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Best study techniques?", author: "Alice", replies: 2 },
        { id: 2, title: "How to stay focused while studying?", author: "Bob", replies: 5 }
    ]);

    const [newPost, setNewPost] = useState("");
    
    const addPost = () => {
        if (newPost.trim() !== "") {
            const newPostObj = { id: posts.length + 1, title: newPost, author: "You", replies: 0 };
            setPosts([...posts, newPostObj]);
            setNewPost("");
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
                    {posts.map((post) => (
                        <div key={post.id} className="forum-post">
                            <h3>{post.title}</h3>
                            <p>By {post.author} • {post.replies} replies</p>
                            <button>View Discussion</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Forum;
