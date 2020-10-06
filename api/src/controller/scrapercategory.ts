export interface CategoryFinder {
    gotoCategories(p: any): void;
    setProductsSelector(): string;
    setPricesSelector(): string;
    getProductDetailed(p: any, ps: string, rs: string): any;
}

export const method = 'https://www.';

export class KochCategories implements CategoryFinder {
    private storeURL: string = `${method}superkoch.com.br/`;

    async gotoCategories(page: any) {
        await page.goto(this.storeURL);
    }

    async getProductDetailed(page: any, ps: string, rs: string): Promise<any[]> {
        const categories = ['mercearia', 'hortifruti', 'bebidas', 'carnes', 'frios-laticinios'];
        let products: any[] = [];
        let prices: any[] = [];


        for(let c of categories) {
            await page.goto(this.storeURL + 'categoria/' + c);
            await page.waitForSelector(ps, { timeout: 300000 });

            const p = await page.$$(ps);
            const r = await page.$$(rs);

            products.push(await getText(page, p));
            prices.push(await getText(page, r));
        }

        return [ products, prices ];
    }

    setProductsSelector() {
        return 'div.title > a.ng-binding';
    }

    setPricesSelector() {
        return 'div.preco-por';
    }
}

export class AngeloniCategories implements CategoryFinder {
    private storeURL: string = `${method}angeloni.com.br/super/`;

    async gotoCategories(page: any) {
        await page.goto(this.storeURL);
    }

    async getProductDetailed(page: any, ps: string, rs: string): Promise<any[]> {
        const categories = [
            'mercearia/_/N-1x2wbkb', 
            'hortifruti/_/N-1vhgeps', 
            'bebidas/_/N-ncgb5d', 
            'carnes-aves-e-peixes/_/N-281ej9', 
            'frios/_/N-1x4tm5e',
            'laticinios/_/N-1j7ba6b'
        ];

        let products: any[] = [];
        let prices: any[] = [];


        for(let c of categories) {
            await page.goto(this.storeURL + 'c/' + c);
            await page.waitForSelector(ps, { timeout: 300000 });

            const p = await page.$$(ps);
            const r = await page.$$(rs);

            products.push(await getText(page, p));
            prices.push(await getText(page, r));
        }

        return [ products, prices ];
    }

    setProductsSelector() {
        return 'h2.box-produto__desc-prod';
    }

    setPricesSelector() {
        return 'div.box-produto__preco';
    }
}

export class MeschkeCategories implements CategoryFinder {
    async gotoCategories(page: any) {
        await page.goto(`${method}meschke.com.br/busca/*`);
    }

    async navigate(page: any, n = 0): Promise<any> {
        if(n > 10) return 0;
        await page.evaluate(`window.scroll({ top: ${2000 * n}, behavior: "smooth" })`);
        await page.waitFor(3000);
        return this.navigate(page, n + 1);
    }

    async getProductDetailed(page: any, ps: string, rs: string): Promise<any[]> {
        let products: any[] = [];
        let prices: any[] = [];

        await this.navigate(page);

        const p = await page.$$(ps);
        const r = await page.$$(rs);

        products.push(await getText(page, p));
        prices.push(await getText(page, r));

        return [ products, prices ];
    }

    setProductsSelector() {
        return 'span.description-text';
    }

    setPricesSelector() {
        return 'div.active-price-box ';
    }
}

export const storeName = ['superkoch', 'angeloni', 'meschke'];

export const getStore: any = {
    'superkoch': new KochCategories(),
    'angeloni': new AngeloniCategories(),
    'meschke': new MeschkeCategories()
};

export const getText = async (page: any, pList: any[]) => {
    let temp = await Promise.all(pList.map(async (pd: any) => 
        await page.evaluate((el: any) => el.innerText.replace(/\n/g, ''), pd)
    ));

    return temp;
}