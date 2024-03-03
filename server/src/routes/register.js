import { Router } from 'express';
const registerRouter = Router();

import { saveNewUser } from '../utils/saveNewUser';

registerRouter.post('/', async (req, res) => {
    try {
        const { username } = req.body;

        await saveNewUser(username, '');

        res.json({
            status: 'ok',
            msg: 'Пользователь добавлен!',
            user: username
        });
    } catch (error) {
        console.log(error);
    }
});

export { registerRouter };