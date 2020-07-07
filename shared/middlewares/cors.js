// @flow
import cors from 'cors';

export const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? [
          'https://www.parabaik.com',
          'https://alpha.parabaik.com',
          'https://admin.parabaik.com',
          'https://hyperion.workers.parabaik.com',
          'https://hyperion.alpha.parabaik.com',
          process.env.NOW_URL,
        ].filter(Boolean)
      : [/localhost/],
  credentials: true,
};

export default cors(corsOptions);
