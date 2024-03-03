import { Router } from 'express';

import jwt from 'jsonwebtoken'
import { findUser } from '../utils/findUser';

const authRouter = Router();
const jwtSecret = 'c83d1702a29230d5ce67db4cc9d0a62e2b65129d667cb3500660d8a71c31ab6d';
const jwtExpirySeconds = 3600;


authRouter.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existUser = await findUser(username);
        
        if (!existUser)
            return res.status(404).send('Пользователь не найден');

        if (existUser.block)
            return res.status(403).send('Пользователь заблокирован');

        if (existUser.password !== password)
            return res.status(401).send('Неверный пароль');

        const token = jwt.sign({ existUser }, jwtSecret, {
            algorithm: "HS256",
		    expiresIn: jwtExpirySeconds,
        });

        res.json({
            status: 'ok',
            msg: 'Вы успешно залогинились!',
            user: {
                username: username
            },
            token,
        });
    } catch (error) {
        console.log(error);
    }
});

authRouter.get('/:username', async (req, res) => {
    try {
        let token = req.headers.authorization;

        token = token.split(' ')[1];

        const payload = jwt.verify(token, jwtSecret);

        const { username } = req.params;

        const existUser = await findUser(username);
        
        if (!existUser)
            return res.sendStatus(404);

        res.json({
            status: 'ok',
            msg: 'Пользователь найден',
            user: {
                username: existUser.username,
                block: existUser.block
            }
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError)
            return res.status(401).end();

        console.log(error);
    }
});

export { authRouter };