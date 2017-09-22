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

function dateFormat(inputTime) { //2016-10-16 10:03:02
	//2016-10-16
	var inputArr = inputTime.split(' ');
	var date = inputArr[0];
	return date;
}

//显示生活记录列表
router.get('/', function(req, res) {

	getAllRecord().then(function(data) {

		res.render('dailyrecord/user/index', {
			data: data
		});

	}).catch(function(err) {

		console.log(err);

	});


});
module.exports = router; 