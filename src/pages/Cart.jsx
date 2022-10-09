import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { DefaultState } from '../context/DefaultContext';
import DefaultHoc from '../HOC/DefaultHoc';
import { IoMdAdd } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
import { RiSubtractLine } from 'react-icons/ri';

const Cart = () => {
  const { cart, incrementCount, decrementCount, removeFromCart } =
    DefaultState();

  return (
    <DefaultHoc>
      <Box width="calc(100% - 60px)" margin="20px auto">
        {cart.length > 0 && (
          <>
            <Text fontSize={20} fontWeight={'bold'}>
              Cart
            </Text>
            <Box display={'flex'} gap={4} flexDir="column" padding={'20px 0'}>
              {cart.map(data => (
                <Grid
                  templateColumns={{
                    base: '130px 1fr',
                    md: '120px 1fr 1fr 1fr',
                    lg: '120px 300px 200px 200px',
                  }}
                  padding={{ base: '0', md: '15px' }}
                  key={data.id}
                  gap={5}
                >
                  <GridItem
                    display={'flex'}
                    padding="10px"
                    bg="white"
                    borderRadius={'lg'}
                  >
                    <Image
                      src={data.imageURL}
                      boxSize={{ base: '110px', md: '100px' }}
                    />
                  </GridItem>
                  <GridItem display={'flex'} flexDir={'column'} gap={2}>
                    <Text fontSize={{ base: 20, md: 25 }}>{data.name}</Text>
                    <Text fontSize={{ base: 15, md: 20 }}>
                      Rs. {data.price}
                    </Text>
                    <ButtonGroup
                      size="sm"
                      isAttached
                      variant="outline"
                      display={{ md: 'none' }}
                    >
                      <IconButton
                        icon={<IoMdAdd />}
                        onClick={() => incrementCount(data)}
                        colorScheme="blue"
                        variant={'solid'}
                      />
                      <Button variant={'outline'} bg="white">
                        {cart.find(item => item.id === data.id).cartQuantity}
                      </Button>
                      <IconButton
                        colorScheme="red"
                        variant={'solid'}
                        icon={
                          cart.find(item => item.id === data.id)
                            .cartQuantity === 1 ? (
                            <AiFillDelete />
                          ) : (
                            <RiSubtractLine />
                          )
                        }
                        onClick={() => decrementCount(data)}
                      />
                    </ButtonGroup>
                    <Button
                      colorScheme="red"
                      variant="link"
                      onClick={() => removeFromCart(data)}
                      width="130px"
                      fontSize={15}
                      display={{ md: 'none' }}
                    >
                      Remove from Cart
                    </Button>
                  </GridItem>
                  <GridItem
                    display={'flex'}
                    gap={2}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <ButtonGroup
                      size="sm"
                      isAttached
                      variant="outline"
                      display={{ base: 'none', md: 'flex' }}
                    >
                      <IconButton
                        icon={<IoMdAdd />}
                        onClick={() => incrementCount(data)}
                        colorScheme="blue"
                        variant={'solid'}
                      />
                      <Button variant={'outline'} bg="white">
                        {cart.find(item => item.id === data.id).cartQuantity}
                      </Button>
                      <IconButton
                        colorScheme="red"
                        variant={'solid'}
                        icon={
                          cart.find(item => item.id === data.id)
                            .cartQuantity === 1 ? (
                            <AiFillDelete />
                          ) : (
                            <RiSubtractLine />
                          )
                        }
                        onClick={() => decrementCount(data)}
                      />
                    </ButtonGroup>
                  </GridItem>
                  <GridItem
                    alignItems={'center'}
                    justifyContent={'center'}
                    display={{ base: 'none', md: 'flex' }}
                  >
                    <Button
                      colorScheme="red"
                      variant="link"
                      onClick={() => removeFromCart(data)}
                    >
                      Remove from Cart
                    </Button>
                  </GridItem>
                </Grid>
              ))}
            </Box>
            <Text fontSize={25} fontWeight={'bold'}>
              Sub Total: Rs.{' '}
              {cart.reduce(
                (acc, curr) => acc + curr.price * curr.cartQuantity,
                0
              )}
            </Text>
          </>
        )}
        {cart.length === 0 && (
          <Text
            fontSize={35}
            position="absolute"
            left={'50%'}
            top={'50%'}
            transform={'translate(-50%, -50%)'}
            width="100%"
            textAlign={'center'}
          >
            Cart is Empty
          </Text>
        )}
      </Box>
    </DefaultHoc>
  );
};

export default Cart;
