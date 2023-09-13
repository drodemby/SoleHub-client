/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { deleteProduct, getSingleProduct } from '../../utils/data/productData';
import { createCart } from '../../utils/data/cartData';
import { OpenOrderbyId } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleProduct(id).then((data) => {
      setProduct(data);
      const name = `${data.seller_id.first_name} ${data.seller_id.last_name} `;
      setSeller(name);
      setUserInfo(data.seller_id.uid);
    });
  }, [id]);

  const handleAddToCart = () => {
    OpenOrderbyId(user.id).then((order) => {
      console.warn(order);
      const cart = {
        orderId: order[0].id,
        productId: product.id,
      };
      createCart(cart).then(() => router.push('/myCart'));
    });
  };

  const deletethisProduct = () => {
    if (window.confirm('Delete your product?')) {
      deleteProduct(id).then(() => router.push('/products/myListing'));
    }
  };

  return (
    <>
      <h1 style={{ marginTop: '30px' }}> {product.name}</h1>
      <img src={product.image} />
      <h3>Brand: {product.brand}</h3>
      <h3>Description: {product.description}</h3>
      <h4> {product.price}</h4>
      <h2>Listed by {seller}</h2>
      <h4 style={{ marginBottom: '30px' }}>Condition: {product.condition}</h4>

      {userInfo === user.uid
        ? (
          <>
            <Button
              style={{ margin: '10px', backgroundColor: '#003049' }}
              onClick={deletethisProduct}
            >
              Delete
            </Button>
            <Button
              style={{ margin: '10px', backgroundColor: '#003049' }}
              onClick={() => {
                router.push(`/products/edit/${id}`);
              }}
            >
              Edit Product
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ margin: '10px', backgroundColor: '#003049' }}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </>
        )}
    </>
  );
}

export default ProductDetails;
