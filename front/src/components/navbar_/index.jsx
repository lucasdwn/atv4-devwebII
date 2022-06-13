import { Navbar, Container, Nav } from 'react-bootstrap'
function NavBar_() {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Atividade 4</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/cadastrar_pedido">Pedidos</Nav.Link>
                    <Nav.Link href="/cadastrar_cliente">Clientes</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar_;