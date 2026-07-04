import {useNavigate} from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    alert("Logout clicked");
    localStorage.removeItem("token");
    navigate("/login",{replace: true });
  };
  return (
    <nav className="navbar">
      <h2>AI Resume Builder</h2>
      <button className="logout-btn" 
      onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;