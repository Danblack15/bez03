import fs from 'fs';

export const changePass = async (oldPassword, newPassword, userName) => {
    const filePath = 'src/data.json';

    let fileData = fs.readFileSync(filePath, 'utf8');

    fileData = JSON.parse(fileData);

    let passworEquals = true,
        stateOption = {
            value: true,
            message: 'Пароль успешно изменен'
        }

    const newData = fileData.map((user) => {
        if (user.username === userName) {
            if (user.password !== oldPassword)
                passworEquals = false;

            stateOption = checkOptions(user.options, newPassword);

            user.password = newPassword;
        }

        return user;
    });

    if (!passworEquals) {
        stateOption.value = false;
        stateOption.message = 'Неверный старый пароль'

        return stateOption;
    }

    if (!stateOption.value) {
        return stateOption;
    }

    const jsonStr = JSON.stringify(newData);

    fs.writeFileSync(filePath, jsonStr, 'utf8', async (err) => {
        if (!err) {
            return true;
        }
    });

    return stateOption

}

function checkOptions(options, password) {
    const config = [
        {
            option: 'lowercase',
            check: (pass) => {
                return /[a-zа-я]/.test(pass);
            },
            message: 'Пароль должен содержать символы в нижнем регистре'
        },
        {
            option: 'uppercase',
            check: (pass) => {
                return /[A-ZА-Я]/.test(pass);
            },
            message: 'Пароль должен содержать символы в вверхнем регистре'
        },
        {
            option: 'numbers',
            check: (pass) => {
                return /\d+/.test(pass);
            },
            message: 'Пароль должен содержать цифры'
        },
        {
            option: 'special',
            check: (pass) => {
                return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass);
            },
            message: 'Пароль должен содержать спец. символы'
        },
    ];

    let respone = {
        value: true,
        message: 'Пароль успешно изменен',
    }
    console.log(options);
    console.log(password);

    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            const option = options[key];

            if (!option) continue;

            let needOption = config.filter(item => item.option == key)[0];

            if (!needOption.check(password)) {
                respone.value = false;
                respone.message = needOption.message;
                break;
            }
        }
    }

    return respone;
}