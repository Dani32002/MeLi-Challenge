import { Button, Form } from "react-bootstrap";
import { useState } from "react";


export default function RegisterForm({ action }) {

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    

    const usernameHandler = (e) => {
        
        setUsernameError(false);
        setUsername(e.target.value);
    }

    const emailHandler = (e) => {
        
        setEmailError(false);
        setEmail(e.target.value);
    }

    const passwordHandler = (e) => {
        
        setPasswordError(false);
        setPassword(e.target.value);
    }

    const checkEverything = () => {
        if (typeof username !== "string" || username.length < 5 || /\s/.test(username) || /\W/.test(username)) {
            setUsernameError(true);
            return false;
        }
        if (typeof password !== "string" || password.length < 8) {
            setPasswordError(true);
            return false;
        }
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (typeof email !== "string" || !emailPattern.test(email)) {
            setEmailError(true);
            return false;
        }
        return true;
    }

    const sendHandler = () => {
        if (checkEverything()) {
            action(username, email, password);
        }
    }


    return (
        <Form>
            <Form.Group controlId="formBasicEmail" style={{marginBottom: "20px"}}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su email" value={email} onChange={emailHandler} isInvalid={emailError} />
                {emailError && <Form.Control.Feedback type="invalid">Email inválido. Recuerde usar el formato apropiado.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group controlId="formBasicUsername" style={{marginBottom: "20px"}}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su username" value={username} onChange={usernameHandler} isInvalid={usernameError} />
                {usernameError && <Form.Control.Feedback type="invalid">Username inválido. Debe tener al menos 5 caracteres y no puede contener espacios ni caracteres especiales.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group controlId="formBasicPassword" style={{marginBottom: "20px"}}  >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingrese su contraseña" value={password} onChange={passwordHandler} isInvalid={passwordError}/>
                {passwordError && <Form.Control.Feedback type="invalid">Contraseña inválida. Debe tener al menos 8 caracteres.</Form.Control.Feedback>}
            </Form.Group>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Button style={{width: "50%"}} variant="primary" onClick={sendHandler} disabled={usernameError || emailError || passwordError}>
                    Registrarse
                </Button>
            </div>
        </Form>
    );

}