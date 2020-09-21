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
        const post: Repository<Post> = getRepository(Post);

        if(!email || !text) return response.status(400).json({ error: 'Parametros em falta!' });

        const user: Repository<FotoUser> = getRepository(FotoUser);
        const userData = await user.findOne({ email });

        postSchema.text = text;
        postSchema.image = image ? image : 'false';
        postSchema.user = userData;

        post.save(postSchema)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({ error: 'Falhou!' }));
    }

    // read(request: any, response: any) {}
    // update(request: any, response: any) {}
    // delete(request: any, response: any) {}
}