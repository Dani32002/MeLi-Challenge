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
            if (!data.msg && data !== "Internal Server Error") {
                alert("Producto agregado al carrito!");
            } else {
                if (data.msg === "El token es invalido o no se encuentra en la petición") {
                    alert(data.msg || data);
                    setUser(null);
                    navigate("/");
                } else if (data.msg.includes("El producto ya esta en el cart")) {
                    alert("Actualizando el producto en el cart");
                    handleUpdate(data.msg.split(":")[1])
                } else {
                    alert(data.msg || data);
                }
            }
        })
    }

    const handleUpdate = (id_item) => {

        const newQuantity = parseInt(quantity);

        fetch(`http://` + apiUrl + `:5000/api/users/cart/${id_item}`, { 
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ cantidad: parseInt(newQuantity) })
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((data) => {
                    alert(data.msg || data);
                    if (data.msg === "El token es invalido o no se encuentra en la petición") {
                        setUser(null);
                        navigate("/");
                    }
                })
            } else {
                alert("Cantidad actualizada!");
            }
        })
    }

    return (
        <Card style={{ width: '18rem', height: allowCart? '22rem': '15rem' }}>
            <Card.Img variant="top" src={product.imagen_path} alt={product.nombre} style={{width: "100%", height: "50%", objectFit: "contain", padding: "5%"}}/>
            <Card.Body>
                <Card.Title style={{ width: '100%', textAlign: 'center' }}>
                    {product.nombre}
                </Card.Title>
                <div style={{margin: "15px"}}>
                    <Row style={{margin: "5px"}}>
                        <Col xs={6} style={{textAlign: "left"}}><strong>Precio:</strong> ${product.precio}</Col>
                        <Col xs={6} style={{textAlign: "right"}}><strong>Stock:</strong> {product.stock}</Col>
                    </Row>                    
                </div>
                {
                    allowCart ?
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
                        </Form>: null
                }
            </Card.Body>
        </Card>
    );
}