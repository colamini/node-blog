document.getElementById('submit').addEventListener('click', addRecord);
function addRecord() {
	
	let content = document.getElementById('content').value;

	ajax({
		url: '/dailyrecord/admin',
		type: 'POST',
		dataType: 'JSON',
		data: {
			content: content
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.status == 1) {
				alert('添加生活记录成功!');
				window.location.href = '/dailyrecord/admin';

			}else{
				alert('添加生活记录失败!');
			}
		},
		fail: function(status) {
			console.log(status);
		}
	});
}