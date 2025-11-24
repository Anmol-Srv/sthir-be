const BaseModel = require('@/models/base');
const { nanoid } = require('nanoid');

const UID_LENGTH = 12;

class Avatar extends BaseModel {
    static get tableName() {
        return 'avatar';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                uid: { type: 'string' },
                name: { type: 'string' },
                imageUrl: { type: 'string' },
                gender: { type: 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            }
        }
    }

    async $beforeInsert(queryContext) {
        await super.$beforeInsert(queryContext);
        this.uid = nanoid(UID_LENGTH);
    }
}

module.exports = Avatar;
