import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot,  updateDoc, arrayUnion, getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import NavBarComponent from '../dashboard/navBarComponent';
import SidebarComponent from '../dashboard/sideBarComponenet';
import { getAuth } from 'firebase/auth';
import './css/forum.css'
import './css/post.css'

const Discussion = () => {
  const { threadID } = useParams();  
  const [retrievedThread, setRetrievedThread] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);  
  const [comment, setComment] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const auth = getAuth();

  const getUserName = async (userID) => {
    try{
        const q = query(collection(db, "users"), where("user_id", "==", userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data().fullname);
        setUserFullName(doc.data().fullname);
    });
    }catch (error){
        console.error("Error fetching user name:", error);
    }
    
  };

  useEffect(() => {
    if (!threadID) {
      console.log("No threadID found in the URL");
      return;  
    }

    if (auth.currentUser) {
        getUserName(auth.currentUser.uid);
      } else {
        setIsLoading(true); 
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
  }, [threadID, auth.currentUser.uid]);  
  
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
        <h2 style={{ marginBottom: '15px' }}>{retrievedThread.title}</h2>
        <p style={{ marginTop: '10px', marginBottom: '15px' }}>{retrievedThread.description}</p>

        {/* Replies Section */}
        <div className="container">
            

            {/* New Reply Input */}
            <div className="new-post">
                <input placeholder="Enter Reply Here" value={comment} 
                                    onChange={(e) => setComment(e.target.value)}/>
                <button onClick={()=> addComment()}>Post</button>
            </div>

            <h3>Replies</h3>

            {retrievedThread.replies.map((comment, index) => (
                        <p key={index}>{comment}</p>
                    ))}

            {/* Other Comments */}
        </div>
    </div>            
</div>

  );
};

export default Discussion;
