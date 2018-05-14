module.exports = async function(req, res, next) {
    if (!req.body.recordCount || !req.body.pageNumber) {
        return res.badRequest();
    }
    return next();
}