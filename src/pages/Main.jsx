import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Panel from '../components/Panel';
import { HStack } from '@chakra-ui/react';
const Main = () => {
  return (
    <Box
      w="100%"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      backgroundColor={'#C7DEEC'}
      minHeight={'100vh'}
      display={'flex'}
      alignContent={'space-around'}
      justifyContent={'center'}
      gap={'2'}
      flexWrap={'wrap'}
    >
      <HStack w={'100%'}>
        <Text
          margin={'auto'}
          fontWeight={'bold'}
          color={'#00394d'}
          fontSize={'20px'}
          marginBottom={'20px'}
        >
          DASHTOON | COMIC GENERATOR PANEL
        </Text>
      </HStack>
      {[...Array(10)].map((x, i) => (
        <Panel key={i} />
      ))}
    </Box>
  );
};

export default Main;
