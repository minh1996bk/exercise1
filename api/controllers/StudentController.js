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
        const Validator = require('validate.js');
        let _mssv = req.body.mssv;
        let _name = req.body.name;
        let _dateOfBirth = req.body.dateOfBirth;
        let _gender = req.body.gender;
        let _address = req.body.address;
        
        let studentConstraint = {
            mssv: {
               presence: true,
               format: {
                   pattern: /^\d{8}$/,
                   message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                       return "MSSV chi chua so va co do dai la 8"
                   }
               }
            },
            name: {
                presence: true,
                format: {
                    pattern: /[A-Za-z]/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return "Ten sinh vien chi chua ky tu trong bang chu cai";
                    }
                }
            
            },
            dateOfBirth: {
                presence: true,
                format: {
                    pattern: /\d\d\/\d\d\/\d\d\d\d/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return "Ngay sinh co dang dd/mm/yyyy";
                    }
                }
        
            },
            gender: {
                presence: true,
                format: {
                    pattern: /Nam|Nu/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return "Gioi tinh Nam hoac Nu";
                    }
                }
            },
            address: {
                presence: true,
                format: {
                    pattern: /[A-Za-z]/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return "Dia chi sinh vien chi chua ky tu trong bang chu cai";
                    }
                }
            }
        }
        let student = {
            mssv: _mssv,
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        }

        let testResult = Validator(student, studentConstraint);

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
        const Validator = require('validate.js');
        let _mssv = req.body.mssv;
        let _name = req.body.name;
        let _dateOfBirth = req.body.dateOfBirth;
        let _gender = req.body.gender;
        let _address = req.body.address;
        
        let studentConstraint = {
            mssv: {
                presence: true,
                format: {
                    pattern: /^\d{8}$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return "MSSV chi chua so va co do dai la 8"
                    }
                }
             },
             name: {
                 presence: true,
                 format: {
                     pattern: /[A-Za-z]/,
                     message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                         return "Ten sinh vien chi chua ky tu trong bang chu cai";
                     }
                 }
             
             },
             dateOfBirth: {
                 presence: true,
                 format: {
                     pattern: /\d\d\/\d\d\/\d\d\d\d/,
                     message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                         return "Ngay sinh co dang dd/mm/yyyy";
                     }
                 }
         
             },
             gender: {
                 presence: true,
                 format: {
                     pattern: /Nam|Nu/,
                     message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                         return "Gioi tinh Nam hoac Nu";
                     }
                 }
             },
             address: {
                 presence: true,
                 format: {
                     pattern: /[A-Za-z]/,
                     message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                         return "Dia chi sinh vien chi chua ky tu trong bang chu cai";
                     }
                 }
             }
        }
        let student = {
            mssv: _mssv,
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        }

        let testResult = Validator(student, studentConstraint);

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
        return res.redirect('student/' + _mssv);
    },
    deleteStudent: async function deleteStudent(req, res) {
        let mssv = req.body.mssv;
        await Student.destroy({'mssv': mssv});
        return res.redirect('students');
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
        let totalStudentCount = await Student.count({});
        let currentStudentCount = pageNumber * recordCount <= totalStudentCount ? pageNumber * recordCount : totalStudentCount;
        let _last = Math.ceil((totalStudentCount) / recordCount);
        if (_last == 0) {
            _last = 1;
        }
        let _start;
        _start = pageNumber - 5 > 0 ? pageNumber - 5 : 1;
        _start = _start + 9 < _last ? _start : (_last - 9 > 0 ? _last - 9 : 1);
        let _end = _start + 9 < _last ? _start + 9 : _last; 
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
            last: _last,
            totalStudentCount: totalStudentCount,
            currentStudentCount: currentStudentCount
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
    },

    getDeletePage: async function getDeletePage(req, res) {
        let mssv = req.query.mssv;
        let name = req.query.name;

        return res.view('pages/delete-student', {
            mssv: mssv,
            name: name
        })
    }
}