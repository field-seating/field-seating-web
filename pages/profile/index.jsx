import { Box } from '@chakra-ui/react';

import useAuth from 'lib/hooks/userAuth';

const ProfilePage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');

  return (
    <>
      {isLoggedIn && (
        <Box display="flex" flexDir="column" px={[4, 16]} py={4}>
          LOGIN
        </Box>
      )}
    </>
  );
};

export default ProfilePage;
