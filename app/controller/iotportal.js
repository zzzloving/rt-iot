'use strict';

const Controller = require('egg').Controller;
const msisdnData = require('../doc/msisdn.json')

class IotportalCtroller extends Controller {

  async msisdnImeiQuery() {
    const {
      service,
      ctx
    } = this;
    this.logger.info(msisdnData)
    //遍历所有msisdn 获得相对应的 imei卡号
    for (let k in msisdnData) {
      const pid = msisdnData[k]
      const params = {page: 1, rows: 10, search_content: pid};
      // setTimeout(function () {
      //
      // },k*300)
      const res = await this.ctx.curl("https://211.136.110.102:8084/iotportal/TrmlMgrController/getTrmlList.do", {
        method: 'POST',
        dataType: 'json',
        data: params,
        rejectUnauthorized: false,
        headers: {
          "Cookie": "_iotportal_session_id=fb60abf1-80aa-4663-90d2-bafa71b3e80c",
          "CSRFTOKEN4IOTPORTAL": "T4IR-UYB6-SCI2-G7RS-ZDLR-GC93-ZXBM-PQ8T",
          "Origin": "https://211.136.110.102:8084",
          "Referer": "https://211.136.110.102:8084/iotportal/",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9",
          "Content-Type": "application/json",
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "X-Requested-With": "XMLHttpRequest, XMLHttpRequest",
        }
      })
      if (res.data.rows[0] == null) {
        this.logger.info("null")
        const data = {"msisdn": pid, "imei": "null"}
        this.ctx.model.Msisdn.create(data)
      } else {
        this.logger.info(k, res.data.rows[0].imei)
        const data = {"msisdn": pid, "imei": res.data.rows[0].imei}
        this.ctx.model.Msisdn.create(data)
      }
    }
  }
}

module.exports = IotportalCtroller;