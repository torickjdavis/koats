import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import Koa from 'koa';
import c2k from 'koa-connect';
import morgan from 'morgan';

dotenv.config();

function ensureEnvironmentSet() {
  const { NODE_ENV } = process.env;
  if (!NODE_ENV) throw new Error('NODE_ENV Unset');
  if (!['prod', 'dev'].includes(NODE_ENV)) throw new Error('Invalid NODE_ENV');
}

function server() {
  ensureEnvironmentSet();

  const { PORT = '8080', HOST = 'localhost' } = process.env;
  const app = new Koa();

  app.use(c2k(morgan(process.env.NODE_ENV === 'dev' ? 'dev' : 'common')));
  app.use(c2k(helmet()));
  app.use(c2k(cors()));

  app.use(async (ctx) => {
    ctx.body = 'Hello, World';
  });

  app.listen({ port: PORT, host: HOST }, () => {
    console.log(`server listening at http://${HOST}:${PORT}`);
  });
}

if (require.main === module) server();
