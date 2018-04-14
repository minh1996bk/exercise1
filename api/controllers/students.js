module.exports = async function getStudents(req, res) {
    let pageNumber = parseInt(req.query.page_number);
    let recordCount = parseInt(req.query.record_count);
    
    let results = await Student.find({}).limit(recordCount).skip((pageNumber - 1) * recordCount);
    let _last = 50;

    let _start = Math.floor((pageNumber - 1) / 10) * 10 + 1;
    let _prev = pageNumber - 1 > 0 ? pageNumber - 1 : 1;
    let _next = pageNumber + 1 < _last ? pageNumber + 1 : _last;
    res.view('pages/students', {
        students: results,
        record_count: recordCount,
        start: _start,
        current_page: pageNumber,
        prev: _prev,
        next: _next,
        last: _last
    });
}