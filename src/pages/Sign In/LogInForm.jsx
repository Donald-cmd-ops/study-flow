import { useState, useEffect } from "react";
import "./css/sign_in.css"; 
import { Link, useNavigate } from "react-router-dom";
import StudyFlowLogo from "../../assets/Study FLOW-2.png";
import { isMobile } from "react-device-detect";
import ImageDisplay from "./ImageDisplay";
import { auth, loginWithEmail } from "../../Firebase";

const LoginFormDisplay = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("Window width-based isMobile:", isMobile);

  const onSubmit = async (e) => {
    e.preventDefault();
    loginWithEmail(email, password, navigate);
}

  if (isMobile) {
    return (
      <div className="login_form">
        <img src={StudyFlowLogo} />
        {/* Login form container */}
        <form onSubmit={onSubmit}>
          {/* Email input box */}
          <div className="input_box">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* Password input box */}
          <div className="input_box">
            <div className="password_title">
              <label htmlFor="password">Password</label>
              <a href="#">Forgot Password?</a>
            </div>
            <input type="password" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {/* Login button */}
          <button type="submit">Log In</button>

          <p className="sign_up">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="box2">
      <div className="login_form">
        <img src={StudyFlowLogo} />
        {/* Login form container */}
        <form onSubmit={onSubmit}>
          {/* Email input box */}
          <div className="input_box">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* Password input box */}
          <div className="input_box">
            <div className="password_title">
              <label htmlFor="password">Password</label>
              <a href="#">Forgot Password?</a>
            </div>
            <input type="password" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {/* Login button */}
          <button type="submit">Log In</button>

          <p className="sign_up">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginFormDisplay;
