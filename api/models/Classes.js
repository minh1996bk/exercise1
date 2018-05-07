module.exports = {
    attributes: {
        className: {
            type: 'string',
            required: true
        },
        students: {
            collection: 'student',
            via: 'class'
        },
        teacher: {
            model: 'teacher'
        }
    }
}