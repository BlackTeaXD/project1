import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import { readFileSync } from 'fs';
import YAML from 'yaml';
import mongoose from 'mongoose';

import { authenticationRouter } from './authentication';
import { userRouter } from './user';

const app = express();
const swaggerDocs = YAML.parse(readFileSync('docs/index.yaml', 'utf-8'));

app.use(cors());
app.use(bodyParser.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(authenticationRouter);
app.use(userRouter);

mongoose.connect(process.env.DB_URL).then((connection) => {
  console.log('Database connection established');
  app.listen(8080, () => {
    console.log('Server is listening on port 8080');
  });
});
