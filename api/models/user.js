const BaseModel = require('@/models/base');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const UID_LENGTH = 12;

class User extends BaseModel {
    static get tableName() {
        return 'User';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                uid: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                mobileNumber: { type: 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            }
        }
    }

    static get relationMappings() {
        const Avatar = require('@/models/avatar');
        const UserAvatarMap = require('@/models/user-avatar-map');

        return {
            avatar: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: Avatar,
                join: {
                    from: 'User.id',
                    through: {
                        from: 'user_avatar_map.user_id',
                        to: 'user_avatar_map.avatar_id',
                        extra: ['is_active']
                    },
                    to: 'avatar.id'
                },
                filter: builder => builder.where('is_active', true)
            }
        };
    }

    async $beforeInsert(queryContext) {
        await super.$beforeInsert(queryContext);
        this.uid = nanoid(UID_LENGTH);
    }

    async sendOTPEmail(trx = null) {
        // const Email = require('@/services/email');
        const GenericToken = require('@/models/generic-token');
        const user = this;
        console.log(user);
        const genericToken = await GenericToken.findOrCreate({
            key: user.email,
            purpose: 'LOGIN_OTP',
            userId: user.id,
            status: 'ACTIVE',
        }, trx);

        // await Email.send({
        //     to: user.email,
        //     from: {
        //         name: 'LevelUp Support',
        //         email: 'support@levelup.com',
        //     },
        //     type: 'EMAIL_OTP',
        //     subject: `${genericToken.value} is your Mutant High login OTP`,
        //     data: {
        //         otp: genericToken.value,
        //         fullName: user.name,
        //         isVerificationMail: false,
        //     },
        //     templatePath: 'email-otp.ejs',
        //     trx,
        // });

        console.log("===================== GENERIC TOKEN =====================", genericToken);
        return;
    }

    async verifyOTP({ otp }) {
        const GenericToken = require('@/models/generic-token');
        const genericToken = await GenericToken.findByKeyAndPurpose({
            key: this.email,
            purpose: 'LOGIN_OTP',
        });

        if (
            !genericToken ||
            !genericToken.isValid() ||
            genericToken.value !== otp
        ) {
            throw new AppError({
                errorCode: AppError.errorCodes.OTP_INVALID,
            });
        }

        await genericToken.$query().patch({ status: 'USED' });
    }

    async generateAuthToken() {
        const AuthToken = require('@/models/auth-token');
        const user = this;
        const token = await AuthToken.create({
            userId: user.id,
        });
        return token;
    }

    static async isEmailRegistered(email) {
        const count = await this.query().where({ email }).resultSize();
        return count > 0;
    }
}

module.exports = User;
