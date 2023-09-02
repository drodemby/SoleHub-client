import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import { getMyProducts } from '../../utils/data/productData';
import { useAuth } from '../../utils/context/authContext';

function MyListing() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMyProducts(user.uid).then((data) => setProducts(data));
  }, [user]);

  const displayProducts = () => {
    getMyProducts(user.uid).then((data) => setProducts(data));
  };
  return (
    <>
      <div>
        <div>
          <Button
            style={{ marginLeft: '30px', width: '300px' }}
            className="create-post-button"
            onClick={() => {
              router.push('/products/new');
            }}
          >
            Create Product Listing
          </Button>
        </div>
      </div>

      {products.map((product) => (
        <section key={`product--${product.id}`} className="product">
          <ProductCard id={product.id} title={product.title} imageUrl={product.image} onUpdate={displayProducts} sellerId={product.seller_id} />
        </section>
      ))}
    </>

  );
}

export default MyListing;
