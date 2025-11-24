const BaseModel = require('@/models/base');
const nanoid = require('@/utils/nanoid');
const { getMsInDays } = require('@/utils/date-time');
const AppError = require('@/lib/errors/app_error');

class AuthToken extends BaseModel {
    static get tableName() {
        return 'authToken';
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
                timeToLive: {
                    type: 'string',
                },
                key: {
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
                    from: 'auth_token.user_id',
                    to: 'user.id',
                },
            },
        };
    }

    static async create({ userId }) {
        const timeToLive = new Date(Date.now() + getMsInDays(30)).toISOString();
        const token = await AuthToken.query().insert({
            userId,
            timeToLive,
            key: nanoid(64),
        });
        return token;
    }

    static async findByKey(key) {
        if (!key) {
            throw new AppError({
                errorCode: AppError.errorCodes.MISSING_AUTH_TOKEN,
            });
        }
        const token = await AuthToken.query().findOne({ key });
        if (!token) {
            throw new AppError({
                errorCode: AppError.errorCodes.INVALID_AUTH_TOKEN,
            });
        }
        return token;
    }

    isValid() {
        const token = this;
        const today = new Date();
        const timeToLive = new Date(token.timeToLive);
        return token.active && timeToLive.getTime() > today.getTime();
    }

    async updateTimeToLive() {
        const token = this;
        const today = new Date();
        const timeToLive = new Date(token.timeToLive);
        if (timeToLive.getTime() - today.getTime() < getMsInDays(30)) {
            await token.$query().update({
                timeToLive: new Date(today.getTime() + getMsInDays(60)).toISOString(),
            });
        }
    }
}

module.exports = AuthToken;
