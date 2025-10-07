import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Compila tutti i campi per proseguire.");
      return;
    }

    setError("");

    try {
      // Chiama la funzione di login passata da App.jsx
      const user = await onLogin({ email, password });

      // Salva l’utente completo in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Reindirizza alla home
      navigate("/");
    } catch (err) {
      setError("Credenziali non valide.", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card my-5">
        <h1>Accesso Fantaf1</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

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

          <button type="submit" className="btn-login">
            Accedi
          </button>
        </form>

        <div className="login-links mt-3">
          <a href="/forgot">Password dimenticata?</a>
          <span> · </span>
          <a href="/registrazione">Registrati</a>
        </div>
      </div>
    </div>
  );
}
