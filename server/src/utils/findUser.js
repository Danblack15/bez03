import fs from 'fs';
const filePath = 'src/data.json';

export const findUser = async (username) => {
    const allData = fs.readFileSync(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        return data;
    });

    return JSON.parse(allData).filter(user => user.username === username)[0];
};