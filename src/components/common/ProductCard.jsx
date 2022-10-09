import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { DefaultState } from '../../context/DefaultContext';
import { IoMdAdd } from 'react-icons/io';
import { RiSubtractLine } from 'react-icons/ri';

const ProductCard = ({ data }) => {
  const { cart, setCart, addToCart, incrementCount, decrementCount } =
    DefaultState();

  return (
    <Box
      shadow={'md'}
      borderRadius={'10px'}
      padding={'15px'}
      bg={'#ffffff'}
      display="flex"
      flexDir={'column'}
      gap={2}
    >
      <Image
        src={data.imageURL}
        alt={data.name}
        objectFit="cover"
        width={'100%'}
        height="200px"
        borderRadius={'5px'}
      />
      <Text fontSize={'xl'} fontWeight={'bold'}>
        {data.name}
      </Text>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        gap={'2'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text fontSize={{ base: '17px', md: '20px' }}>{data.price} ₹</Text>
        {cart.find(item => item.id === data.id) ? (
          <ButtonGroup
            size="sm"
            isAttached
            variant="outline"
            width={{ base: '100%', md: 'auto' }}
          >
            <IconButton
              icon={<IoMdAdd />}
              onClick={() => incrementCount(data)}
              flex={{ base: 'auto' }}
            />
            <Button flex={{ base: 'auto' }}>
              {cart.find(item => item.id === data.id).cartQuantity}
            </Button>
            <IconButton
              disabled={
                cart.find(item => item.id === data.id).cartQuantity === 1
              }
              icon={<RiSubtractLine />}
              onClick={() => decrementCount(data)}
              flex={{ base: 'auto' }}
            />
          </ButtonGroup>
        ) : data.quantity > 0 ? (
          <Button colorScheme={'blue'} onClick={() => addToCart(data)}>
            Add To Cart
          </Button>
        ) : (
          <Button
            colorScheme={'red'}
            onClick={() => addToCart(data)}
            disabled={true}
          >
            Out of Stock
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
