import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import useAuth, { AUTH_TYPE } from 'lib/hooks/user-auth';

import ReportTable from 'components/report-table';

const ReportsPage = () => {
  const { isAdmin } = useAuth('/profile', AUTH_TYPE.ADMIN);

  return (
    <>
      <Head>
        <title>管理照片 | 球場坐座</title>
      </Head>
      {isAdmin && (
        <Box pt={4} px={12}>
          <ReportTable />
        </Box>
      )}
    </>
  );
};

export default ReportsPage;
