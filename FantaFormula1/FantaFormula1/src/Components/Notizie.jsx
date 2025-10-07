import React, { useEffect, useState } from "react";

// Funzione helper per calcolare quanto tempo è passato
function timeSince(dateString) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + " anni fa";

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1)
    return interval + " mese" + (interval > 1 ? "i" : "") + " fa";

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + " giorni fa";

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + " ore fa";

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + " minuti fa";

  return "Pochi secondi fa";
}

function Notizie() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q="Formula 1"+OR+F1&language=it&sortBy=publishedAt&apiKey=e2ae0109de144950874a96d53319c148`
        );
        const data = await res.json();

        if (data.articles) {
          // Filtra articoli pertinenti a F1
          const filtered = data.articles.filter(
            (article) =>
              article.title.includes("Formula 1") ||
              article.title.includes("F1") ||
              article.description?.includes("Formula 1") ||
              article.description?.includes("F1")
          );

          // Ordina dalla più recente alla più vecchia
          const sortedArticles = filtered.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );

          setArticles(sortedArticles);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Errore nel fetch delle notizie:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-light py-5">Caricamento notizie...</p>
    );
  }

  if (!articles.length) {
    return (
      <p className="text-center text-light py-5">
        Nessuna notizia disponibile.
      </p>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-light">
        Tutte le Notizie Formula 1
      </h2>
      <div className="row">
        {articles.map((article, index) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm bg-dark text-light rounded-4">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  className="card-img-top rounded-top-4"
                  alt={article.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <small className="text-secondary mb-2">
                  {timeSince(article.publishedAt)}
                </small>
                <p className="card-text">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger mt-auto"
                >
                  Leggi di più
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notizie;
