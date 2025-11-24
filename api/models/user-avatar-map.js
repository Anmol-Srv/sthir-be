const BaseModel = require('@/models/base');

class UserAvatarMap extends BaseModel {
    static get tableName() {
        return 'user_avatar_map';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                userId: { type: 'integer' },
                avatarId: { type: 'integer' },
                isActive: { type: 'boolean' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            }
        }
    }

    static get relationMappings() {
        const Avatar = require('@/models/avatar');
        const User = require('@/models/user');

        return {
            avatar: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Avatar,
                join: {
                    from: 'user_avatar_map.avatar_id',
                    to: 'avatar.id'
                }
            },
            user: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'user_avatar_map.user_id',
                    to: 'user.id'
                }
            }
        };
    }
}

module.exports = UserAvatarMap;
