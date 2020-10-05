import { Request, Response, Router } from 'express';
import ScraperManager from '../controller/scrapermanager';
import { verifyJWT } from '../controller/auth';

const scraper = (request: Request, response: Response) => {
    const { store } = request.params;
    const scraperManager: ScraperManager = new ScraperManager();

    scraperManager.setStore(store);
    scraperManager.createStore();
    scraperManager.main();

    response.status(201).json({ success: 'Buscando' });
};

export const routes = [
    Router().get('/:store', verifyJWT, scraper)
];