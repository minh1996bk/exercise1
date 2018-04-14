module.exports = {
    get: async function getStudent(req, res) {
        let studentId = req.params.studentId;
        let student = await Student.findOne({'id': studentId});
        res.view('pages/update-student', {student: student});
    },
    post: async function addStudent(req, res) {
        let _mssv = req.body.mssv;
        let _name = req.body.name;
        let _dateOfBirth = req.body.dateOfBirth;
        let _gender = req.body.gender;
        let _address = req.body.address;

        if (_mssv.length != 8) {
            req.session.errors = {
                mssvError: "Mssv phai co dung 8 ki tu"
            };
            return res.redirect('add-student');
        }

        let regexp = /[A-Za-z]/;
        if (!regexp.test(_name)) {
            req.session.errors = {
                nameError: "Ten chi chua ki tu"
            };
            return res.redirect('add-student');
        }

        let student = await Student.create({
            mssv: _mssv,
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        });
        req.session.success = true;
        res.redirect('add-student');
    },
    put: async function updateStudent(req, res) {
        await Student.update({'mssv': req.body.mssv})
        .set({
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            address: req.body.address
        });
        res.ok();
    },
    delete: async function deleteStudent(req, res) {
        await Student.destroy({'mssv': req.body.mssv});
        res.ok();
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