module.exports = async function getStudents(req, res) {
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
    let _last = Math.ceil((await Student.count({})) / recordCount);

    let _start = Math.floor((pageNumber - 1) / 10) * 10 + 1;
    let _end = _start + 10 < _last ? _start + 10 : _last; 
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
        last: _last
    });
}