import express, { Application, Request, Response } from 'express';
import { usersRouter } from './routers/user.route';
import { productRouter } from './routers/product.route';
import { orderRouter } from './routers/order.route';

const app: Application = express();

app.use(express.json());
app.use([usersRouter, productRouter, orderRouter]);

const PORT: number = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));

export default app;
