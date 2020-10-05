import Scraper from './scraper';
import {
    KochCategories,
    AngeloniCategories,
    MeschkeCategories,
    CarrefourCategories,
    GenericCategories
} from './scrapercategory';

class ScraperManager extends Scraper {
    constructor() {
        super();
    }

    // Factory Method
    createStore() {
        if(this.store.indexOf('koch') !== -1)
            this.storeManager = new KochCategories();
        else if(this.store.indexOf('angeloni') !== -1)
            this.storeManager = new AngeloniCategories();
        else if(this.store.indexOf('meschke') !== -1)
            this.storeManager = new MeschkeCategories();
        else if(this.store.indexOf('carrefour') !== -1)
            this.storeManager = new CarrefourCategories();
        else
            this.storeManager = new GenericCategories();
    }

    async selectFirstResult() {
        let path: number;

        await this.page
            .waitForSelector('div.yuRUbf > a')
            .then((el: any) => el.click());

        await this.page
            .waitFor(10000);
            
        this.storeURL = await this.page.url();
        path = this.storeURL.lastIndexOf('/');
        this.storeURL = this.storeURL.substring(0, path);
    }

    async getProducts() {
        let products: any, prices;
        let productList: any[] = [], priceList: any[] = [];

        await this.page
        .waitForSelector(this.productsSelector, { timeout: 60000 })
        .then(async () => {
            products = await this.page.$$(this.productsSelector);
            prices = await this.page.$$(this.pricesSelector);
            
            for (const product of products) {
                const label = await this.page.evaluate((el: any) => el.innerText, product);

                productList.push(label);
            }

            for (const price of prices) {
                const label = await this.page.evaluate((el: any) => el.innerText, price);

                priceList.push(label);
            }
        });

        for(let i = 0; i < productList.length; i++) {
            console.log(productList[i], priceList[i]);
        }
    }
}

export default ScraperManager;