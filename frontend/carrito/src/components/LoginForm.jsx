import { Button, Form } from "react-bootstrap";
import { useState } from "react";


export default function LoginForm({ action }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Form>
            <Form.Group controlId="formBasicUsername" style={{marginBottom: "20px"}}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" style={{marginBottom: "20px"}} value={password} onChange={(e) => {setPassword(e.target.value)}}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingrese su contraseña" />
            </Form.Group>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Button style={{width: "50%"}} variant="primary" onClick={() => {action(username, password)}}>
                    Entrar
                </Button>
            </div>
        </Form>
    );

}