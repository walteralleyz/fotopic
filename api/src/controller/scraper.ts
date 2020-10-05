import puppeteer, { Browser } from 'puppeteer';
import {
    CategoryFinder,
    KochCategories,
    AngeloniCategories,
    MeschkeCategories,
    CarrefourCategories,
    GenericCategories
} from './scrapercategory';

abstract class Scraper {
    protected browser: Browser;
    protected store: string;

    protected productsSelector: string;
    protected pricesSelector: string;

    protected storeManager: CategoryFinder;

    protected page: any;
    protected storeURL: string;

    // Template method
    async main() {
        this.productsSelector = this.storeManager.setProductsSelector();
        this.pricesSelector = this.storeManager.setPricesSelector();

        await this.start();
        await this.goto();
        await this.selectFirstResult();
        await this.storeManager.gotoCategories(this.page, this.storeURL);
        await this.getProducts();
        await this.close();
    }

    abstract selectFirstResult(): void;

    abstract getProducts(): void;

    setStore(store: string) {
        this.store = store.toLowerCase();
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

    async start() {
        this.browser = await puppeteer.launch({ headless: false });
        this.page = await this.browser.pages(); // Returns a pages array
        this.page = this.page[0]; // Capture the first page of array cause i dont need more than one
    }

    async goto() {
        const store = this.store + ' mercado';

        // Start point is google. From here we go to store name
        await this.page.goto('https://google.com');
        await this.page.$eval('input[name=q]', (el: any, value: string) => el.value = value, store);
        await this.page.type('input[name=q]', String.fromCharCode(13)); // Insert enter key
    }

    async close() {
        await this.browser.close();
    }
}

export default Scraper;