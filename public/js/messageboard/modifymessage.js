document.getElementById('submit').addEventListener('click', modifyMessage);



function modifyMessage(){
	let id = getQueryString('id'); 
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let hostpage = document.getElementById('hostpage').value;
	let content = document.getElementById('content').value;
	ajax({
		url: '/messageboard/admin/modifymessage',
		type: 'POST',
		dataType: 'JSON',
		data: {
			id: id,
			name: name,
			email: email,
			hostpage: hostpage,
			content: content
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.status == 1) {
				alert('成功修改留言！')
				window.location.href = '/messageboard/admin';
			}else{
				alert('修改留言失败！');

			}
		},
		fail: function(status) {
			console.log(status);
		}
	});
}

