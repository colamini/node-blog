const Dao = require('./article/article-dao.js');//js驼峰式命名，用中横线命名报错

// //下面为测试内容
var addArticle = Dao.addArticle('hao','sas','asdad','qw','as','ads').then(function(data) {

	console.log(data);

}).catch(function(err) {

	console.log(err);

});


// var getOneRecord = Dao.getOneRecord(6).then(function(data) {

// 	console.log(data);

// }).catch(function(err) {

// 	console.log(err);
// });


// var addRecord = Dao.addRecord("我是刘可欣啊").then(function(data) {

// 	console.log(data);

// }).catch(function(err) {

// 	console.log(err);

// });


// var modifyRecord = Dao.modifyRecord(6, "我是刘可欣啊").then(function(data) {

// 	console.log(data);

// }).catch(function(err) {

// 	console.log(err);

// });


// var deleteRecord = Dao.deleteRecord(7).then(function(data) {

// 	console.log(data);

// }).catch(function(err) {

// 	console.log(err);

// });


// var getRecord = Dao.getRecord(function(res) {
// 	console.log("我是爸爸" + res);
// });




