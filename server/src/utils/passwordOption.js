import fs from 'fs';

export const passwordOption = async (options, userName) => {
    const filePath = 'src/data.json';

    let fileData = fs.readFileSync(filePath, 'utf8');

    fileData = JSON.parse(fileData);

    const newData = fileData.map((user) => {
        if (user.username === userName)
            user.options = {
                lowercase: options.lowercase,
                uppercase: options.uppercase,
                numbers: options.numbers,
                special: options.special
            };

        return user;
    });

    const jsonStr = JSON.stringify(newData);

    fs.writeFileSync(filePath, jsonStr, 'utf8', async (err) => {
        if (!err) {
            return true;
        }
    });

    return true

}