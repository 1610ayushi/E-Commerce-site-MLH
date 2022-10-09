import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DefaultHoc from '../HOC/DefaultHoc';
import { BsSearch, BsFilter } from 'react-icons/bs';
import FilterDrawer from '../components/FilterDrawer';
import ProductsList from '../components/ProductsList';
import { DefaultState } from '../context/DefaultContext';

const Products = () => {
  const { setSearchString, searchString } = DefaultState();

  return (
    <DefaultHoc>
      <Box width="calc(100% - 60px)" margin="20px auto">
        <Box display={'flex'} gap={5}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BsSearch color="gray.300" />}
            />
            <Input
              variant="flushed"
              placeholder="Find products by name, color, type"
              onChange={e => setSearchString(e.target.value)}
              value={searchString}
            />
          </InputGroup>
          {/* <Button variant={'solid'} minWidth={'100px'}>
            Search
          </Button> */}
          <FilterDrawer>
            <Button>
              <BsFilter fontSize={25} />
            </Button>
          </FilterDrawer>
        </Box>
        <ProductsList />
      </Box>
    </DefaultHoc>
  );
};

export default Products;
