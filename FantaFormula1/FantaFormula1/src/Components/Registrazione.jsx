import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Registrazione({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Compila tutti i campi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }

    setError("");

    try {
      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));

      if (onRegister) onRegister(user);

      navigate("/");
    } catch (err) {
      setError("Errore durante la registrazione.", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card my-5">
        <h1>Registrazione Fantaf1</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <label htmlFor="name">Nome Utente</label>
          <input
            type="text"
            id="name"
            placeholder="Il tuo nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="nome@esempio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">Conferma Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-login">
            Registrati
          </button>
        </form>

        <div className="login-links">
          <span>Hai già un account? </span>
          <a href="/login">Accedi</a>
        </div>
      </div>
    </div>
  );
}
export default Registrazione;
