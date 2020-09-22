import { Repository, getRepository } from 'typeorm';

import { SuperUser } from '../entities/user';

export class Controller {
    read(request: any, response: any) {
        const { id } = request.params;
        const user = repository();

        respond(response, user.findOne(id));
    }

    create(request: any, response: any) {
        const user = repository();

        const {
            name,
            email,
            image
        } = request.body;

        if(!name || !email) return response.status(400).json({ error: 'Faltam dados!' });

        const userObj = new SuperUser();
        const date = new Date();

        userObj.name = name;
        userObj.email = email;
        userObj.image = image ? image : 'false';
        userObj.createdAt = date.getTime();
        userObj.updatedAt = date.getTime();

        respond(response, user.save(userObj));
    }

    signin(request: any, response: any) {
        const { email } = request.body;
        const user = repository();

        respond(response, user.findOne({ email }));
    }

    async update(request: any, response: any) {
        const { id } = request.params;
        const {
            name,
            email,
            image
        } = request.body;

        const user = repository();

        const userData = await user.findOne(id);

        if(name) userData.name = name;
        if(email) userData.email = email;
        if(image) userData.image = image;

        respond(response, user.save(userData));
    }

    delete(request: any, response: any) {
        const { id } = request.params;
        const user = repository();
        respond(response, user.delete({ id }));
    }
}

export const respond = (response: any, fn: any) => {
    fn
    .then((data: any) => response.status(200).json(data))
    .catch((err: any) => response.status(400).json({ error: 'Falhou!' }));
}

export const repository = (): Repository<SuperUser> => getRepository(SuperUser);
