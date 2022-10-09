import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Text,
  Checkbox,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { DefaultState } from '../context/DefaultContext';

const FilterDrawer = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { products, appliedFilters, setAppliedFilters, resetFilters } =
    DefaultState();

  const [colorTypes, setColorTypes] = useState([]);
  const [typeTypes, setTypeTypes] = useState([]);
  const [genderTypes, setGenderTypes] = useState([]);

  const [priceTypes, setPriceTypes] = useState([
    {
      label: '0 - 250',
      lowerLimit: 0,
      upperLimit: 250,
    },
    {
      label: '250 - 450',
      lowerLimit: 250,
      upperLimit: 450,
    },
    {
      label: '450',
      lowerLimit: 450,
    },
  ]);

  useEffect(() => {
    const colors = products
      .map(item => item.color)
      .filter((value, index, self) => self.indexOf(value) === index);

    const type = products
      .map(item => item.type)
      .filter((value, index, self) => self.indexOf(value) === index);

    const gender = products
      .map(item => item.gender)
      .filter((value, index, self) => self.indexOf(value) === index);

    setColorTypes(colors);
    setTypeTypes(type);
    setGenderTypes(gender);
  }, [products]);

  const handleFilter = (filter, value, event) => {
    event.preventDefault();
    console.log(event.target.checked);
    const currentFilters = appliedFilters;
    if (!currentFilters[filter].includes(value)) {
      if (event.target.checked) {
        currentFilters[filter].push(value);
      }
    } else {
      console.log(currentFilters[filter].indexOf(value));
      currentFilters[filter].splice(currentFilters[filter].indexOf(value), 1);
    }
    setAppliedFilters({ ...currentFilters });
  };

  // useEffect(() => {
  //   console.log(appliedFilters);
  // }, [appliedFilters]);

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add Filters</DrawerHeader>

          <DrawerBody>
            <Box
              display={'flex'}
              flexDirection={'column'}
              gap={3}
              marginBottom={2}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={1.5}
                marginTop={2}
              >
                <Text marginBottom={'5px'} fontWeight="bold">
                  Color
                </Text>
                {colorTypes.map((color, index) => (
                  <Checkbox
                    key={index}
                    colorScheme="blue"
                    value={color}
                    marginLeft={2}
                    name={color}
                    onChange={e => handleFilter('color', color, e)}
                    isChecked={appliedFilters.color.includes(color)}
                  >
                    {color}
                  </Checkbox>
                ))}
              </Box>

              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={1.5}
                marginTop={2}
              >
                <Text marginBottom={'5px'} fontWeight="bold">
                  Gender
                </Text>
                {genderTypes.map((gender, index) => (
                  <Checkbox
                    key={index}
                    colorScheme="blue"
                    value={gender}
                    marginLeft={2}
                    name={gender}
                    onChange={e => handleFilter('gender', gender, e)}
                    isChecked={appliedFilters.gender.includes(gender)}
                  >
                    {gender}
                  </Checkbox>
                ))}
              </Box>

              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={1.5}
                marginTop={2}
              >
                <Text marginBottom={'5px'} fontWeight="bold">
                  Price
                </Text>
                {priceTypes.map((price, index) => (
                  <Checkbox
                    key={index}
                    colorScheme="blue"
                    value={price}
                    name={price.label}
                    marginLeft={2}
                    onChange={e => handleFilter('price', price, e)}
                    isChecked={appliedFilters.price.includes(price)}
                  >
                    Rs. {price.label}
                  </Checkbox>
                ))}
              </Box>

              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={1.5}
                marginTop={2}
              >
                <Text marginBottom={'5px'} fontWeight="bold">
                  Type
                </Text>
                {typeTypes.map((type, index) => (
                  <Checkbox
                    key={index}
                    colorScheme="blue"
                    value={type}
                    marginLeft={2}
                    name={type}
                    onChange={e => handleFilter('type', type, e)}
                    isChecked={appliedFilters.type.includes(type)}
                  >
                    {type}
                  </Checkbox>
                ))}
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={() => resetFilters()}>
              Reset
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
