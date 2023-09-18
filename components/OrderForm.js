import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import ClosedOrderbyId, { updateOrder } from '../utils/data/orderData';

const initialState = {
  payment_type: '', // Initialize only payment_type
};

function OrderForm() {
  const [closedOrder, setClosedOrder] = useState(initialState);
  const paymentOptions = ['CashApp', 'Venmo', 'PayPal', 'Card']; // Payment options as an array
  const router = useRouter();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClosedOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (closedOrder.payment_type) {
      const payload = {
        id: closedOrder.id,
        payment_type: closedOrder.payment_type, // Include selected payment type
      };
      updateOrder(payload).then(() => router.push('/confirmation'));
    }
  };

  return (
    <>
      <div>
        <h1>{user.name}</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Payment Type</Form.Label>
          <Form.Select
            name="payment_type"
            value={closedOrder.payment_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Type</option> {/* Default option */}
            {paymentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Complete Order
        </Button>
      </Form>
    </>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    payment_type: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
