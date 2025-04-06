import { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../App";
import { Col, ListGroup, Row, Button, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {

    const { user, setUser } = useContext(AppStateContext);

    const navigate = useNavigate();

    const [cart, setCart] = useState({});

    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        if (user !== null) {
            fetch("http://" + apiUrl + ":5000/api/users/cart", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.msg) {
                    alert(data.msg);
                    if (data.msg === "El token es invalido o no se encuentra en la petición") {
                        setUser(null);
                        navigate("/");
                    }
                } else {
                    setCart(data);
                }
            })
        }
    }, [apiUrl, navigate, setUser, user]);

    const handleDelete = (item_id) => {
        fetch(`http://` + apiUrl + `:5000/api/users/cart/${item_id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }
        ).then((response) => {
            if (response.status === 204) {
                alert("Producto eliminado del carrito!");
                const prod = cart.productos.filter((item) => item.id_item === item_id)[0]
                setCart((prevCart) => ({
                    total: prevCart.total - prod.subtotal,
                    num_prods: prevCart.num_prods - prod.cantidad,
                    productos: prevCart.productos.filter((item) => item.id_item !== item_id)
                }));
            } else {
                response.json().then((data) => {
                    alert(data.msg);
                    if (data.msg === "El token es invalido o no se encuentra en la petición") {
                        setUser(null);
                        navigate("/");
                    }
                })
            }
        })
    }

    const handleUpdate = (e, id_item) => {

        const newQuantity = parseInt(e.target.value);

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
                    alert(data.msg);
                    if (data.msg === "El token es invalido o no se encuentra en la petición") {
                        setUser(null);
                        navigate("/");
                    }
                })
            } else {
                const prods = cart.productos.map((item) => {
                    if (item.id_item === id_item) {
                        return { ...item, cantidad: parseInt(newQuantity), subtotal: parseInt(newQuantity) * item.precio };
                    }
                    return item;
                }); 
                setCart({
                    total: prods.reduce((acc, item) => acc + item.subtotal, 0),
                    num_prods: prods.reduce((acc, item) => acc + item.cantidad, 0),
                    productos: prods
                });
                alert("Cantidad actualizada!");
            }
        })
    }


    return (
        <ListGroup style={{width: "100%", height: "100%", padding: "30px"}}>
            <ListGroup.Item style={{width: "100%", height: "60px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Row style={{width: "100%", height: "100%"}}>
                    <Col xs={10} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <p style={{width: "100%", margin:"0%"}}><strong># de productos: </strong>{cart.num_prods}</p>
                    </ Col>
                    <Col xs={2} className="d-flex flex-column justify-content-center align-items-center">
                        <p style={{width: "100%", margin:"0%"}}><strong>Total: </strong>${cart.total}</p>
                    </ Col>
                </Row>
            </ListGroup.Item>
            {cart.productos?.map((product, i) => (
                <ListGroup.Item key={i} style={{width: "100%", height: "20%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Row style={{width: "100%", height: "170px"}}>
                        <Col xs={2} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <img src={product.imagen_path} alt={product.nombre} style={{width: "55%", height: "55%", objectFit: "contain"}}/>
                        </ Col>
                        <Col xs={2} className="d-flex flex-column justify-content-center align-items-center">
                            <Row style={{width: "100%"}}><p style={{width: "100%"}}><strong>Nombre: </strong>{product.nombre}</p></Row>
                            <Row style={{width: "100%"}}><p style={{width: "100%"}}><strong>Precio: </strong>${product.precio}</p></Row>
                        </ Col>
                        <Col xs={2} className="d-flex flex-column justify-content-center align-items-center">
                            <Row style={{width: "100%"}}><p style={{width: "100%"}}><strong>Subtotal: </strong>${product.subtotal}</p></Row>
                        </ Col>
                        <Col xs={2} className="d-flex flex-column justify-content-center align-items-center">
                            <ul>
                                { 
                                    product.opcionesEnvio?.map((option, i) => (
                                        <li key={i}>{option.nombre}{' $'}{option.costo}</li>
                                    ))
                                }
                            </ul>
                        </ Col>
                        <Col xs={2} className="d-flex flex-column justify-content-center align-items-center">
                            <Form.Select onChange={(e) => handleUpdate(e, product.id_item)} style={{width: "50%", margin: "0 auto"}} value={product.cantidad}>
                                { 
                                    [...Array(product.stock).keys()].map((i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))
                                }
                            </Form.Select>
                        </ Col>
                        <Col xs={1} className="d-flex flex-column justify-content-center align-items-center">
                            <Button variant="danger" onClick={() => handleDelete(product.id_item)}>
                                <FaTrash style={{color: "black"}}/>
                            </Button>
                        </ Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}