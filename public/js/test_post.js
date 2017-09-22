document.getElementById('submit').addEventListener('click', sub);


function sub() {

	let content = document.getElementById('content').value;
	alert(content);
	ajax({
			url: "/dailyrecord/admin",
			type: "POST",
			dataType: "JSON",
			data: {
				content: content
			},
			//成功
			success: function(data){
				data = JSON.parse(data);
				alert(data.status);
			},
			//失败
			fail: function(status){
			}
		});
}