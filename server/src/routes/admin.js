import { Router } from 'express';
const adminRouter = Router();

import fs from 'fs';
import jwt from 'jsonwebtoken'
import { changePass } from '../utils/changePass';
import { toggleBlock } from '../utils/toggleBlock';

const filePath = 'src/data.json';
const jwtSecret = 'c83d1702a29230d5ce67db4cc9d0a62e2b65129d667cb3500660d8a71c31ab6d';

adminRouter.post('/changePass', async (req, res) => {
    try {
        const { oldPassword, newPassword, username } = req.body;

        const result = await changePass(oldPassword, newPassword, username);

        res.sendStatus(result ? 200 : 403);
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


export { adminRouter };