import puppeteer, { Browser } from 'puppeteer';
import { CategoryFinder } from './scrapercategory';

abstract class Scraper {
    protected browser: Browser;
    protected store: string;

    protected productsSelector: string;
    protected pricesSelector: string;

    protected storeManager: CategoryFinder;

    protected page: any;
    protected options = {
        headless: false,
        width: 1024,
        height: 768
    }

    // Template method
    async main() {
        this.productsSelector = this.storeManager.setProductsSelector();
        this.pricesSelector = this.storeManager.setPricesSelector();

        await this.start();
        await this.storeManager.gotoCategories(this.page);
        await this.getProducts();
        await this.saveStore();
        await this.close();
    }

    abstract getProducts(): void;

    abstract createStore(): void;

    abstract saveStore(): void;

    setStore(store: string) {
        this.store = store.toLowerCase();
    }

    async start() {
        this.browser = await puppeteer.launch({ 
            headless: this.options.headless,
            args: [`--window-size=${this.options.width},${this.options.height}`] 
        });

        this.page = await this.browser.pages(); // Returns a pages array
        this.page = this.page[0]; // Capture the first page of array cause i dont need more than one

        await this.page.setViewport({
            width: this.options.width,
            height: this.options.height
        });
    }

    async close() {
        await this.browser.close();
    }
}

export default Scraper;