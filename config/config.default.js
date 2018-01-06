'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515140500894_4050';
  config.appid = 2017120410422261997;
  config.HTTPURL = "http://211.136.110.98:8082/1"
  // add your config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
