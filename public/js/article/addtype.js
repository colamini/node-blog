document.getElementById('submit').addEventListener('click', addType);


function addType() {

	let type = document.getElementById('type').value;

	ajax({
		url: '/article/admin',
		type: 'POST',
		dataType: 'JSON',
		data: {
			type: type
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.status == 1) {
				alert('增加文章分类成功!');
				window.location.href = '/article/admin';
				

			}else{
				alert('增加文章分类失败!');
			}
		},
		fail: function(status) {
			console.log(status);
		}
	});
}