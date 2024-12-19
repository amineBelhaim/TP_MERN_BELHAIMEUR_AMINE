// frontend/src/pages/Register.js
import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/api/auth/register", {
        username,
        email,
        password,
      });
      alert("Inscription réussie, vous pouvez vous connecter.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2>Inscription</h2>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Mot de passe</label>
          <input
            className="form-control"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-success" onClick={handleRegister}>
          S'inscrire
        </button>
      </div>
    </div>
  );
}

export default Register;
