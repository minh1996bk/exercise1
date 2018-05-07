module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        roles: {
            collection: 'role',
            via: 'accounts'
        },
        fullname: {
            type: 'string',
            required: true
        },
        gender: {
            type: 'boolean',
            required: true
        },
        birthDate: {
            type: 'string',
            columnType: 'datetime'
        },
        email: {
            type: 'string',
            allowNull: true
        },
        phoneNumber: {
            type: 'string',
            allowNull: true
        },
        student: {
            collection: 'student',
            via: 'account'
        },
        admin: {
            collection: 'admin',
            via: 'account'
        }
    }
}