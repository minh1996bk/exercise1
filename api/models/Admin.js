module.exports = {
    attributes: {
        account: {
            model: 'account',
        },
        position: {
            type: 'string',
            required: true
        },
        workDate: {
            type: 'string',
            columnType: 'datetime'
        }
    }
}