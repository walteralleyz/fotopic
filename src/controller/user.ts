import { Repository, getRepository } from 'typeorm';

import { User } from '../entities/user';

export class Controller {
    read(request: any, response: any) {
        const { id } = request.params;
        const user: Repository<User> = getRepository(User);

        user.findOne(id)
        .then(data => {
            response.status(200).json(data);
        })
        .catch(err => response.status(400).json({ error: 'Usuário não encontrado!' }));
    }

    create(request: any, response: any) {
        const user: Repository<User> = getRepository(User);

        const {
            name,
            email,
            description,
            image
        } = request.body;

        if(!name || !email) return response.status(400).json({ error: 'Faltam dados!' });

        const userObj = new User();
        const date = new Date();

        userObj.name = name;
        userObj.email = email;
        userObj.description = description ? description : 'false';
        userObj.image = image ? image : 'false';
        userObj.createdAt = date.getTime();
        userObj.updatedAt = date.getTime();

        user.save(userObj)
        .then(data => {
            response.status(200).json(data);
        })
        .catch(err => response.status(400).json({ error: 'Falhou!' }));
    }

    signin(request: any, response: any) {
        const { email } = request.body;
        const user: Repository<User> = getRepository(User);

        user.findOne({ email })
        .then(data => response.status(200).json({ data: data.email }))
        .catch(err => response.status(403).json({ error: 'Não encontrado!' }));
    }

    async update(request: any, response: any) {
        const { id } = request.params;
        const {
            name,
            email,
            description,
            image
        } = request.body;

        const user: Repository<User> = getRepository(User);

        const userData = await user.findOne(id);

        if(name) userData.name = name;
        if(email) userData.email = email;
        if(description) userData.description = description;
        if(image) userData.image = image;

        user.save(userData)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({ error: 'Usuário não encontrado!' }));
    }

    async delete(request: any, response: any) {
        const { id } = request.params;

        const user: Repository<User> = getRepository(User);

        const userData = await user.delete({ id });

        response.status(200).json(userData);
    }
}