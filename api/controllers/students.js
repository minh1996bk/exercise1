module.exports = async function getStudents(req, res) {
    let pageNumber = req.query.page_number;
    let recordCount = req.query.record_count;
   
    let results = await Student.find({}).limit(recordCount).skip((pageNumber - 1) * recordCount);

    res.view('pages/students', {
        students: results
    });
}