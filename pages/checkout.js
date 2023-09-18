import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import { ClosedOrderbyId } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

export default function Checkout() {
  const [closedOrder, setClosedOrder] = useState({});
  const { user } = useAuth();

  const getClosedOrder = async () => {
    try {
      const order = await ClosedOrderbyId(user.id);
      setClosedOrder(order);
    } catch (error) {
      console.error('Error fetching closed order: ', error);
    }
  };

  useEffect(() => {
    getClosedOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <>
      <br />
      <h1>Checkout</h1>
      <OrderForm obj={closedOrder} />
    </>
  );
}
