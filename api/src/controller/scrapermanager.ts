import Scraper from './scraper';

class ScraperManager extends Scraper {
    constructor() {
        super();
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

        await this.page
        .waitForSelector(this.productsSelector, { timeout: 60000 })
        .then(async () => {
            products = await this.page.$$(this.productsSelector);
            prices = await this.page.$$(this.pricesSelector);
            
            for (const product of products) {
                const label = await this.page.evaluate((el: any) => el.innerText, product);

                console.log(label);
            }

            for (const price of prices) {
                const label = await this.page.evaluate((el: any) => el.innerText, price);

                console.log(label);
            }
        });
    }
}