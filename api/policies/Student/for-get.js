module.exports = async function(req, res, next) {
    if (!req.params || !req.params.mssv) {
        return res.badRequest();
    }
    return next();
}