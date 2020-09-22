import { response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { Post } from '../entities/post';
import { FotoUser } from '../entities/user';

export class Controller {
    async create(request: any, response: any) {
        const {
            email,
            text,
            image
        } = request.body;

        const postSchema: Post = new Post();
        const post = repository();

        if(!email || !text) return response.status(400).json({ error: 'Parametros em falta!' });

        const user: Repository<FotoUser> = getRepository(FotoUser);
        const userData = await user.findOne({ email });

        postSchema.text = text;
        postSchema.image = image ? image : 'false';
        postSchema.user = userData;

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

        const {
            text,
            image
        } = request.body;

        const postData = await post.findOne(id);

        if(text) postData.text = text;
        if(image) postData.image = image;

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
}

export const repository = (): Repository<Post> => getRepository(Post);