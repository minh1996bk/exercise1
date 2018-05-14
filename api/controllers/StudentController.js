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

        let sortField = req.query.sortField;
        let sortOrder = req.query.sortOrder;

        let selectField = req.query.selectField;
        let selectValue = req.query.selectValue;

        let result;

        if (sortField && sortOrder && searchString) {
            // co sap xep va lay theo chuoi tim kiem
            result = await Student.getSortedStudentsBySearchString(recordCount, pageNumber, searchString, sortField, sortOrder);
        } else if (sortField && sortOrder) {
            // co sap xep va k lay theo chuoi tim kiem
            result = await Student.getSortedStudents(recordCount, pageNumber, sortField, sortOrder);
        } else if (selectField && selectValue && searchString) {
            // co loc theo gia tri 1 field va theo chuoi tim kiem
            result = await Student.getFilterStudentsBySearchString(recordCount, pageNumber, searchString, selectField, selectValue);
        } else if (selectField && selectValue) {
            // co loc theo gia tri 1 field va k theo chuoi tim kiem
            result = await Student.getFilterStudents(recordCount, pageNumber, searchString, selectField, selectValue);
        } else if (searchString) {
            result = await Student.getStudentsBySearchString(recordCount, pageNumber, searchString);
        }
        else {
            // chi lay theo pagdNumber vs recordCount
            result = await Student.getStudents(recordCount, pageNumber);
        }

        return res.json({
            students: result.students,
            totalStudent: result.totalStudent,
            success: true
        })
        
    },


    getListPage: async function getListPage(req, res) {
        res.view('pages/students');
    },
    searchPattern: async function(req, res) {
        let results;

        if (req.body.isNumberPattern) {
            results = await Student.find({
                mssv: {
                    contains: req.body.searchPattern
                }
            })
            .limit(10);
        } else {
            results = await Student.find({
                name: {
                    contains: req.body.searchPattern
                }
            })
            .limit(10);
        }

        sails.sockets.broadcast(sails.sockets.getId(req), 'searchPattern', {
            results: results,
            isNumberPattern: req.body.isNumberPattern
        })
    }

    
}