//React Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Component Imports
import loader from "../resources/loading.svg";
import Message from "../components/Message";
import { getProductDetails } from "../store/actions/productActions";
import Rating from "../components/Rating";

//Design Imports
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { CgPlayListAdd } from "react-icons/cg";

//File Function
function ProductScreen({ match, history}) {
  const product_id = match.params.id
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(product_id));
  }, [dispatch, product_id]);

  const { loading, product, error } = useSelector((state) => {
    return state.viewProductDetails;
  });
  const [qty, setQty] = useState(1)

  const getQuantity = (quantity) => {
    const options = []
    for (let index = 0; index <= quantity; index++) {
      options.push(<option key={index} value={index}>{index}</option>)
    }
    options.shift()
    return options
  }

  const addToCartHandler = (quantity) => {
    history.push(`/cart/${product_id}?qty=${quantity}`)
  }

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <img src={loader} alt="Loading" title="Loading..."></img>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center" }}>
          <Message variant="danger" children={error} />
        </div>
      ) : (
        <div>
          <Link onClick={() => history.goBack()} to="#"className="btn btn-dark my-3">
            GO BACK
          </Link>
          <Row>
            <Col md={5}>
              <Image
                className="image-resize"
                src={product.image}
                alt={product.name}
                thumbnail
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={product.numReviews + " reviews"}
                    color={"#f8e825"}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  Price: <strong>{`NGN ${product.price}`}</strong>
                </ListGroupItem>
                <ListGroupItem>
                  Description: {product.descriptions}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{`NGN ${product.price}`}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Stock:</Col>
                      <Col>
                        {product.quantity > 0 ? (
                          <strong style={{ color: "green" }}>In Stock</strong>
                        ) : (
                          <strong style={{ color: "red" }}>Not in Stock</strong>
                        )}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Form>
                      <Form.Group as={Row}>
                        <Col>
                          <Form.Label>
                            Quantity:
                          </Form.Label>
                        </Col>
                        <Col>
                        <Form.Control as='select' value={qty} onChange={(event) => {
                          setQty(event.target.value)
                        }}>
                          {product.quantity > 0 ? getQuantity(product.quantity) : <option value={0}>0</option>}
                        </Form.Control>
                        </Col>
                      </Form.Group>
                    </Form>
                  </ListGroupItem>
                  <ListGroupItem
                    disabled={product.quantity > 0 ? false : true}
                    action
                    variant="success"
                    onClick={() => addToCartHandler(qty)}
                  >
                    <FaShoppingCart /> <span />
                    Add to Cart
                  </ListGroupItem>
                  <ListGroupItem
                    disabled={product.quantity > 0 ? false : true}
                    action
                    variant="info"
                  >
                    <CgPlayListAdd /> <span />
                    Add to Wishlist
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
