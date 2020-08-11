<template>
	<view>
		<view style="margin:0 30rpx;">
			<view style="position: fixed;top: 0;left: 30rpx;right: 30rpx;z-index: 9999;background-color: #F6F8FE;">
				<view class="tab">
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==0?'tabactive':''" @click="tabclick(0)">全部</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==1?'tabactive':''" @click="tabclick(1)">进行中</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==2?'tabactive':''" @click="tabclick(2)">已完成</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==3?'tabactive':''" @click="tabclick(3)">已取消</view>
				</view>
			</view>
			<!--全部-->
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==0">
				<view v-for="(item,index) in orderArr" :key="index">
					<!-- 客车开始 -->
					<view v-if="item.title == '客运'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>出发时间：{{item.startTime}}</view>
									<view>出发地：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view style="display: flex;">
										<view>
											已检：{{item.checkedNum}}
										</view>
										<view style="padding-left: 40rpx;">
											未检：{{item.nocheckedNum}}
										</view>
									</view>
								</view>
								<view class="btnarea">
									<view v-if="item.status==2">
										<button>检票</button>
									</view>
									<view>
										<button>详情</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;">购票</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;">发车</button>
									</view>
								</view>
								<view>

								</view>
							</view>
						</view>
					</view>
					<!-- 客车结束 -->
					<!-- 出租车开始 -->
					<view v-if="item.title == '出租车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>

								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
										<view v-if="item.state == 6" style="padding-left: 40rpx;">
											￥{{item.factPayPrice}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
								</view>
								<view class="btnarea">
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCancle(item)" style="width: auto;">取消</button>
									</view>
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
									<view v-if="item.state == 1">
										<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
									</view>
									<!-- <view v-if="item.state == 4">
										<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view> -->
									<view v-if="item.state == 4">
										<button @click="toInputPrice(item)" style="background-color: #FC4646;color: #FFF;width: auto;">输入价格</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 出租车结束 -->
					<!-- 专线车开始 -->
					<view v-if="item.title == '专线车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>
					
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
										<view v-if="item.state == 6" style="padding-left: 40rpx;">
											￥{{item.factPayPrice}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
								</view>
								<view class="btnarea">
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCancle(item)" style="width: auto;">取消</button>
									</view>
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
									<view v-if="item.state == 1">
										<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
									</view>
									<view v-if="item.state == 4">
										<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 专线车结束 -->
					<!-- 顺风车开始 -->
					<view v-if="item.title == '顺风车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>
					
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
										<view v-if="item.state == 6" style="padding-left: 40rpx;">
											￥{{item.factPayPrice}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
								</view>
								<view class="btnarea">
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
									<view v-if="item.state == 1">
										<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
									</view>
									<view v-if="item.state == 4">
										<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 顺风车结束 -->
					<!-- 包车开始 -->
					<view v-if="item.title == '包车'" style="margin-top: 20rpx;position: relative;">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/BCFW.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
									<view class="orderstatus" v-if="item.status==5">返程中</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view>包车天数：{{item.charterDays}}天</view>
								</view>
								<view class="btnarea" style="justify-content: space-between;">
									<view v-if="item.status==1" @click="show(item)" style="color: #999;">
										...
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">更换目的地</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">返程</button>
									</view>
								</view>
							</view>
						</view>
						<uni-transition class="one" v-if="item.IsShow" :modeClass="ani" :show="true" :duration="300">
							详情
							<view class="one0"></view>
						</uni-transition>
					</view>
					<!-- 包车结束 -->
				</view>
			</view>
			<!--进行中-->
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==1">
				<view v-for="(item,index) in underwayArr" :key="index">
					<!-- 客车开始 -->
					<view v-if="item.title == '客运'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>出发时间：{{item.startTime}}</view>
									<view>出发地：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view style="display: flex;">
										<view>
											已检：{{item.checkedNum}}
										</view>
										<view style="padding-left: 40rpx;">
											未检：{{item.nocheckedNum}}
										</view>
									</view>
								</view>
								<view class="btnarea">
									<view v-if="item.status==2">
										<button>检票</button>
									</view>
									<view>
										<button>详情</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;">购票</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;">发车</button>
									</view>
								</view>
								<view>

								</view>
							</view>
						</view>
					</view>
					<!-- 客车结束 -->
					<!-- 出租车开始 -->
					<view v-if="item.title == '出租车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>

								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
										<view v-if="item.state == 6" style="padding-left: 40rpx;">
											￥{{item.factPrice}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
								</view>
								<view class="btnarea">
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCancle(item)" style="width: auto;">取消</button>
									</view>
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
									<view v-if="item.state == 1">
										<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
									</view>
									<!-- <view v-if="item.state == 4">
										<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view> -->
									<view v-if="item.state == 4">
										<button @click="toInputPrice(item)" style="background-color: #FC4646;color: #FFF;width: auto;">输入价格</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 出租车结束 -->
					<!-- 专线车开始 -->
					<view v-if="item.title == '专线车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
										<view v-if="item.state == 6" style="padding-left: 40rpx;">
											￥{{item.factPrice}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
								</view>
								<view class="btnarea">
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCancle(item)" style="width: auto;">取消</button>
									</view>
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
									<view v-if="item.state == 1">
										<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
									</view>
									<view v-if="item.state == 4">
										<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 专线车结束 -->
					<!-- 顺风车开始 -->
					<view v-if="item.title == '顺风车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
										<view v-if="item.state == 6" style="padding-left: 40rpx;">
											￥{{item.factPrice}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
								</view>
								<view class="btnarea">
									<view v-if="item.state==1 || item.state==2">
										<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
									<view v-if="item.state == 1">
										<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
									</view>
									<view v-if="item.state == 4">
										<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 顺风车结束 -->
					<!-- 包车开始 -->
					<view v-if="item.title == '包车'" style="margin-top: 20rpx;position: relative;">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/BCFW.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
									<view class="orderstatus" v-if="item.status==5">返程中</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view>包车天数：{{item.charterDays}}天</view>
								</view>
								<view class="btnarea" style="justify-content: space-between;">
									<view v-if="item.status==1" @click="show(item)" style="color: #999;">
										...
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">更换目的地</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">返程</button>
									</view>
								</view>
							</view>
						</view>
						<uni-transition class="one" v-if="item.IsShow" :modeClass="ani" :show="true" :duration="300">
							详情
							<view class="one0"></view>
						</uni-transition>
					</view>
					<!-- 包车结束 -->
				</view>
			</view>
			<!--已完成-->
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==2">
				<view v-for="(item,index) in finishedArr" :key="index">
					<!-- 客车开始 -->
					<view v-if="item.title == '客运'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>出发时间：{{item.startTime}}</view>
									<view>出发地：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view style="display: flex;">
										<view>
											已检：{{item.checkedNum}}
										</view>
										<view style="padding-left: 40rpx;">
											未检：{{item.nocheckedNum}}
										</view>
									</view>
								</view>
								<view class="btnarea">
									<view v-if="item.status==2">
										<button>检票</button>
									</view>
									<view>
										<button>详情</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;">购票</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;">发车</button>
									</view>
								</view>
								<view>

								</view>
							</view>
						</view>
					</view>
					<!-- 客车结束 -->
					<!-- 出租车开始 -->
					<view v-if="item.title == '出租车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>

								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
										<view v-if="item.state == 6" style="padding-left: 40rpx;">
											￥{{item.factPayPrice}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
								</view>
								<view class="btnarea">
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 出租车结束 -->
					<!-- 专线车开始 -->
					<view v-if="item.title == '专线车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>
					
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
										<view v-if="item.state == 6" style="padding-left: 40rpx;">
											￥{{item.factPayPrice}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
					
								</view>
								<view class="btnarea">
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 专线车结束 -->
					<!-- 顺风车开始 -->
					<view v-if="item.title == '顺风车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>
					
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
										<view v-if="item.state == 6" style="padding-left: 40rpx;">
											￥{{item.factPayPrice}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
					
								</view>
								<view class="btnarea">
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 顺风车结束 -->
					<!-- 包车开始 -->
					<view v-if="item.title == '包车'" style="margin-top: 20rpx;position: relative;">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/BCFW.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
									<view class="orderstatus" v-if="item.status==5">返程中</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view>包车天数：{{item.charterDays}}天</view>
								</view>
								<view class="btnarea" style="justify-content: space-between;">
									<view v-if="item.status==1" @click="show(item)" style="color: #999;">
										...
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">更换目的地</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">返程</button>
									</view>
								</view>
							</view>
						</view>
						<uni-transition class="one" v-if="item.IsShow" :modeClass="ani" :show="true" :duration="300">
							详情
							<view class="one0"></view>
						</uni-transition>
					</view>
					<!-- 包车结束 -->
				</view>
			</view>
			<!--已取消-->
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==3">
				<view v-for="(item,index) in cancleArr" :key="index">
					<!-- 客车开始 -->
					<view v-if="item.title == '客运'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>出发时间：{{item.startTime}}</view>
									<view>出发地：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view style="display: flex;">
										<view>
											已检：{{item.checkedNum}}
										</view>
										<view style="padding-left: 40rpx;">
											未检：{{item.nocheckedNum}}
										</view>
									</view>
								</view>
								<view class="btnarea">
									<view v-if="item.status==2">
										<button>检票</button>
									</view>
									<view>
										<button>详情</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;">购票</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;">发车</button>
									</view>
								</view>
								<view>

								</view>
							</view>
						</view>
					</view>
					<!-- 客车结束 -->
					<!-- 出租车开始 -->
					<view v-if="item.title == '出租车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>

								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>

								</view>
								<view class="btnarea">
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 出租车结束 -->
					<!-- 专线车开始 -->
					<view v-if="item.title == '专线车'" style="margin-top: 20rpx;">
						<view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.title}}</view>
									</view>
									<view class="orderstatus">{{item.orderState}}</view>
					
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view>订单号：{{item.orderNumber}}</view>
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{taxiFormatUserType(item.userType)}}
										</view>
									</view>
									<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
									<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
									<view>上车点：{{item.startAddress}}</view>
									<view>目的地：{{item.endAddress}}</view>
					
								</view>
								<view class="btnarea">
									<view v-if="item.state != 1">
										<button @click="toDetail(item)" style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 专线车结束 -->
					<!-- 包车开始 -->
					<view v-if="item.title == '包车'" style="margin-top: 20rpx;position: relative;">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/BCFW.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
									<view class="orderstatus" v-if="item.status==5">返程中</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view>包车天数：{{item.charterDays}}天</view>
								</view>
								<view class="btnarea" style="justify-content: space-between;">
									<view v-if="item.status==1" @click="show(item)" style="color: #999;">
										...
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">更换目的地</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">返程</button>
									</view>
								</view>
							</view>
						</view>
						<uni-transition class="one" v-if="item.IsShow" :modeClass="ani" :show="true" :duration="300">
							详情
							<view class="one0"></view>
						</uni-transition>
					</view>
					<!-- 包车结束 -->
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import uniTransition from '@/components/uni-transition/uni-transition.vue'
	export default {
		components: {
			uniTransition
		},
		data() {
			return {
				//carTypeid: 0,
				ani: ['slide-top', 'zoom-in'],
				current: 0,
				orderArr: [],
				underwayArr: [], //进行中
				finishedArr: [], //已完成
				cancleArr: [], //已取消
				userInfo: '',
			}
		},
		onLoad() {
			let that = this;
		},
		onShow() {
			var that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			if(that.userInfo == ''){
				that.showToast('请先登录');
			} else {
				uni.showLoading({
					mask:true
				});
				that.getTaxiOrder();
			}
		},
		onPullDownRefresh() {
			var that = this;
			if(that.userInfo != ''){
				uni.showLoading({
					mask:true
				});
				that.getTaxiOrder();
			}
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
			},
			show: function(el) {
				el.IsShow = !el.IsShow
			},
			getTaxiOrder: function() {
				let that = this;
				uni.stopPullDownRefresh();
				uni.request({
					url: that.$order.Interface.GetExpressOrderByDriverID_Driver.value,
					method: that.$order.Interface.GetExpressOrderByDriverID_Driver.method,
					data: {
						driverId: that.userInfo.driverId,
						state: -1
					},
					success: function(res) {
						if (res.data.status) {
							that.orderArr = [];
							for (let item of res.data.data) {
								var obj = {
									title: '出租车',
									orderType: item.orderType, //实时/预约
									orderTime:item.orderTime,
									appointmentTime: item.appointmentTime, //预约时间
									userType: item.userType, //用户类型：普通/会员
									runTime: item.runTime, //出发时间
									endAddress: item.endAddress,
									startAddress: item.startAddress,
									orderState: that.taxiFormatState(item.state),
									factPrice: item.factPrice,
									factPayPrice: item.factPayPrice,
									orderNumber: item.orderNumber,
									state: item.state,
									passengersPhone: item.passengersPhone
								};
								that.orderArr.push(obj);
							};
							that.getCzcPrivateOrder();
							/* that.underwayArr = that.orderArr.filter(x => {
								return x.orderState == '进行中';
							});
							that.finishedArr = that.orderArr.filter(x => {
								return x.orderState == '已完成';
							});
							that.cancleArr = that.orderArr.filter(x => {
								return x.orderState == '已取消';
							}); */
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail: function(res) {
						//console.log(res);
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				})
			},
			getCzcPrivateOrder: function() {
				let that = this;
				uni.request({
					url: that.$order.Interface.GetSpecialLineOrderByDriverID_Driver.value,
					method: that.$order.Interface.GetSpecialLineOrderByDriverID_Driver.method,
					data: {
						DriverId: that.userInfo.driverId, 
						State: -1
					},
					success: function(res) {
						if (res.data.status) {
							for (let item of res.data.data) {
								var obj = {
									title: '专线车',
									orderType: item.OrderType, //实时/预约
									orderTime:item.OrderTime,
									appointmentTime: item.AppointmentTime, //预约时间
									userType: item.UserType, //用户类型：普通/会员
									runTime: item.RunTime, //出发时间
									endAddress: item.EndAddress,
									startAddress: item.StartAddress,
									orderState: that.taxiFormatState(item.State),
									factPrice: item.FactPrice,
									factPayPrice: item.FactPayPrice,
									orderNumber: item.OrderNumber,
									state: item.State,
									passengersPhone: item.PassengersPhone
								};
								that.orderArr.push(obj);
							};
						} else {
							that.showToast(res.data.msg);
						}
						that.getdownwindCarOrder();
						/* that.underwayArr = that.orderArr.filter(x => {
							return x.orderState == '进行中';
						});
						that.finishedArr = that.orderArr.filter(x => {
							return x.orderState == '已完成';
						});
						that.cancleArr = that.orderArr.filter(x => {
							return x.orderState == '已取消';
						}); */
					},
					fail: function(res) {
						//console.log(res);
						that.showToast('网络连接失败');
						uni.hideLoading();
					}
				});
				
			},
			getdownwindCarOrder:function(){
				let that = this;
				uni.request({
					url:that.$downwindCar.Interface.GetHitchhikerOrderByDriverID_Driver.value,
					method:that.$downwindCar.Interface.GetHitchhikerOrderByDriverID_Driver.method,
					data:{
						DriverId: that.userInfo.driverId,
						State: -1
					},
					success:function(res){
						uni.hideLoading();
						if(res.data.status){
							for (let item of res.data.data) {
								var obj = {
									title: '顺风车',
									orderType: item.OrderType, //实时/预约
									orderTime:item.OrderTime,
									appointmentTime: item.AppointmentTime, //预约时间
									userType: item.UserType, //用户类型：普通/会员
									runTime: item.RunTime, //出发时间
									endAddress: item.EndAddress,
									startAddress: item.StartAddress,
									orderState: that.taxiFormatState(item.State),
									factPrice: item.FactPrice,
									factPayPrice: item.FactPayPrice,
									orderNumber: item.OrderNumber,
									state: item.State,
									passengersPhone: item.PassengersPhone
								};
								that.orderArr.push(obj);
							}
						} else {
							that.showToast(res.data.msg);
						}
						that.underwayArr = that.orderArr.filter(x => {
							return x.orderState == '进行中';
						});
						that.finishedArr = that.orderArr.filter(x => {
							return x.orderState == '已完成';
						});
						that.cancleArr = that.orderArr.filter(x => {
							return x.orderState == '已取消';
						});
					},
					fail:function(res){
						uni.hideLoading();
						//console.log(res);
					}
				})
			},


			//详情
			toDetail: function(item) {
				let that = this;
				if (item.title == '出租车') {
					if (item.state == 0 || item.state == 1 || item.state == 2 || item.state == 3 || item.state == 4) {
						uni.navigateTo({
							url: '../driver/confirmgetonCar?orderNumber=' + item.orderNumber
						});
					} else {
						uni.navigateTo({
							url: '../driver/orderDetail?orderNumber=' + item.orderNumber
						});
					}
				} else if(item.title == '专线车') {
					if (item.state == 0 || item.state == 1 || item.state == 2 || item.state == 3 || item.state == 4) {
						uni.navigateTo({
							url: '../ZXC/CzcPrivate?orderNumber=' + item.orderNumber
						});
					} else {
						uni.navigateTo({
							url: '../ZXC/orderDetail?orderNumber=' + item.orderNumber
						});
					}
				} else if(item.title == '顺风车'){
					if (item.state == 0 || item.state == 1 || item.state == 2 || item.state == 3 || item.state == 4) {
						uni.navigateTo({
							url:'../downwindCar/downwindCarDriver?orderNumber=' + item.orderNumber,
						});
					} else {
						uni.navigateTo({
							url:'../downwindCar/orderDetail?orderNumber=' + item.orderNumber
						});
					}
				}
			},
			//联系乘客
			toCallPassenger: function(item) {
				let that = this;
				if(item.passengersPhone == null){
					that.showToast('获取手机号出错');
					return;
				}
				uni.makePhoneCall({
					phoneNumber: item.passengersPhone
				});
			},
			//到达
			toArrive: function(item) {
				let that = this;
				uni.showLoading({
					mask:true
				});
				let url = '';
				let method = '';
				let data = '';
				if(item.title == '出租车'){
					url = that.$taxi.Interface.FinishExpressOrder_Driver.value;
					method = that.$taxi.Interface.FinishExpressOrder_Driver.method;
					data = {
						orderNumber:item.orderNumber
					};
				} else if(item.title == '专线车'){
					url = that.$CzcPrivate.Interface.FinishSpecialLineOrder_Driver.value;
					method = that.$CzcPrivate.Interface.FinishSpecialLineOrder_Driver.method;
					data = {
						orderNumber:item.orderNumber
					};
				} else if(item.title == '顺风车'){
					url = that.$downwindCar.Interface.FinishSF_HitchhikerOrder_Driver.value;
					method = that.$downwindCar.Interface.FinishSF_HitchhikerOrder_Driver.method;
					data = {
						orderNumber:item.orderNumber
					};
				}
				that.taxiRequest(url,method,data).then(res => {
					if (res.data.status) {
						if(item.title == '出租车'){
							that.showToast('到达成功');
							uni.navigateTo({
								url: '/pages/driver/otherExpenses?orderNumber=' + item.orderNumber,
							})
						} else if(item.title == '专线车'){
							that.showToast('到达成功');
							uni.navigateTo({
								url:'../driver/orderComplete'
							});
						} else if(item.title == '顺风车'){
							that.showToast('到达成功');
							uni.navigateTo({
								url:'../driver/orderComplete'
							});
						}
					} else {
						that.showToast(res.data.msg);
					}
				}).catch(rej => {
					that.showToast('网络连接失败');
				});
			},
			//发车
			toDepart: function(item) {
				let that = this;
				uni.showLoading({
					mask:true
				});
				let url = '';
				let method = '';
				let data = '';
				if(item.title == '出租车'){
					url = that.$taxi.Interface.SetoutExpressOrder_Driver.value;
					method = that.$taxi.Interface.SetoutExpressOrder_Driver.method;
					data = {
						orderNumber:item.orderNumber
					};
				} else if(item.title == '专线车'){
					url = that.$CzcPrivate.Interface.SetoutSpecialLineOrder_Driver.value;
					method = that.$CzcPrivate.Interface.SetoutSpecialLineOrder_Driver.method;
					data = {
						orderNumber:item.orderNumber
					};
				} else if(item.title == '顺风车'){
					url = that.$downwindCar.Interface.SetoutHitchhikerOrder_Driver.value;
					method = that.$downwindCar.Interface.SetoutHitchhikerOrder_Driver.method;
					data = {
						orderNumber:item.orderNumber
					};
				} 
				
				that.taxiRequest(url,method,data).then(res => {
					//成功回调
					if (res.data.status) {
						if(item.title == '出租车'){
							uni.navigateTo({
								url: '../driver/confirmgetonCar?orderNumber=' + item.orderNumber
							});
						} else if(item.title == '专线车'){
							uni.navigateTo({
								url:'../ZXC/CzcPrivate?orderNumber=' + item.orderNumber
							});
						} else if(item.title == '顺风车'){
							uni.navigateTo({
								url:'../downwindCar/downwindCarDriver?orderNumber=' + item.orderNumber
							});
						}
					} else {
						that.showToast(res.data.msg);
					}
				}).catch(rej => {
					//失败回调
					that.showToast('网络连接失败');
				});
			},
			//出租车、专线车出发按钮
			taxiRequest:function(url,method,data){
				return new Promise((resolve,reject)=>{
					uni.request({
						url:url,
						method:method,
						data:data,
						success:function(res){
							uni.hideLoading();
							resolve(res);
						},
						fail:function(res){
							uni.hideLoading();
							//console.log(url, res);
							reject(res);
						}
					})
				});
			},
			//取消
			toCancle: function(item) {
				//出租车OK、专线车OK
				let that = this;
				uni.showLoading({
					mask: true
				});
				let url = '';
				let method = '';
				
				if(item.title == '出租车'){
					url = that.$taxi.Interface.CancelExpressOrderByOrderNum_Driver.value;
					method = that.$taxi.Interface.CancelExpressOrderByOrderNum_Driver.method;
				} else if(item.title == '专线车'){
					url = that.$CzcPrivate.Interface.CancelSpecialLineOrderByOrderNum_Driver.value;
					method = that.$CzcPrivate.Interface.CancelSpecialLineOrderByOrderNum_Driver.method;
				}
				uni.request({
					url: url,
					method: method,
					data: {
						orderNumber: item.orderNumber
					},
					success: function(res) {
						//console.log(res);
						uni.hideLoading();
						if (res.data.status) {
							that.showToast('订单已取消');
							that.getTaxiOrder();
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail: function(res) {
						uni.hideLoading();
						//console.log(res);
						that.showToast('网络连接失败');
					}
				});
			},
			//输入价格
			toInputPrice :function(item) {
				let that = this;
				uni.request({
					url:that.$taxi.Interface.FinishExpressOrder_Driver.value,
					method:that.$taxi.Interface.FinishExpressOrder_Driver.method,
					success:function(res){
						//console.log(res);
					},
					fail:function(res){
						that.showToast('网络连接失败');
					}
				});
				uni.navigateTo({
					url:'../driver/otherExpenses?orderNumber=' + item.orderNumber
				});
			},
			// 出租车格式化
			taxiFormatState: function(state) {
				if (state == 6) {
					return '已完成';
				} else if (state == 0 || state == 1 || state == 2 || state == 3 || state == 4 || state == 5 || state == 9) {
					return '进行中';
				} else if (state == 8) {
					return '已取消';
				} else {
					return '';
				}
			},
			taxiFormatUserType: function(userType) {
				if (userType == 0) {
					return '普通用户';
				} else if (userType == 1) {
					return '普通会员';
				} else if (userType == 2) {
					return '超级会员';
				} else if (userType == 3) {
					return '其他用户';
				} else if (userType == 9) {
					return '体验会员';
				}
			},
			taxiFormatTime: function(time) {
				var dateTime = time.replace('T', ' ');
				if (dateTime.indexOf('1900') > -1) {
					return '';
				} else {
					return dateTime;
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F8FE;
	}

	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		padding: 0 20rpx 20rpx 20rpx;
	}

	.tabactive {
		border-bottom: solid 1px #FC4646;
		color: #FC4646;
	}

	.booktime {
		width: 375rpx;
		background-color: #06B4FD;
		color: #FFF;
		font-size: 24rpx;
		height: 48rpx;
		border-radius: 24rpx;
		text-align: center;
		line-height: 48rpx;
	}

	.order {
		background-color: #FFF;
		margin-top: 20rpx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
	}

	.ordertitle {
		font-size: 36rpx;
		padding-left: 5rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: rgba(44, 45, 45, 1);
		line-height: 42rpx;
	}

	.orderstatus {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: rgba(51, 51, 51, 1);
		line-height: 50rpx;
	}

	.btnarea {
		display: flex;
		justify-content: flex-end;
		padding-top: 40rpx;
		flex-wrap: nowrap
	}

	.btnarea uni-view {
		padding-left: 20rpx;
	}

	.btnarea button {
		background-color: #FFF;
		font-size: 32rpx;
		color: #333333;
		width: 140rpx;
	}

	.one {
		width: 150rpx;
		height: 80rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		/*相对位置*/
		position: absolute;
		bottom: -95rpx;
		z-index: 555;
		text-align: center;
		font-size: 32rpx;
		color: #333333;
		line-height: 80rpx;
	}

	.one0 {
		width: 0;
		height: 0;
		border: 20rpx solid white;
		border-top: none;
		border-right-color: transparent;
		border-left-color: transparent;
		/*绝对位置*/
		position: absolute;
		top: -20rpx;
		left: 40rpx;
	}
</style>
