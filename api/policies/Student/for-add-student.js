module.exports = async function(req, res, next) {
    let student = {
        mssv: req.body.mssv,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        address: req.body.address 
    }

    let testResult = await sails.helpers.validateStudent(student);
    if (testResult) {

        let errors = {};
        errors.mssvError = testResult.mssv;
        errors.nameError = testResult.name;
        errors.dateOfBirthError = testResult.dateOfBirth;
        errors.genderError = testResult.gender;
        errors.addressError = testResult.address;

        return res.json({
            success: false,
            errors: errors
        })
    } 
    return next();
}