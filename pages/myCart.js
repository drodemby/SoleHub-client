import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { OpenOrderbyId, updateOrder } from '../utils/data/orderData';
import { getSingleCart } from '../utils/data/cartData';
import { useAuth } from '../utils/context/authContext';
// import ProductCard from '../components/ProductCard';
import CartItemCard from '../components/CartCard';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [openOrder, setOpenOrder] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  const getCart = () => {
    getSingleCart(user.id).then((data) => setCartItems(data));
  };

  useEffect(() => {
    getCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const getOpenOrder = async () => {
    try {
      const order = await OpenOrderbyId(user.id);
      setOpenOrder(order);
    } catch (error) {
      console.error('Error fetching open order: ', error);
    }
  };

  // call the function to get access to the info
  useEffect(() => {
    getOpenOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const handleCheckout = () => {
    if (openOrder) {
      const payload = {
        id: openOrder[0].id,
        customer_id: openOrder[0].customer_id.id,
        status: false,
        payment_type: openOrder[0].payment_type,
      };
      updateOrder(payload).then(() => router.push('/checkout'));
    }
  };

  return (
    <>
      <h2>Shopping Cart</h2>
      <div className="public-card-container d-flex flex-wrap">
        {cartItems.map((product) => (
          <section key={`product--${product.id}`}>
            <CartItemCard id={product.id} name={product.product_id.name} image={product.product_id.image} price={product.product_id.price} onUpdate={getCart} />
          </section>
        ))}
        <br />
      </div>
      <Button type="button" className="m-2" onClick={handleCheckout}>Checkout</Button>
    </>

  );
}
export default Cart;
// Array.isArray(cartItems) ? ()
// ) : (
//   <p>No items in the cart</p>
// )
