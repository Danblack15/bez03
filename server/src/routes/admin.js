import { Router } from 'express';
const adminRouter = Router();

import fs from 'fs';
import jwt from 'jsonwebtoken'
import { changePass } from '../utils/changePass';
import { toggleBlock } from '../utils/toggleBlock';
import { passwordOption } from '../utils/passwordOption';

const filePath = 'src/data.json';
const jwtSecret = 'c83d1702a29230d5ce67db4cc9d0a62e2b65129d667cb3500660d8a71c31ab6d';

adminRouter.post('/changePass', async (req, res) => {
    try {
        let token = req.headers.authorization;

        token = token.split(' ')[1];

        jwt.verify(token, jwtSecret);
        
        const { oldPassword, newPassword, username } = req.body;

        const result = await changePass(oldPassword, newPassword, username);

        console.log(result);

        return res.status(result.value ? 200 : 403).send(result.message);

    } catch (error) {
        console.log(error);
    }
});

adminRouter.get('/allUsers', async (req, res) => {
    try {
        let token = req.headers.authorization;

        token = token.split(' ')[1];

        const payload = jwt.verify(token, jwtSecret);

        if (payload.existUser.username !== 'ADMIN')
            return res.status(401).end()

        const usersData = fs.readFileSync(filePath, 'utf8', async (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            return JSON.parse(data);
        });
        
        res.json({
            status: 'ok',
            data: usersData
        })
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError)
            return res.status(401).end();
        
        console.log(error);
    }
});

adminRouter.post('/block/:userName', async (req, res) => {
    try {
        let token = req.headers.authorization;
        console.log(token);
        token = token.split(' ')[1];

        const payload = jwt.verify(token, jwtSecret);

        if (payload.existUser.username !== 'ADMIN')
            return res.status(401).end()

        const { userName } = req.params;
        let { block } = req.query;

        block = block === 'true'

        await toggleBlock(block, userName);
        
        res.send({
            status: 'ok',
            username: userName,
            block: block
        })
    } catch (error) {
        console.log(error);
    }
});

adminRouter.post('/passwordOption/:userName', async (req, res) => {
    try {
        let token = req.headers.authorization;

        token = token.split(' ')[1];

        const payload = jwt.verify(token, jwtSecret);

        if (payload.existUser.username !== 'ADMIN')
            return res.status(401).end()

        const { userName } = req.params;

        const result = await passwordOption(req.body, userName);

        if (result)
            return res.status(200).send('Опции пароля успешно установлены');

    } catch (error) {
        console.log(error);
    }
});


export { adminRouter };