import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import QueryForm from "./components/Query"; // Ensure you have this page
import Register  from "./components/Register";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  return (
      <Routes>

        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Protect QueryForm Route */}
        {isAuthenticated ? (
          <Route path="/query-form" element={<QueryForm />} />
        ) : (
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        )}
      </Routes>
  );
}

export default App;
