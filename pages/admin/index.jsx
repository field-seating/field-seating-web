import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import useAuth, { AUTH_TYPE } from 'lib/hooks/user-auth';

const AdminPage = () => {
  const { isAdmin } = useAuth('/profile', AUTH_TYPE.ADMIN);

  return (
    <>
      <Head>
        <title>管理員 | 球場坐座</title>
      </Head>
      {isAdmin && <Box>管理員才能看</Box>}
    </>
  );
};

export default AdminPage;
