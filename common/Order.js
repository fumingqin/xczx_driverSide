//接口域名
const Url = 'https://zntc.145u.net:9099';
const delayTime = {
	getOrderDelay: {
		name: '司机端-出租车-可接订单',
		interface: 'GetCanReceiptExpressOrder_Driver',
		page: [
			'/driver/taxiDriver'
		],
		time: 5000
	}
}

//接口对象
const Interface = {
	GetExpressOrderByDriverID_Driver: {
		value: Url + '/api/taxi/GetExpressOrderByDriverID_Driver',
		name: '司机端-出租车-根据司机ID获取订单列表',
		method: 'POST', //GET-POST
		pages: []
	},
	GetSpecialLineOrderByDriverID_Driver:{
		value: Url + '/api/SpecialLine/GetSpecialLineOrderByDriverID_Driver',
		name: '司机端-出租车-根据司机ID获取订单列表',
		method: 'POST', //GET-POST
		pages: []
	}
		
}

// 接口声明区
export default {
	Interface,
}