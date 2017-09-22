document.getElementById('submit').addEventListener('click', login);

function login(){

	let user = document.getElementById('user').value;
	let password = document.getElementById('password').value;

	ajax({
		url: '/login',
		type: 'POST',
		dataType: 'JSON',
		data: {
			name: user,
			password: password
		},
		success: function(data) {
			data = JSON.parse(data);

		
			if(data.status == 1) {
				alert('成功登录！');
				window.location.href = '/article/admin';
			}else {
				alert('密码或账户错误！');
			}
		},

		fail: function(status) {
			console.log(status);
		}
	});
}