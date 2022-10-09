import { Grid, Text } from '@chakra-ui/react';
import React from 'react';
import { DefaultState } from '../context/DefaultContext';
import ProductCard from './common/ProductCard';

const ProductsList = () => {
  const { products, searchResult, searchString } = DefaultState();

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
      gap={5}
      margin={{ base: '40px 30px', sm: '40px 15px', md: '40px 0' }}
    >
      {searchString.length > 0 || searchResult ? (
        searchResult.length === 0 ? (
          <Text fontSize={20}>No Product Found</Text>
        ) : (
          searchResult.map(data => <ProductCard key={data.id} data={data} />)
        )
      ) : (
        products.map(data => <ProductCard key={data.id} data={data} />)
      )}
    </Grid>
  );
};

export default ProductsList;
