import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function ProductCard({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Header id="title">
        <Card.Title>{product.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Img src={product.image} />
        </Link>
      </Card.Body>
      <Card.Footer>
        <Card.Text as="h5">Price: {`NGN ${product.price}`}</Card.Text>
        <div className="my-3">
          <Rating
            value={product.rating}
            text={product.numReviews + " reviews"}
            color={"#f8e825"}
          />
        </div>
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
