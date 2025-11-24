const BaseModel = require('@/models/base');
const nanoid = require('@/utils/nanoid');
const { getMsInDays, getMsInMinutes } = require('@/utils/date-time');

const PURPOSE_MAP = {
    LOGIN_OTP: {
        label: 'LOGIN_OTP',
        validFor: getMsInMinutes(10),
        tokenLength: 6,
    },
    // invite purpose removed
};

class GenericToken extends BaseModel {
    static get tableName() {
        return 'genericToken';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                active: {
                    type: 'boolean',
                    default: true,
                },
                userId: {
                    type: 'integer',
                },
                key: {
                    type: 'string',
                },
                value: {
                    type: 'string',
                },
                purpose: {
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
        };
    }

    static get relationMappings() {
        const User = require('@/models/user');

        return {
            user: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'genericToken.user_id',
                    to: 'user.id',
                },
            },
        };
    }

    isValid() {
        const token = this;
        return (
            token.active &&
            new Date(token.createdAt).getTime() +
            PURPOSE_MAP[token.purpose].validFor >
            Date.now() &&
            token.status === 'ACTIVE'
        );
    }

    static async findByValueAndPurpose({ value, purpose }) {
        return GenericToken.query()
            .findOne({ value, purpose })
            .orderBy('id', 'desc');
    }

    static async findByKeyAndPurpose({ key, purpose }, trx = null) {
        return GenericToken.query(trx)
            .findOne({
                key,
                purpose,
            })
            .orderBy('id', 'desc');
    }

    static async findOrCreate({ userId, key, purpose }, trx = null) {
        const token = await this.findByKeyAndPurpose({ key, purpose }, trx);
        console.log("===================== TOKEN =====================", token);
        if (token && token.isValid()) {
            return token;
        }
        let value = nanoid(PURPOSE_MAP[purpose].tokenLength, false);
        console.log("===================== VALUE =====================", value);
        if (
            purpose === 'LOGIN_OTP' &&
            (process.env.NODE_ENV === 'development' ||
                process.env.NODE_ENV === 'test')
        ) {
            value = '123456';
        }
        const createdToken = await GenericToken.query(trx).insert({
            userId,
            key,
            purpose,
            value,
        });
        console.log("===================== CREATED TOKEN =====================", createdToken);

        return createdToken;
    }

    getValidFor() {
        return PURPOSE_MAP[this.purpose].validFor;
    }
}

module.exports = GenericToken;
