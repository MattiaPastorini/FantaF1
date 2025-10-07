import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

function Team() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/constructorStandings.json")
      .then((res) => res.json())
      .then((data) => {
        const lists = data.MRData.StandingsTable.StandingsLists;
        if (lists.length > 0) {
          setTeams(lists[0].ConstructorStandings); // prende tutte le scuderie reali
        } else {
          setTeams([]); // stagione non iniziata o dati non disponibili
        }
      })
      .catch((err) => {
        console.error("Errore fetch:", err);
        setTeams([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center text-light py-5">Caricamento team...</p>;
  if (!teams.length)
    return (
      <p className="text-center text-light py-5">
        Nessuna classifica disponibile al momento.
      </p>
    );

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-light">Classifica Costruttori F1</h2>
      <Row className="g-4">
        {teams.map((team, idx) => (
          <Col xs={12} sm={6} lg={4} key={idx}>
            <Card className="h-100 shadow-sm bg-dark text-light rounded-4">
              <Card.Body>
                <Card.Title>{team.Constructor.name}</Card.Title>
                <Card.Text>
                  <strong>Posizione:</strong> {team.position} <br />
                  <strong>Punti:</strong> {team.points} <br />
                  <strong>Vittorie:</strong> {team.wins}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Team;
