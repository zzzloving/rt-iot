'use strict';


module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/msisdnImeiQuery', controller.msisdnImeiQuery.index);
  router.get('/iotportal',controller.iotportal.msisdnImeiQuery);
};
