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

        let student = await Student.create({
            mssv: _mssv,
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            address: _address
        })
        .fetch();
        if (student) {
            res.status(200).json({
                message: "OK"
            })
        } else {
            res.status(500).json({
                message: "Fail"
            })
        }
    },
    put: function updateStudent(req, res) {
        
    },
    delete:  function deleteStudent(req, res) {
        
    }
}