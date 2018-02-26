'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515140500894_4050';
  config.appid = "2018022420345372075";
  config.HTTPURL = "http://211.136.110.98:8082/api/V1"
  // add your config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  //配置数据库插件
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'msisdn',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: ''
  }

  return config;
};
