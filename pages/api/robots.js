import { getEnv } from 'lib/utils/context';

const getContent = (env) => {
  if (env === 'production') {
    return `User-agent: * 
Disallow: /api/*
Disallow: /profile/*
Allow: /
`;
  }

  return `User-agent: * 
Disallow: /*
`;
};

export default function handler(_, res) {
  const content = getContent(getEnv());
  res.send(content);
}
