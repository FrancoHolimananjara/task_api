const bcrypt = require('bcrypt');

const hashData = async (data, salt = 10) => {
    try {
        const hash = await bcrypt.hash(data, salt);
        return hash;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = hashData;