document.getElementById('submit').addEventListener('click', addComment);


function addComment() {

	let aid = getQueryString('id');
	let name = document.getElementById('name').value;
	let content = document.getElementById('content').value;
	let email = document.getElementById('email').value;
	let hostpage = document.getElementById('hostpage').value;

	if(name === '') {
		alert('用户名不能为空哦！');
		return false;
	} else if(content === '') {
		alert('评论内容不能为空哦！');
		return false;
	}else{

	ajax({
		url: '/article/details',
		type: 'POST',
		dataType: 'JSON',
		data: {
			aid: aid,
			content: content,
			name: name,
			email: email,
			hostpage: hostpage
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.status == 1) {
				alert('发表评论成功!看看别的文章吧！');
				window.location.href = '/article/details?id=' + aid;

			}else{
				alert('发表评论失败!');
			}
		},
		fail: function(status) {
			console.log(status);
		}
	});
	
	}

}