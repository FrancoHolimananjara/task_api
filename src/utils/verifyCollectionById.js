const db = require('../models/');
const Collection = db.Collection;

const verifyCollection = async (collectionId) => {
    try {
        const collection = await Collection.findOne({ where: { id:collectionId } });
        return collection;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = verifyCollection;