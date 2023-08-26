import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'react-bootstrap';

function MyListing() {
  const router = useRouter();

  return (
    <Button
      style={{ marginLeft: '30px', width: '300px' }}
      className="create-post-button"
      onClick={() => {
        router.push('/products/new');
      }}
    >
      Create Product Listing
    </Button>
  );
}

export default MyListing;
