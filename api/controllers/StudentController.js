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
            return  res.view('pages/add-student', {
                current_page: 1,
                record_count: 10,
                mssvError: "Mssv phai co dung 8 ki tu"
            });
        }
        let student = await Student.create({
            mssv: _mssv,
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        });
        res.ok();
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
    }
}