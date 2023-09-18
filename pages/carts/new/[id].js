// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import OrderForm from '../../../components/OrderForm';
// import { getSingleProduct } from '../../../utils/data/productData';

// const NewOrderProduct = () => {
//   const router = useRouter();
//   const [productDetails, setProductDetails] = useState({});

//   const { id } = router.query;

//   useEffect(() => {
//     getSingleProduct(id).then((data) => {
//       setProductDetails(data);
//     });
//   }, []);

//   return (
//     <>
//       <OrderForm productObj={productDetails} />
//     </>
//   );
// };

// export default NewOrderProduct;
