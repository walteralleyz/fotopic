export interface CategoryFinder {
    gotoCategories(p: any, u: string): void;
    setProductsSelector(): string;
    setPricesSelector(): string;
}

export class KochCategories implements CategoryFinder {
    async gotoCategories(page: any, storeURL: string) {
        await page.goto(`${storeURL}/categoria/todos`);
    }

    setProductsSelector() {
        return 'div.title > a.ng-binding';
    }

    setPricesSelector() {
        return 'div.preco-por';
    }
}

export class AngeloniCategories implements CategoryFinder {
    async gotoCategories(page: any, storeURL: string) {
        await page.goto(`${storeURL}/super/c/todos`);
    }

    setProductsSelector() {
        return 'div.title > a.ng-binding';
    }

    setPricesSelector() {
        return 'div.preco-por';
    }
}

export class MeschkeCategories implements CategoryFinder {
    async gotoCategories(page: any, storeURL: string) {
        await page.goto(`${storeURL}/busca/*`);
    }

    setProductsSelector() {
        return 'div.title > a.ng-binding';
    }

    setPricesSelector() {
        return 'div.preco-por';
    }
}

export class CarrefourCategories implements CategoryFinder {
    async gotoCategories(page: any, storeURL: string) {
        await page.goto(`${storeURL}/alimentos-e-bebidas`);
    }

    setProductsSelector() {
        return 'div.title > a.ng-binding';
    }

    setPricesSelector() {
        return 'div.preco-por';
    }
}

export class GenericCategories implements CategoryFinder {
    async gotoCategories(page: any, storeURL: string) {
        await page.goto(`${storeURL}/categoria/todos`);
    }

    setProductsSelector() {
        return 'div.title > a.ng-binding';
    }

    setPricesSelector() {
        return 'div.preco-por';
    }
}