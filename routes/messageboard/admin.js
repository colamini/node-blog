const express = require('express');
const router = express.Router();
const Dao = require('../../dao/messageboard/messageboard-dao');
const getAllMessage = Dao.getAllMessage;
const getOneMessage = Dao.getOneMessage;
const addMessage = Dao.addMessage;
const deleteMessage = Dao.deleteMessage;
const modifyMessage = Dao.modifyMessage;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const checkLogin = require('../../middleware/checklogin').checkLogin;

//后台管理页显示留言列表
router.get('/admin', checkLogin, function(req, res) {
	getAllMessage().then(function(data) {

		res.render('messageboard/admin/index', {
			message: data
		});

	}).catch(function(err) {

		console.log(err);

	});
})


//删除生活记录不需要post一个id
router.get('/admin/deletemessage', checkLogin, function(req, res) {
	let id = req.query.id;

	deleteMessage(id).then(function(data) {

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


router.route('/admin/modifymessage').get(checkLogin, function(req, res) {
	let id = req.query.id;

	getOneMessage(id).then(function(data) {
		res.render('messageboard/admin/modifymessage', {
			data: data
		});
	
	}).catch(function(err) {
		console.log(err);
	});


}).post(checkLogin, urlencodedParser, function(req, res) {

	modifyMessage(req.body.id, req.body.name,req.body.email,req.body.hostpage,req.body.content).then(function(data) {
		if(data == 'success') {
			res.json({
				status: 1
			});

		}else{
			res.json({
				status: 0
			});
		}
	}).catch(function(err) {
		console.log(err);
	});

});




module.exports = router; 