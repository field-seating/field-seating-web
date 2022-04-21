import { Box } from '@chakra-ui/react';

import useAuth from 'lib/hooks/userAuth';
import ProfileHeader from 'components/profile/ProfileHeader';

const ProfilePage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');

  return (
    <>
      {isLoggedIn && (
        <Box display="flex" flexDir="column">
          LOGIN
        </Box>
      )}
    </>
  );
};

ProfilePage.getLayout = (children) => <ProfileHeader>{children}</ProfileHeader>;

export default ProfilePage;
