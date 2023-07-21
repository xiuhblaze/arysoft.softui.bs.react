import { faBars, faChartPie, faRightFromBracket, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

import escudoArmas from '../../assets/img/lgoEscudoArmas.png';
import { useAuthStore } from "../../hooks/useAuthStore";

export const DefaultNavbar = () => {

  const {
    status,
    user,
    logout,
  } = useAuthStore();

  const onLogout = () => {
    logout();
  };

  return (
    <Container className="position-sticky z-index-sticky top-0">
      <Row>
        <Col>
          <Navbar expand="lg" className="blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
            <Container fluid className="pe-0">
              <Navbar.Brand href="/" className="font-weight-bolder ms-lg-0 ms-3 d-flex align-items-center">
                <img src={ escudoArmas } alt="" className="d-inline-block align-top me-3" height="32" />
                Zapotlán Admin
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll">
                <FontAwesomeIcon icon={ faBars } />
              </Navbar.Toggle>
              <Navbar.Collapse id="navbarScroll">
                <Nav className="mx-auto">
                  { status === 'authenticated' ? (
                    <>
                      <Nav.Link href="/dashboard">
                        <FontAwesomeIcon icon={ faChartPie } className="opacity-6 text-dark me-1" />
                        Dashboard
                      </Nav.Link>
                      <Nav.Link href="/profile">
                        <FontAwesomeIcon icon={ faUser } className="opacity-6 text-dark me-1" />
                        Perfil
                      </Nav.Link>
                    </>
                  ) : null }
                </Nav>
                {
                  status === 'not-authenticated' ? (
                    <Nav>
                      <Nav.Link href="/login">
                        <FontAwesomeIcon icon={ faRightToBracket } className="opacity-6 text-dark me-1" />
                        Iniciar sesión</Nav.Link>
                    </Nav>
                  ) : (
                    <Nav>
                      <Nav.Link onClick={ onLogout }>
                        <FontAwesomeIcon icon={ faRightFromBracket } className="opacity-6 text-dark me-1" />
                        Cerrar sesión
                      </Nav.Link>
                    </Nav>
                  )
                }
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
      </Row>
    </Container>
  )
}

export default DefaultNavbar;
