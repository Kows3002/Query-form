import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

function Register({ setIsAuthenticated }) {
  const [name, setname] = useState("");
  const [Email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Allowed users
  const validUsers = {
    kows: "kows@123",
    jeev: "jeev@123"
  };

  const handleRegister = () => {
    if (validUsers[name] && validUsers[name] === password) {
      setIsAuthenticated(true);
      localStorage.setItem("auth", "true"); // Store authentication state
      localStorage.setItem("name", name); // Store logged-in username
      navigate("/login-form"); // Redirect to query form
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Email"
        value={Email}
        onChange={(e) => setemail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Confirmpassword"
        value={Confirmpassword}
        onChange={(e) => setConfirmpassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleRegister} className="add-button">Submit</button>
    </div>
  );
}

// Define PropTypes
Register.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Register; 