var crypto = require('crypto');

const SECRET_KEY = 'leahcim_airotsa';

function encrypt(content) {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex')
}

function encryptPwd(password) {
    const pwd = `password=${password}&secret_key=${SECRET_KEY}`;
    return encrypt(pwd);
}

module.exports = { encryptPwd };