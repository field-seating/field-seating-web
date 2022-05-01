import { Box } from '@chakra-ui/react';

import InfoForm from 'components/profile/info-form';
import AppBar from 'components/ui/app-bar';

import useAuth from 'lib/hooks/user-auth';

const InfoPage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');

  return (
    <>
      {isLoggedIn && (
        <Box>
          <AppBar title="驗證信箱" hasBackward backHref="/profile" />
          <Box pt="8" px={[4, 8]}>
            <InfoForm />
          </Box>
        </Box>
      )}
    </>
  );
};

export default InfoPage;
