//定制班车接口
const Url = 'https://zntc.145u.net:9099';
//接口对象
const Interface = {
	GetCoachIDByVheicleNumberDriverPhone : {
		value: Url + '/api/Customized/GetCoachIDByVheicleNumberDriverPhone',
		name: '司机端-定制班车-获取司机coachid',
		method: 'POST', //GET-POST
		pages: []
	},
	GetRunScheduleInfoByVheicleNumberDriverPhone : {
		value: Url + '/api/Customized/GetRunScheduleInfoByVheicleNumberDriverPhone',
		name: '司机端-定制班车-获取车辆班次信息',
		method: 'POST', //GET-POST
		pages: []
	},
	CheckTicket_ByTicketID : {
		value: Url + '/api/Customized/CheckTicket_ByTicketID',
		name: '司机端-定制班车-检票',
		method: 'POST', //GET-POST
		pages: []
	}
}
const testData = {
	"ExecuteScheduleID": null,
	"PlanScheduleCode": null,
	"DriverID": null,
	"DriverName": null,
	"CoachCardNumber": "闽CY8154",
	"LineID": null,
	"LineName": "安溪汽车总站-石狮快运",
	"SetoutTime": "2020-05-07T15:30:00",
	"SetoutStationName": "安溪汽车总站",
	"FreeSeats": 0,
	"Tickets": [{
		"BookTicketAID": "21694668",
		"SeatNumber": "1",
		"TicketID": "05659337869-1",
		"PassengerID": "350524197611184014",
		"PassengerName": "林安定",
		"BillNumber": "",
		"StartSiteName": "安溪汽车总站",
		"EndSiteName": "晋江利郎",
		"StartEndSiteName": "安溪汽车总站-晋江利郎",
		"BuyType": null,
		"Checked": false,
		"TicketType": "站内",
		"CarryChild": false,
		"PhoneNumber": null,
		"ExecuteScheduleID": "安D1901"
	}, {
		"BookTicketAID": "21695210",
		"SeatNumber": "1",
		"TicketID": "05665376517-1",
		"PassengerID": "350500199010316518",
		"PassengerName": "叶文旭",
		"BillNumber": "",
		"StartSiteName": "安溪行政中心",
		"EndSiteName": "石狮",
		"StartEndSiteName": "安溪行政中心-石狮",
		"BuyType": null,
		"Checked": false,
		"TicketType": "站外",
		"CarryChild": false,
		"PhoneNumber": null,
		"ExecuteScheduleID": "安D1901"
	}],
	"SiteTicketList": [{
		"SiteID": null,
		"SiteName": "安溪汽车总站",
		"ThisSiteGetonTicketCount": 1,
		"ThisSiteGetonTickets": [{
			"BookTicketAID": "21694668",
			"SeatNumber": "1",
			"TicketID": "05659337869-1",
			"PassengerID": "350524197611184014",
			"PassengerName": "林安定",
			"BillNumber": "",
			"StartSiteName": "安溪汽车总站",
			"EndSiteName": "晋江利郎",
			"StartEndSiteName": "安溪汽车总站-晋江利郎",
			"BuyType": null,
			"Checked": false,
			"TicketType": "站内",
			"CarryChild": false,
			"PhoneNumber": null,
			"ExecuteScheduleID": "安D1901"
		}],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.102316",
		"Latitude": "25.027221"
	}, {
		"SiteID": null,
		"SiteName": "安溪龙凤都城",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.162803",
		"Latitude": "25.072583"
	}, {
		"SiteID": null,
		"SiteName": "安溪金火中学",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.169529",
		"Latitude": "25.066352"
	}, {
		"SiteID": null,
		"SiteName": "安溪永隆国际",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.190697",
		"Latitude": "25.049139"
	}, {
		"SiteID": null,
		"SiteName": "安溪宝龙广场",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.202433",
		"Latitude": "25.048611"
	}, {
		"SiteID": null,
		"SiteName": "安溪行政中心",
		"ThisSiteGetonTicketCount": 1,
		"ThisSiteGetonTickets": [{
			"BookTicketAID": "21695210",
			"SeatNumber": "1",
			"TicketID": "05665376517-1",
			"PassengerID": "350500199010316518",
			"PassengerName": "叶文旭",
			"BillNumber": "",
			"StartSiteName": "安溪行政中心",
			"EndSiteName": "石狮",
			"StartEndSiteName": "安溪行政中心-石狮",
			"BuyType": null,
			"Checked": false,
			"TicketType": "站外",
			"CarryChild": false,
			"PhoneNumber": null,
			"ExecuteScheduleID": "安D1901"
		}],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.214487",
		"Latitude": "25.051885"
	}, {
		"SiteID": null,
		"SiteName": "安溪茶都公园",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.221151",
		"Latitude": "25.056872"
	}, {
		"SiteID": null,
		"SiteName": "晋江SM天桥",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.57076",
		"Latitude": "24.784524"
	}, {
		"SiteID": null,
		"SiteName": "晋江利郎",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 1,
		"ThisSiteGetoffTickets": [{
			"BookTicketAID": "21694668",
			"SeatNumber": "1",
			"TicketID": "05659337869-1",
			"PassengerID": "350524197611184014",
			"PassengerName": "林安定",
			"BillNumber": "",
			"StartSiteName": "安溪汽车总站",
			"EndSiteName": "晋江利郎",
			"StartEndSiteName": "安溪汽车总站-晋江利郎",
			"BuyType": null,
			"Checked": false,
			"TicketType": "站内",
			"CarryChild": false,
			"PhoneNumber": null,
			"ExecuteScheduleID": "安D1901"
		}],
		"Longitude": "118.577536",
		"Latitude": "24.801839"
	}, {
		"SiteID": null,
		"SiteName": "晋江实验中学",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.570823",
		"Latitude": "24.806593"
	}, {
		"SiteID": null,
		"SiteName": "晋江华山",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.566268",
		"Latitude": "24.785486"
	}, {
		"SiteID": null,
		"SiteName": "晋江宝龙城市",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 0,
		"ThisSiteGetoffTickets": [],
		"Longitude": "118.573435",
		"Latitude": "24.806403"
	}, {
		"SiteID": null,
		"SiteName": "石狮",
		"ThisSiteGetonTicketCount": 0,
		"ThisSiteGetonTickets": [],
		"ThisSiteGetoffTicketCount": 1,
		"ThisSiteGetoffTickets": [{
			"BookTicketAID": "21695210",
			"SeatNumber": "1",
			"TicketID": "05665376517-1",
			"PassengerID": "350500199010316518",
			"PassengerName": "叶文旭",
			"BillNumber": "",
			"StartSiteName": "安溪行政中心",
			"EndSiteName": "石狮",
			"StartEndSiteName": "安溪行政中心-石狮",
			"BuyType": null,
			"Checked": false,
			"TicketType": "站外",
			"CarryChild": false,
			"PhoneNumber": null,
			"ExecuteScheduleID": "安D1901"
		}],
		"Longitude": "118.624487",
		"Latitude": "24.750386"
	}],
	"MyLine": null
}


export default {
	Interface,
}