const {db} = require("../utils/db.config")



class University{

    static collection = db.collection("Universities")

    static findUniByName = async (name) => {

        return await this.collection.findOne({ name: { $regex: name}})

    }

    static findUnisByFilter = async (filter) => {

        const page = (filter.page - 1) * 5

        return await this.collection
        .find(filter.query)
        .skip(page)
        .limit(20)
        .sort(filter.sort)
        .toArray()
    }
}

module.exports = University