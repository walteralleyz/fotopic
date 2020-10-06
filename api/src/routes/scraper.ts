import { Request, Response, Router } from 'express';
import ScraperManager from '../controller/scrapermanager';
import { storeName } from '../controller/scrapercategory';
import { verifyJWT } from '../controller/auth';

const scraper = (request: Request, response: Response) => {
    const { store } = request.params;
    const scraperManager: ScraperManager = new ScraperManager();

    scraperManager.setStore(store);
    scraperManager.createStore();
    scraperManager.main();

    response.status(201).json({ success: 'Buscando' });
};

const retrieve = (request: Request, response: Response) => {
    const { store } = request.params;
    const scraperManager: ScraperManager = new ScraperManager();

    const data = scraperManager.getStoreData(store);

    response.status(201).json({ success: data });
};

export const routes = [
    Router().get('/start/:store', verifyJWT, scraper),
    Router().get('/retrieve/:store', verifyJWT, retrieve),
    Router().get('/', verifyJWT, (req: any, res: any) => res.status(200).json({ storeName }))
];