import { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../App";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";

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
                if (data.msg || data === "Internal Server Error") {
                    alert(data.msg || data);
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
                    alert(data.msg || data);
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
                    alert(data.msg || data);
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
                <CartProduct key={i} i={i} product={product} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
            ))}
        </ListGroup>
    );
}