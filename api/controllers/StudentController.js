module.exports = {
    getStudent: async function getStudent(req, res) {
    
        let mssv = req.params.mssv;
        let student = await Student.findOne({'mssv': mssv});
        res.json({
            student: student,
        })
    },
    
    addStudent: async function addStudent(req, res) {
        let student = {
            mssv: req.body.mssv,
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            address: req.body.address 
        }
        
       await Student.create(student);

        return res.json({
            success: true
        })
    },
    updateStudent: async function updateStudent(req, res) {
     
        await Student.update({'mssv': req.body.mssv})
        .set({
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            address: req.body.address
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