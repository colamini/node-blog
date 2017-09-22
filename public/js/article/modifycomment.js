document.getElementById('submit').addEventListener('click', modifyComment);


function modifyComment() {

	let cid = getQueryString('id');
	let name = document.getElementById('name').value;
	let content = document.getElementById('content').value;
	let email = document.getElementById('email').value;
	let hostpage = document.getElementById('hostpage').value;

	ajax({
		url: '/article/admin/modifycomment',
		type: 'POST',
		dataType: 'JSON',
		data: {
			cid: cid,
			content: content,
			name: name,
			email: email,
			hostpage: hostpage
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.status == 1) {
				alert('修改评论成功!');
				window.location.href = '/article/admin/articlelist';
				

			}else{
				alert('修改评论失败!');
			}
		},
		fail: function(status) {
			console.log(status);
		}
	});
}