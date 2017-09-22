const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const aDao = require('../../dao/article/article-dao');
const getAllArticle = aDao.getAllArticle;
const getOneArticle = aDao.getOneArticle;
const getArticleByType = aDao.getArticleByType;
const addArticle = aDao.addArticle;
const modifyArticle = aDao.modifyArticle;
const deleteArticle = aDao.deleteArticle;
const getCommentnum = aDao.getCommentnum;

const cDao = require('../../dao/article/comment-dao.js');
const getAllComment = cDao.getAllComment;
const getOneComment = cDao.getOneComment;
const addComment = cDao.addComment;
const deleteComment = cDao.deleteComment;
const modifyComment = cDao.modifyComment;

const tDao = require('../../dao/article/type-dao');
const getType = tDao.getType;
const getOneType = tDao.getOneType;
const addType = tDao.addType;
const deleteType = tDao.deleteType;
const modifyType = tDao.modifyType;

const checkLogin = require('../../middleware/checklogin').checkLogin;

function html_decode(str)
{
	var s = "";
	if (str.length == 0) return "";
	s = str.replace(/&gt;/g, ">");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&nbsp;/g, " ");
	s = s.replace(/&#39;/g, "\'");
	s = s.replace(/&quot;/g, "\"");
	s = s.replace(/<br>/g, "\n");
	return s;
}



//后台管理页获取文章分类
router.get('/admin', checkLogin, function(req, res) {

	getType().then(function(type) {

		res.render('article/admin/index', {
			type: type
		});

	}).catch(function(err) {
		console.log(err);
	});

});


//根据文章分类进入不同的文章列表
router.get('/admin/articlelist', checkLogin, function(req, res) {

	let tid = req.query.id;

	if(tid == undefined) {

		getAllArticle().then(function(data) {
			res.render('article/admin/articlelist', {
				data: data
			});
		}).catch(function(err) {

			console.log(err);

		});


	}else{


		getArticleByType(tid).then(function(data) {

			res.render('article/admin/articlelist', {
				data: data
			});

		}).catch(function(err) {

			console.log(err);
			
		});

	}

	
});



//写文章
router.route('/admin/addarticle').get(checkLogin, function(req, res) {

	getType().then(function(type) {

		res.render('article/admin/addarticle', {
			type: type
		});

	}).catch(function(err) {
		console.log(err);
	});


})
.post(checkLogin, urlencodedParser, function(req, res) {

	let title = req.body.title;
	let author = req.body.author;
	let tid = req.body.tid;
	let intro = req.body.intro;
	let htmlcontent = req.body.htmlcontent;
	let mdcontent = req.body.mdcontent;

	addArticle(title, author, tid, intro, htmlcontent, mdcontent).then(function(data) {

		if(data == 'success') {
			res.json({
				status: 1
			});
		}else {
			res.json({
				status: 0
			});
		}

	}).catch(function(err) {
		console.log(err);
	});
});



//修改文章
router.route('/admin/modifyarticle').get(checkLogin, function(req, res) {
	

		getOneArticle(req.query.id).then(function(data) {

			let mdcontent = html_decode(data.mdcontent);

			getType().then(function(type) {

				res.render('article/admin/modifyarticle', {
					details: { title: data.title,
						author: data.author,
						intro: data.intro,
						type: data.type,
						mdcontent: mdcontent
					},
					type: type
				});

			}).catch(function(err) {
				console.log(err);
			});
		}).catch(function(err) {
			console.log(err);
		});

}).post(checkLogin, urlencodedParser, function(req, res) {


	let aid = req.body.aid;
	let title = req.body.title;
	let author = req.body.author;
	let tid = req.body.tid;
	let intro = req.body.intro;
	let htmlcontent = req.body.htmlcontent;
	let mdcontent = req.body.mdcontent;

	modifyArticle(aid, title, author, tid, intro, htmlcontent, mdcontent).then(function(data) {

		if(data == 'success') {
			res.json({
				status: 1
			});
		}else {
			res.json({
				status: 0
			});
		}
	}).catch(function(err) {
		console.log(err);
	});

});



//删除文章
router.get('/admin/deletearticle', checkLogin, function(req, res) {



	let id = req.query.id;

	deleteArticle(id).then(function(data) {

		if(data == 'success') {
			res.redirect('/article/admin/articlelist');
		}else {
			res.json({
				status: 0
			});
		}

	}).catch(function(err) {
		console.log(err);
	});

});




//后台管理页获取评论列表
router.get('/admin/commentlist', checkLogin, function(req, res) {

	let aid = req.query.id;
	getAllComment(aid).then(function(comment) {
		console.log(comment);

		res.render('article/admin/commentlist', {
			comment: comment
		});
	}).catch(function(err) {
		console.log(err);
	});


})

//修改评论
router.route('/admin/modifycomment').get(checkLogin, function(req, res) {

	let id = req.query.id;
	getOneComment(id).then(function(data) {

		res.render('article/admin/modifycomment', {
			comment: data
		});

	}).catch(function(err) {
		console.log(err);
	});

}).post(checkLogin, urlencodedParser, function(req, res) {

	let id = req.body.cid;
	let content = req.body.content;
	modifyComment(id, content).then(function(data) {

		if(data == 'success') {
			res.json({
				status: 1
			});
		}else {
			res.json({
				status: 0
			});
		}

	}).catch(function(err) {
		console.log(err);
	});

});

//删除评论
router.get('/admin/deletecomment',checkLogin, function(req, res) {

	let id = req.query.id;

	deleteComment(id).then(function(data) {

		if(data == 'success') {
			res.redirect('/article/admin');
		}else {
			res.json({
				status: 0
			});
		}

	}).catch(function(err) {
		console.log(err);
	});
	
});



//增加文章分类
router.post('/admin', checkLogin, urlencodedParser, function(req, res) {

	let type = req.body.type;
	addType(type).then(function(data) {

		if(data == 'success') {
			res.json({
				status: 1
			});
		}else {
			res.json({
				status: 0
			});
		}

	}).catch(function(err) {
		console.log(err);
	});

});


//修改文章分类

router.route('/admin/modifytype').get(checkLogin, function(req, res) {

	let id = req.query.id;
	getOneType(id).then(function(type) {

		res.render('article/admin/modifytype', {
			type: type
		});

	}).catch(function(err) {

		console.log(err);
	});

}).post(checkLogin, urlencodedParser, function(req, res) {

	let id = req.body.id;
	let type = req.body.type;
	modifyType(id, type).then(function(data) {

		if(data == 'success') {
			res.json({
				status: 1
			});
		}else {
			res.json({
				status: 0
			});
		}

	}).catch(function(err) {
		console.log(err);
	});
});


//删除文章分类
router.get('/admin/deletetype', checkLogin, function(req, res) {
	let id = req.query.id;
	deleteType(id).then(function(data) {

		if(data == 'success') {
			res.json({
				status: 1
			});
		}else {
			res.json({
				status: 0
			});
		}

	}).catch(function(err) {
		console.log(err);
	});
	
});


module.exports = router;
