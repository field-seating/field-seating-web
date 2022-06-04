import { Box, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { defaultTo, prop, find, compose } from 'ramda';

import { tabList } from 'lib/constants/route';
import matchRoute from 'lib/utils/match-route';

const renderButton = (tab, isActive) => {
  return (
    <NextLink key={tab.id} href={tab.pathname} passHref>
      <IconButton
        as="a"
        flex="1"
        _hover={{
          bg: 'primary.main',
        }}
        _active={{
          bg: undefined,
          color: 'onPrimary.main',
        }}
        _focus={{
          boxShadow: undefined,
        }}
        icon={<tab.Icon />}
        aria-label={tab.label}
        borderRadius={0}
        h="56px"
        bg="primary.main"
        color="onPrimary.transparent"
        isActive={isActive}
      />
    </NextLink>
  );
};

const BottomNavigation = () => {
  const router = useRouter();

  const findFunc = compose(
    matchRoute({ exact: false })(router),
    prop('pathname')
  );
  const matchFunc = compose(prop('id'), defaultTo({}), find(findFunc));

  const matchId = matchFunc(tabList);

  return (
    <Box as="nav" display="flex">
      {tabList.map((tab) => renderButton(tab, tab.id === matchId))}
    </Box>
  );
};

export default BottomNavigation;
