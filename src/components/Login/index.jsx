import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Allowed users
  const validUsers = {
    kows: "kows@123",
    jeev: "jeev@123"
  };

  const handleLogin = () => {
    if (validUsers[username] && validUsers[username] === password) {
      setIsAuthenticated(true);
      localStorage.setItem("auth", "true"); // Store authentication state
      localStorage.setItem("username", username); // Store logged-in username
      navigate("/query-form"); // Redirect to query form
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="add-button">Login</button>
    </div>
  );
}

// Define PropTypes
Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login; 