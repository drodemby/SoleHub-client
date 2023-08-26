/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useAuth } from '../utils/context/authContext';
import { createProduct, updateProduct } from '../utils/data/productData';

const initialState = {
  name: '',
  image: '',
  description: '',
  condition: '',
  price: '',
  color: '',
  brand: '',
};

const ProductForm = ({ obj }) => {
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentProduct({
        id: obj.id,
        name: obj.name,
        image: obj.image,
        description: obj.description,
        condition: obj.condition,
        price: obj.price,
        color: obj.color,
        brand: obj.brand,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const productUpdate = {
        id: currentProduct.id,
        name: currentProduct.name,
        image: currentProduct.image,
        description: currentProduct.description,
        condition: currentProduct.condition,
        price: currentProduct.price,
        color: currentProduct.color,
        brand: currentProduct.brand,
        sellerId: user.uid,

      };
      updateProduct(productUpdate)
        .then(() => router.push(`/products/${obj.id}`));
    } else {
      const product = {
        name: currentProduct.name,
        image: currentProduct.image,
        description: currentProduct.description,
        condition: currentProduct.condition,
        price: currentProduct.price,
        color: currentProduct.color,
        brand: currentProduct.brand,
        sellerId: user.uid,
      };

      // Send product request to your API
      createProduct(product).then(() => router.push('/product/myListing'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">

          <Form.Label> Shoe Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={currentProduct.name}
            onChange={handleChange}
            required
          />

          <Form.Label> Shoe Image</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={currentProduct.image}
            onChange={handleChange}
            required
          />

          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            style={{ height: '75px' }}
            value={currentProduct.description}
            onChange={handleChange}
            required
          />

          <Form.Label>Condition</Form.Label>
          <Form.Control
            type="text"
            name="condition"
            value={currentProduct.condition}
            onChange={handleChange}
            required
          />

          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={currentProduct.price}
            onChange={handleChange}
            required
          />

          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={currentProduct.color}
            onChange={handleChange}
            required
          />

          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={currentProduct.brand}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

ProductForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    condition: PropTypes.string,
    price: PropTypes.string,
    color: PropTypes.string,
    brand: PropTypes.string,
  }),
};

ProductForm.defaultProps = {
  obj: initialState,
};

export default ProductForm;
