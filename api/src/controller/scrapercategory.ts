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
        return 'h2.box-produto__desc-prod';
    }

    setPricesSelector() {
        return 'div.box-produto__preco';
    }
}

export class MeschkeCategories implements CategoryFinder {
    async gotoCategories(page: any, storeURL: string) {
        await page.goto(`${storeURL}/busca/*`);
    }

    setProductsSelector() {
        return 'span.description-text';
    }

    setPricesSelector() {
        return 'div.active-price-box ';
    }
}

export class CarrefourCategories implements CategoryFinder {
    async gotoCategories(page: any, storeURL: string) {
        await page.goto(`${storeURL}/alimentos-e-bebidas`);
    }

    setProductsSelector() {
        return 'h2.carrefourbr-carrefour-components-0-x-productName';
    }

    setPricesSelector() {
        return 'span.vtex-store-components-3-x-sellingPrice';
    }
}

export class GenericCategories implements CategoryFinder {
    async gotoCategories(page: any, storeURL: string) {
        await page.goto(`${storeURL}/categoria/todos`);
    }

    setProductsSelector() {
        return '.title';
    }

    setPricesSelector() {
        return '.price';
    }
}