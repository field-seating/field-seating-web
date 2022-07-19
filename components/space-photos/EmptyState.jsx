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
      <Heading as="h2">尚無座位照片</Heading>
      <Text>期待你的分享</Text>
    </Box>
  );
};

export default EmptyState;
