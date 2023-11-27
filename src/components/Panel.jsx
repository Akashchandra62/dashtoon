import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Button,
  Input,
  VStack,
  Spinner,
  Box,
} from '@chakra-ui/react';
import blank from '../images/blank.jpg';
import { useToast } from '@chakra-ui/react';

const Panel = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const toast = useToast();

  const handleGenerate = async () => {
    if (!text || text.trim().length === 0) {
      toast({
        description: 'Text can not be empty.',
        status: 'warning',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    setLoading(true);
    try {
      const data = { inputs: text };
      toast({
        description: 'Generating Image.',
        status: 'loading',
        isClosable: true,
        position: 'top',
      });

      const response = await fetch(
        'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud',
        {
          headers: {
            Accept: 'image/png',
            Authorization:
              'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.blob();
        const url = URL.createObjectURL(result);
        setLoading(false);
        toast({
          description: 'Image Generated successfully',
          status: 'success',
          isClosable: true,
          position: 'top',
        });
        setImage(url);
      } else {
        toast({
          description: 'Error! Try Again',
          status: 'error',
          isClosable: true,
          position: 'top',
        });
        setLoading(false);
      }
    } catch (error) {
      console.log('Error in generating');
    }
  };

  return (
    <Card w={'22%'}>
      <CardBody>
        {loading ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            h={'100%'}
          >
            <Spinner />
          </Box>
        ) : image === null ? (
          <Image
            src={blank}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        ) : (
          <Image
            src={image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        )}
      </CardBody>
      <Divider w={'90%'} marginX={'auto'} />
      <CardFooter w={'100%'}>
        <VStack w={'100%'}>
          <Input
            placeholder="Enter text to generate"
            size="lg"
            w={'100%'}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <Button
            variant="solid"
            colorScheme="purple"
            w={'100%'}
            onClick={handleGenerate}
          >
            Generate Comic
          </Button>
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default Panel;
