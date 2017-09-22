// 加载express模块后
const express = require('express');
const path = require('path');

//加载express-session模块
const session = require('express-session');

//加载模板引擎
const ejs = require('ejs');

//注册路由
const routes = require('./routes');




//创建一个express实例
let app = express();

//设置模板文件存放目录
app.set('views', path.join(__dirname,'views'));
//注册模板文件的后缀名为html，默认为ejs
app.engine('html', ejs.__express);
//设置模板文件后缀名为html，避免了res.render('home.html',...)的繁琐
app.set('view engine', 'html');
//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

//配置session
app.use(session({
	 name: 'keke', // cookie 中保存session id字段的名字
	 secret: 'liukexin', // 通过设置的secret字符串，来计算hash值并放在cookie中
	 cookie: {
    		// 设置过期时间,关闭浏览器之后cookie失效
    		maxAge: null
    	},
  	 resave: true, // 每次请求都重新设置session cookie
  	 saveUninitialized: false
  	})
);



//router实例挂载到根目录
routes(app);
app.listen(8080);
console.log('The server running on 8080');