const { Model } = require('objection');
const { nanoid } = require('nanoid');

class BaseModel extends Model {
    async $beforeInsert(queryContext) {
        await super.$beforeInsert(queryContext);

        const date = new Date().toISOString();
        this.createdAt = this.createdAt || date;
        this.updatedAt = this.updatedAt || date;
    }

    static get tableName() {
        return 'base';
    }
}

module.exports = BaseModel;