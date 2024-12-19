// frontend/src/App.js
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Ads from "./pages/Ads";
import NavBar from "./components/NavBar";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/ads"
          element={user ? <Ads user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? <Admin /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/ads" />} />
      </Routes>
    </Router>
  );
}

export default App;
