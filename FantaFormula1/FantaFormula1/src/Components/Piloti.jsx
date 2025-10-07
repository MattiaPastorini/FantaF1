import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

// Immagini illustrative dei piloti (mettere in public/drivers/)
const driverImages = {
  Hamilton: "/drivers/hamilton.png",
  Verstappen: "/drivers/verstappen.png",
  Leclerc: "/drivers/leclerc.png",
  Sainz: "/drivers/sainz.png",
  Russell: "/drivers/russell.png",
  Perez: "/drivers/perez.png",
  Alonso: "/drivers/alonso.png",
  Bottas: "/drivers/bottas.png",
  Gasly: "/drivers/gasly.png",
  Stroll: "/drivers/stroll.png",
};

function Piloti() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/driverStandings.json")
      .then((res) => res.json())
      .then((data) => {
        const lists = data.MRData.StandingsTable.StandingsLists;
        if (lists.length > 0) {
          setDrivers(lists[0].DriverStandings);
        } else {
          setDrivers([]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center text-light py-5">Caricamento piloti...</p>;
  if (!drivers.length)
    return (
      <p className="text-center text-light py-5">
        Nessuna classifica disponibile al momento.
      </p>
    );

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-light">Classifica Piloti F1</h2>
      <Row className="g-4">
        {drivers.map((driver, idx) => (
          <Col xs={12} sm={6} lg={4} key={idx}>
            <Card className="h-100 shadow-sm bg-dark text-light rounded-4">
              {driverImages[driver.Driver.familyName] && (
                <Card.Img
                  variant="top"
                  src={driverImages[driver.Driver.familyName]}
                  style={{ objectFit: "cover", height: "200px" }}
                  className="rounded-top-4"
                  alt={driver.Driver.givenName}
                />
              )}
              <Card.Body>
                <Card.Title>
                  {driver.Driver.givenName} {driver.Driver.familyName}
                </Card.Title>
                <Card.Text>
                  <strong>Team:</strong> {driver.Constructors[0].name} <br />
                  <strong>Posizione:</strong> {driver.position} <br />
                  <strong>Punti:</strong> {driver.points} <br />
                  <strong>Vittorie:</strong> {driver.wins}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Piloti;
