const Url = 'https://zntc.145u.net:9099';
//const Url = 'http://111.231.109.113:8004';
const Interface = {
	CreateLine_Driver: {
		value: Url + '/api/Hitchhiker/CreateLine_Driver',
		name: '司机端-顺风车-发布顺风车',
		method: 'POST', //GET-POST
		pages: []
	},
	GetHitchhikerOrderByDriverID_Driver:{
		value: Url + '/api/Hitchhiker/GetHitchhikerOrderByDriverID_Driver',
		name: '司机端-顺风车-根据司机id和订单状态获取订单列表',
		method: 'POST', //GET-POST
		pages: []
	},
	SetoutHitchhikerOrder_Driver:{
		value: Url + '/api/Hitchhiker/SetoutHitchhikerOrder_Driver',
		name: '司机端-顺风车-发车',
		method: 'POST', //GET-POST
		pages: []
	},
	RunHitchhikerOrder_Driver:{
		value: Url + '/api/Hitchhiker/RunHitchhikerOrder_Driver',
		name: '司机端-顺风车-确认乘客上车',
		method: 'POST', //GET-POST
		pages: []
	},
	FinishSF_HitchhikerOrder_Driver:{
		value: Url + '/api/Hitchhiker/FinishSF_HitchhikerOrder_Driver',
		name: '司机端-顺风车-确认乘客上车',
		method: 'POST', //GET-POST
		pages: []
	},
		
	GetHitchhikerOrderByOrderNumber_Driver:{
		value: Url + '/api/Hitchhiker/GetHitchhikerOrderByOrderNumber_Driver',
		name: '司机端-顺风车-确认乘客上车',
		method: 'POST', //GET-POST
		pages: []
	},
	GetHitchhikerOrderCountByDriverID_Driver:{
		value: Url + '/api/Hitchhiker/GetHitchhikerOrderCountByDriverID_Driver',
		name: '司机端-顺风车-营收',
		method: 'POST', //GET-POST
		pages: []
	},
	QueryHitchhikerOrderByDriverIDAndDate_Passenger:{
		value: Url + '/api/Hitchhiker/QueryHitchhikerOrderByDriverIDAndDate_Passenger',
		name: '司机端-顺风车-营收详情',
		method: 'POST', //GET-POST
		pages: []
	}
}

export default {
	Interface,
}