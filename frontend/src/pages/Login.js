import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import du hook useNavigate pour la redirection

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialisation du hook navigate

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setUser({
        username: res.data.user.username,
        email: res.data.user.email,
        id: res.data.user.id,
        role: res.data.user.role,
      });

      // Redirection vers la page des annonces
      navigate("/ads");
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Connexion</h2>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Mot de passe</label>
          <input
            className="form-control"
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>
          Se connecter
        </button>
      </div>
    </div>
  );
}

export default Login;
