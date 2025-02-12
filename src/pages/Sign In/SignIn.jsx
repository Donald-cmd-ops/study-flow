import { useState } from "react";
import "./css/sign_in.css"; 
import StudyFlowLogo from "../../assets/Study FLOW-2.png";
import { isMobile } from 'react-device-detect';
import ImageDisplay from "./ImageDisplay";
import LoginFormDisplay from "./LogInForm";
import { checkIfSignedIn } from "../../Firebase";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  checkIfSignedIn(navigate);

  return (
    <div className="main">
      <ImageDisplay />

      <LoginFormDisplay />
    </div>
  );
}

export default SignIn;

  