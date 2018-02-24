'use strict';

const Controller = require('egg').Controller;
const Request = require('request');
const moment = require("moment");
const CryptoJS = require('crypto-js');

const ability = "msisdnImeiQuery";
const key = "3BC37E01224B5CDDFF0719AADEA09132536C6DF0112A56D3ADDEEF60894CDDEE";

class MsisdnImeiQueryCtroller extends Controller{
    async index() {
        const {
            service,
            ctx
        } = this;
        const data = await this.msisdnImeiQuery(this.ctx.body);
        this.ctx.body = {
            error: null,
            data: data,  
        }
    }
    async msisdnImeiQuery(){
        const {
            service,
            ctx
        } = this;
        
        //生成时间戳 日期格式
		const nowDate = new Date();
		const year = nowDate.getFullYear();
		const month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) :nowDate.getMonth() + 1;
		const day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
		const hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
		const minutes = nowDate.getMinutes() <10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
		const seconds = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds(): nowDate.getSeconds();
		const timestamp = year + month + day + hour + minutes + seconds;
        console.log('timestamp',timestamp)
        //生产随机字符串
        function randomWord(range) {
			var str = "",
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

			for(var i = 0; i < range; i++) {
				 const pos = Math.round(Math.random() * (arr.length - 1));
				str += arr[pos];
			}
			return str;
		}
        const randomstr =  randomWord(32);
        console.log('randomstr',randomstr)

      //生成流水 APPID+时间戳+随机数
      const randomstr8 = randomWord(8);
      const transationid = this.config.appid + timestamp + randomstr8;
      console.log('transationid',transationid)

        //接收前台传入参数 组成body
        var jsonParam = {
            "msisdn": this.ctx.request.body.msisdn,
            "start_data": this.ctx.request.body.start_date,
            "end_data": this.ctx.request.body.end_date
        };
        console.log("jsonparam",jsonParam)
        //请求移动接口的参数集合除去签名
       var gather = {
            appid: this.config.appid,
            ability: ability,
            transationid: transationid,
            timestamp: timestamp,
            randomstr: randomstr,
            body: JSON.stringify(jsonParam) 
        };
        //组成集合
        var arr = [];
        console.log("arr", arr)
        
        for( var i in gather){
            if(gather[i] !== null){
                arr.push(i);
            }
        } 
        console.log("arr", arr)
        //按照参数名排序
        arr.sort();
        //使用url键值对格式拼接字符串
        var stringA = '';
        arr.forEach((item, index)=>{
            if(index==0){
                stringA = stringA + item + '=' + gather[item];
            }
            else{
                stringA = stringA + '&' + item + '=' + gather[item];
            }
        }) 
        console.log("stringA", stringA)   
        //拼接秘钥key 得到stringSignTemp字符串
        const stringSingtemp = stringA + key;
        console.log("stringSingtemp", stringSingtemp)
        //对stringSignTemp进行SHA256加密 得到sign值
        const sign = CryptoJS.SHA256(stringSingtemp).toString();
        console.log('sign', sign)

        //请求移动接口的参数
        const params = {
            appid: this.config.appid,
            ability: ability,
            transationid: transationid,
            timestamp: timestamp,
            randomstr: randomstr,
            sign: sign,
            body: JSON.stringify(jsonParam)  
        };
        const result = await ctx.curl("http://211.136.110.98:8082/api/V1/msisdnImeiQuery", {
            method: 'POST',
            dataType: 'json',
            data: params,
            rejectUnauthorized: false,
        });
        this.logger.info('res:', result);
        return result.data;
    }
}
module.exports =  MsisdnImeiQueryCtroller;