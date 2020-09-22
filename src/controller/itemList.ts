import { Repository, getRepository } from 'typeorm';
import { ItemList } from '../entities/itemList';
import { SuperUser } from '../entities/user';

export class Controller {
    async create(request: any, response: any) {
        const { email, store } = request.body;

        const postSchema: ItemList = new ItemList();
        const post = repository();
        const items = getItems(request);
        const date = new Date();

        if(!store || !email || !items) return response.status(400).json({ error: 'Parametros em falta!' });

        const user: Repository<SuperUser> = getRepository(SuperUser);
        const userData = await user.findOne({ email });

        postSchema.store = store;
        postSchema.items = JSON.stringify(items);
        postSchema.user = userData;
        postSchema.createdAt = date.getTime();
        postSchema.updatedAt = date.getTime();

        respond(response, post.save(postSchema));
    }

    read(request: any, response: any) {
        const {id} = request.params;
        const post = repository();
        respond(response, post.find({ where: { user: id }}));
    }

    async update(request: any, response: any) {
        const {id} = request.params;
        const post = repository();

        const { store } = request.body;
        const date = new Date();

        const postData = await post.findOne(id);
        const items = getItems(request);

        if(store) postData.store = store;
        if(items) postData.items = JSON.stringify(items);

        postData.updatedAt = date.getTime();

        respond(response, post.save(postData));
    }

    delete(request: any, response: any) {
        const {id} = request.params;

        const post = repository();
        respond(response, post.delete(id));
    }
}

export const respond = (response: any, fn: any) => {
    fn
    .then((data: any) => response.status(200).json(data))
    .catch((err: any) => response.status(400).json({ error: 'Falhou!' }));
};

export const repository = (): Repository<ItemList> => getRepository(ItemList);

export const getItems = (request: any): object | boolean => {
    let items: boolean | object = false;

    const {
        section,
        item,
        quantity,
        type
    } = request.body;

    if(!isObject(section) || !isObject(item) || !isObject(quantity) || !isObject(type)) return items;

    if(section && item && quantity && type) {
        if(section.length > 0
        &&  sameLength(item, section)
        &&  sameLength(quantity, section)
        &&  sameLength(type, section)) {
            items = { section, item, quantity, type }; 
        }
    }

    return items;
};

export const isObject = (field: any) => typeof field === 'object';
export const sameLength = (entry: [], referer: []) => entry.length === referer.length;