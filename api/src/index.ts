import express from "express";
import morgan from 'morgan';
import bodyParser  from 'body-parser';
import path from 'path';
import cors from 'cors';

import { connect } from './helpers/orm';
import { routes as userRoutes } from './routes/user';
import { routes as itemRoutes } from './routes/itemList';
import { routes as emailRouter } from './routes/email';
import { routes as scraperRouter } from './routes/scraper';

const app: any = express();
const port: string | number = process.env.PORT || 5000;

connect();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public'));

app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/email', emailRouter);
app.use('/api/scrap', scraperRouter);

app.get('*', (request: any ,response: any) =>{
    response.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.listen(port, () => console.log('Listen at port %d', port));
