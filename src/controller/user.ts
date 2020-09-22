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

        let userObj = new SuperUser();
        const date = new Date();

        userObj = createRoutine(userObj, request, date.getTime(), date.getTime());

        respond(response, user.save(userObj));
    }

    signin(request: any, response: any) {
        const { email } = request.body;
        const user = repository();

        respond(response, user.findOne({ email }));
    }

    async update(request: any, response: any) {
        const { id } = request.params;

        const user = repository();
        const date = new Date();
        let userData = await user.findOne(id);

        userData = createRoutine(userData, request, userData.createdAt, date.getTime());

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

export const createRoutine = (user: SuperUser, request: any, created: number, updated: number): SuperUser => {
    const { name, email, image } = request.body;

    user.name = name;
    user.email = email;
    user.image = image ? image : 'false';
    user.createdAt = created;
    user.updatedAt = updated;

    return user;
}