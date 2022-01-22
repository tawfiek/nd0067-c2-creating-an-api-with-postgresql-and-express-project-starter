import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { errorHandler, logger } from './middleware/app';
import router from './routes';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.use(logger);
app.use(router);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
    });

app.listen(3000, () => {
        console.log(`starting app on: ${address}`);
    });
