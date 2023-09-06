// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import CartCard from '../components/CartCard';
// import { createCart } from '../utils/data/cartData';
// import { useAuth } from '../utils/context/authContext';

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     createCart().then((data) => setCartItems(data));
//   }, []);

//   const addToCart = (item) => {
//     setCartItems([...cartItems, item]);
//   };

//   return (
//     <div>
//       <h2>Shopping Cart</h2>
//       <ul>
//         {cartItems.map((cart) => (
//           <li key={`cart--${cart.id}`}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Cart;
