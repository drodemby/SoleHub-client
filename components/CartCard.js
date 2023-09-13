/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { emptyCart } from '../utils/data/cartData';

// eslint-disable-next-line no-unused-vars
function CartItemCard({ cartItemObj, onUpdate }) {
  const removeItem = () => {
    if (window.confirm(`Remove ${cartItemObj.product_id.name} the cart?`)) {
      emptyCart(cartItemObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center cart-item-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{cartItemObj.product_id.name}</Card.Header>
      <Card.Body>
        <Card.Img src={cartItemObj.product_id.image} alt="product" />
        <h2>Price: ${cartItemObj.product_id.price}</h2>
      </Card.Body>
      <div>
        <Button type="button" className="m-2" onClick={removeItem}>Remove</Button>
      </div>
    </Card>
  );
}

CartItemCard.propTypes = {
  cartItemObj: PropTypes.shape({
    id: PropTypes.number,
    product_id: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CartItemCard;
