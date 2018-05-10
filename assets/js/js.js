var students;
var totalStudent;
var currentPage = 1;
var searchString = "";
var recordCount = 10;

var mssvOrder;
var nameOrder;
var dateOfBirthOrder;
var genderOrder;
var addressOrder;

$(document).ready(function() {
	$('#datetimepicker1').datetimepicker();

})
var constraint = {
	mssv: [
		function isEightDigits(val) {
			let _val = parseInt(val);
			let check = /^\d{8}$/.test(_val);
			if (!check) return "Mã sô sinh viên phải gồm 8 chữ số"

		}
	],
	name: [
		function onlyVietCharacter(val) {
			let check =  /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+$/.test(val);
			if (!check) return "Họ tên chỉ chữ cái khoảng trắng";

		}
	],
	dateOfBirth: [
		function isValidDate(val) {
			let date = new Date(val);
			let check = /\d\d\d\d\-\d\d\-\d\d/.test(val);
			let isDate = date.toString() === 'Invalid Date';
			if (isDate || !check) {
				return "Nhập ngày định dạng yyyy-MM-dd";
			}
		}
	],
	gender: [
		function isValidGender(val) {
			if (!["Nam", "Nữ"].includes(val)) {
				return "Chọn giới tính Nam hoặc Nữ";
			}
		}
	],
	address: [
		function onlyVietCharacter(val) {
			let check =  /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+$/.test(val);
			if (!check) return "Họ tên chỉ chữ cái khoảng trắng";

		}
	]
}
function getStudents(criteria) {
	criteria = criteria || {};
	let url = `/getStudents?
		pageNumber=${criteria.pageNumber || currentPage}
		&recordCount=${criteria.recordCount || recordCount}
		&searchString=${criteria.searchString || searchString}
	`;
	return $.get(url);
}

function getStudentByMssv(mssv) {
	let url = `/student/${mssv}`;
	return $.get(url);
}

function formatDate(dateString) {
	let arr = dateString.split('-');
	return [arr[2], arr[1], arr[0]].join('-');
}

function renderStudents(students) {
	let htm;
	let size = students.length;
	for (let i = 0; i < size; i ++) {
		htm += `
		<tr>
			
			<td style="padding: 5px;">${students[i].mssv}</td>
			<td><p class="like-link" data-toggle="modal" data-target="#divUpdateModal" onclick="showUpdateWindow(${students[i].mssv})">${students[i].name}</p></td>
			<td>${formatDate(students[i].dateOfBirth)}</td>
			<td>${students[i].gender}</td>
			<td>${students[i].address}</td>
			<td>
				<button class="btn in-row" data-toggle="modal" data-target="#divUpdateModal" onclick="showUpdateWindow(${students[i].mssv})">
					<i class="glyphicon glyphicon-pencil"></i>Chỉnh sửa
				</button>
				<button class="btn in-row" data-toggle="modal" data-target="#divDeleteModal" onclick="showDeleteWindow(${students[i].mssv})"><i class="glyphicon glyphicon-remove"></i>Xóa</button>
			</td>
		</tr>
		`;
	}

	let tbodyRows = $('#tbodyRows');
	tbodyRows.empty();
	tbodyRows.append(htm);
}

function renderNumberPage(totalStudent, currentPage) {
	let totalPage = Math.ceil(totalStudent / 10);
	currentPage = currentPage <= totalPage && currentPage >= 1 ? currentPage : 1;
	let startIndex;
	let endIndex;
	let prev, next;
	startIndex = currentPage - 4 >= 1 ? currentPage - 4 : 1;
	endIndex = startIndex + 9 <= totalPage ? startIndex + 9 : totalPage;
	startIndex = endIndex == totalPage ? totalPage - 9 : startIndex;
	prev = currentPage - 1 >= 1 ? currentPage -1 : 1;
	next = currentPage + 1 <= totalPage ? currentPage + 1 : totalPage;
	let htm;
	htm = `
		<ul>
			<li><button class="btn" onclick="doMovetoOtherPage(1)">First</button></li>
			<li><button class="btn" onclick="doMovetoOtherPage(${prev})"><<</button></li>
	`;

	for (let i = startIndex; i <= endIndex; i ++) {
		if (currentPage === i) {
			htm += `
			<li><button class="btn btnSelected" style="background-color: #c4c5c6;" disabled onclick="doMovetoOtherPage(${i})">${("00" + i).slice(-2)}</button></li>`;
		} else {
			htm += `
				<li><button class="btn" onclick="doMovetoOtherPage(${i})">${("00" + i).slice(-2)}</button></li>
			`;
		}
		
	}

	htm += `
			<li><button class="btn" onclick="doMovetoOtherPage(${next})">>></button></li>
			<li><button class="btn" onclick="doMovetoOtherPage(${totalPage})">Last</button></li>
		</ul>
	`;
	let spanInfo = $('#spanInfo');
	spanInfo.text(` ${currentPage * 10 <= totalStudent ? currentPage * 10 : totalStudent}/${totalStudent}`);
	let divPageNumber = $('#divPageNumber');
	divPageNumber.empty();
	divPageNumber.append(htm);

}

