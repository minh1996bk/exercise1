
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


	er=/[0-9]{8}/.test(masv);
	
	if(er==false){	
	loima=document.getElementById('error').innerHTML="Ma sv gom 8 so";
	return false;

	}else  loima=document.getElementById('error').innerHTML="";

	if(hten==""){	
	loiht=document.getElementById('errorht').innerHTML="Khong duoc de trong ho ten";
	return false;

	}else loiht=document.getElementById('errorht').innerHTML="";
	if(ns==""){	
	loins=document.getElementById('errorns').innerHTML="Khong duoc de trong ngay sinh";
	return false;

	}else 	loins=document.getElementById('errorns').innerHTML="";

	if(dc ==""){	
	loidc=document.getElementById('errordc').innerHTML="Khong duoc de trong dia chi";
	return false;

	}else loidc=document.getElementById('errordc').innerHTML="";
	return true;



}
function check2(){
	
	var loima=document.getElementById('error').value;
	var hten=document.getElementById('txt_name').value;
	var loiht=document.getElementById('errorht').value;
	var ns=document.getElementById('txt_ns').value;
	var loins=document.getElementById('errorns').value;
	var dc=document.getElementById('txt_dc').value;
	var loidc=document.getElementById('errordc').value;
	var er;


	
	if(hten==""){	
	loiht=document.getElementById('errorht').innerHTML="Khong duoc de trong ho ten";
	return false;

	}else loiht=document.getElementById('errorht').innerHTML="";
	if(ns==""){	
	loins=document.getElementById('errorns').innerHTML="Khong duoc de trong ngay sinh";
	return false;

	}else 	loins=document.getElementById('errorns').innerHTML="";

	if(dc ==""){	
	loidc=document.getElementById('errordc').innerHTML="Khong duoc de trong dia chi";
	return false;

	}else loidc=document.getElementById('errordc').innerHTML="";
	return true;



}


