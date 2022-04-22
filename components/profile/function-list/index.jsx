import { Box } from '@chakra-ui/react';

import FunctionItem from './function-item';

const FunctionList = () => {
  return (
    <Box display="flex" flexDir="column">
      <FunctionItem href="/profile">個人資訊</FunctionItem>
      <FunctionItem href="/profile">管理密碼</FunctionItem>
      <FunctionItem
        onClick={() => {
          console.log('click');
        }}
      >
        登出
      </FunctionItem>
    </Box>
  );
};

export default FunctionList;
