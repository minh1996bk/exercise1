module.exports = async function doLogin(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let checkUsername = await sails.helpers.validateQuery(username);
    if (!checkUsername) {
        return res.json({
            message: 'invalid username'
        })
    }
    // let bcrypt = require('bcrypt');
    try {
        let user = await Admin.findOne({
            username: username
        });
        if (!user) {
            return res.json({
                message: 'username not exists'
            })
        }
        // let result = await bcrypt.compare(password, user.password);
        let result = user.password == password;
        if (result) {
            req.session.userId = user.id;
            return res.json({
                message: 'login success'
            })
        } else {
            return res.json({
                message: 'password wrong'
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}