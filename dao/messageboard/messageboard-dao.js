//加载数据库基本配置
const config = require('../../config/database-config.js').config;

//加载mysql模块
const mysql = require('mysql');

//建立连接池
let pool = mysql.createPool(config);



module.exports = {

	//获取全部留言
	getAllMessage: function getAllMessage() {

		//return的值是promise对象resolve的结果，这里也有先后顺序的体现。有时候是先return然后再连接数据库，
		//容易导致return的结果为空或者undefined
		return new Promise(function(resolve, reject) {
			let selectSQL = "select * from messageboard";

			//建立单个连接
			pool.getConnection(function(err, connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query(selectSQL, function(err, rows) {

						if(err){
							reject(err);
						}else {

							resolve(rows);

						}

					});
					connection.release();
				}

			});

		});


	},
	

	//获取单条生活记录
	getOneMessage: function getOneMessage(id) {
		return new Promise(function(resolve, reject) {

			let searchSQL = "select * from messageboard where `id` = " + id;

			//建立单个连接
			pool.getConnection(function(err, connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query(searchSQL, function(err, rows) {

						if(err){
							reject(err);
						}else {

							resolve(rows[0]);

						}

					});
					connection.release();
				}

			});
		});

	},

	//增加生活记录
	addMessage: function(name, email, hostpage, content){

		return new Promise(function(resolve, reject) {

			let insertSQL = 'insert into messageboard(`name`, `email`, `hostpage`, `content`) values("' + name + '", "' + email +'", "' + hostpage +'", "' + content +'")';

			pool.getConnection(function(err,connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query("set names utf8;");
					connection.query(insertSQL, function(err, rows) {

						if(err) {
							reject("fail");
						}else {
							resolve("success");
						}

					});
					connection.release();
				}

			});
		});

	},

	//修改生活记录
	modifyMessage: function(id, name, email, hostpage, content){

		return new Promise(function(resolve, reject) {

			let modifySQL = "update messageboard set `name` = '" + name + "',`email` = '" + email + "'," +
			"`hostpage` = '" + hostpage + "',`content` = '" + content + "' where `id`= " + id;


			pool.getConnection(function(err,connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query("set names utf8;");
					connection.query(modifySQL, function(err, rows) {

						if(err) {
							reject("fail");
						}else {
							resolve("success");
						}

					});
					connection.release();
				}

			});
		});





	},

	//删除生活记录
	deleteMessage: function(id){

		return new Promise(function(resolve, reject) {

			let deleteSQL = "delete from messageboard where `id`= " + id;

			pool.getConnection(function(err,connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query("set names utf8;");
					connection.query(deleteSQL, function(err, rows) {

						if(err) {
							reject("fail");
						}else {
							resolve("success");
						}

					});
					connection.release();
				}

			});


		});

	}
}


