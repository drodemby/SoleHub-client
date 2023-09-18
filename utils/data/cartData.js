import { clientCredentials } from '../client';

const getMyCart = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/carts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleCart = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/carts?customer_id=${id}&status=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// const getPostsByCategory = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/posts`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const usersPosts = Object.values(data).filter((item) => item.category_id.id === id);
//       resolve(usersPosts);
//     })
//     .catch(reject);
// });

const emptyCart = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/carts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateCart = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/carts/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const createCart = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/carts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCartByOrderId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/carts?order_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCartByCustomerId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/cart?customer_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
export {
  getMyCart, emptyCart, getSingleCart, updateCart, createCart, getCartByOrderId, getCartByCustomerId,
};
