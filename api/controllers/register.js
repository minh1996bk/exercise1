module.exports = async function doRegister(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let bcrypt = require('bcrypt');

    let hashPassword = await bcrypt.hash(password, 10);

    let admin =  await Admin.create({
        username: username,
        password: hashPassword
    })
    .fetch();

    if (admin) {
        res.json({
            message: "register success"
        })
    } else {
        res.json({
            message: "smt faild"
        })
    }
}