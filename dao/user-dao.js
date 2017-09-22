//加载mysql模块
const mysql = require('mysql');
//加载数据库基本配置
const config = require('../config/database-config.js').config;
//创建连接池
let pool = mysql.createPool(config);

module.exports = {
	getUser: function getUser() {

		return new Promise(function(resolve, reject) {

			let querySQL = 'select * from user';

			pool.getConnection(function(err, connection) {


				if(err) {
					console.log(err);
				}else {

					connection.query(querySQL, function(err, rows) {

						if(err) {
							reject(err);
						}else {
							resolve(rows[0]);
						}

					});
					connection.release();
				}

				
			});

		});
		
	}
}