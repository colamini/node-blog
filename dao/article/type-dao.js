//加载数据库基本设置
const config = require('../../config/database-config.js').config;

//加载mysql模块
const mysql = require('mysql');

//建立连接池
let pool = mysql.createPool(config);

module.exports = {

	//获取全部文章分类
	getType: function getType(){

		return new Promise(function(resolve, reject) {
			let selectSQL = "select * from type";

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


	//获取某一个文章分类
	getOneType: function getOneType(tid) {


		return new Promise(function(resolve, reject) {
			let selectSQL = "select * from type where `id` = " + tid;

			//建立单个连接
			pool.getConnection(function(err, connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query(selectSQL, function(err, rows) {

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

	//修改文章分类
	modifyType: function modifyType(tid, type) {

		return new Promise(function(resolve, reject) {

			let modifySQL = "update type set `type` = '" + type + "' where `id`= " + tid;


			pool.getConnection(function(err,connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query("set names utf8;");
					connection.query(modifySQL, function(err, rows) {

						if(err) {
							reject(err);
						}else {
							resolve("success");
						}

					});
					connection.release();
				}

			});
		});


	},

	//添加文章分类
	addType: function addType(type) {

		return new Promise(function(resolve, reject) {

			let insertSQL = 'insert into type(`type`) values("' + type + '")';

			pool.getConnection(function(err,connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query("set names utf8;");
					connection.query(insertSQL, function(err, rows) {

						if(err) {
							reject(err);
						}else {
							resolve("success");
						}

					});
					connection.release();
				}

			});
		});

	},

	//删除某一文章分类
	deleteType: function deleteType(tid){

		return new Promise(function(resolve, reject) {

			let deleteSQL = "delete from type where `id`= " + tid;

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