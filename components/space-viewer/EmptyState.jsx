import { Box, Heading, Text } from '@chakra-ui/react';

const EmptyState = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h2">選擇座位</Heading>
      <Text>由右上方篩選器篩選區域</Text>
    </Box>
  );
};

export default EmptyState;
