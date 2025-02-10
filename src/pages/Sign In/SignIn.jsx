import { useState } from "react";
import "./css/sign_in.css"; 
import StudyFlowLogo from "../../assets/Study FLOW-2.png";
import { isMobile } from 'react-device-detect';
import ImageDisplay from "./ImageDisplay";
import LoginFormDisplay from "./LogInForm";


function SignIn() {
  const [count, setCount] = useState(0);

  

  return (
    <div className="main">
      <ImageDisplay />

      <LoginFormDisplay />
    </div>
  );
}

export default SignIn;

  