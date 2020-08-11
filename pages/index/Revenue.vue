<template>
	<view>
		<view>
			<view class="head">
				<view class="status_bar"></view>
				<view class="tab">
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==0?'tabactive':''" @click="tabclick(0)">全部</view>
					<!-- <view v-show="false" style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==1?'tabactive':''" @click="tabclick(1)">客运</view> -->
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==2?'tabactive':''" @click="tabclick(2)">出租车</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==3?'tabactive':''" @click="tabclick(3)">专线车</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==4?'tabactive':''" @click="tabclick(4)">顺风车</view>
					<view></view>
					<view></view>
				</view>
			</view>
			<view style="margin: 0 30rpx;" v-if="current==0">
				<view style="height: 110rpx;display: flex;align-items: center;justify-content: space-between;padding: 0 40rpx;font-size: 32rpx;background-color: #FFF;border-radius: 20rpx;margin-top: -55rpx;">
					<view>报表时间</view>
					<view> {{range[0]}}——{{range[1]}}</view>
					<view @click="onShowDatePicker('range')">
						<image src="../../static/index/calendar.png" style="width: 35rpx;" mode="widthFix" @click="onShowDatePicker('range')"></image>
					</view>
				</view>
				<scroll-view v-if="isShow" style="padding:20rpx 0;" :style="{height:scrollHeight}" :scroll-y="true">
					<view style="background-color: #FFF;border-radius: 20rpx;padding: 30rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
							<view style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;line-height:42rpx;padding-left: 10rpx;">按岗位统计</view>
						</view>
						<view>
							<view>
								<histogram-chart ref='ht0' :dataAs="histogramData" canvasId="ht0" />
							</view>
						</view>
					</view>
					<view style="background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
							<view style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;line-height:42rpx;padding-left: 10rpx;">按日期统计</view>
						</view>
						<view>
							<!-- 折线Line纯数字-->
							<view>
								<line-chart ref='lineChart' :dataAs="lineData" canvasId="index_line_2" />
							</view>
						</view>
					</view>
					<view style="background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
							<view style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;line-height:42rpx;padding-left: 10rpx;">按订单统计</view>
						</view>
						<view style="padding-top: 20rpx;">
							<view style="width: 630rpx;color: #2C2D2D;font-size: 30rpx;">
								<view style="display: flex;height: 75rpx;align-items: center;background-color: #FFC7C5;border:solid 1px #E9554E;">
									<view style="width: 150rpx;text-align: center;">岗位</view>
									<view style="width: 220rpx;text-align: center;">日期</view>
									<view style="width: 115rpx;text-align: center;">订单数</view>
									<view style="width: 145rpx;text-align: center;">收益(元)</view>
								</view>
								<view style="display: flex;align-items: center;border: solid 1rpx #ADADAD;border-top: none;border-bottom: none;"
								 v-for="(orderitem,index) in array" :key="index">
									<view style="width: 150rpx;display: flex;justify-content: center;align-items: center;border-bottom:solid 1rpx #ADADAD;"
									 :style="{height:(orderitem.orderArr.length*77)+'rpx'}">
										{{orderitem.type}}
									 </view>
									<view>
										<view style="display: flex;border-bottom: solid 1rpx #ADADAD;" v-for="(item,index) in orderitem.orderArr"
										 :key="index">
											<view style="width: 220rpx;text-align: center;height: 75rpx;line-height: 75rpx;border-left: solid 1rpx #ADADAD;">{{formatDate(item.datetime)}}</view>
											<view style="width: 115rpx;text-align: center;height: 75rpx;line-height: 75rpx;border-left: solid 1rpx #ADADAD;">{{item.orderNum}}</view>
											<view style="width: 145rpx;text-align: center;height: 75rpx;line-height: 75rpx;border-left: solid 1rpx #ADADAD;">{{item.earning}}</view>
										</view>
									</view>
								</view>

								<view>
									<view style="display: flex;border: solid 1rpx #ADADAD;border-top: none;">
										<view style="width: 363rpx;text-align: center;height: 75rpx;line-height: 75rpx;">总计</view>
										<view style="width: 115rpx;text-align: center;height: 75rpx;border-left: solid 1rpx #ADADAD;line-height: 75rpx;">{{totalCount(array)}}</view>
										<view style="width: 145rpx;text-align: center;height: 75rpx;border-left: solid 1rpx #ADADAD;line-height: 75rpx;">{{totalPrice(array)}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="margin: 0 30rpx;" v-if="current==2">
				<view style="height: 110rpx;display: flex;align-items: center;justify-content: space-between;padding: 0 40rpx;font-size: 32rpx;background-color: #FFF;border-radius: 20rpx;margin-top: -55rpx;">
					<view @click="changeDate('cut')">前一天</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view> {{date}}</view>
						<view style="padding: 0 10rpx; border-right: solid 1px #000000;">{{week}}</view>
						<view @click="onShowDatePicker('date')" style="padding: 0 10rpx;">
							<image src="../../static/index/calendar.png" style="width: 35rpx;" mode="widthFix" @click="onShowDatePicker('date')"></image>
						</view>
					</view>
					<view @click="changeDate('add')">后一天</view>
				</view>
				<view style="background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;height: 140rpx;">
					<view style="display: flex;align-items: center;color:#2C2D2D;line-height:42rpx;font-family:Source Han Sans SC;">
						<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
						<view style="font-size:36rpx;font-weight:bold;padding-left: 10rpx;">总收益(元)</view>
					</view>
					<view style="font-size:66rpx;text-align: center;padding-top: 10rpx;">{{totalDayPrice(taxiDetailArr)}}</view>
				</view>
				<view style="background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;">
					<view style="display: flex;align-items: center;">
						<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
						<view style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;line-height:42rpx;padding-left: 10rpx;">收支明细</view>
					</view>
					<scroll-view :scroll-y="true" :style="{height:paymentscrollHeight}">
						<view class="paymentDetail" v-for="(item,index) in taxiDetailArr" :key="index">
							<view>
								<view style="font-size: 32rpx;">{{item.payType}}</view>
								<view style="color: #999999;font-size: 30rpx;">{{formatTime(item.finishTime)}}</view>
							</view>
							<view style="font-size: 34rpx;">{{item.factPayPrice}}</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view style="margin: 0 30rpx;" v-if="current==3">
				<view style="height: 110rpx;display: flex;align-items: center;justify-content: space-between;padding: 0 40rpx;font-size: 32rpx;background-color: #FFF;border-radius: 20rpx;margin-top: -55rpx;">
					<view @click="changeDate('cut')">前一天</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view> {{date}}</view>
						<view style="padding: 0 10rpx; border-right: solid 1px #000000;">{{week}}</view>
						<view @click="onShowDatePicker('date')" style="padding: 0 10rpx;">
							<image src="../../static/index/calendar.png" style="width: 35rpx;" mode="widthFix" @click="onShowDatePicker('date')"></image>
						</view>
					</view>
					<view @click="changeDate('add')">后一天</view>
				</view>
				<view style="background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;height: 140rpx;">
					<view style="display: flex;align-items: center;color:#2C2D2D;line-height:42rpx;font-family:Source Han Sans SC;">
						<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
						<view style="font-size:36rpx;font-weight:bold;padding-left: 10rpx;">总收益(元)</view>
					</view>
					<view style="font-size:66rpx;text-align: center;padding-top: 10rpx;">{{totalDayPrice1(specialLineDetailArr)}}</view>
				</view>
				<view style="background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;">
					<view style="display: flex;align-items: center;">
						<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
						<view style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;line-height:42rpx;padding-left: 10rpx;">收支明细</view>
					</view>
					<scroll-view :scroll-y="true" :style="{height:paymentscrollHeight}">
						<view class="paymentDetail" v-for="(item,index) in specialLineDetailArr" :key="index">
							<view>
								<view style="font-size: 32rpx;">车费收入</view>
								<view style="color: #999999;font-size: 30rpx;">{{formatTime(item.FinishTime)}}</view>
							</view>
							<view style="font-size: 34rpx;">{{item.FactPayPrice}}</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view style="margin: 0 30rpx;" v-if="current==4">
				<view style="height: 110rpx;display: flex;align-items: center;justify-content: space-between;padding: 0 40rpx;font-size: 32rpx;background-color: #FFF;border-radius: 20rpx;margin-top: -55rpx;">
					<view @click="changeDate('cut')">前一天</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view> {{date}}</view>
						<view style="padding: 0 10rpx; border-right: solid 1px #000000;">{{week}}</view>
						<view @click="onShowDatePicker('date')" style="padding: 0 10rpx;">
							<image src="../../static/index/calendar.png" style="width: 35rpx;" mode="widthFix" @click="onShowDatePicker('date')"></image>
						</view>
					</view>
					<view @click="changeDate('add')">后一天</view>
				</view>
				<view style="background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;height: 140rpx;">
					<view style="display: flex;align-items: center;color:#2C2D2D;line-height:42rpx;font-family:Source Han Sans SC;">
						<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
						<view style="font-size:36rpx;font-weight:bold;padding-left: 10rpx;">总收益(元)</view>
					</view>
					<view style="font-size:66rpx;text-align: center;padding-top: 10rpx;">{{totalDayPrice1(downwindDetailArr)}}</view>
				</view>
				<view style="background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;">
					<view style="display: flex;align-items: center;">
						<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
						<view style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;line-height:42rpx;padding-left: 10rpx;">收支明细</view>
					</view>
					<scroll-view :scroll-y="true" :style="{height:paymentscrollHeight}">
						<view class="paymentDetail" v-for="(item,index) in downwindDetailArr" :key="index">
							<view>
								<view style="font-size: 32rpx;">车费收入</view>
								<view style="color: #999999;font-size: 30rpx;">{{formatTime(item.FinishTime)}}</view>
							</view>
							<view style="font-size: 34rpx;">{{item.FactPayPrice}}</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :show-seconds="true" @confirm="onSelected"
		 @cancel="onSelected" />
	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import HistogramChart from '@/components/stan-ucharts/HistogramChart.vue'; //
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	import utils from '@/components/shoyu-date/utils.filter.js';
	export default {
		components: {
			HistogramChart,
			LineChart,
			MxDatePicker
		},
		data() {
			return {
				current: 0,
				scrollHeight: "",
				paymentscrollHeight: "",
				showPicker: false,
				date: '2020/01/01',
				time: '15:00:12',
				week: "",
				datetime: '2019/01/01 15:00:12',
				range: ['2020/01/01', '2020/01/02'],
				rangetime: ['2019/01/08 14:00', '2019/01/16 13:59'],
				type: 'rangetime',
				value: '',

				colorArr: ['#FE9908', '#E9554E', '#76BD48', '#FE9908', '#E9554E', '#76BD48'],
				
				//柱状图数据
				histogramData: {
					categories: ['无数据'],
					series: [{
						name: '',
						data: [0],
					}]
				},
				//折线图数据
				lineData: {
					categories: ['无数据'],
					series: [{
						name:'无数据',
						data:[0]
					}]
				},
				array: [],
				taxiDetailArr: [],//出租车营收明细
				specialLineDetailArr:[],//专线车营收明细
				downwindDetailArr:[],//顺风车营收明细
				charterDetailArr: [],//包车营收明细
				index:0,
				
				
				IsExist:false,
				userInfo:null,
				isShow:true,
			}
		},
		onLoad() {
			let that = this;
			this.getnowdate();
		},
		onShow() {
			let that = this;
			that.index ++;
			
			that.userInfo = uni.getStorageSync('userInfo') || '';
			if (that.userInfo == '') {
				that.showToast('请先登录');
			} else {
				that.getTaxiRevenueTotal();
				that.taxiIncomeDetail();//出租车
				that.specialLineIncomeDetail();//专线车
				that.downwindIncomeDetail();//顺风车
			}
		},
		mounted() {
			var that = this;

			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 170 + "px";
					that.paymentscrollHeight = res.windowHeight - 340 + "px"
				}
			})
		},
		methods: {
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			tabclick: function(e) {
				this.current = e;
				if(e > 0){
					this.isShow = false;
				}else{
					this.isShow = true;
				}
			},
			getnowdate: function() { //获取当前日期
				var that = this;
				var begindate = new Date(new Date().setDate(new Date().getDate() - 7));
				var enddate = new Date();
				var endMonth = (enddate.getMonth() + 1);
				var endDate = enddate.getDate();
				var beginMonth = (begindate.getMonth() + 1);
				var beginDate = begindate.getDate();
				if (endMonth < 10) {
					endMonth = '0' + endMonth;
				}
				if (endDate < 10) {
					endDate = '0' + endDate
				}
				if (beginMonth < 10) {
					beginMonth = '0' + beginMonth;
				}
				if (beginDate < 10) {
					beginDate = '0' + beginDate
				}
				var end = enddate.getFullYear() + '/' + endMonth + '/' + endDate;
				var begin = begindate.getFullYear() + '/' + beginMonth + '/' + beginDate;
				this.range = [begin, end];
				this.date = end;
				this.changeweek(enddate.getDay());
			},
			changeweek: function(value) { //星期转换
				if (value == 0) {
					this.week = "周日";
				} else if (value == 1) {
					this.week = "周一";
				} else if (value == 2) {
					this.week = "周二";
				} else if (value == 3) {
					this.week = "周三";
				} else if (value == 4) {
					this.week = "周四";
				} else if (value == 5) {
					this.week = "周五";
				} else if (value == 6) {
					this.week = "周六";
				}
			},
			changeDate: function(type) { //日期加减一天
				var nowDate = new Date(this.date);
				var newDate;
				if (type == "add") {
					newDate = new Date(nowDate.setDate(nowDate.getDate() + 1))
				} else if (type == "cut") {
					newDate = new Date(nowDate.setDate(nowDate.getDate() - 1))
				}
				var newMonth = newDate.getMonth() + 1;
				var newDatetime = newDate.getDate();
				if (newMonth < 10) {
					newMonth = '0' + newMonth;
				}
				if (newDatetime < 10) {
					newDatetime = '0' + newDatetime
				}
				this.date = newDate.getFullYear() + '/' + newMonth + '/' + newDatetime;
				this.changeweek(newDate.getDay());
				
				
				this.taxiIncomeDetail();
				this.specialLineIncomeDetail();
				this.downwindIncomeDetail();
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
				this.isShow = false;//关闭显示
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					if (this.current != 0) {
						this.changeweek(new Date(e.value).getDay());
					}
					this.index ++;
					this.getTaxiRevenueTotal();
				}
				this.isShow = true;//重新渲染
			},

			//填充柱状图数值
			setHistogramData: function(title, value) {
				let that = this;
				that.histogramData.categories.push(title);
				let index = that.histogramData.categories.length;
				var obj = {
					value: value,
					color: that.colorArr[index]
				};
				that.histogramData.series[0].data.push(obj);
			},
			//设置折线图数据
			setLineData: function(title, value) {
				let that = this;
				let index = that.lineData.series.length;
				var obj = {
					name: title,
					data: value,
					color: that.colorArr[index],
					legendShape: 'line'
				};
				that.lineData.series.push(obj);
			},
			//设置折线图日期
			setDateArr: function(dateArr) {
				let that = this;
				that.lineData.categories = dateArr;
			},
			//获取出租车总计
			getTaxiRevenueTotal: function() {
				//出租车
				let that = this;
				that.histogramData = {
					categories: [],
					series: [{
						name: '',
						data: [],
					}]
				};
				that.lineData = {
					categories: [],
					series: []
				};
				that.array = [];
				uni.request({
					url: that.$taxi.Interface.GetExpressOrderCountRevenueByDriverID_Driver.value,
					method: that.$taxi.Interface.GetExpressOrderCountRevenueByDriverID_Driver.method,
					data: {
						driverId: that.userInfo.driverId,
						orderStartTime: utils.timeTodate(that.$home.dateFormat.dateformat, new Date(that.range[0]).getTime()),
						orderEndTime: utils.timeTodate(that.$home.dateFormat.dateformat, new Date(that.range[1]).getTime() + (24 * 60 *60 * 1000))
					},
					success: function(res) {
						let type = '出租车';
						if (res.data.status) {
							let data = res.data.data;
							var dateArr = []; //折线图-时间数组
							var dayItemPriceArr = []; //折线图-值数组
							var totalPirce = 0; //柱状图统计
							var totalPayPrice = 0; //柱状图统计
							var orderArr = [];//表格数组
							for (let item of data.RList) {
								dateArr.push(item.orderDate.substring(5, 9));
								dayItemPriceArr.push(item.totalPayPrice);
								totalPirce += item.totalPirce;
								totalPayPrice += item.totalPayPrice;
								var obj = {
									datetime : item.orderDate,
									orderNum: item.orderNum,
									earning:item.totalPayPrice,
								}
								orderArr.push(obj);
							}
							that.setDateArr(dateArr);
							//如果不是全都无数据
							if (data.IsExist) {
								//折线图
								that.setLineData(type, dayItemPriceArr);
								//折线图
								that.setHistogramData(type, totalPayPrice.toFixed(2));
								that.array.push({
									type:type,
									orderArr:orderArr
								});
							}
							
						}
						that.getdownwindCarTotal();
					},
					fail: function(res) {
						that.showToast('网络连接失败');
					}
				})
			},

			getdownwindCarTotal: function() {
				//顺风车
				let that = this;
				uni.request({
					url: that.$downwindCar.Interface.GetHitchhikerOrderCountByDriverID_Driver.value,
					method: that.$downwindCar.Interface.GetHitchhikerOrderCountByDriverID_Driver.method,
					data: {
						driverId: that.userInfo.driverId,
						orderStartTime: utils.timeTodate(that.$home.dateFormat.dateformat, new Date(that.range[0]).getTime()),
						orderEndTime: utils.timeTodate(that.$home.dateFormat.dateformat, new Date(that.range[1]).getTime() + (24 * 60 *60 * 1000))
					},
					success: function(res) {
						let type = '顺风车';
						if (res.data.status) {
							let data = res.data.data;
							var dayItemPriceArr = []; //折线图-值数组
							var totalPirce = 0; //柱状图统计
							var totalPayPrice = 0; //柱状图统计
							var orderArr = [];//表格数组
							
							for (let item of data.RList) {
								dayItemPriceArr.push(item.totalPayPrice);
								totalPirce += item.totalPirce;
								totalPayPrice += item.totalPayPrice;
								var obj = {
									datetime : item.orderDate,
									orderNum: item.orderNum,
									earning:item.totalPayPrice,
								}
								orderArr.push(obj);
							}
							if (data.IsExist) {
								//折线图
								that.setLineData(type, dayItemPriceArr);
								//折线图
								that.setHistogramData(type, totalPayPrice.toFixed(2));
								that.array.push({
									type:type,
									orderArr:orderArr
								});
							} 
						}
						that.getSpecialLineTotal();
					},
					fail: function(res) {
						//console.log(res);
					}
				})
			},
			getSpecialLineTotal:function(){
				//专线
				let that = this;
				uni.request({
					url: that.$CzcPrivate.Interface.GetSpecialLineOrderCountRevenueByDriverID_Driver.value,
					method: that.$CzcPrivate.Interface.GetSpecialLineOrderCountRevenueByDriverID_Driver.method,
					data: {
						driverId: that.userInfo.driverId,
						orderStartTime: utils.timeTodate(that.$home.dateFormat.dateformat, new Date(that.range[0]).getTime()),
						orderEndTime: utils.timeTodate(that.$home.dateFormat.dateformat, new Date(that.range[1]).getTime() + (24 * 60 *60 * 1000))
					},
					success: function(res) {
						let type = '专线车';
						if (res.data.status) {
							let data = res.data.data;
							var dayItemPriceArr = []; //折线图-值数组
							var totalPirce = 0; //柱状图统计
							var totalPayPrice = 0; //柱状图统计
							var orderArr = [];//表格数组
											
							for (let item of data.RList) {
								dayItemPriceArr.push(item.totalPayPrice);
								totalPirce += item.totalPirce;
								totalPayPrice += item.totalPayPrice;
								var obj = {
									datetime : item.orderDate,
									orderNum: item.orderNum,
									earning:item.totalPayPrice,
								}
								orderArr.push(obj);
							}
							if (data.IsExist) {
								//折线图
								that.setLineData(type, dayItemPriceArr);
								//柱状图
								that.setHistogramData(type, totalPayPrice.toFixed(2));
								that.array.push({
									type:type,
									orderArr:orderArr
								});
							}
							that.update();
							that.whenDataNull();
						}
					},
					fail: function(res) {
						//console.log(res);
					}
				});
			},
			update:function(){
				let that = this;
				if(that.index > 1){
					//柱状图
					if(that.histogramData.categories.length > 0){
						that.$refs.ht0.update(that.histogramData);
					}else{
						that.$refs.ht0.update({
							categories:['无数据'],
							series:[{
								name:'',
								data:[0]
							}]
						})
					}
					//折线图
					if(that.lineData.series.length > 0){
						that.$refs.lineChart.update(that.lineData);
					}else{
						that.$refs.lineChart.update({
							categories:['无数据'],
							series:[{
								name:'无数据',
								data:[0],
								legendShape: 'line'
							}]
						});
					}
				}
			},
			whenDataNull:function(){
				let that = this;
				//空数据判断
				if(that.histogramData.categories.length == 0){
					that.histogramData = {
						categories:['无数据'],
						series:[{
							name:'',
							data:[0]
						}]
					}
				}
				if(that.lineData.series.length == 0){
					that.lineData.series = [{
						name: '无数据',
						data: [0],
						color: '#FE9908',
						legendShape: 'line'
					}]
				}
				if(that.lineData.categories.length == 0){
					that.lineData.categories = ['无数据']
				}
			},
			formatDate:function(date){
				return date.split(' ')[0];
			},
			totalCount:function(array){
				var count = 0;
				for (let item of array) {
					for(let items of item.orderArr){
						count += items.orderNum;
					}
				}
				return count;
			},
			totalPrice:function(array){
				var price = 0;
				for (let item of array) {
					for(let items of item.orderArr){
						price += items.earning;
					}
				}
				return price.toFixed(2);
			},
			//详情
			totalDayPrice:function(array){
				var totalPrice = 0;
				for (let item of array) {
					totalPrice += parseFloat(item.factPayPrice);
				}
				return totalPrice.toFixed(2);
			},
			totalDayPrice1:function(array){
				var totalPrice = 0;
				for (let item of array) {
					totalPrice += parseFloat(item.FactPayPrice);
				}
				return totalPrice.toFixed(2);
			},
			formatTime:function(date){
				return date.substring(11,16); 
			},
			taxiIncomeDetail:function(){
				let that = this;
				uni.showLoading({
					mask:true
				});
				//出租车营收明细
				uni.request({
					url:that.$taxi.Interface.QueryTaxiExpressOrderByDriverIDAndDate_Passenger.value, 
					method:that.$taxi.Interface.QueryTaxiExpressOrderByDriverIDAndDate_Passenger.method,
					data:{
						receiptTime:that.date.replace(/\//g,'-'),
						driverId:that.userInfo.driverId
					},
					success:function(res){
						uni.hideLoading();
						that.taxiDetailArr = [];
						if(res.data.status){
							//console.log(res.data.data.length);
							that.taxiDetailArr = res.data.data;
						}
					},
					fail:function(res){
						//console.log(res);
						uni.hideLoading();
					}
				});
				
			},
			specialLineIncomeDetail:function(){
				let that = this;
				uni.showLoading({
					mask:true
				});
				//专线车营收明细
				uni.request({
					url:that.$CzcPrivate.Interface.QuerySpecialLineOrderByDriverIDAndDate_Passenger.value,
					method:that.$CzcPrivate.Interface.QuerySpecialLineOrderByDriverIDAndDate_Passenger.method,
					data:{
						ReceiptTime:that.date.replace(/\//g,'-'),
						DriverId:that.userInfo.driverId
					},
					success:function(res){
						uni.hideLoading();
						that.specialLineDetailArr = [];
						if(res.data.status){
							that.specialLineDetailArr = res.data.data;
						}
					},
					fail:function(res){
						//console.log(res);
					}
				});
			},
			downwindIncomeDetail:function(){
				let that = this;
				uni.showLoading({
					mask:true
				});
				//顺风车营收明细
				uni.request({
					url:that.$downwindCar.Interface.QueryHitchhikerOrderByDriverIDAndDate_Passenger.value,
					method:that.$downwindCar.Interface.QueryHitchhikerOrderByDriverIDAndDate_Passenger.method,
					data:{
						ReceiptTime:that.date.replace(/\//g,'-'),
						DriverId:that.userInfo.driverId
					},
					success:function(res){
						uni.hideLoading();
						that.downwindDetailArr = [];
						if(res.data.status){
							that.downwindDetailArr = res.data.data;
						}
					},
					fail:function(res){
						uni.hideLoading();
					}
				});
			}
			
		}
	}
</script>

<style>
	page {
		background-color: #F6F8FA;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}

	.head {
		width: 750rpx;
		height: 235rpx;
		background: linear-gradient(0deg, rgba(235, 85, 111, 1) 0%, rgba(240, 152, 105, 1) 100%);
	}

	.headbar {
		padding: 10rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.title {
		font-size: 38rpx;
		font-weight: bold;
		color: #FFF;
	}

	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 36rpx;
		line-height: ;
		padding: 30rpx 20rpx 20rpx 40rpx;
		color: #FFFFFF;
	}

	.tabactive {
		border-bottom: solid 1px #FFFFFF;
		color: #FFFFFF;
	}

	.paymentDetail {
		display: flex;
		padding: 20rpx 30rpx;
		border-bottom: solid 0.1px #E6E6E6;
		color: #2C2D2D;
		justify-content: space-between;
		align-items: center;
	}
</style>
