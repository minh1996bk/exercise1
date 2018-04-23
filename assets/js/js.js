var currentPage;
var sortField;
var sortOrder;
var searchString;
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
	students.forEach(student => {
		htm += `
		<tr>
			<td>
				<button class="btn" data-toggle="modal" data-target="#divUpdateModal" onclick="showUpdateWindow(${student.mssv})">
					<i class="glyphicon glyphicon-pencil"></i>Chỉnh sửa
				</button>
				<button class="btn" onclick="showDeleteWindow(${student.mssv})"><i class="glyphicon glyphicon-remove"></i>Xóa</button>
			</td>
			<td>${student.mssv}</td>
			<td>${student.name}</td>
			<td>${student.dateOfBirth}</td>
			<td>${student.gender}</td>
			<td>${student.address}</td>
		</tr>
		`;
	})
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
			<li><button onclick="doMovetoOtherPage(1)">First</button></li>
			<li><button onclick="doMovetoOtherPage(${prev})"><<</button></li>
	`;

	for (let i = startIndex; i <= endIndex; i ++) {
		if (currentPage === i) {
			htm += `
			<li><button class="btnSelected" disabled onclick="doMovetoOtherPage(${i})">${("00" + i).slice(-2)}</button></li>`;
		} else {
			htm += `
				<li><button onclick="doMovetoOtherPage(${i})">${("00" + i).slice(-2)}</button></li>
			`;
		}
		
	}

	htm += `
			<li><button onclick="doMovetoOtherPage(${next})">>></button></li>
			<li><button onclick="doMovetoOtherPage(${totalPage})">Last</button></li>
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

}

async function sendDeleteRequest(mssv) {
	let results = await $.post('/delete-student', {
		mssv: mssv
	});
	console.log(results);
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
		address: gender
	}
	let results = await $.post('/update-student', student);
	console.log(results);
}


async function doInsertStudent() {
	let mssv = $("input[name='mssv']").val();
	let name = $("input[name='name']").val();
	let dateOfBirth = $("input[name='dateOfBirth']").val();
	let gender = $("input[name='gender']").val();
	let address = $("input[name='address']").val();

	let student = {
		mssv: mssv,
		name: name,
		dateOfBirth: dateOfBirth,
		gender: gender,
		address: gender
	}
	let results = await $.post('/student', student);
	console.log(results);

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


(async function() {
	let data = await getStudents();
	renderStudents(data.students);
	renderNumberPage(data.totalStudent, currentPage);
})();