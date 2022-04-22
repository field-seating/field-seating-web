import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMachine } from '@xstate/react';

import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import useSnackbar from 'components/ui/snackbar';

import machine from './machine';

const getElement = (state) => {
  if (state.matches('success')) {
    return {
      headingText: '信箱已驗證成功',
      content: <Text size="md">跳轉至登入頁面...</Text>,
    };
  }

  if (state.matches('failure')) {
    return {
      headingText: '信箱驗證失敗',
      content: <Text size="md">請再次確認連結</Text>,
    };
  }

  return {
    headingText: '信箱驗證中...',
    content: (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primay.main"
        boxSize="40"
      />
    ),
  };
};

const VerifyEmailTokenPage = () => {
  const router = useRouter();
  const [current, send, service] = useMachine(machine);
  const snackbar = useSnackbar();

  const { token } = router.query;

  useEffect(() => {
    send({ type: 'VERIFY', token });
  }, [token, send]);

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      if (state.matches('failure')) {
        snackbar({ text: state.context.globalErrorMsg, variant: 'error' });
      }
      if (state.matches('success')) {
        router.push('/profile');
        router.reload();
      }
    });

    return subscription.unsubscribe;
  }, [service, router, snackbar]);

  const element = getElement(current);

  return (
    <Box pt="14" display="flex" flexDir="column" alignItems="center">
      <Heading as="h2" size="lg" mb="9">
        {element.headingText}
      </Heading>
      {element.content}
    </Box>
  );
};

export default VerifyEmailTokenPage;
