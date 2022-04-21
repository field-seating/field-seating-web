import { Box, Heading } from '@chakra-ui/react';

const ProfileHeader = ({ children }) => {
  return (
    <Box display="flex" flexDir="column" px={[4, 16]} py={4}>
      <Box h={90}>
        <Heading as="h2" size="lg" color="onSurface.main">
          {`你好，歡迎加入`}
        </Heading>
      </Box>
      {children}
    </Box>
  );
};

export default ProfileHeader;
