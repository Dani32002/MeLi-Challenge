import LoginForm from "../components/LoginForm";
import { Card } from "react-bootstrap";
import { useContext } from "react";
import { AppStateContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const { setUser } = useContext(AppStateContext);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    const action = async (username, password) => {
        fetch("http://" + apiUrl + ":5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password_hash: password })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.msg) {
                setUser(data);
                alert("Login exitoso!");
                navigate("/");
            } else {
                alert("Error en el login!");
            }
        })
    
    }

    return (
        <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", padding: "30px"}}>
            <Card style={{ width: "30%", height: "50%", padding: "40px", display: "flex", justifyContent: "center"}}>
                <Card.Title style={{textAlign: "center"}}>Ingrese a su cuenta</Card.Title>
                <Card.Body style={{justifyContent: "center"}}>
                    <LoginForm action={action}/>
                </Card.Body>
            </Card>
        </div>
    );
}