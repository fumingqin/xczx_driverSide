const Url = 'https://zntc.145u.net:9099';

//接口对象
const Interface = {
	GetSchedule_Driver: {
		value: Url + '/api/CustomizedBus/GetSchedule_Driver',
		name: '司机端-定制巴士-获取车辆班次信息',
		method: 'POST', //GET-POST
		pages: ['/CTKYDriver/selectOrder']
	},
	CheckIn_Driver:{
		value: Url + '/api/CustomizedBus/CheckIn_Driver',
		name: '司机端-定制巴士-报班',
		method: 'POST', //GET-POST
		pages: []
	},
	CheckTicket_Driver:{
		value: Url + '/api/CustomizedBus/CheckTicket_Driver',
		name: '司机端-定制巴士-检票',
		method: 'POST', //GET-POST
		pages: []
	}
}

export default {
	Interface,
}