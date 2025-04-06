import React, { useContext } from 'react';
import { AppStateContext } from '../App';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';

export default function Products() {

    const { user, products, setProducts } = useContext(AppStateContext);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch("http://" + apiUrl + ":5000/api/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
    }, [apiUrl, setProducts]);

    return (
        <div style={{ padding: "30px" }}>
            <Row style={{width: "100%", justifyContent: "center"}}>
                {products.map((product, i) => (
                    <Col key={i} className="d-flex justify-content-center align-items-center" xs={4} style={{width: "25%"}}>
                        <Product product = {product} allowCart= { user !== null } />
                    </Col>
                ))}
            </Row>
        </div>
    );
}