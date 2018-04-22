var currentPage = 1;

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
				<button onclick="showUpdateWindow(${student.mssv})"><i class="glyphicon glyphicon-pencil"></i>Chỉnh sửa</button>
				<button onclick="showDeleteWindow(${student.mssv})"><i class="glyphicon glyphicon-remove"></i>Xóa</button>
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
	spanInfo.text(` ${currentPage * 10}/${totalStudent}`);
	let divPageNumber = $('#divPageNumber');
	divPageNumber.empty();
	divPageNumber.append(htm);

}

async function doMovetoOtherPage(pageNumber) {
	let criteria = {
		pageNumber: pageNumber
	}
	let data = await getStudents(criteria);
	renderStudents(data.students);
	renderNumberPage(data.totalStudent, pageNumber);
	currentPage = pageNumber;
}

async function showDeleteWindow(mssv) {
	let data = await getStudentByMssv(mssv);
	let student = data.student;
	let htm;
	htm = `
		<div>
			<h4>Bạn chắc chắn muốn xóa sinh viên:</h4>
		</div>
		<div class="inputElement">
			<label>Mã sinh viên</label>
			<input type="text" value="${student.mssv}" readonly>
		</div>
		<div class="inputElement">
			<label>Họ tên</label>
			<input type="text" value="${student.name}" readonly>
		</div>
		
		<button onclick="sendDeleteRequest(${mssv})">Thực thi</button>
		<button onclick="closePopup()">Trở về</button>
	`;
	let divPopup = $('#divPopup');
	divPopup.empty();
	divPopup.append(htm);
	divPopup.show();
}

async function sendDeleteRequest(mssv) {

}

async function showUpdateWindow(mssv) {
	let data = await getStudentByMssv(mssv);
	let student = data.student;
	let htm;
	htm = `
		<div class="inputElement">
			<label>Mã sinh viên</label>
			<input type="text" value="${student.mssv}" readonly>
		</div>
		<div class="inputElement">
			<label>Họ tên</label>
			<input type="text" value="${student.name}">
		</div>
		<div class="inputElement">
			<label>Ngày sinh</label>
			<input type="text" value="${student.dateOfBirth}">
		</div>
		<div class="inputElement">
			<label>Giới tính</label>
			<input type="text" value="${student.gender}">
		</div>
		<div class="inputElement">
			<label>Địa chỉ</label>
			<input type="text" value="${student.address}">
		</div>
		<button onclick="sendUpdateRequest()">Thực thi</button>
		<button onclick="closePopup()">Trở về</button>
	`;
	
	let divPopup = $('#divPopup');
	divPopup.empty();
	divPopup.append(htm);
	divPopup.show();
}

async function sendUpdateRequest() {

}

async function showInsertWindow() {
	let htm;
	htm = `
		<div class="inputElement">
			<label>Mã sinh viên</label>
			<input type="text">
		</div>
		<div class="inputElement">
			<label>Họ tên</label>
			<input type="text">
		</div>
		<div class="inputElement">
			<label>Ngày sinh</label>
			<input type="text">
		</div>
		<div class="inputElement">
			<label>Giới tính</label>
			<input type="text">
		</div>
		<div class="inputElement">
			<label>Địa chỉ</label>
			<input type="text">
		</div>
		<button onclick="sendInsertRequest()">Thực thi</button>
		<button onclick="closePopup()">Trở về</button>
	`;
	let divPopup = $('#divPopup');
	divPopup.empty();
	divPopup.append(htm);
	divPopup.show();
}

async function sendInsertRequest() {
	
}

function closePopup() {
	let divPopup = $('#divPopup');
	divPopup.empty();
	divPopup.hide();
}

(async function() {

	let data = await getStudents();
	
	renderStudents(data.students);
	renderNumberPage(data.totalStudent, currentPage);

	
})();