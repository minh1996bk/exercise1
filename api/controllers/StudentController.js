module.exports = {
    getStudent: async function getStudent(req, res) {
        let studentId = req.params.studentId;
        let student = await Student.findOne({'id': studentId});
        res.view('pages/update-student', {student: student});
    },
    
    addStudent: async function addStudent(req, res) {
        let _mssv = req.body.mssv;
        let _name = req.body.name;
        let _dateOfBirth = req.body.dateOfBirth;
        let _gender = req.body.gender;
        let _address = req.body.address;
        
        let studentConstraint = {
            mssv: {
               
            },
            name: {

            },
            dateOfBirth: {

            },
            gender: {

            },
            address: {

            }
        }
        let student = {
            mssv: _mssv,
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        }

        let testResult = validate(student, studentConstraint);
        if (!testResult) {

            let errors = req.session.errors;

            errors.mssvError = testResult.mssv;
            errors.nameError = testResult.name;
            errors.dateOfBirthError = testResult.dateOfBirth;
            errors.genderError = testResult.gender;
            errors.addressError = testResult.address;
            
            return res.redirect('add-student');
        }

       await Student.create(student);
       
        req.session.success = true;
        res.redirect('add-student');
    },
    updateStudent: async function updateStudent(req, res) {
        await Student.update({'mssv': req.body.mssv})
        .set({
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            address: req.body.address
        });
        res.ok();
    },
    deleteStudent: async function deleteStudent(req, res) {
        await Student.destroy({'mssv': req.body.mssv});
        res.ok();
    },

    getStudents: async function getStudents(req, res) {
        let pageNumber;
        let recordCount
    
        if (!req.query.page_number) {
            if (req.session.currentPage) {
                pageNumber = req.session.currentPage;
                recordCount = req.session.recordCount;
            } else {
                pageNumber = 1;
                recordCount = 10;
            }
        } else {
            pageNumber = parseInt(req.query.page_number);
            recordCount = parseInt(req.query.record_count);
        }
    
        let results = await Student.find({}).limit(recordCount).skip((pageNumber - 1) * recordCount);
        let _last = Math.ceil((await Student.count({})) / recordCount);
    
        let _start = Math.floor((pageNumber - 1) / 10) * 10 + 1;
        let _end = _start + 10 < _last ? _start + 10 : _last; 
        let _prev = pageNumber - 1 > 0 ? pageNumber - 1 : 1;
        let _next = pageNumber + 1 < _last ? pageNumber + 1 : _last;
    
        req.session.currentPage = pageNumber;
        req.session.recordCount = recordCount;
        res.view('pages/students', {
            students: results,
            record_count: recordCount,
            start: _start,
            end: _end,
            current_page: pageNumber,
            prev: _prev,
            next: _next,
            last: _last
        });
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
    }
}