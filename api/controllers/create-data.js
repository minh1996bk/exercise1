module.exports = async function createData(req, res) {
    let firstNames = ["Nguyen", "Tran", "Cao", "Ha", "Ngo", "Do"];
    let secondNames = ["Thi", "Van", "Dinh", "Khanh", "Huu", "Duc"];
    let thirdNames = ["Minh", "Minh", "Nam", "Ly", "Nhung", "Linh"];
    let genders = ["Nam", "Nu"];
    let addresses = ["Ha Noi", "Ho Chi Minh", "Da Nang", "Hue"];

    for (let i = 0; i < 500; i ++) {
        await Student.create({
            mssv: "2018" + ("0000" + i).slice(-4),
            name: firstNames[createRadomInRange(0, 5)] + secondNames[createRadomInRange(0, 5)] + thirdNames[createRadomInRange(0, 5)],
            dateOfBirth: "20/01/1996",
            gender: genders[createRadomInRange(0, 1)],
            address: addresses[createRadomInRange(0, 3)]
        })
    }
}
function createRadomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}