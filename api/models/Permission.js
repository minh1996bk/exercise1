module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        roles: {
            collection: 'role',
            via: 'permissions'
        }
    }
}