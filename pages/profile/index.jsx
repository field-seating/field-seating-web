import { Box } from '@chakra-ui/react';

import useAuth from 'lib/hooks/userAuth';
import ProfileHeader from 'components/profile/profile-header';
import FunctionList from 'components/profile/function-list';

const ProfilePage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');

  return (
    <>
      {isLoggedIn && (
        <Box>
          <FunctionList />
        </Box>
      )}
    </>
  );
};

ProfilePage.getLayout = (children) => <ProfileHeader>{children}</ProfileHeader>;

export default ProfilePage;
