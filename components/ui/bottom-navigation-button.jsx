import { IconButton } from '@chakra-ui/react';

const BottomNavigationButton = ({ as = 'button', icon, label, isActive }) => {
  return (
    <IconButton
      as={as}
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
      icon={icon}
      aria-label={label}
      role="button"
      cursor="pointer"
      borderRadius={0}
      h="56px"
      w="100%"
      bg="primary.main"
      color="onPrimary.transparent"
      isActive={isActive}
    />
  );
};

export default BottomNavigationButton;
