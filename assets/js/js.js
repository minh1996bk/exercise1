
function check(){
	var masv=document.getElementById('masv').value;
	var loima=document.getElementById('error').value;
	var hten=document.getElementById('txt_name').value;
	var loiht=document.getElementById('errorht').value;
	var ns=document.getElementById('txt_ns').value;
	var loins=document.getElementById('errorns').value;
	var dc=document.getElementById('txt_dc').value;
	var loidc=document.getElementById('errordc').value;
	var er;

	var pattern=/^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+$/;
	er=/[0-9]{8}/.test(masv);
	
	if(er==false){	
			loima=document.getElementById('error').innerHTML="Mã sinh viên gồm 8 số";
			return false;

	}else  loima=document.getElementById('error').innerHTML="";

	if(pattern.test(hten)==false){	
		loiht=document.getElementById('errorht').innerHTML="Họ tên không hợp lệ";
		return false;

	}else loiht=document.getElementById('errorht').innerHTML="";
	if(ns==""){	
		loins=document.getElementById('errorns').innerHTML="Không được để trống ngày sinh";
		return false;

	}else 	loins=document.getElementById('errorns').innerHTML="";

	if(dc ==""){	
		loidc=document.getElementById('errordc').innerHTML="Không được để trống địa chỉ";
		return false;

	}else loidc=document.getElementById('errordc').innerHTML="";
	return true;



}



