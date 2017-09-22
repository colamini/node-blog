document.getElementById('submit').addEventListener('click', modifyRecord);



function modifyRecord(){
	let id = getQueryString('id'); 
	let content = document.getElementById('content').value;
	ajax({
		url: '/dailyrecord/admin/modifyrecord',
		type: 'POST',
		dataType: 'JSON',
		data: {
			id: id,
			content: content
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.status == 1){
				alert("修改生活记录成功！");
				window.location.href = '/dailyrecord/admin';
			}else {
				alert('修改生活记录失败！');
			}
			
			
		},
		fail: function(status) {
			console.log(status);
		}
	});
}

