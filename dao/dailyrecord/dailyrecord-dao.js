//加载数据库基本配置
const config = require('../../config/database-config.js').config;

//加载mysql模块
const mysql = require('mysql');

//建立连接池
let pool = mysql.createPool(config);



module.exports = {

	//获取全部生活记录
	getAllRecord: function getAllRecord() {

		//return的值是promise对象resolve的结果，这里也有先后顺序的体现。有时候是先return然后再连接数据库，
		//容易导致return的结果为空或者undefined
		return new Promise(function(resolve, reject) {
			let selectSQL = "select * from dailyrecord order by id desc";

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
	getOneRecord: function getOneRecord(id) {
		return new Promise(function(resolve, reject) {

			let searchSQL = "select * from dailyrecord where `id` = " + id;

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
	addRecord: function(content){

		return new Promise(function(resolve, reject) {

			let insertSQL = 'insert into dailyrecord(`content`) values("' + content + '")';

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
	modifyRecord: function(id, content){

		return new Promise(function(resolve, reject) {

			let modifySQL = "update dailyrecord set `content` = '" + content + "' where `id`= " + id;


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
	deleteRecord: function(id){

		return new Promise(function(resolve, reject) {

			let deleteSQL = "delete from dailyrecord where `id`= " + id;

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


//插入测试
/***************************************************************

let insertSQL = "insert into dailyrecord(content) values('keke')";
pool.getConnection(function(err, connection) {

	if(err) {
		console.log(err);
	}else {
		connection.query(insertSQL, function(err, result) {

			if(err) {
				console.log(err);
			}else {
				// console.log(result);
			}

		});
	}

});

*****************************************************************/

//查询测试
/***************************************************************

let selectSQL = "select * from dailyrecord";
pool.getConnection(function(err, connection) {

	if(err) {
		console.log(err);
	}else {
		connection.query(selectSQL, function(err, rows) {

			if(err){
				console.log(err);
			}else {
				let length = rows.length;
				for(let i = 0; i < length; i++){
					console.log("这是" + i);
					console.log(rows[i].id);
					console.log(rows[i].publishtime);
					console.log(rows[i].content);
				}
			}

		});
	}

});
***************************************************************/

//修改测试
/***************************************************************

let modifySQL = "update dailyrecord set `content` = 'liukexin' where `id`= 4";
pool.getConnection(function(err, connection) {

	if(err) {
		console.log(err);
	}else {
		connection.query(modifySQL, function(err, result) {

			if(err){
				console.log(err);
			}else {
				console.log(result.changedRows);
			}

		});
	}

});

***************************************************************/


//删除测试
/***************************************************************
let deleteSQL = "delete from dailyrecord where `id`= 5";
pool.getConnection(function(err, connection) {

	if(err) {
		console.log(err);
	}else {
		connection.query(deleteSQL, function(err, result) {

			if(err){
				console.log(err);
			}else {
				console.log(result.affectedRows);
			}

		});
	}

});

****************************************************************/




