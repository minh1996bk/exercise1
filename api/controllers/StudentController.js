module.exports = {
    getStudent: async function getStudent(req, res) {
        let errors = req.session.errors;
        let success = req.session.success;
        delete req.session.errors;
        delete req.session.success;

        let mssv = req.params.mssv;
        let student = await Student.findOne({'mssv': mssv});
        res.view('pages/update-student', {
            student: student,
            errors: errors,
            success: success
        });
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
            
            req.session.errors = errors;

            return res.redirect('add-student');
        }

       await Student.create(student);

        req.session.success = true;
        res.redirect('add-student');
    },
    updateStudent: async function updateStudent(req, res) {
        if (req.body.btnDelete) {
            req.session.mssv = req.body.mssv;
            req.session.name = req.body.name;

            return res.redirect('delete-student');
        }
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

        let testResult = sails.helpers.validateStudent(student);

        if (testResult) {

            let errors = {};
            errors.mssvError = testResult.mssv;
            errors.nameError = testResult.name;
            errors.dateOfBirthError = testResult.dateOfBirth;
            errors.genderError = testResult.gender;
            errors.addressError = testResult.address;
            
            req.session.errors = errors;

            return res.redirect('student/' + _mssv);
        }


        await Student.update({'mssv': _mssv})
        .set({
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        });
        req.session.success = true;
        return res.redirect('student/' + _mssv);
    },
    deleteStudent: async function deleteStudent(req, res) {
        let mssv = req.body.mssv;
        await Student.destroy({'mssv': mssv});
        delete req.session.mssv;
        delete req.session.name;
        
        return res.redirect('students');
    },

    getStudents: async function getStudents(req, res) {
        let sortField = req.query.sortField;
        let sortOrder = req.query.sortOrder;
        let pageNumber = parseInt(req.query.pageNumber);
        let recordCount = parseInt(req.query.recordCount);
        let searchString = req.query.searchString;

        let students = await Student.find({})
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
            students: students
        })
    },

    getAddPage: async function getAddPage(req, res) {
    
        let errors = req.session.errors;
        let success = req.session.success;
        delete req.session.errors;
        delete req.session.success;
        return res.view('pages/add-student', {
            errors: errors,
            success: success
        });
    },

    getDeletePage: async function getDeletePage(req, res) {
        let mssv = req.session.mssv;
        let name = req.session.name;
    
        return res.view('pages/delete-student', {
            mssv: mssv,
            name: name
        })
    },
    getListPage: async function getListPage(req, res) {
        res.view('pages/students');
    }

    
}