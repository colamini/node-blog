//加载数据库基本设置
const config = require('../../config/database-config.js').config;

//加载mysql模块
const mysql = require('mysql');

//建立连接池
let pool = mysql.createPool(config);


module.exports = {

	//获取全部文章列表
	getAllArticle: function getAllArticle(){

		//return的值是promise对象resolve的结果，这里也有先后顺序的体现。有时候是先return然后再连接数据库，
		//容易导致return的结果为空或者undefined
		return new Promise(function(resolve, reject) {
			let selectSQL = "select * from article order by id desc";

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


	//获取具体文章详情
	getOneArticle: function getOneArticle(aid){



			return new Promise(function(resolve, reject) {

				let searchSQL = "select * from article where `id` = " + aid;

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

	//获取某一类别的文章
	getArticleByType: function getArticleByType(tid){

		return new Promise(function(resolve, reject) {

			let searchSQL = "select * from article where `tid` = " + tid;

			//建立单个连接
			pool.getConnection(function(err, connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query(searchSQL, function(err, rows) {

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


    //写文章
    addArticle: function addArticle(title, author, tid, intro, htmlcontent, mdcontent){

    	return new Promise(function(resolve, reject) {

    		let insertSQL = "insert into article(`title`, `author`, `tid`, `intro`, `htmlcontent`, `mdcontent`, `viewnum`, `praisenum`) "+
    		"values('" + title +"', '" + author +"', " + tid +", '" + intro +"', '" + htmlcontent +"', '" + mdcontent +"', 0, 0)";
    		


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


	//修改文章
	modifyArticle: function modifyArticle(aid, title, author, tid, intro, htmlcontent, mdcontent){

		return new Promise(function(resolve, reject) {

			let modifySQL = 'update article set `title` = "' + title + '",`author` = "' + author + '",' +
			'`tid` = "' + tid + '",`intro` = "' + intro + '",`htmlcontent` = "' + htmlcontent + '",`mdcontent` = "' + mdcontent + '" where `id`= ' + aid;


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


	//删除某一篇文章
	deleteArticle: function deleteArticle(aid){

		return new Promise(function(resolve, reject) {

			let deleteSQL = "delete from article where `id`= " + aid;

			pool.getConnection(function(err,connection) {

				if(err) {
					console.log(err);
				}else {
					connection.query("set names utf8;");
					connection.query(deleteSQL, function(err, rows) {

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


	//获取评论总数
	getCommentnum: function getCommentnum(aid) {

		return new Promise(function(resolve, reject) {


			let selectSQL = "select count(*) as commentnum from comment where `aid` = " + aid;

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

	addViewnum: function addViewnum(aid) {

		return new Promise(function(resolve, reject) {

			let modifySQL = "update article set `viewnum` = viewnum + 1 where `id`= " + aid;


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

	addPraisenum: function addPraisenum(aid) {

		return new Promise(function(resolve, reject) {

			let modifySQL = "update article set `praisenum` = praisenum + 1 where `id`= " + aid;


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
				}

			});
		});

	}

	
}





