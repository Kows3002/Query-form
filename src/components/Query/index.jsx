import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Import menu icon
import Navbar from '../Navbar';
import './index.css';
function QueryForm() {
  const [queries, setQueries] = useState(() => {
    const savedQueries = localStorage.getItem("queries");
    return savedQueries ? JSON.parse(savedQueries) : [];
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("queries", JSON.stringify(queries));
  }, [queries]);

  const handleAddOrUpdate = () => {
    if (!name.trim() || !email.trim() || !query.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    setError(""); // Clear error message

    const newEntry = {
      id: editId || Date.now(),
      name: name.trim(),
      email: email.trim(),
      query: query.trim(),
      date: new Date().toLocaleString(),
    };

    if (editId) {
      setQueries(queries.map((q) => (q.id === editId ? newEntry : q)));
      setEditId(null);
    } else {
      setQueries([newEntry, ...queries]);
    }

    setName("");
    setEmail("");
    setQuery("");
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setEmail(item.email);
    setQuery(item.query);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      setQueries(queries.filter((q) => q.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <>
    <Navbar />
    <div className="container">

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-field"
      />

      <button onClick={handleAddOrUpdate} className="add-button">
        {editId ? "Update Query" : "Add Query"}
      </button>

      {/* Query Table */}
      <table className="query-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Query</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((q) => (
            <tr key={q.id}>
              <td>{q.name}</td>
              <td>{q.email}</td>
              <td>{q.query}</td>
              <td>{q.date}</td>
              <td className="action-buttons">
                <button className="edit-button" onClick={() => handleEdit(q)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(q.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default QueryForm;
