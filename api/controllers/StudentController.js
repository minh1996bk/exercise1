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
        
        let pageNumber;
        let recordCount
        let searchString;
        let results;
        let totalStudentCount;
        let sortField;
        let sortOrder;
        sortField = req.query.sortField;
        sortOrder = req.query.sortOrder;

        let defaultSortField = req.session.sortField ? req.session.sortField : "mssv";
        let defaultSortOrder = req.session.sortOrder ? req.session.sortOrder: "ASC"
        sortField = ['mssv', 'name', 'dateOfBirth'].includes(sortField) ? sortField : defaultSortField;
        sortOrder = ['ASC', 'DESC'].includes(sortOrder) ? sortOrder : defaultSortOrder;

        
        if (!req.query.page_number) {
            if (req.session.currentPage) {
                pageNumber = req.session.currentPage;
                recordCount = req.session.recordCount;
            } else {
                pageNumber = 1;
                recordCount = 10;
                delete req.session.searchString;
                delete req.session.sortField;
                delete req.session.sortOrder;
            }
        } else {
            pageNumber = parseInt(req.query.pageNumber);
            recordCount = parseInt(req.query.recordCount);
        }
        searchString = req.query.searchString;
        if (!searchString) {
            
            if (!req.query.fromSearch && req.session.searchString) {
                searchString = req.session.searchString;
            }
        }
        
        if (searchString) {
            results = await Student.find({
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
            .limit(recordCount)
            .skip((pageNumber - 1) * recordCount);
    
            totalStudentCount = await Student.count({
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
        } else {
            results = await Student.find({}).sort(`${sortField} ${sortOrder}`)
            .limit(recordCount)
            .skip((pageNumber - 1) * recordCount);
    
            totalStudentCount = await Student.count({});
        }


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
        req.session.searchString = searchString;
        req.session.sortField = sortField;
        req.session.sortOrder = sortOrder;
        let _sortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
        res.json(results);
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