async function doMovetoOtherPage(pageNumber) {
	let criteria = {
		pageNumber: pageNumber,
		searchString: searchString,
	}
	let data = await getStudents(criteria);
	renderStudents(data.students);
	renderNumberPage(data.totalStudent, pageNumber);
	currentPage = pageNumber;
}

async function showDeleteWindow(mssv) {
	let data = await getStudentByMssv(mssv);
	let student = data.student;
	$("input[name='mssvDelete']").val(student.mssv);
	$("input[name='nameDelete']").val(student.name);

}

async function doDeleteStudent() {
	let mssv = $("input[name='mssvDelete']").val();
	let results = await $.post('/delete-student', {
		mssv: mssv
	});
	if (!results) {
		return report500Error();
	}
	if (results.success) {
		$('#divDeleteModal').modal('toggle');
		return reprotSuccess("Xóa sinh viên thành công");
	} else if (results.errors) {
		return reportServerErrors(results.errors);
	} else {
		return report500Error();
	}
}

async function showUpdateWindow(mssv) {
	let data = await getStudentByMssv(mssv);
	let student = data.student;
	$("input[name='mssvUpdate']").val(student.mssv);
	$("input[name='nameUpdate']").val(student.name);
	$("input[name='dateOfBirthUpdate']").val(student.dateOfBirth);
	$("input[name='genderUpdate']").val(student.gender);
	$("input[name='addressUpdate']").val(student.address);
}

async function doUpdateStudent() {
	let mssv = $("input[name='mssvUpdate']").val();
	let name = $("input[name='nameUpdate']").val();
	let dateOfBirth = $("input[name='dateOfBirthUpdate']").val();
	let gender = $("input[name='genderUpdate']").val();
	let address = $("input[name='addressUpdate']").val();

	let student = {
		mssv: mssv,
		name: name,
		dateOfBirth: dateOfBirth,
		gender: gender,
		address: address
	}
	let results = await $.post('/update-student', student);
	if (!results) {
		return report500Error();
	}
	if (results.success) {
		$('#divUpdateModal').modal('toggle');
		return reprotSuccess("Cập nhật thông tin sinh viên thành công");
	} else if (results.errors) {
		return reportServerErrors(results.errors);
	} else {
		return report500Error();
	}
}


async function doInsertStudent() {
	let mssv = $("input[name='mssvInsert']").val();
	let name = $("input[name='nameInsert']").val();
	let dateOfBirth = $("input[name='dateOfBirthInsert']").val();
	let gender = $("input[name='genderInsert']").val();
	let address = $("input[name='addressInsert']").val();

	let student = {
		mssv: mssv,
		name: name,
		dateOfBirth: dateOfBirth,
		gender: gender,
		address: address
	}

	let results = await $.post('/student', student);

	if (!results) {
		return report500Error();
	}
	if (results.success) {
		$('#divInsertModal').modal('toggle');
		return reprotSuccess("Thêm sinh viên thành công");
	} else if (results.errors) {
		return reportServerErrors(results.errors);
	} else {
		return report500Error();
	}

}


function report500Error() {

}

function reprotSuccess(report) {
	let reportSuccessModal = $('#divReportSuccess');
	$('#hReport').text(report);
	reportSuccessModal.modal('show');
	setTimeout(function() {
		reportSuccessModal.modal('toggle');
	}, 1000);
}

function reportServerErrors(errors) {
	
}

function closePopup() {
	let divPopup = $('#divPopup');
	divPopup.empty();
	divPopup.hide();
}

