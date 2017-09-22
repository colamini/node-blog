document.getElementById('submit').addEventListener('click', modifyArticle);


//配置md富文本编辑器
var testEditor;

$(function() {
	testEditor = editormd("test-editormd", {
		width   : "90%",
		height  : 640,
		syncScrolling : "single",
		path    : "/editor.md/lib/",
		editorTheme: "base16-light"
	});

	$("#preview-btn").bind('click', function() {
		testEditor.previewing();
	});


});

function modifyArticle() {

	let aid = getQueryString('id');
	let title = document.getElementById('title').value;
	let author = document.getElementById('author').value;
	let tid = document.getElementById('type').value;
	let intro = document.getElementById('intro').value;
	let htmlcontent = html_encode(document.getElementsByClassName("editormd-preview-container")[0].innerHTML);
	let mdcontent = html_encode(testEditor.getMarkdown());


	ajax({
		url: '/article/admin/modifyarticle',
		type: 'POST',
		dataType: 'JSON',
		data: {
			aid: aid,
			title: title,
			author: author,
			tid: tid,
			intro: intro,
			htmlcontent: htmlcontent,
			mdcontent: mdcontent

		},

		success: function(data) {
			data = JSON.parse(data);
			if(data.status == 1) {
				alert('文章修改成功!');
				window.location.href = '/article/admin/articlelist';

			}else{
				alert('文章修改失败!');
			}
		},

		fail: function(status) {
			console.log(status);
		}
	});
}