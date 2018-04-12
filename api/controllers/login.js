module.exports = async function doLogin(req, res) {
    let username = req.body.username;
    let password = req.body.password;

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
        if (user.password == password) {
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