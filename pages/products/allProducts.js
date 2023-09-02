import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../utils/data/productData';
import ProductCard from '../../components/ProductCard';

function AllProducts() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => setProduct(data));
  }, []);

  const getAllProds = () => {
    getAllProducts().then((data) => setProduct(data));
  };

  return (
    <div className="public-card-container, d-flex flex-wrap">
      {product.map((prod) => (

        <section key={`prod--${prod.id}`}>
          <ProductCard id={prod.id} name={prod.name} image={prod.image} description={prod.description} price={prod.price} condition={prod.condition} color={prod.color} brand={prod.brand} onUpdate={getAllProds} sellerId={prod.seller_id} />
        </section>

      ))}
    </div>
  );
}

export default AllProducts;
