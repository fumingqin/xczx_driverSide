//接口域名
const Url = 'http://111.231.109.113:8004';

//引入模板
	// url:$Bcsjd.Interface.bc_ReceiptCharteredOrder_Driver.value,
	// method:$Bcsjd.Interface.bc_ReceiptCharteredOrder_Driver.method,
	// import $bcsjd from '@/common/bcsjd.js' //引用路径

//接口对象
const Interface = {
	//GET-POST
	bc_GetCanReceiptCharteredOrder_Driver:{
		value: Url + '/api/Chartered/GetCanReceiptCharteredOrder_Driver',
		name:'包车 - 请求订单',
		method:'POST',
		pages:["pages/BCDriver/bcDriver"]
	},
	
	bc_ReceiptCharteredOrder_Driver:{
		value: Url + '/api/Chartered/ReceiptCharteredOrder_Driver',
		name:'包车 - 确认接单',
		method:'POST',
		pages:["pages/BCDriver/bcDriver"]
	},
}


// 接口声明区
export default {
	Interface
}
