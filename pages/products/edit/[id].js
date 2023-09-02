/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleProduct } from '../../../utils/data/productData';
import ProductForm from '../../../components/ProductForm';

export default function EditEventPage() {
  const router = useRouter();
  const { id } = router.query;

  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getSingleProduct(id).then((obj) => {
      setEditItem(obj);
    });
  }, [id]);
  console.warn(editItem);
  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <div>
        <ProductForm obj={editItem} />
      </div>

    </>
  );
}
