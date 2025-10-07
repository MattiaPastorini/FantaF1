import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

// Componenti
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import Notizie from "./Components/Notizie";
import Team from "./Components/Team";
import Piloti from "./Components/Piloti";
import Regolamento from "./Components/Regolamento";
import Login from "./Components/Login";
import Registrazione from "./Components/Registrazione";

function App() {
  const [user, setUser] = useState(null);

  // Carica utente da localStorage all'avvio
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login
  const handleLogin = ({ email, password }) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        setUser(parsedUser);
        return Promise.resolve(parsedUser);
      }
    }
    return Promise.reject("Credenziali non valide");
  };

  // Registrazione
  const handleRegister = ({ name, email, password }) => {
    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="app-wrapper">
        <NavBar user={user} onLogout={handleLogout} />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notizie" element={<Notizie />} />
            <Route path="/team" element={<Team />} />
            <Route path="/piloti" element={<Piloti />} />
            <Route path="/regolamento" element={<Regolamento />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/registrazione"
              element={<Registrazione onRegister={handleRegister} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
