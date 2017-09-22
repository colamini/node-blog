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
const addViewnum = aDao.addViewnum;
const addPraisenum = aDao.addPraisenum;

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

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0;
}



/*==============================
		  文章列表页
	   获取全部文章列表
获取文章分类
===============================*/

router.get('/', function(req, res) {

	getAllArticle().then(function(data) {

		getType().then(function(type) {

			res.render('article/user/index', {
				data: data,
				type: type,
				tid: undefined

			});


		}).catch(function(err) {
			console.log(err);
		});


	}).catch(function(err) {
		console.log(err);
	});

});


//根据文章类别显示文章
router.get('/type', function(req, res) {


		getArticleByType(req.query.id).then(function(data) {

			getType().then(function(type) {

				res.render('article/user/index', {
					data: data,
					type: type,
					tid: req.query.id

				});

			}).catch(function(err) {

				console.log(err);

			});

		}).catch(function(err) {
			console.log(err);
		});

	


});


/*==============================
		  文章详情页
	     获取具体文章
	   获取文章全部评论
发表评论
===============================*/
router.route('/details').get(function(req, res) {

	let aid = req.query.id;

	getOneArticle(aid).then(function(details) {

		getType().then(function(type) {

			getAllComment(aid).then(function(comment) {

				addViewnum(aid).then(function(data) {

					let htmlcontent = details.htmlcontent;

					res.render('article/user/articledetails', {
						details: {
							time: details.time,
							htmlcontent: html_decode(htmlcontent),
							viewnum: details.viewnum,
							praisenum: details.praisenum,
							tid: details.tid


						},

						type: type,
						comment: comment
					});

				}).catch(function(err) {
					console.log(err);
				});

			}).catch(function(err) {
				console.log(err);
			});

		}).catch(function(err) {

			console.log(err);

		});

	}).catch(function(err) {
		console.log(err);
	});

}).post(urlencodedParser, function(req, res) {

	let aid = req.body.aid;
	let name = req.body.name;
	let email = req.body.email;
	let hostpage = req.body.hostpage;
	let content = req.body.content;


	addComment(aid, name, email, hostpage, content).then(function(data) {

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


//点赞
router.post('/details/addpraisenum', urlencodedParser, function(req, res) {

	let aid = req.body.aid;

	addPraisenum(aid).then(function(data) {

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
	})

});


module.exports = router;