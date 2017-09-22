//加载数据库基本设置
const config = require('../../config/database-config.js').config;

//加载mysql模块
const mysql = require('mysql');

//建立连接池
let pool = mysql.createPool(config);


module.exports = {
	//获取某一篇文章的全部评论
	getAllComment: function getAllComment(aid) {

		return new Promise(function(resolve, reject) {
			let selectSQL = "select * from comment where `aid` = " + aid;

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

	//获取某一条文章的全部评论
	getOneComment: function getOneComment(id) {

		return new Promise(function(resolve, reject) {
			let selectSQL = "select * from comment where `id` = " + id;

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


	//发表评论
	addComment: function addComment(aid, name, email, hostpage, content) {


		return new Promise(function(resolve, reject) {

			let insertSQL = 'insert into comment(`aid`,`name`,`email`,`hostpage`,`content`) values(' + aid + ', "' + name + '", "' + email + '", "' + hostpage + '","' + content + '")';

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
    
    //删除某一条评论
	deleteComment: function deleteComment(cid) {

		return new Promise(function(resolve, reject) {

			let deleteSQL = "delete from comment where `id`= " + cid;

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

	},
    
    //修改某一条评论内容
	modifyComment: function modifyComment(cid, content) {

		return new Promise(function(resolve, reject) {

			let modifySQL = "update comment set `content` = '" + content + "' where `id`= " + cid;


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

	}
}