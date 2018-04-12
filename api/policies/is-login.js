module.exports = async function checkLogin(req, res, next) {

    if (!req.session || !req.session.userId) {
        res.sendStatus(401);
    } else {
        next();
    }
}