var currentPage;
var sortField;
var sortOrder;
var searchString;
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
		pageNumber=${criteria.pageNumber || 1}
		&recordCount=${criteria.recordCount || 10}
		&searchString=${criteria.searchString || ""}
		&sortField=${criteria.sortField || 'mssv'}
		&sortOrder=${criteria.sortOrder || 'ASC'}
	`;
	return $.get(url)
}

function getStudentByMssv(mssv) {
	let url = `/student/${mssv}`;
	return $.get(url);
}

function renderStudents(students) {
	let htm;
	let size = students.length;
	for (let i = 0; i < size; i ++) {
		htm += `
		<tr>
			<td>
				<button class="btn" data-toggle="modal" data-target="#divUpdateModal" onclick="showUpdateWindow(${students[i].mssv})">
					<i class="glyphicon glyphicon-pencil"></i>Chỉnh sửa
				</button>
				<button class="btn" data-toggle="modal" data-target="#divDeleteModal" onclick="showDeleteWindow(${students[i].mssv})"><i class="glyphicon glyphicon-remove"></i>Xóa</button>
			</td>
			<td>${students[i].mssv}</td>
			<td>${students[i].name}</td>
			<td>${students[i].dateOfBirth}</td>
			<td>${students[i].gender}</td>
			<td>${students[i].address}</td>
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
			<li><button class="btn btnSelected" disabled onclick="doMovetoOtherPage(${i})">${("00" + i).slice(-2)}</button></li>`;
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
		sortField: sortField,
		sortOrder: sortOrder,
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

async function onOrderStateChange(_sortField, _sortOrder) {

	let divSortField = $(`div#${_sortField}`);
	let newSortOrder = _sortOrder === 'ASC' ? 'DESC' : 'ASC';
	let iconClass = _sortOrder === 'ASC' ? "glyphicon glyphicon-circle-arrow-down" : "glyphicon glyphicon-circle-arrow-up";
	let htm = `
		<button class="btnChangeOrder" onclick="onOrderStateChange('${_sortField}', '${newSortOrder}')">
			<i class="${iconClass}"></i>
		</button>
	`;
	divSortField.empty();
	divSortField.append(htm);

	let criteria = {
		sortField : _sortField, 
		sortOrder: _sortOrder
	}
	sortField = _sortField;
	sortOrder = _sortOrder;
	let data = await getStudents(criteria);
	renderStudents(data.students);
	renderNumberPage(data.totalStudent, 1);
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

(async function() {
	let data = await getStudents();
	renderStudents(data.students);
	renderNumberPage(data.totalStudent, currentPage);
})();