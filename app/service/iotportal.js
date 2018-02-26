'use strict';

const Service = require('egg').Service

class Importal extends Service {

  async post(url, data, callback) {
    $.ajax({
      url: url,
      data: JSON.stringify(data),
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (result) {
        callback(result)
      }
    })
  }

  async list (pid) {
      this.service.iotportal.post("https://211.136.110.102:8084/iotportal/TrmlMgrController/getTrmlList.do", {page: 1, rows: 10, search_content: pid}, result => {
      console.log(result.rows[0].imei);
    });
  }


}
module.exports = Importal