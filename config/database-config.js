//数据库基本配置
module.exports = {
	config: {
		host: '127.0.0.1',
		port: 3306,
		user: 'admin',
		password: '123456',
		database: 'nodeblog',
		dateStrings: true,
		accquireTimeout: 3000,
		connectionLimit: 20
	}
};