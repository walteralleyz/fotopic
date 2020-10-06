import Scraper from './scraper';
import fs from 'fs';

import { getStore } from './scrapercategory';

class ScraperManager extends Scraper {
    private productList: string[];
    private priceList: string[];

    constructor() {
        super();
    }

    // Factory Method
    createStore() {
        this.storeManager = getStore[this.store];
    }

    async getProducts() {
        let products: any, prices;

        await this.page
        .waitForSelector(this.productsSelector, { timeout: 300000 })
        .then(async () => {
            const [ products, prices ]: any[] = await this.storeManager
                .getProductDetailed(this.page, this.productsSelector, this.pricesSelector);

            this.productList = products;
            this.priceList = prices;
        });
    }

    saveStore() {
        let text = '';

        for(let i = 0; i < this.productList.length; i++) {
            for(let j = 0; j < this.productList[i].length; j++) {
                text += `${this.productList[i][j]} ${this.priceList[i][j]} \n`;
            }
        }

        fs.writeFile(`${__dirname}/../../data/${this.store}.txt`, text, 'utf8' , (err) => {
            if(err) throw new Error(`PersistError: Não foi possivel salvar o arquivo! \n${err}`);
            console.log(`${this.store} salvo!`);
        });
    }
}

export default ScraperManager;