//司机端全局参数定义
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//接口域名
const Url = 'https://zntc.145u.net:9099';
//接口对象
const Interface = {
	addVehiclePosition : {
		value: Url + '/api/zhcx/addVehiclePosition',
		name:'司机端定时实时上报位置',
		method:'GET',//GET-POST
		pages:[]
	},
	DriverVehicleBinding_Check:{
		value:Url + '/api/person/DriverVehicleBinding_Check',
		name:'司机端-全局-上班',
		method:'POST',
		pages:[]
	},
	GooffWork_Driver:{
		value:Url + '/api/person/GooffWork_Driver',
		name:'司机端-全局-下班',
		method:'POST',
		pages:[]
	},
	addDriverOneTouchAlarm:{
		value:Url + '/api/taxi/addDriverOneTouchAlarm',
		name:'司机端-出租车-一键报警',
		method:'POST',
		page:[]
	},
	GetImage:{
		value:Url + '/api/zhcx/GetImage',//model7
		name:'获取图片',
		method:'POST',
		page:[]
	},
	DriverSendMessage:{
		value:Url + '/api/Chat/DriverSendMessage',
		name:'司机端-发送消息',
		method:'POST',
		page:[]
	},
	QueryMessage:{
		value:Url + '/api/Chat/QueryMessage',
		name :'接收消息',
		method:'POST',
		page:[]
	}
}




const dateFormat = {
	dateformat : 'Y-m-d H:i:s'
}

//经纬度计算距离单位米
const EARTH_RADIUS = 6378137;

function mathLonLatToDistance(lat1,lng1,lat2,lng2){
        var radLat1 = Rad(lat1);
        var radLat2 = Rad(lat2);
        
        var a = radLat1 - radLat2;
        var b = Rad(lng1) - Rad(lng2);
        
        var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s*EARTH_RADIUS;
        s = Math.round(s*10000)/10000.0;
                
        return s;
    }


function Rad(lonLat){
	return lonLat * Math.PI / 180
}



// 接口声明区
export default {
	Interface,
	dateFormat,
	mathLonLatToDistance,
}