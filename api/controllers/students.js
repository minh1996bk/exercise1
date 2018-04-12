module.exports = async function getStudents(req, res) {
    let students = [
        {
            mssv: "2014",
            name: "minh",
            gender: "nam",
            dateOfBirth: "201233",
            address: "adsfasidfj",
        },
        {
            mssv: "2014",
            name: "minh",
            gender: "name",
            dateOfBirth: "201233",
            address: "adsfasidfj",
        },


    ]
    res.view('pages/students', {
        students: students
    });
}