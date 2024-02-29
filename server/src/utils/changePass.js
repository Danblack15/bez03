import fs from 'fs';

export const changePass = async (oldPassword, newPassword, userName) => {
    const filePath = 'src/data.json';

    let fileData = fs.readFileSync(filePath, 'utf8');

    fileData = JSON.parse(fileData);

    let passwordSuccess = true;

    const newData = fileData.map((user) => {
        if (user.username === userName) {
            if (user.password !== oldPassword)
                passwordSuccess = false;

            user.password = newPassword;
        }

        return user;
    });

    if (!passwordSuccess)
        return false

    const jsonStr = JSON.stringify(newData);

    fs.writeFileSync(filePath, jsonStr, 'utf8', async (err) => {
        if (!err) {
            return true;
        }
    });

    return true

}