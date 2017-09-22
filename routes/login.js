const express = require('express');
const Dao = require('../dao/user-dao.js');
const getUser = Dao.getUser;
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.route('/').get(function(req, res) {

	res.render('login', {});

}).post(urlencodedParser, function(req, res) {

	getUser().then(function(data) {
		
		if(req.body.name === data.name && req.body.password === data.password) {

			//写入session中
			req.session.user = req.body.name;
			

			res.json({
				status: 1
			});

		}else {

			res.json({
				status: 0 
			});

		}

	}).catch(function(err) {
		res.json({
			status: 0 
		});
	});

});

module.exports = router;
