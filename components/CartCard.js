/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
import { emptyCart } from '../utils/data/cartData';
// eslint-disable-next-line no-unused-vars

const CartCard = ({
  id,
  name,
  image,
  price,
  onUpdate,
}) => {
  // const router = useRouter();

  const removeItem = () => {
    if (window.confirm(`Remove ${name} the cart?`)) {
      emptyCart(id).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Img src={image} alt="product" />
        <Card.Text> {price} </Card.Text>
      </Card.Body>
      <div>
        <Button type="button" className="m-2" onClick={removeItem}>Remove</Button>
      </div>
    </Card>
  );
};

CartCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CartCard;