function sapXepMssv() {
	
	mssvOrder = mssvOrder || 'ASC';
	mssvOrder = mssvOrder == 'ASC' ? 'DESC' : 'ASC';
	onOrderStateChange('mssv', mssvOrder);
	thayDoiIconKhiSapXep('icon-mssv', mssvOrder);
}

function sapXepTen() {
	nameOrder = nameOrder || 'ASC';
	nameOrder = nameOrder == 'ASC' ? 'DESC' : 'ASC';
	onOrderStateChange('name', nameOrder);
	thayDoiIconKhiSapXep('icon-name', nameOrder);
}

function sapXepGioiTinh() {
	genderOrder = genderOrder || 'ASC';
	genderOrder = genderOrder == 'ASC' ? 'DESC' : 'ASC';
	onOrderStateChange('gender', genderOrder);
	thayDoiIconKhiSapXep('icon-gender', genderOrder);
}


function sapXepNgaySinh() {
	dateOfBirthOrder = dateOfBirthOrder || 'ASC';
	dateOfBirthOrder = dateOfBirthOrder == 'ASC' ? 'DESC' : 'ASC';
	onOrderStateChange('dateOfBirth', dateOfBirthOrder);
	thayDoiIconKhiSapXep('icon-dob', dateOfBirthOrder);
}

function sapXepDiaChi() {
	addressOrder = addressOrder || 'ASC';
	addressOrder = addressOrder == 'ASC' ? 'DESC' : 'ASC';
	onOrderStateChange('address', addressOrder);
	thayDoiIconKhiSapXep('icon-address', addressOrder);
}

function onOrderStateChange(_sortField, _sortOrder) {
	students = students.sort((st1, st2) => {
		if (_sortOrder == 'ASC') {
			if (st1[_sortField] > st2[_sortField]) return 1;
			if (st1[_sortField] == st2[_sortField]) return 0;
			if (st1[_sortField] < st2[_sortField]) return -1;
			
		} else {
			if (st1[_sortField] < st2[_sortField]) return 1;
			if (st1[_sortField] == st2[_sortField]) return 0;
			if (st1[_sortField] > st2[_sortField]) return -1;
		}
	})
	
	
	renderStudents(students);
	renderNumberPage(totalStudent, currentPage);
}

function checkInputData(id, constraints, divReportId) {
	let length = constraints.length;
	let error;
	let val = $(`#${id}`).val();
	for (let i = 0; i < length; i ++) {
		error = constraints[i](val);
		if (error) {
			return reportInputError(divReportId, error);
		}
	}
	return successInput(divReportId);
}

function reportInputError(id, error) {
	let divReport = $(`#${id}`);
	let htm = `${error}`;
	divReport.empty();
	divReport.append(htm);
}

function successInput(id) {
	let divReport = $(`#${id}`);
	divReport.empty();
}

async function searchStudent() {
	let inputSearch = $('#inputSearch');
	let searchVal = inputSearch.val();
	searchString = searchVal;
	let response = await getStudents();
	students = response.students;
	totalStudent = response.totalStudent;
	renderStudents(response.students);
	renderNumberPage(response.totalStudent, 1);

}

(async function() {
	let data = await getStudents();
	students = data.students;
	totalStudent = data.totalStudent;
	
	renderStudents(data.students);
	renderNumberPage(data.totalStudent, currentPage);
})();

function thayDoiIconKhiSapXep(iconId, _sortOrder) {
	let iconIds = ['icon-mssv', 'icon-name', 'icon-dob', 'icon-gender', 'icon-address'];
	document.getElementById(`${iconId}`).style.backgroundColor = 'black';
	iconIds.forEach(id => {
		if (id != iconId) {
			document.getElementById(`${id}`).style.backgroundColor = 'initial';
		}
	})
	let oldIconClass = _sortOrder == 'ASC' ? 'glyphicon-circle-arrow-up' : 'glyphicon-circle-arrow-down';
	let iconClass = _sortOrder == 'ASC' ? 'glyphicon-circle-arrow-down' : 'glyphicon-circle-arrow-up';
	$(`#${iconId}`).removeClass(oldIconClass);
	$(`#${iconId}`).addClass(iconClass);

}
function showDiv(){
	let val = document.getElementById("boloc").value;
	// console.log(val);
	let divIds = ['masv','ngaysinh','gioitinh', 'diachi'];
	divIds.forEach(divId => {
		if (divId == val) {
			document.getElementById(divId).style.display = "block";
		} else {
			document.getElementById(divId).style.display = "none";
		}
	})

	
}