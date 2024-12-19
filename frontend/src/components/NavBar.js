// frontend/src/components/NavBar.js
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/ads">
        Le Bon Coin Clone
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse" // Utilisez data-bs-* pour Bootstrap 5
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {" "}
          {/* Bootstrap 5 : ml-auto => ms-auto */}
          {/* Bouton "Annonces" */}
          <li className="nav-item">
            <Link className="nav-link" to="/ads">
              Annonces
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">
                  Bonjour, {user.username} ({user.role})
                </span>
              </li>
              {user.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Mon Profil
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Connexion
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Inscription
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
