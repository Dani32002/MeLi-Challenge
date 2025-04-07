import { Card } from "react-bootstrap";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;


    const action = async (username, email, password) => {

        fetch("http://" + apiUrl + ":5000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.msg && data !== "Internal Server Error") {
                alert("Registro exitoso, inicie sesión!");
                navigate("/login");
            } else {
                alert(data.msg || data);
            }
        })
        
    }

    return (
        <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", padding: "30px"}}>
            <Card style={{ width: "30%", height: "70%", padding: "40px", display: "flex", justifyContent: "center"}}>
                <Card.Title style={{textAlign: "center"}}>Registro</Card.Title>
                <Card.Body style={{justifyContent: "center"}}>
                    <RegisterForm action={action}/>
                </Card.Body>
            </Card>
        </div>
    );
}