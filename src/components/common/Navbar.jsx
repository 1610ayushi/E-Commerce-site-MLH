import { Box, Image, useToast } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { DefaultState } from '../../context/DefaultContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { cart } = DefaultState();

  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Box
      bg={'blue.800'}
      color={'#ffffff'}
      height={'60px'}
      display="flex"
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={'0 30px'}
      fontFamily={'sans-serif'}
    >
      <Link
        to="/"
        style={{
          fontSize: '20px',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <Image src="./teerexLogo.png" boxSize={'25px'} /> Teerex
      </Link>
      <Box display="flex" alignItems={'center'} gap={'15px'}>
        <Box display={{ base: 'none', md: 'block' }}>
          <Link to="/">Products</Link>
        </Box>
        <Box
          cursor={'pointer'}
          onClick={() =>
            cart.length > 0
              ? navigate('/cart')
              : toast({
                  title: 'Cart is empty',
                  description: 'Please add some items to cart',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                  position: 'bottom-right',
                })
          }
          style={{ position: 'relative' }}
        >
          <AiOutlineShoppingCart fontSize={'23px'} />
          {cart.length > 0 && (
            <Box
              border={'full'}
              position={'absolute'}
              top={'-5px'}
              right={'-5px'}
              bg={'red.500'}
              borderRadius={'50%'}
              fontSize={'10px'}
              height={'15px'}
              width={'15px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {cart.reduce((acc, item) => acc + item.cartQuantity, 0)}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
