module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        accounts: {
            collection: 'account',
            via: 'roles'
        },
        permissions: {
            collection: 'permission',
            via: 'roles'
        }
    }
}