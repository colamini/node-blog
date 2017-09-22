document.getElementById('submit').addEventListener('click', modifyType);


function modifyType() {

	let id = getQueryString('id');
	let type = document.getElementById('type').value;
	

	ajax({
		url: '/article/admin/modifytype',
		type: 'POST',
		dataType: 'JSON',
		data: {
			id: id,
			type: type
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.status == 1) {
				alert('修改文章分类成功!');
				window.location.href = '/article/admin';
				

			}else{
				alert('修改文章分类失败!');
			}
		},
		fail: function(status) {
			console.log(status);
		}
	});
}