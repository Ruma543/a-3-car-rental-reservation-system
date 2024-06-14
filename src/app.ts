import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/ruotes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHandaler';
import notFound from './app/middleware/noFoundError';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5000'],
  })
);

app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Car rental reservation system');
});
app.use(globalErrorHandler);
app.use(notFound);


export default app;
