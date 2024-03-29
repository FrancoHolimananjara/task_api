const bcrypt = require('bcrypt');

const compareData = async (data, hashedData) => {
    try {
        const match = await bcrypt.compare(data, hashedData);
        return match;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = compareData;