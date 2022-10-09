import { Box } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/common/Navbar';

const DefaultHoc = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box height={'calc(100vh - 60px)'} overflow="auto" bg={'gray.200'}>
        {children}
      </Box>
    </Box>
  );
};

export default DefaultHoc;
