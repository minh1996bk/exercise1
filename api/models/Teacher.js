module.exports = {
    attributes: {
        subject: {
            type: 'string',
            required: true
        },
        classes: {
            collection: 'classes',
            via: 'teacher'
        }
    }
}