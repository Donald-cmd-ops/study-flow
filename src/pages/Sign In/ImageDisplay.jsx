import { useState, useEffect } from "react";
import "./css/sign_in.css"; 
import StudyFlowLogo from "../../assets/Study FLOW-2.png";
import { isMobile } from 'react-device-detect';

const ImageDisplay = () => {
    const imageLinks = [
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=3946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1558021211-6d1403321394?q=80&w=2465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1598257006303-031250badbdc?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ];
      
    
    const getRandomImageLink = () => {
        return imageLinks[Math.floor(Math.random() * imageLinks.length)];
    };
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    console.log("Window width-based isMobile:", isMobile);
  
    if (isMobile) return null;
    return (
          <div className="box1" style={{ backgroundImage: `url(${getRandomImageLink()})` }}>
            <div className="hero is-fullheight">
              <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                  <a className="navbar-item" href="https://bulma.io">
                    <i className="fa fa-arrow-left has-text-white"></i>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        
      );
};

export default ImageDisplay;