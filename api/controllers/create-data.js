module.exports = async function createData(req, res) {
    let firstNames = ["Nguyễn", "Trần", "Cao", "Hà", "Ngô", "Đỗ"];
    let secondNames = ["Thị", "Văn", "Đình", "Khánh", "Hữu", "Đức"];
    let thirdNames = ["Minh", "Trang", "Nam", "Ly", "Nhung", "Linh"];
    let genders = ["Nam", "Nữ"];
    let addresses = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Huế"];

    for (let i = 0; i < 500; i ++) {
        await Student.create({
            mssv: "2018" + ("0000" + i).slice(-4),
            name: firstNames[createRadomInRange(0, 6)] + " " + secondNames[createRadomInRange(0, 6)] + " " + thirdNames[createRadomInRange(0, 6)],
            dateOfBirth: "1996-" + ("00" + createRadomInRange(1, 13)).slice(-2) + "-" + ("00" + createRadomInRange(1, 31)).slice(-2),
            gender: genders[createRadomInRange(0, 2)],
            address: addresses[createRadomInRange(0, 4)]
        })
    }
    res.send("da tao 500 sinh vien");
}
function createRadomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}