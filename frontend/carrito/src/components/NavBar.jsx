import { Navbar, Nav, Container } from 'react-bootstrap';
import { MdShoppingCart } from 'react-icons/md';
import { useContext } from 'react';
import { AppStateContext } from '../App';
import { useNavigate } from "react-router-dom";

export default function NavBar() {

    const { user, setUser } = useContext(AppStateContext);

    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <div onClick={() => navigate("/")} style={{color: "white", cursor: "pointer", display: "flex", alignItems: "center", fontWeight: "bold", marginRight: "10px"}}>
                <MdShoppingCart size={30} color='white'/>{" "}
                MeLi Challenge
            </div>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate("/")}>Productos</Nav.Link>
                    {user ? 
                        <>
                            <Nav.Link onClick={() => navigate("/user")}>Carrito</Nav.Link>
                            <Nav.Link onClick={() => { navigate("/"); setUser(null);  }}>Logout</Nav.Link>
                        </>
                        : 
                        <>
                            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                            <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}