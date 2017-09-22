const express = require('express');
const router = express.Router();
const Dao = require('../../dao/dailyrecord/dailyrecord-dao');
const getAllRecord = Dao.getAllRecord;
const getOneRecord = Dao.getOneRecord;
const addRecord = Dao.addRecord;
const deleteRecord = Dao.deleteRecord;
const modifyRecord = Dao.modifyRecord;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const checkLogin = require('../../middleware/checklogin').checkLogin;

//后台管理页显示生活记录列表
router.route('/admin').get(checkLogin, function(req, res) {
	getAllRecord().then(function(data) {

		res.render('dailyrecord/admin/index', {
			data: data
		});

	}).catch(function(err) {

		console.log(err);

	});
})
.post(checkLogin, urlencodedParser, function(req, res) {

	addRecord(req.body.content).then(function(data) {

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
		console.log('err' + err);
	});


});

//删除生活记录不需要post一个id
router.get('/admin/deleterecord', checkLogin, function(req, res) {
	let id = req.query.id;

	deleteRecord(id).then(function(data) {

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

router.route('/admin/modifyrecord').get(checkLogin, function(req, res) {
	let id = req.query.id;

	getOneRecord(id).then(function(data) {
		res.render('dailyrecord/admin/modifyrecord', {
			data: data
		});

	}).catch(function(err) {
		console.log(err);
	});


}).post(checkLogin, urlencodedParser, function(req, res) {

	modifyRecord(req.body.id, req.body.content).then(function(data) {
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