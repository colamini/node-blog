let aid = getQueryString('id');
document.getElementById('praise').addEventListener('click', praise);

//点赞
function praise(){
	let heartImg = document.getElementsByClassName('heart-img')[0];
	if(heartImg.className === 'heart-img') {
		ajax({
		url: '/article/details/addpraisenum',
		type: 'POST',
		dataType: 'JSON',
		data: {
			aid: aid,
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.status == 1) {
				let praisenum = document.getElementById('praisenum');
				praisenum.innerHTML = parseInt(praisenum.innerHTML) + 1;
				heartImg.className = 'heart-img heart-img-like';

			}else{
				alert('点赞失败!');
			}
		},
		fail: function(status) {
			console.log(status);
		}
	});
	}else{
		alert('不要重复点赞哦！');

	}
	
}