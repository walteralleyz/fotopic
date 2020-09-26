import { Repository, getRepository } from 'typeorm';
import { ItemList } from '../entities/itemList';
import { SuperUser } from '../entities/user';

export class Controller {
    async create(request: any, response: any) {
        const { email } = request.body;

        let postSchema: ItemList = new ItemList();
        const post = repository();
        const date = new Date();

        const user: Repository<SuperUser> = getRepository(SuperUser);
        const userData = await user.findOne({ email });

        postSchema.user = userData;
        postSchema = createRoutine(postSchema, request, date.getTime(), date.getTime());

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
        const date = new Date();

        let postData = await post.findOne(id);
        postData = createRoutine(postData, request, postData.createdAt, date.getTime());

        respond(response, post.save(postData));
    }

    async delete(request: any, response: any) {
        const {id} = request.params;

        const post = repository();
		const target = await post.findOne(id);

        respond(response, post.remove(target));
    }
}

export const respond = (response: any, fn: any) => {
    fn
    .then((data: any) => response.status(200).json(data))
    .catch((err: any) => response.status(400).json({ error: 'Falhou!' }));
};

export const repository = (): Repository<ItemList> => getRepository(ItemList);

export const getItems = (section: [], item: [], quantity: [], type: []): object | boolean => {
    let items: boolean | object = false;

    if(sameLength(item, section) &&  sameLength(quantity, section) &&  sameLength(type, section)) {
        items = { section, item, quantity, type }; 
    }

    return items;
};

export const sameLength = (entry: [], referer: []) => entry.length === referer.length;

export const createRoutine = (items: ItemList, request: any, created: number, updated: number): ItemList => {
    const { store, section, item, quantity, type } = request.body;
    const JSONItem = getItems(section, item, quantity, type);

    items.store = store;
    items.items = JSON.stringify(JSONItem);
    items.createdAt = created;
    items.updatedAt = updated;

    return items;
}
