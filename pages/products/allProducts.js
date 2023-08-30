import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../utils/data/productData';
import ProductCard from '../../components/ProductCard';

function AllProducts() {
  const [product, setProduct] = useState([]);

  const getAllProds = () => {
    getAllProducts().then(setProduct);
  };

  useEffect(() => {
    getAllProds();
  }, []);
  return (
    <div className="public-card-container, d-flex flex-wrap">
      {product.map((prod) => (
        <ProductCard id={prod.id} boardObj={prod} onUpdate={getAllProds} />
      ))}
    </div>
  );
}

export default AllProducts;
