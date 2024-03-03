import fs from 'fs';

export const saveNewUser = async (username, password) => {
    const newUserData = {
        username: username,
        password: password,
        block: false,
        options: {
            lowercase: false,
            uppercase: false,
            numbers: false,
            special: false
        }
    };

    const filePath = 'src/data.json';

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        let fileData = JSON.parse(data);
        fileData.push(newUserData);

        const jsonStr = JSON.stringify(fileData);

        fs.writeFile(filePath, jsonStr, 'utf8', async (err) => {
            if (!err) {
                return true;
            }
        });
    });
    

    
}