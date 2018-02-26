'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Msisdn = app.model.define('msisdn', {
        msisdn: STRING,
        imei: STRING,
        created_at: DATE,
        updated_at: DATE,
      },
      {
        tableName: 'msisdn',
      });

  return Msisdn;
};