/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createCart, updateCart } from '../utils/data/cartData';

const initialState = {
  orderId: '',
  productId: '',
};

function OrderProductForm({ cartObj, productObj, orderObj }) {
  // const [openOrder, setOpenOrder] = useState({});
  const [currentCart, setCurrentCart] = useState(initialState);
  const router = useRouter();

  // function to get the open order of the user that is logged in
  // const getOpenOrder = async () => {
  //   try {
  //     const order = await getOpenOrderByUserId(user.id);
  //     setOpenOrder(order);
  //   } catch (error) {
  //     console.error('Error fetching open order: ', error);
  //   }
  // };

  // // call the function to get access to the info
  // useEffect(() => {
  //   getOpenOrder();
  // }, [user.id]);

  useEffect(() => {
    if (cartObj.id) {
      setCurrentCart({
        id: cartObj.id,
        orderId: cartObj.order_id,
        productId: cartObj.product_id,
      });
    }
  }, [cartObj]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartObj.id) {
      const updatedCart = {
        id: cartObj.id,
        orderId: Number(currentCart.orderId),
        productId: Number(currentCart.productId),
      };
      updateCart(updatedCart).then(() => router.push('/myCart'));
    } else {
      const cart = {
        orderId: Number(orderObj.id),
        productId: Number(productObj.id),
      };
      createCart(cart).then(() => router.push('/myCart'));
    }
  };

  return (
    <div className="top-centered">
      <Form onSubmit={handleSubmit}>
        <Button size="lg" variant="warning" type="submit">Add Item to Cart?</Button>
      </Form>
    </div>
  );
}

OrderProductForm.propTypes = {
  cartObj: PropTypes.shape({
    id: PropTypes.number,
    order_id: PropTypes.number,
    product_id: PropTypes.number,
  }),
  productObj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  orderObj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

OrderProductForm.defaultProps = {
  cartObj: initialState,
};

export default OrderProductForm;
