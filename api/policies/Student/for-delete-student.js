module.exports = async function(req, res, next) {
    if (!req.query || !req.query.mssv) {
        return res.badRequest();
    }
    return next();
}