import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const DefaultContext = createContext();

const DefaultProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [appliedFilters, setAppliedFilters] = useState({
    color: [],
    type: [],
    price: [],
    gender: [],
  });

  const toast = useToast();

  useEffect(() => {
    const filteredData = products.filter(data => {
      return (
        data.name.toLowerCase().includes(searchString.toLowerCase()) ||
        data.color.toLowerCase().includes(searchString.toLowerCase()) ||
        data.type.toLowerCase().includes(searchString.toLowerCase())
      );
    });
    setSearchResult(filteredData);
  }, [searchString]);

  useEffect(() => {
    axios
      .get(
        'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
      )
      .then(({ data }) => {
        setProducts(data);
        setSearchResult(data);
      })
      .catch(error => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'bottom-right',
        });
      });
  }, []);

  useEffect(() => {
    const highestLimit = appliedFilters.price.reduce((acc, curr) => {
      if (appliedFilters.price.find(price => price.upperLimit === undefined)) {
        return undefined;
      }
      return acc > curr.upperLimit ? acc : curr.upperLimit;
    }, 0);

    const getLowerLimit = () => {
      const lowestLimit = appliedFilters.price.reduce((acc, curr) => {
        return acc < curr.lowerLimit ? acc : curr.lowerLimit;
      }, highestLimit);
      return lowestLimit;
    };

    if (searchString.length > 0) {
      const searchFilteredData = products.filter(data => {
        return (
          data.name.toLowerCase().includes(searchString.toLowerCase()) ||
          data.color.toLowerCase().includes(searchString.toLowerCase()) ||
          data.type.toLowerCase().includes(searchString.toLowerCase())
        );
      });
      const filteredData = searchFilteredData.filter(data => {
        if (
          appliedFilters.color.length > 0
            ? appliedFilters.color.includes(data.color)
            : true
        ) {
          if (
            appliedFilters.type.length > 0
              ? appliedFilters.type.includes(data.type)
              : true
          ) {
            if (
              appliedFilters.gender.length > 0
                ? appliedFilters.gender.includes(data.gender)
                : true
            ) {
              if (appliedFilters.price.length === 0) {
                return data;
              } else if (
                data.price >= getLowerLimit() && highestLimit === undefined
                  ? true
                  : data.price <= highestLimit
              ) {
                return data;
              }
            }
          }
        }
      });
      setSearchResult(filteredData);
    } else {
      const filteredData = products.filter(data => {
        if (
          appliedFilters.color.length > 0
            ? appliedFilters.color.includes(data.color)
            : true
        ) {
          if (
            appliedFilters.type.length > 0
              ? appliedFilters.type.includes(data.type)
              : true
          ) {
            if (
              appliedFilters.gender.length > 0
                ? appliedFilters.gender.includes(data.gender)
                : true
            ) {
              if (appliedFilters.price.length === 0) {
                return data;
              } else if (
                data.price >= getLowerLimit() && highestLimit === undefined
                  ? true
                  : data.price <= highestLimit
              ) {
                return data;
              }
            }
          }
        }
      });
      setSearchResult(filteredData);
    }
  }, [appliedFilters]);

  const addToCart = data => {
    if (cart.find(item => item.id === data.id)) {
      return;
    } else {
      if (data.quantity === 0) {
        toast({
          title: 'Error',
          description: 'Product is out of stock',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'bottom-right',
        });
        return;
      }
      const toBeAdded = { ...data, cartQuantity: 1 };
      setCart([...cart, toBeAdded]);
    }
  };

  const incrementCount = data => {
    const product = cart.find(item => item.id === data.id);
    if (product.cartQuantity < product.quantity) {
      const newCart = cart;
      newCart[newCart.indexOf(product)].cartQuantity++;
      setCart([...newCart]);
    } else {
      toast({
        title: 'Quantity Exceeded',
        description: 'Product quantity is not available',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const decrementCount = data => {
    const product = cart.find(item => item.id === data.id);
    if (product.cartQuantity > 1) {
      const newCart = cart;
      newCart[newCart.indexOf(product)].cartQuantity--;
      setCart([...newCart]);
    } else {
      const newCart = cart.filter(e => e.id !== data.id);
      setCart(newCart);
    }
  };

  const removeFromCart = data => {
    const newCart = cart.filter(e => e.id !== data.id);
    setCart(newCart);
  };

  const resetFilters = () => {
    setAppliedFilters({
      color: [],
      type: [],
      price: [],
      gender: [],
    });
  };

  return (
    <DefaultContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        addToCart,
        incrementCount,
        decrementCount,
        searchResult,
        setSearchResult,
        searchString,
        setSearchString,
        appliedFilters,
        setAppliedFilters,
        resetFilters,
        removeFromCart,
      }}
    >
      {children}
    </DefaultContext.Provider>
  );
};

export const DefaultState = () => {
  return useContext(DefaultContext);
};

export default DefaultProvider;
