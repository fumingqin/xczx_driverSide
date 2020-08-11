/* 接口参数区 */
// 示例

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
	GetCanReceiptSpecialLineOrder_Driver: {
		value: Url + '/api/SpecialLine/GetCanReceiptSpecialLineOrder_Driver',
		name: '司机端-专线车-获取可接订单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver']
	},
	ReceiptSpecialLineOrder_Driver: {
		value: Url + '/api/SpecialLine/ReceiptSpecialLineOrder_Driver',
		name: '司机端-专线车-接单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver']
	},
	CancelSpecialLineOrderByOrderNum_Driver: {
		value: Url + '/api/SpecialLine/CancelSpecialLineOrderByOrderNum_Driver',
		name: '司机端-专线车-取消订单',
		method: 'POST', //GET-POST
		pages: ['/index/Order','/ZXC/CzxPrivate']
	},
	RefuseSpecialLineOrderByOrderNumDriverID_Driver: {
		value: Url + '/api/SpecialLine/RefuseSpecialLineOrderByOrderNumDriverID_Driver',
		name: '司机端-专线车-拒接订单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver']
	},
	/* InputAmountExpressOrder_Driver: {
		value: Url + '/api/SpecialLine/InputAmountExpressOrder_Driver',
		name: '司机端-专线车-司机填入价格',
		method: 'POST', //GET-POST
		pages: []
	}, */
	GetSpecialLineOrderByOrderNumber_Driver:{
		value:Url + '/api/SpecialLine/GetSpecialLineOrderByOrderNumber_Driver',
		name:'司机端-专线车-根据司机Id和订单Id获取订单详情',
		method:'POST',
		page:['/ZXC/CzxPrivate','/ZXC/orderDetail']
	},
	RunSpecialLineOrder_Driver:{
		value:Url + '/api/SpecialLine/RunSpecialLineOrder_Driver',
		name:'司机端-专线车-长按确认乘客上车',
		method:'POST',
		page:['/ZXC/orderDetail']
	},
	FinishSpecialLineOrder_Driver:{
		value:Url + '/api/SpecialLine/FinishSpecialLineOrder_Driver',
		name:'司机端-专线车-长按到达目的地',
		method:'POST',
		page:['/index/Order','/ZXC/CzxPrivate']
	},
	SetoutSpecialLineOrder_Driver:{
		value:Url + '/api/SpecialLine/SetoutSpecialLineOrder_Driver',
		name:'司机端-专线车-长按发车',
		method:'POST',
		page:['/index/Order']
	},
	GetSpecialOrderCountByDriverID_Driver:{
		value:Url + '/api/SpecialLine/GetSpecialOrderCountByDriverID_Driver',
		name:'司机端-专线车-统计接单量',
		method:'POST',
		page:[]
	},
	GetSpecialLineOrderCountRevenueByDriverID_Driver:{
		value:Url + '/api/SpecialLine/GetSpecialLineOrderCountRevenueByDriverID_Driver',
		name:'司机端-专线车-营收',
		method:'POST',
		page:[]
	},
	QuerySpecialLineOrderByDriverIDAndDate_Passenger:{
		value:Url + '/api/SpecialLine/QuerySpecialLineOrderByDriverIDAndDate_Passenger',
		name:'司机端-专线车-营收详情',
		method:'POST',
		page:[]
	}
}

// 接口声明区
export default {
	Interface,
	delayTime
}
