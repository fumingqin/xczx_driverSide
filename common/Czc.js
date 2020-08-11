/* 接口参数区 */
// 示例

//接口域名
const Url = 'https://zntc.145u.net:9099';

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	Url +'/api/zhcx/getPlanningLineByLonLat',
	//获取所有车辆定位数据
	Url +'/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	Url +'/api/zhcx/getLonLatRangeVehiclePosition',
]
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
	GetCanReceiptExpressOrder_Driver: {
		value: Url + '/api/taxi/GetCanReceiptExpressOrder_Driver',
		name: '司机端-出租车-获取可接订单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver']
	},
	ReceiptExpressOrder_Driver: {
		value: Url + '/api/taxi/ReceiptExpressOrder_Driver',
		name: '司机端-出租车-接单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver']
	},
	CancelExpressOrderByOrderNum_Driver: {
		value: Url + '/api/taxi/CancelExpressOrderByOrderNum_Driver',
		name: '司机端-出租车-取消订单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver','/index/Order']
	},
	RefuseExpressOrderByOrderNumDriverID_Driver: {
		value: Url + '/api/taxi/RefuseExpressOrderByOrderNumDriverID_Driver',
		name: '司机端-出租车-拒接订单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver']
	},
	InputAmountExpressOrder_Driver: {
		value: Url + '/api/taxi/InputAmountExpressOrder_Driver',
		name: '司机端-出租车-订单支付',
		method: 'POST', //GET-POST
		pages: ['/driver/otherExpenses']
	},
	GetExpressOrderByOrderNumber_Driver:{
		value:Url + '/api/taxi/GetExpressOrderByOrderNumber_Driver',
		name:'司机端-出租车-根据司机Id和订单Id获取订单详情',
		method:'POST',
		page:['/dirver/confirmgetonCar','/driver/orderDetail']
	},
	RunExpressOrder_Driver:{
		value:Url + '/api/taxi/RunExpressOrder_Driver',
		name:'司机端-出租车-长按确认乘客上车',
		method:'POST',
		page:['/dirver/confirmgetonCar']
	},
	FinishExpressOrder_Driver:{
		value:Url + '/api/taxi/FinishExpressOrder_Driver',
		name:'司机端-出租车-长按到达目的地',
		method:'POST',
		page:['/dirver/confirmgetonCar','/index/Order']
	},
	SetoutExpressOrder_Driver:{
		value:Url + '/api/taxi/SetoutExpressOrder_Driver',
		name:'司机端-出租车-长按发车',
		method:'POST',
		page:['/index/Order']
	},
	GetExpressOrderCountByDriverID_Driver:{
		value:Url + '/api/taxi/GetExpressOrderCountByDriverID_Driver',
		name:'司机端-出租车-统计接单量',
		method:'POST',
		page:['/driver/taxiDriver']
	},
	InputAmountExpressOrderNeedPay_Driver:{
		value:Url + '/api/taxi/InputAmountExpressOrderNeedPay_Driver',
		name:'司机端-出租车-统计接单量',
		method:'POST',
		page:['/driver/taxiDriver']
	},
	GetExpressOrderCountRevenueByDriverID_Driver:{
		value:Url + '/api/taxi/GetExpressOrderCountRevenueByDriverID_Driver',
		name:'司机端-出租车-营收',
		method:'POST',
		page:[]
	},
	QueryTaxiExpressOrderByDriverIDAndDate_Passenger:{
		value:Url + '/api/taxi/QueryTaxiExpressOrderByDriverIDAndDate_Passenger',
		name:'司机端-出租车-营收详情',
		method:'POST',
		page:[]
	}
}

export default {
	InterfaceAddress,
	Interface,
	delayTime
}
