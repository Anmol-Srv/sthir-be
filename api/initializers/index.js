const path = require('path')
require('module-alias/register')
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const objection = require('@/initializers/objection')
const pg = require('@/initializers/pg')

module.exports = async () => {
    await objection()
    pg()
}