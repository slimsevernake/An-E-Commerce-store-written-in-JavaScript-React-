import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Table,
  InputGroup,
  FormControl,
  Form,
  Image,
} from "react-bootstrap";

import Message from "../components/Message";
import loader from "../resources/loading.svg";
import { CgShoppingCart } from "react-icons/cg";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiDeleteBinLine,
} from "react-icons/ri";

import { addToCart, removeFromCart } from "../store/actions/cartActions";

function CartScreen({ match, location, history }) {
  const dispatch = useDispatch();
  const product_id = match.params.id;
  const productQuantity = location.search.split("=")[1];

  useEffect(() => {
    if (product_id && productQuantity) {
      dispatch(addToCart(product_id, productQuantity));
    }
  }, [dispatch, product_id, productQuantity]);

  const [showDelivery, setShowDelivery] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const { loading, cart } = useSelector((state) => state.cartReducers);
  const shippingPrice = 2500;
  const prices = cart.map((item) => {
    return item.price * item.qty;
  });
  const subtotal = prices.reduce((x, y) => x + y, 0);

  const getQuantity = (quantity) => {
    const options = [];
    for (let index = 0; index <= quantity; index++) {
      options.push(
        <option key={index} value={index}>
          {index}
        </option>
      );
    }
    options.shift();
    return options;
  };

  const deleteItemFromCart = (product_id) => {
    dispatch(removeFromCart(product_id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shippingdetails");
  };

  return (
    <div>
      <Row>
        <Col>
          <h1 className="mb-4">
            <CgShoppingCart />
            {"         "}
            Shopping Cart
          </h1>
        </Col>
      </Row>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <img src={loader} alt="Loading" title="Loading..."></img>
        </div>
      ) : cart.length < 1 ? (
        <div style={{ textAlign: "center" }}>
          <Message
            variant="info"
            children={"You have no products in your cart"}
          />
        </div>
      ) : (
        <div className="mb-5">
          <br />
          <Row>
            <Col>
              <Table borderless responsive variant="dark" size="sm">
                <thead>
                  <tr>
                    <th></th>
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>QTY</th>
                    <th>SubTotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>
                          <Image
                            style={{ width: "100px", height: "100px" }}
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            
                          />
                        </td>
                        <td>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </td>
                        <td>NGN {item.price}</td>
                        <td>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(event) => {
                              dispatch(addToCart(item._id, event.target.value));
                            }}
                          >
                            {item.quantity > 0 ? (
                              getQuantity(item.quantity)
                            ) : (
                              <option value={0}>0</option>
                            )}
                          </Form.Control>
                        </td>
                        <td>NGN {item.qty * item.price}</td>
                        <td>
                          <Button
                            variant="outline-danger"
                            onClick={() => deleteItemFromCart(item._id)}
                          >
                            <RiDeleteBinLine />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col xs lg="4">
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3 className="d-flex justify-content-center">Summary</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <p>Estimated Shipping and Tax Price</p>
                    </Col>
                    <Col xs="1">
                      {!showDelivery ? (
                        <RiArrowDropDownLine
                          onClick={() => setShowDelivery(!showDelivery)}
                        />
                      ) : (
                        <RiArrowDropUpLine
                          onClick={() => setShowDelivery(!showDelivery)}
                        />
                      )}
                    </Col>
                  </Row>
                  {showDelivery ? (
                    <Row>
                      <p>NGN {shippingPrice}</p>
                    </Row>
                  ) : null}
                </ListGroupItem>
                <br />
                <ListGroupItem>
                  <Row>
                    <Col>
                      <h5>SubTotal: </h5>
                    </Col>
                    <Col md="auto">
                      <p>NGN {subtotal} </p>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <h3>Order Total: </h3>
                    </Col>
                    <Col md="auto">NGN {subtotal + shippingPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-center">
                    <Button onClick={checkoutHandler} variant="outline-warning">
                      Proceed to Checkout
                    </Button>
                  </div>
                  {/* <h4>Proceed to Checkout</h4> */}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col xs lg="4">
              <h4 className="mb-4">Apply Discount Code</h4>
              <Form
                onSubmit={(event) => {
                  event.preventDefault();
                  console.log(discountCode);
                }}
              >
                <InputGroup className="mb-3">
                  <FormControl
                    type="text"
                    placeholder="Discount Code"
                    aria-label="Discount Code"
                    aria-describedby="basic-addon2"
                    onChange={(event) => {
                      setDiscountCode(event.target.value);
                    }}
                  />
                  <InputGroup.Append>
                    <Button type="submit" variant="primary" id="basic-addon2">
                      Apply Code
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
