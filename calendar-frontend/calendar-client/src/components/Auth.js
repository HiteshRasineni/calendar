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
    <form onSubmit={handleSubmit}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
      <button type="submit">{isRegister ? "Register" : "Login"}</button>
      <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: "pointer", color: "blue" }}>
        {isRegister ? "Already have an account?" : "New user? Register"}
      </p>
    </form>
  );
};

export default Auth;

