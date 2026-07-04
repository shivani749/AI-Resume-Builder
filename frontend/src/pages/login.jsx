import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8080/api/users/login", {
      email,
      password,
    });
    localStorage.setItem(
      "token",
      response.data.token
    );

    alert("Login Successful");
    navigate("/")
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Welcome Back 👋</h1>
        <p>Login to your AI Resume Builder</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => 
            setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => 
            setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p className="auth-text">
          Don't have an account? <Link to="/signup">Sign Up </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;