import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from './routes/userRoutes';
import { productRoutes } from './routes/productRoutes';
import { orderRoutes } from './routes/orderRoutes';
import cors from 'cors';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

const corsOptions: {
  origin: string;
  optionSuccessStatus: number;
} = {
  origin: `http://localhost: ${address}`,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/', function (req: Request, res: Response): void {
  res.send('Storefront Running Successful');
});

app.listen(3000, function (): void {
  // console.log(`starting app on: ${address}`);
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

export default app;
