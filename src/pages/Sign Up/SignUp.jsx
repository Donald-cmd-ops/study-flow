import './css/sign_up.css';
import { useState, useEffect } from 'react';
import StudyFlowLogo from "../../assets/Study FLOW-2.png";
import { registerWithEmail, checkIfSignedIn } from "../../Firebase";
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === repeat_password) {
      registerWithEmail(email, password, fullname, navigate);
    }else{
      console.log("Passwords Do Not Match");
    }
    
}
const auth = getAuth();
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigate('/dashboard');
      } 
    });
    return () => unsub();
  },[auth, navigate]);
    return (
        <div className="signup_page">
        <form onSubmit={onSubmit}>
        <div className="login_form">
        <img src={StudyFlowLogo} />
          <h1>Sign Up</h1>

          <div className="input_box">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" placeholder="Enter Full address" onChange={(e) => setFullname(e.target.value)} required />
          </div>

          {/* Email input box */}
          <div className="input_box">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* Password input box */}
          <div className="input_box">
            <div className="password_title">
              <label htmlFor="password">Password</label>
            </div>
            <input type="password" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="input_box">
            <div className="password_title">
              <label htmlFor="repeat_password">Repeat Password</label>
            </div>
            <input type="password" id="repeat_password" placeholder="Repeat password" onChange={(e) => setRepeatPassword(e.target.value)} required />
          </div>
  
          <p style={{ paddingBottom: "20px" }}>
            By creating an account you agree to our{" "}
            <a href="#" style={{ color: "dodgerblue" }}>
              Terms & Privacy
            </a>
            .
          </p>
          <button type="submit" className="signupbtn">
              Sign Up
            </button>
  
          <div className="clearfix">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            
          </div>
        </div>
      </form>
        </div>
      
    );
}
  
export default SignUp;
  
