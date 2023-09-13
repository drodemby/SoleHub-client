import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CartCard from '../components/CartCard';
import { OpenOrderbyId, updateOrder } from '../utils/data/orderData';
import { getCartByOrderId } from '../utils/data/cartData';
import { useAuth } from '../utils/context/authContext';

function Cart() {
  const [openOrder, setOpenOrder] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  const OpenOrder = () => {
    OpenOrderbyId(user.id).then((data) => setOpenOrder(data));
  };

  const getCart = () => {
    getCartByOrderId(openOrder.id).then((data) => setCartItems(data));
  };

  useEffect(() => {
    OpenOrder();
    if (openOrder.id) {
      getCart();
    }
  });

  useEffect(() => {
    const total = cartItems.reduce((accumulator, object) => accumulator + parseFloat(object.product_id.price).toFixed(2), 0);

    if (openOrder.id) {
      const payload = {
        id: openOrder.id,
        customerId: openOrder.customer_id.id,
        paymentType: openOrder.payment_type.id,
        status: openOrder.status,
        total: Number(total),
      };
      updateOrder(payload);
    }
  }, []);

  return (
    <>
      <div className="public-card-container, d-flex flex-wrap">
        <h2>Shopping Cart</h2>
        {cartItems.map((cart) => (
          <section key={`cart--${cart.id}`}>
            <CartCard cartItemObj={cart} onUpdate={getCart} />
          </section>

        ))}
        <br />
      </div>
      <Button>Checkout</Button>
    </>
  );
}
export default Cart;
