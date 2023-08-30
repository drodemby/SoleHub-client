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
  description,
  condition,
  price,
  color,
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
        <Card className="post-card">
          <Card.Header> {name}</Card.Header>
          <Card.Body>
            <img src={image} style={{ width: '200px' }} />
          </Card.Body>
          <Card.Body>
            {description}
          </Card.Body>
          <Card.Body>
            {condition}
          </Card.Body>
          <Card.Body>
            {price}
          </Card.Body>
          <Card.Body>
            {color}
          </Card.Body>
          <Card.Body>
            {brand}
          </Card.Body>
          <Card.Footer className="text-white">Seller: {sellerId.first_name}{sellerId.last_name} </Card.Footer>
          <Button
            className="post-card-button"
            onClick={() => {
              router.push(`/posts/${id}`);
            }}
          >
            Product Details
          </Button>

          {sellerId.uid === user.uid
            ? (
              <>
                <Button
                  onClick={deletethisProduct}
                  className="post-card-button"
                >
                  Delete
                </Button>
                <Button
                  className="post-card-button"
                  onClick={() => {
                    router.push(`/products/edit/${id}`);
                  }}
                >
                  Edit Product
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
  description: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  sellerId: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
