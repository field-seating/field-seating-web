import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { defaultTo, prop, find, compose } from 'ramda';

import { tabList } from 'lib/constants/route';
import matchRoute from 'lib/utils/match-route';
import BottomNavigationButton from './ui/bottom-navigation-button';

const renderButton = (tab, isActive) => {
  if (tab.Component) {
    return <tab.Component key={tab.id} isActive={isActive} />;
  }

  return (
    <NextLink key={tab.id} href={tab.pathname} passHref>
      <Link flex={1}>
        <BottomNavigationButton
          icon={<tab.Icon />}
          label={tab.label}
          isActive={isActive}
        />
      </Link>
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
