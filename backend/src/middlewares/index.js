import { promisify } from 'util';
import jwt from 'jsonwebtoken';

const MISSING_TOKEN_ERROR_MESSAGE = 'No token provided';
const BEARER_TOKEN = 'Bearer';

const getTokenFromRequestHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === BEARER_TOKEN) {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
};

export const isAuthenticated = async (req, res, next) => {
  const token = getTokenFromRequestHeader(req);
  if (!token) {
    return res.status(401).json({ message: MISSING_TOKEN_ERROR_MESSAGE })
  }

  const { id } = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET);
  req.currentUserId = id;

  return next();
};
