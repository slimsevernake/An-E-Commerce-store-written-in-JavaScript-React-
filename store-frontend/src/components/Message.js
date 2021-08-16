import React from "react";
import { Alert, Row, Col, Container } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs md='auto' lg="6">
          <Alert variant={variant}>
            <Alert.Heading>{children}</Alert.Heading>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default Message;
