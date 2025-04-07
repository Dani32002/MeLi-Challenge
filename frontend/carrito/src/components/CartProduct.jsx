import { Col, Row, ListGroup, Form, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function CartProduct({ i, product, handleUpdate, handleDelete }) {

    return (
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
                    <ul style={{margin: "0%"}}>
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
                <Col xs={2} className="d-flex flex-column justify-content-center align-items-center">
                    <Row style={{width: "100%"}}><p style={{width: "100%", margin: "0%"}}><strong>Subtotal: </strong>${product.subtotal}</p></Row>
                </ Col>
                <Col xs={1} className="d-flex flex-column justify-content-center align-items-center">
                    <Button variant="danger" onClick={() => handleDelete(product.id_item)}>
                        <FaTrash style={{color: "black"}}/>
                    </Button>
                </ Col>
            </Row>
        </ListGroup.Item>
    );

}