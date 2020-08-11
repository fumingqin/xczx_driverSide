<template>
	<view>
		<view class="head">
			<view class="status_bar"></view>
			<view class="headbar">
				<uni-icons @click="back" type="arrowleft" size="24" color="#FFF"></uni-icons>
				<view class="title">客车</view>
				<view></view>
			</view>
		</view>

		<view style="margin-left: 30rpx;margin-right: 30rpx;margin-top: -90rpx;">
			
			<view style="padding: 30rpx 40rpx;background:#FFFFFF;box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);border-radius:20rpx;">
				<view style="display: flex;flex-direction: column;">
					<view style="display: flex;flex-direction: row;">
						<view style="width: 100%;">
							<text class="informationFont">线路：{{ScheduleAndTickets.LineName}}</text>
						</view> 
						<!-- <view style="width: 305rpx;">
							<text class="informationFont">类型：定制快车</text> 
						</view> -->
					</view> 
				</view>
				
				<view style="display: flex;flex-direction: column;">
					<view style="display: flex;flex-direction: row;">
						<view style="width: 305rpx;">
							<text class="informationFont">车牌号：{{ScheduleAndTickets.CoachCardNumber}}</text>
						</view> 
						<view style="width: 305rpx;">
							<text class="informationFont">发车时间：{{formatSetoutTime(ScheduleAndTickets.SetoutTime)}}</text> 
						</view>
					</view>
				</view>
				
				<view style="display: flex;flex-direction: column;">
					<view style="display: flex;flex-direction: row;">
						<view style="width: 305rpx;">
							<text class="informationFont">全票人数：{{formatPersonCount(ScheduleAndTickets.Tickets)}}人</text>
						</view> 
						<view style="width: 305rpx;">
							<text class="informationFont">携童人数：{{ScheduleAndTickets.FreeSeats}}人</text> 
						</view>
					</view>
				</view>
				
			</view>
			
			
			<view style="padding: 30rpx 40rpx;margin-top: 30rpx;background:#FFFFFF;box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);border-radius:20rpx;">
				<scroll-view :style="{height:firHeight+'px'}" :scroll-x="true" :scroll-into-view='scrollStationIndex'> 
					<view style="display: flex;flex-direction: row;">
						
						<!--起点-->
						<view style="display: flex;flex-direction: column;">
							<!-- <view style="display: flex;flex-direction: column;width: 100rpx;" id="id_0"> -->
							<view style="text-align: center;height: 35rpx;">
							</view>
							<view style="display: flex;margin-top: 10rpx;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/startSite.png" style="width: 40rpx;height: 50rpx;"></image>
							</view>
						</view>
						
						<!--横向-->
						<view v-for='(item ,index) in ScheduleAndTickets.SiteTicketList' :key='index' :id="'id_' + (index + 1)"  style="display: flex;flex-direction: column;width: 100rpx;">
							<view style="text-align: center;height: 50rpx;">
								<image v-show='nowIndex == index' src="../../static/CTKYDriver/bus.png" style="width: 50rpx;height: 25rpx;"></image>
							</view>
							<view style="display: flex;margin-top: 10rpx;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/line2.png" style="width: 100rpx;height: 10rpx;"></image>
							</view>
							<view style="text-align: center;">
								<text style="font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:#333333">{{index+1}}</text>
							</view>
							<view>
								<view style="width: 20px;margin: 0 auto;text-align: center;line-height: 35rpx;">
									<text style="font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:#333333;">{{item.SiteName}}</text>
								</view>
							</view>
							<view v-show="item.ThisSiteGetonTicketCount > 0">
								<view  style="width: 30px;margin: 0 auto;text-align: center;margin-top: 30rpx;line-height: 35rpx;">
									<text style="font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:#5BC12D;">{{item.ThisSiteGetonTicketCount}}人上</text>
								</view>
							</view>
							<view v-show="item.ThisSiteGetoffTicketCount > 0">
								<view  style="width: 30px;margin: 0 auto;text-align: center;margin-top: 30rpx;line-height: 35rpx;">
									<text style="font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:#fc4646;">{{item.ThisSiteGetoffTicketCount}}人下</text>
								</view>
							</view>
						</view>
						
						<!--终点-->
						<view style="display: flex;flex-direction: column;">
							<view style="text-align: center;height: 35rpx;"></view>
							<view style="display: flex;margin-top: 10rpx;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/endSite.png" style="width: 40rpx;height: 50rpx;"></image>
							</view>
						</view>
					</view>
				</scroll-view>
				
				<scroll-view :style="{height:secHeight+'px'}" :scroll-y="true" :scroll-into-view="scrollOnOffIndex">
					<view style="display: flex;flex-direction: column;">
						<view v-for="(item , index) in ScheduleAndTickets.SiteTicketList" :key='index' :id="'id_' + (index+1)">
							<view v-show="item.ThisSiteGetonTicketCount > 0" style="display: flex;flex-direction: row;align-items: center;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/msg-green.png" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
								<view style="display: flex;">
									<text class="noticeFont">请注意，</text>
									<text class="noticeOnFont">{{item.SiteName}}</text>
									<text class="noticeFont">有</text>
									<text class="noticeOnFont">{{item.ThisSiteGetonTicketCount}}个</text>
									<text class="noticeFont">乘客等待上车</text>
								</view>
							</view>
							<view v-show="item.ThisSiteGetoffTicketCount > 0" style="display: flex;flex-direction: row;align-items: center;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/msg-red.png" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
								<view style="display: flex;">
									<text class="noticeFont">请注意，</text>
									<text class="noticeOffFont">{{item.SiteName}}</text>
									<text class="noticeFont">有</text>
									<text class="noticeOffFont">{{item.ThisSiteGetoffTicketCount}}个</text>
									<text class="noticeFont">乘客等待下车</text>
								</view>
							</view>
						</view>
				
					</view>
				</scroll-view>
			</view>		
			
		</view>
		
		<view class="tabbarBlock">
			<view style="display: flex;flex-direction: row;">
				<view class="tabbarItem" v-for="(item,index) in tabbarArr" :key='index' @click="tabbarClick(item)">
					<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
						<image :src="item.imageSrc" :style="item.imageStyle"></image>
					</view>
					<text :style="item.color">{{item.title}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Voice from '../../js_sdk/QuShe-baiduYY/QS-baiduyy/QS-baiduyy.js'
	export default {
		data() {
			return {
				tabbarArr: [{
						title: '首页',
						color: 'color: #FC4646',
						imageSrc: '../../static/tabbar/index-red.png',
						imageStyle: 'width: 51rpx;height: 45rpx;',
						canClick: false,
						url:'./index'
					},
					/* {
						title: '购票',
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/buy-black.png',
						imageStyle: 'width: 49rpx;height: 36rpx;',
						canClick: true
					}, */
					{
						title: '检票',
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/check-black.png',
						imageStyle: 'width: 47rpx;height: 38rpx;',
						canClick: true,
						url:'./checkTicket'
					}
				],
				scrollStationIndex:'id_0',
				scrollOnOffIndex:'id_0',
				nowIndex:0,
				lastIndex:-1,
				distanceInterval:0,
				
				ScheduleAndTickets:'',
				
				firHeight:270,//第一个块高度280
				secHeight:100,//第二个块高度140
				basicHeight:720,
			}
		},
		onLoad() {
			let that = this;
			let scheduleInfo = uni.getStorageSync('scheduleInfo') || '';
			that.ScheduleAndTickets = scheduleInfo;
			that.initSiteData();
			that.mathDistance();
			that.initModuleParam();
		},
		onShow() {
			let that = this;
			uni.setKeepScreenOn({
				keepScreenOn:true,
				success:function(res){
				},
				fail:function(res){
				}
			})
			that.lastIndex = uni.getStorageSync('lastIndex') || -1;
			if(that.lastIndex > -1){
				that.scrollStationIndex = 'id_' + that.lastIndex;
				that.scrollOnOffIndex = 'id_' + that.lastIndex;
				that.nowIndex = that.lastIndex
			}
		},
		onUnload() {
			let that = this;
			clearInterval(that.distanceInterval);
		},
		onReady() {
		},
		methods: {
			initModuleParam:function(){
				let that = this;
				uni.getSystemInfo({
					success:function(res){
						let firHeightVal = that.firHeight / that.basicHeight * res.windowHeight;
						let secHeightVal = that.secHeight / that.basicHeight * res.windowHeight;
						that.firHeight = firHeightVal;
						that.secHeight = secHeightVal;
					}
				})
			},
			
			tabbarClick: function(el) {
				if (el.canClick) {
					uni.redirectTo({
						url:el.url
					})
				}
			},
			
			back:function(){
				uni.navigateTo({
					url:'../CTKYDriver/selectOrder',
					animationType:"slide-in-left"
				})
			},
			
			initSiteData:function(){
				//根据经纬度获取当前
				let that = this;
				uni.getLocation({
					success:function(res){
						that.ScheduleAndTickets.SiteTicketList.filter((x,index) => {
							let long = that.$home.mathLonLatToDistance(res.latitude,res.longitude,x.Latitude,x.Longitude);
							if(long < 500 && that.lastIndex < index  ){
								that.scrollStationIndex = 'id_' + index;
								that.scrollOnOffIndex = 'id_' + index;
								that.nowIndex = index ;
								that.lastIndex = index;
								uni.setStorageSync('lastIndex' , index);
								let str = '请注意' + x.SiteName + '就要到了，' ;
								if(x.ThisSiteGetonTicketCount > 0){
									str += '有' + x.ThisSiteGetonTicketCount + '位乘客等待上车'
								}
								if(x.ThisSiteGetoffTicketCount > 0){
									str += '有' + x.ThisSiteGetoffTicketCount + '位乘客即将下车'
								}
								//报站两次
								that.baiduPlayer(str); 
								that.baiduPlayer(str);
							}
							return long < 500;
						});
					}
				});
			},
			sleep:function(ms){
				return new Promise(resolve => setTimeout(resolve,ms));
			},
			
			mathDistance:function(){
				let that = this;
				clearInterval(that.distanceInterval); 
				that.distanceInterval = setInterval(function(){
					that.initSiteData();
				},20000);
			},
			
			formatPersonCount:function(arr){
				return arr.length;
			},
			formatCarryChildCount:function(arr){
				return arr.filter(x => x.CarryChild).length;
			},
			formatSetoutTime:function(dateTime){
				return dateTime.substring(11,16);
			},
			
			//调用语音合成接口
			baiduPlayer: function(tex) {
				let that = this;
				Voice(tex);
				//that.getBDVoicToken(tex);
			},
			
			
			
			//百度语音接口，可用，但未改成js文件。		
			/* getBDVoicToken: function(tex) {
				let that = this;
				const APIKey = 'McfIsVog3Q5AsTxtTGOsoFOs';
				const SecretKey = 'fEVIpjVvDXh4BIwWGtg9oOkFV71K1tlv';
			
				uni.request({ // 强烈建议此接口由后端访问并且维护token有效期，否则前端每次访问都会刷新token
					//此url为专门插件测试预览用的key和secret key， 请替换为自己申请的key
					url: 'https://openapi.baidu.com/oauth/2.0/token',
					method: 'GET', //建议使用post访问
					data: {
						grant_type: 'client_credentials',
						client_id: APIKey,
						client_secret: SecretKey
					},
					success: function(res) {
						console.log(res);
						if (res.data && res.data.access_token) {
							let tok = res.data.access_token;
							that.tts(tex, tok);
						} else {
			
						}
					},
					fail: function(res) {
						console.log(res);
					},
				})
			},
			tts: function(objs, tok) {
				let that = this;
				objs = {
					voiceSet: {
						tex: objs
					}
				};
				const data = {
					tok,
					cuid: tok,
					ctp: 1,
					lan: 'zh',
					...objs.voiceSet
				}
				that.getVoiceUrl(data, objs.audioSet);
			},
			getVoiceUrl: function(param, options) {
				let that = this;
				const getAudioUrl = 'https://tsn.baidu.com/text2audio';
				let audio = uni.createInnerAudioContext();
				that.setAudioSet(options, audio);
				// 序列化参数列表
				let fd = [];
				for (let k in param) {
					fd.push(k + '=' + encodeURIComponent(encodeURIComponent(param[k])));
				}
				console.log(fd);
				audio.src = `${getAudioUrl}?${fd.join('&')}`;
				audio.play();
			},
			setAudioSet: function(options, audio) {
				if (options) {
					audio.volume = options.volume || 1;
					audio.startTime = options.startTime || 0;
					audio.loop = options.loop || false;
					audio.obeyMuteSwitch = options.obeyMuteSwitch && typeof(options.obeyMuteSwitch) == 'boolean' ? options.obeyMuteSwitch :
						true;
				}
			} */
		}
	}
</script>

<style>
	page {
		background-color: #F5F9FA;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}

	.head {
		width: 750rpx;
		height: 257rpx;
		background: linear-gradient(0deg, rgba(254, 68, 109, 1) 0%, rgba(254, 148, 95, 1) 100%);
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
		color: #FFFFFF;
	}
	
	.informationFont{
		font-size:30rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#333333;
	}
	
	.noticeFont{
		font-size:26rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#262626;
	}
	.noticeOnFont{
		font-size:26rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#5BC12D;
	}
	.noticeOffFont{
		font-size:26rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#FC4646;
	}
	
/* 页面底部工具栏样式 */
	.tabbarBlock {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 0;
		background-color: #FFF;
		box-shadow: 0px 8px 20px 0px rgba(172, 172, 172, 0.55);
		z-index: 99999;
		height: 40px;
	}
	
	.tabbarItem {
		width: 375rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	 .tabbarItem view { 
		height: 50rpx;
		text-align: center;
	}
	
	 .tabbarItem text {
		font-size: 25rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
	}
</style>
