import { useState, useEffect } from "react";
import "./css/sign_in.css"; 
import StudyFlowLogo from "../../assets/Study FLOW-2.png";
import { isMobile } from 'react-device-detect';
import ImageDisplay from "./ImageDisplay";
import LoginFormDisplay from "./LogInForm";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function SignIn() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();


    const auth = getAuth();
    useEffect(()=>{
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid);
          navigate('/dashboard');
        } else {
          console.log('User is not yet signed in');
          navigate('/');
        }
      });
      return () => unsub();
    },[auth, navigate]);


  return (
    <div className="main">
      <ImageDisplay />

      <LoginFormDisplay />
    </div>
  );
}

export default SignIn;

  