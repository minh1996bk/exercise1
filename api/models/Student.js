module.exports = {
    attributes: {
        mssv: 'string',
        name: 'string',
        dateOfBirth: 'string',
        gender: 'string',
        address: 'string'
    },
    getStudents: async function(recordCount, pageNumber) {
        let students = await Student.find({})
        .skip((pageNumber - 1) * recordCount)
        .limit(recordCount);

        let totalStudent = await Student.count({});
        return {
            students: students,
            totalStudent: totalStudent
        }
    },

    getStudentsBySearchString: async function(recordCount, pageNumber, searchString) {

        let students = await Student.find({
            or: [
                {
                    mssv: {
                        contains: searchString
                    }
                },
                {
                    name: {
                        contains: searchString
                    }
                },
                {
                    address: {
                        contains: searchString
                    }
                }
            ]
        })
        .skip((pageNumber - 1) * recordCount)
        .limit(recordCount);

        let totalStudent = await Student.count({
                or: [
                    {
                        mssv: {
                            contains: searchString
                        }
                    },
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        address: {
                            contains: searchString
                        }
                    }
                ]
            });
        return {
            students: students,
            totalStudent: totalStudent
        }
    },
    getSortedStudents: async function(recordCount, pageNumber, sortField, sortOrder) {
        let students = await Student.find({})
        .sort(`${sortField} ${sortOrder}`)
        .skip((pageNumber - 1) * recordCount)
        .limit(recordCount);

        let totalStudent = await Student.count({});
        return {
            students: students,
            totalStudent: totalStudent
        }
    },
    getSortedStudentsBySearchString: async function(recordCount, pageNumber, searchString, sortField, sortOrder) {
        let students = await Student.find({
            or: [
                {
                    mssv: {
                        contains: searchString
                    }
                },
                {
                    name: {
                        contains: searchString
                    }
                },
                {
                    address: {
                        contains: searchString
                    }
                }
            ]
        })
        .sort(`${sortField} ${sortOrder}`)
        .skip((pageNumber - 1) * recordCount)
        .limit(recordCount);

        let totalStudent = await Student.count({
                or: [
                    {
                        mssv: {
                            contains: searchString
                        }
                    },
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        address: {
                            contains: searchString
                        }
                    }
                ]
            });
        return {
            students: students,
            totalStudent: totalStudent
        }
    },
    getFilterStudents: async function(recordCount, pageNumber, searchString, selectField, selectValue) {
        let students = await Student.find({
            where: {
                gender : selectValue
            }
        })
        .skip((pageNumber - 1) * recordCount)
        .limit(recordCount);

        let totalStudent = await Student.count({
            gender : selectValue
        });
        return {
            students: students,
            totalStudent: totalStudent
        }
    },
    getFilterStudentsBySearchString: async function(recordCount, pageNumber, searchString, selectField, selectValue) {

    }

}