import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "../App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function NavBar({ user, onLogout }) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" style={{ height: "60px" }}>
      <Container fluid className="bg-dark">
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="p-0">
          <img
            style={{ width: "60px" }}
            src="./src/Components/PNG/LogoF1.png"
            alt="logo f1"
          />
        </Navbar.Brand>
        {/* LOGIN/LOGOUT - sempre visibile accanto al logo, a sinistra dell’hamburger */}
        <div className="ms-3 d-flex align-items-center">
          {user ? (
            <>
              <span className="text-light me-2 d-none d-sm-inline">
                {user.email}
              </span>
              <Button variant="outline-light" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Nav.Link
              as={Link}
              to="/login"
              className="text-secondary link-light"
            >
              <h4 className="m-0">
                <i className="bi bi-person-fill me-4"></i>
              </h4>
            </Nav.Link>
          )}
        </div>

        {/* HAMBURGER */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        {/* COLLAPSE con i link */}
        <Navbar.Collapse
          id="navbarScroll"
          style={{
            position: "relative",
            zIndex: 2000,
            backgroundColor: "#212529",
          }}
        >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "150px" }}
            navbarScroll
          >
            {/* TEAM */}
            <NavDropdown
              title="Team"
              id="team-dropdown"
              style={{ zIndex: 2100 }}
              className="text-secondary"
            >
              <NavDropdown.Item as={Link} to="/squadra">
                La mia squadra
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tsquadre">
                Tutte le squadre
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/classifica">
                Classifica
              </NavDropdown.Item>
            </NavDropdown>

            {/* CLASSIFICA */}
            <NavDropdown
              title="Classifica"
              id="classifica-dropdown"
              style={{ zIndex: 2100 }}
              className="text-secondary"
            >
              <NavDropdown.Item as={Link} to="/piloti">
                Piloti
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/team">
                Costruttori
              </NavDropdown.Item>
            </NavDropdown>

            {/* NOTIZIE */}
            <Nav.Link
              as={Link}
              to="/notizie"
              className="text-secondary link-light"
            >
              Notizie
            </Nav.Link>

            {/* REGOLAMENTO */}
            <Nav.Link
              as={Link}
              to="/regolamento"
              className="text-secondary link-light"
            >
              Regolamento
            </Nav.Link>
          </Nav>

          {/* SEARCH BAR */}
          <Form className="d-flex search-group">
            <Form.Control
              type="search"
              placeholder="Cerca..."
              className="me-2 mb-0 search-bar"
              aria-label="Search"
            />
            <Button variant="outline-danger">Cerca</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
