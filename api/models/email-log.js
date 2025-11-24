const BaseModel = require('@/models/base');
const nanoid = require('@/utils/nanoid');

const UID_LENGTH = 15;

const STATUS_MAP = {
    TRIGGERED: {
        display: 'Triggered',
    },
};

const STATUS_KEYS = Object.keys(STATUS_MAP);

STATUS_KEYS.forEach((key) => {
    STATUS_MAP[key].key = key;
});

class EmailLog extends BaseModel {
    static get tableName() {
        return 'emailLog';
    }

    static get STATUS_MAP() {
        return STATUS_MAP;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                to: {
                    type: 'string',
                },
                subject: {
                    type: 'string',
                },
                body: {
                    type: 'string',
                },
                replyTo: {
                    type: ['string', 'null'],
                },
                status: {
                    type: 'string',
                },
                uid: {
                    type: 'string',
                },
                type: {
                    type: 'string',
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                },
            },
            required: [],
        };
    }

    async $beforeInsert(queryContext) {
        await super.$beforeInsert(queryContext);
        this.uid = nanoid(UID_LENGTH);
    }
}

module.exports = EmailLog;
