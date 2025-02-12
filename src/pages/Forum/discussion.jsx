import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import './css/forum.css'
import './css/post.css'

const Discussion = () => {
  const { threadID } = useParams();  
  const [retrievedThread, setRetrievedThread] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    if (!threadID) {
      console.log("No threadID found in the URL");
      return;  
    }

    const threadRef = doc(db, "threads", threadID); 

    const unsub = onSnapshot(threadRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();  
        setRetrievedThread({id: docSnapshot.id,title: data.title,description: data.description,replies: data.replies,author: data.author});
      } else {
        console.log("No such thread!");
      }
      setIsLoading(false);  
    });
    return () => unsub();  
  }, [threadID]);  


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
        <h2 style={{ marginBottom: '15px' }}>{retrievedThread.title}</h2>
        <p style={{ marginTop: '10px', marginBottom: '15px' }}>{retrievedThread.description}</p>

        {/* Replies Section */}
        <div className="container">
            <h3>Replies</h3>

            {/* New Reply Input */}
            <div className="new-post">
                <input placeholder="Enter Reply Here" />
                <button>Post</button>
            </div>
            {/* Other Comments */}
        </div>
    </div>            
</div>

  );
};

export default Discussion;
