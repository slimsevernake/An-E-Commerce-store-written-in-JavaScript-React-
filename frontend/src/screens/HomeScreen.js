import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { getLatestProducts } from "../store/actions/productActions";
import loader from "../resources/loading.svg";
import Message from "../components/Message";
import ProductCard from "../components/ProductCard.js";

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestProducts());
  }, [dispatch]);

  const { loading, products, error } = useSelector((state) => {
    return state.viewProducts;
  });

  return (
    <div>
      <h1 id="title">Latest Products</h1>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <img src={loader} alt="Loading" title="Loading..."></img>
        </div>
      ) : error ? (
        <div style={{textAlign: "center"}}> 
          <Message variant="danger" children={error} />
        </div>
      ) : null}
      <Row>
        {products
          ? products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))
          : null}
      </Row>
    </div>
  );
}

export default HomeScreen;
