//注册路由

module.exports = function(app) {

	//注册【生活记录】路由
app.use('/dailyrecord', require('./dailyrecord/user.js'));
app.use('/dailyrecord', require('./dailyrecord/admin.js'));

//注册【文章】路由

app.use('/article', require('./article/user.js'));
app.use('/article', require('./article/admin.js'));

//注册留言板路由
app.use('/messageboard', require('./messageboard/user.js'));
app.use('/messageboard', require('./messageboard/admin.js'));

//注册登录路由
app.use('/login', require('./login.js'));

//注册首页路由
app.get('/', function(req, res) {
	res.render('home', {});
});
app.get('/admin', function(req, res) {
	res.redirect('/article/admin');
})

//404页面
app.get('*', function(req, res) {
	res.render('404', {});
})



}