import express, { Request, Response } from 'express';
import data from './data/data.json';
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/data', (req: Request, res: Response): void => {
    const requestData = req.body;

    const { email, phone } = requestData;

    setTimeout(() => {
        const users = data.filter((data) => data.email === email && (phone ? data.number === phone : true));
        res.json({ users });
    }, 5000);
});

app.listen('3001', (): void => {
    console.log('server is alive');
});
