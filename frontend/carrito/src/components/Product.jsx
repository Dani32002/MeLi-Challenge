import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useState, useContext } from "react";
import { AppStateContext } from "../App";
import { useNavigate } from "react-router-dom";


export default function Product({ product, allowCart }) {

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    }

    const { user, setUser } = useContext(AppStateContext);

    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;


    const handleAddToCart = () => { 
        fetch(`http://` + apiUrl + `:5000/api/users/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ cantidad: parseInt(quantity), id_producto: product.id })
        })
        .then(response => response.json())
        .then((data) => {
            if (!data.msg) {
                alert("Producto agregado al carrito!");
            } else {
                alert(data.msg);
                if (data.msg === "El token es invalido o no se encuentra en la petición") {
                    setUser(null);
                    navigate("/");
                }
            }
        })
    }

    return (
        <Card style={{ width: '18rem', height: '20rem' }}>
            <Card.Img variant="top" src={product.imagen_path} alt={product.nombre} style={{width: "100%", height: "50%", objectFit: "contain", padding: "5%"}}/>
            <Card.Body>
                <Card.Title style={{ width: '100%', textAlign: 'center' }}>
                    {product.nombre}
                </Card.Title>
                <div style={{margin: "5px"}}>
                    <Row>
                        <Col xs={6} style={{textAlign: "left"}}><   strong>Precio:</strong> ${product.precio}</Col>
                        <Col xs={6} style={{textAlign: "right"}}><strong>Stock:</strong> {product.stock}</Col>
                    </Row>                    
                </div>
                <Form style={{width: "100%", textAlign: "center"}}>
                    <Form.Select onChange={handleQuantityChange} disabled={!allowCart} style={{width: "50%", margin: "0 auto"}}>
                        { 
                            [...Array(product.stock).keys()].map((i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            ))
                        }
                    </Form.Select>
                    <Button variant="primary" onClick={handleAddToCart} disabled = {!allowCart} style={{marginTop: "10px"}}>
                        Agregar al carrito
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}