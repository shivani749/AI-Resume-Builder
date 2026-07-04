import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
function Signup() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:8080/api/users/signup", {
      name,
      email,
      password,
    });

    alert("Signup Successful");
    navigate("/login");
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Signup Failed");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Create Account ✨</h1>
        <p>Join AI Resume Builder and start your career journey</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => 
            setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => 
            setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => 
            setPassword(e.target.value)}
          />


          <button type="submit">
            Sign Up
          </button>
        </form>

        <p className="auth-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;