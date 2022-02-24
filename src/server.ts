import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { errorHandler, logger } from './middleware/app';
import router from './routes';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';
const { PORT } = process.env;

app.use(bodyParser.json());

app.use(logger);
app.use(router);
app.use(errorHandler);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`starting app on: ${address}`);
});


export default app;