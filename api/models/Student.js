module.exports = {
    attributes: {
        account: {
            model: 'account'
        },
        mssv: {
            type: 'string',
            required: true,
            unique: true
        },
        school: {
            type: 'string',
            required: true
        },
        class: {
            model: 'classes',
        },
        k: {
            type: 'number',
            required: true
        },

    }
}