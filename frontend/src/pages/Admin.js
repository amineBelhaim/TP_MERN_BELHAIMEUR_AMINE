// frontend/src/pages/Admin.js
import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la récupération des utilisateurs");
      }
    };
    fetchUsers();
  }, [token]);

  const deleteUser = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?"))
      return;
    try {
      await axios.delete(`http://127.0.0.1:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
      alert("Utilisateur supprimé avec succès");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Administration - Gestion des Utilisateurs</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
