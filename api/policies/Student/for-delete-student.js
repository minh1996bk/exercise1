module.exports = async function(req, res, next) {
    if (!req.body || !req.body.mssv) {
        return res.badRequest();
    }
    return next();
}