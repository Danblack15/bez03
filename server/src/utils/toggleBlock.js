import fs from 'fs';

export const toggleBlock = async (blockStatus, userName) => {
    const filePath = 'src/data.json';

    let fileData = fs.readFileSync(filePath, 'utf8');
    fileData = JSON.parse(fileData);

    const newData = fileData.map((user) => {
        if (user.username === userName) {
            console.log(user.block, blockStatus);
            user.block = blockStatus;
        }

        return user;
    });

    const jsonStr = JSON.stringify(newData);

    fs.writeFileSync(filePath, jsonStr, 'utf8', async (err) => {
        if (!err) {
            return true;
        }
    });
}