import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import useAuth from 'lib/hooks/user-auth';
import ProfileHeader from 'components/profile/profile-header';
import FunctionList from 'components/profile/function-list';

const ProfilePage = () => {
  const { isLoggedIn, isAdmin } = useAuth('/profile/sign-in');

  return (
    <>
      <Head>
        <title>個人帳號 | 球場坐座</title>
      </Head>
      {isLoggedIn && (
        <Box>
          <FunctionList isAdmin={isAdmin} />
        </Box>
      )}
    </>
  );
};

ProfilePage.getLayout = (children) => <ProfileHeader>{children}</ProfileHeader>;

export default ProfilePage;
