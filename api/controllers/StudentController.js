module.exports = {
    getStudent: async function getStudent(req, res) {
    
        let mssv = req.params.mssv;
        let student = await Student.findOne({'mssv': mssv});
        res.json({
            student: student,
        })
    },
    
    addStudent: async function addStudent(req, res) {
        let _mssv = req.body.mssv;
        let _name = req.body.name;
        let _dateOfBirth = req.body.dateOfBirth;
        let _gender = req.body.gender;
        let _address = req.body.address;
        
       
        let student = {
            mssv: _mssv,
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        }
       
    
        let testResult = await sails.helpers.validateStudent(student);
        if (testResult) {

            let errors = {};
            errors.mssvError = testResult.mssv;
            errors.nameError = testResult.name;
            errors.dateOfBirthError = testResult.dateOfBirth;
            errors.genderError = testResult.gender;
            errors.addressError = testResult.address;

            return res.json({
                success: false,
                errors: errors
            })
        }

       await Student.create(student);

        return res.json({
            success: true
        })
    },
    updateStudent: async function updateStudent(req, res) {
        let _mssv = req.body.mssv;
        let _name = req.body.name;
        let _dateOfBirth = req.body.dateOfBirth;
        let _gender = req.body.gender;
        let _address = req.body.address;
       
       
        let student = {
            mssv: _mssv,
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        }

        let testResult = await sails.helpers.validateStudent(student);

        if (testResult) {

            let errors = {};
            errors.mssvError = testResult.mssv;
            errors.nameError = testResult.name;
            errors.dateOfBirthError = testResult.dateOfBirth;
            errors.genderError = testResult.gender;
            errors.addressError = testResult.address;

            return res.json({
                success: false,
                errors: errors
            })
        }


        await Student.update({'mssv': _mssv})
        .set({
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        });
        
        return res.json({
            success: true
        })
    },
    deleteStudent: async function deleteStudent(req, res) {
        let mssv = req.body.mssv;
        if (!mssv) {
            return res.json({
                success: false,
                errors: {
                    mssv: "Mã số sinh viên gồm 8 tám chữ số"
                }
            })
        }
        await Student.destroy({'mssv': mssv});

        return res.json({
            success: true
        })
    },

    getStudents: async function getStudents(req, res) {
        
        let sortField = req.query.sortField;
        let sortOrder = req.query.sortOrder;
        let pageNumber = parseInt(req.query.pageNumber);
        let recordCount = parseInt(req.query.recordCount);
        let searchString = req.query.searchString;

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

        let totalStudent = searchString 
            ? await Student.count({
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
            : await Student.count({});
            
        return res.json({
            message: "ok",
            query: req.query,
            students: students,
            totalStudent: totalStudent,
        })
    },


    getListPage: async function getListPage(req, res) {
        res.view('pages/students');
    }

    
}