document.getElementById('submit').addEventListener('click', addMessage);
function addMessage() {
	
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let hostpage = document.getElementById('hostpage').value;
	let content = document.getElementById('content').value;

	if(name === '') {
		alert('用户名不能为空哦！');
		return false;
	} else if(content === '') {
		alert('留言内容不能为空哦！');
		return false;
	}else{

		ajax({
			url: '/messageboard',
			type: 'POST',
			dataType: 'JSON',
			data: {
				name: name,
				email: email,
				hostpage: hostpage,
				content: content
			},
			success: function(data) {
				data = JSON.parse(data);
				if(data.status == 1) {
					alert('留言成功!下次再来哦~');
					window.location.href = '/messageboard';

				}else{
					alert('留言失败!');
				}
			},
			fail: function(status) {
				console.log(status);
			}
		});
	}
}