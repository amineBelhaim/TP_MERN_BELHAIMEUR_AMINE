// frontend/src/pages/Profile.js
import { useState, useEffect } from "react";
import axios from "axios";

function Profile({ user, setUser }) {
  const token = localStorage.getItem("token");

  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, [token]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        "http://127.0.0.1:5000/api/user/me",
        { username, email, password: password || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Informations mises à jour !");
      setUser({ ...user, username, email });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour des informations");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer votre compte ?"))
      return;
    try {
      await axios.delete("http://127.0.0.1:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Compte supprimé");
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/register";
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression du compte");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2>Mon Profil</h2>
        <div className="mb-3">
          <label>Username:</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Nouveau mot de passe (optionnel):</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mr-2" onClick={handleUpdate}>
          Mettre à jour
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}

export default Profile;
