import React, { useEffect, useState } from "react";
import { query, collection, addDoc, where, getDocs } from "firebase/firestore";
import { db, checkIfSignedIn,auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import "../dashboard/css/dashboard.css";
import "./css/forum.css";
import "./css/post.css";
import NavBarComponent from "../dashboard/navBarComponent";
import SidebarComponent from "../dashboard/sideBarComponenet";

function ForumPost() {
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostDescription, setNewPostDescription] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("australia");
    const [subject, setSubject] = useState("");
    const [userName, setUserFullName] = useState("");
    const navigate = useNavigate();

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

    useEffect(()=>{
        if(auth.currentUser){
            getUserName(auth.currentUser.uid);
        }
        
    },[auth.currentUser]);


    const addPost = async () => {
        if (newPostTitle.trim() !== "" && newPostDescription.trim() !== "") {
            try {
                await addDoc(collection(db, "threads"), {
                    title: newPostTitle,
                    description: newPostDescription,
                    replies: [],
                    author : userName
                });
                setNewPost(""); // Clear input after posting
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
        navigate('/forum');
    };

    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <NavBarComponent />

            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            <div className="forum-content">
                <h2>Here To Make A Post</h2>

                {/* Form Input Section */}
                <div className="container">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="postTitle">Title</label>
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
                            <div className="col-25">
                                <label htmlFor="postDescription">Details</label>
                            </div>
                            <div className="col-75">
                                <textarea 
                                    id="postDescription" 
                                    placeholder="Enter Post Details Here.." 
                                    style={{ height: "200px" }} 
                                    value={newPostDescription} 
                                    onChange={(e) => setNewPostDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <br />
                    </form>
                    <div className="new-post">
                    <button type="submit" onClick={addPost}>Post</button>
                </div>
                </div>

                {/* New Post Input */}
                
            </div>
        </div>
    );
}

export default ForumPost;
