import React, { useState } from "react";
import API from "../api";

const Auth = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const path = isRegister ? "/auth/register" : "/auth/login";
    try {
      const res = await API.post(path, { username, password });
      if (!isRegister) {
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
      } else {
        alert("Registered successfully.");
        setIsRegister(false);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">{isRegister ? "Create Account" : "Welcome Back"}</h2>
        
        <div className="form-group">
          <input 
            className="form-input"
            type="text"
            placeholder="Username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            className="form-input"
            type="password"
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button className="form-button" type="submit">
          {isRegister ? "Create Account" : "Sign In"}
        </button>
        
        <p className="auth-switch" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Sign In" : "New user? Create Account"}
        </p>
      </form>
    </div>
  );
};

export default Auth;
