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

//显示生活记录列表
router.route('/').get(function(req, res) {

	getAllMessage().then(function(data) {

		res.render('messageboard/user/index', {
			message: data
		});

	}).catch(function(err) {

		console.log(err);

	});

}).post(urlencodedParser, function(req, res) {
	let name = req.body.name;
	let email = req.body.email;
	let hostpage = req.body.hostpage;
	let content = req.body.content;

	addMessage(name, email, hostpage, content).then(function(data) {
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