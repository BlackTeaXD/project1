import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenTtl: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  };
});
