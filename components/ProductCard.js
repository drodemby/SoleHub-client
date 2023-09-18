/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';

import { Card, Button } from 'react-bootstrap';
import { deleteProduct } from '../utils/data/productData';
import { useAuth } from '../utils/context/authContext';

const ProductCard = ({
  id,
  name,
  image,
  condition,
  price,
  brand,
  sellerId,
  onUpdate,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const deletethisProduct = () => {
    if (window.confirm('Delete your product listing?')) {
      deleteProduct(id).then(() => onUpdate());
    }
  };
  return (
    <>
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Header> {name}</Card.Header>
          <Card.Body>
            <Card.Img src={image} alt="product" />
            <Card.Text> {condition} </Card.Text>
            <Card.Text> {brand} </Card.Text>
            <Card.Text> {price} </Card.Text>
          </Card.Body>
          <Card.Footer> Listed by {sellerId.first_name}{sellerId.last_name} </Card.Footer>
          <Button
            className="post-card-button"
            onClick={() => {
              router.push(`/products/${id}`);
            }}
          >
            Product Details
          </Button>

          {sellerId.uid === user.uid
            ? (
              <>
                <Button
                  className="post-card-button"
                  onClick={() => {
                    router.push(`/products/edit/${id}`);
                  }}
                >
                  Edit Product
                </Button>
                <Button
                  onClick={deletethisProduct}
                  className="post-card-button"
                >
                  Delete
                </Button>
              </>
            ) : ''}
        </Card>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  sellerId: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
