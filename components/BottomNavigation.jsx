import { useContext } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useActor } from '@xstate/react';
import { defaultTo, prop, find, compose, filter } from 'ramda';

import { GlobalStateContext } from 'lib/contexts/globalState';
import { tabList, authStateRouteMap } from 'lib/constants/route';
import matchRoute from 'lib/utils/match-route';
import { validateRouteByMap } from 'lib/utils/validate-route';

const BottomNavigation = () => {
  const { authService } = useContext(GlobalStateContext);
  const router = useRouter();

  const [state] = useActor(authService);
  const authState = state.value;

  const filterFunc = filter(
    compose(validateRouteByMap(authStateRouteMap)(authState), prop('pathname'))
  );
  const effectiveTabList = filterFunc(tabList);

  const findFunc = compose(
    matchRoute({ exact: false })(router),
    prop('pathname')
  );
  const matchFunc = compose(prop('id'), defaultTo({}), find(findFunc));

  const matchId = matchFunc(effectiveTabList);

  return (
    <Box as="nav" display="flex">
      {effectiveTabList.map((tab) => (
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
            isActive={tab.id === matchId}
          />
        </NextLink>
      ))}
    </Box>
  );
};

export default BottomNavigation;
