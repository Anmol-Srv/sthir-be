const BaseModel = require('@/models/base');

class Heartbeat extends BaseModel {
    static get tableName() {
        return 'Heartbeat';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                userId: { type: 'integer' },
                projectName: { type: 'string' },
                language: { type: 'string' },
                fileName: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
            }
        }
    }

    static get relationMappings() {
        const User = require('@/models/user');

        return {
            user: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'heartbeat.userId',
                    to: 'User.id'
                }
            }
        };
    }
}

module.exports = Heartbeat;
