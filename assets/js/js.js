var currentPage = 8;
async function doAsync() {
	async function getStudents(criteria) {
		criteria = criteria || {};
		let url = `/getStudents?
			pageNumber=${criteria.pageNumber || 1}
			&recordCount=${criteria.recordCount || 10}
			&searchString=${criteria.searchString || ""}
			&sortField=${criteria.sortField || 'mssv'}
			&sortOrder=${criteria.sortOrder || 'ASC'}
		`;
		return await $.get(url)
	}

	function renderStudents(students) {
		let htm;
		students.forEach(student => {
			htm += `
			<tr>
				<td>
					<button><i class="glyphicon glyphicon-pencil"></i>Chỉnh sửa</button>
					<button><i class="glyphicon glyphicon-remove"></i>Xóa</button>
				</td>
				<td>${student.mssv}</td>
				<td>${student.name}</td>
				<td>${student.dateOfBirth}</td>
				<td>${student.gender}</td>
				<td>${student.address}</td>
			</tr>
			`;
		})
		$('#tbodyRows').append(htm);
	}

	function renderNumberPage(totalStudent, currentPage) {
		let totalPage = Math.ceil(totalStudent / 10);
		currentPage = currentPage <= totalPage && currentPage >= 1 ? currentPage : 1;
		let startIndex;
		let endIndex;
		let prev, next;
		startIndex = currentPage - 4 >= 1 ? currentPage - 4 : 1;
		endIndex = startIndex + 9 <= totalPage ? startIndex + 9 : totalPage;

		let htm;
		htm = `
			<ul>
				<li><button>First</button></li>
				<li><button><<</button></li>
		`;

		for (let i = startIndex; i <= endIndex; i ++) {
			if (currentPage === i) {
				htm += `
				<li><button class="btnSelected" disabled>${i}</button></li>`;
			} else {
				htm += `
					<li><button>${i}</button></li>
				`;
			}
			
		}

		htm += `
				<li><button>>></button></li>
				<li><button>Last</button></li>
			</ul>
		`;
		console.log(startIndex, currentPage, endIndex);
		$('#divPageNumber').append(htm);

	}
	(async function() {
		let main = document.getElementById('main');

		let popup = document.getElementById('divPopup');
		
		let btnInsert = document.getElementById('btnInsert');
	
		let btnClosePopup = document.getElementById('btnClosePopup');
	
		btnInsert.onclick = function() {
			main.style.display = "none";
			popup.style.display = "block";
	
		}
	
		btnClosePopup.onclick = function() {
			popup.style.display = "none";
			main.style.display = "block";
		}

		
	})();
	

	let data = await getStudents();
	
	renderStudents(data.students);
	renderNumberPage(data.totalStudent, currentPage);
	
}
doAsync();