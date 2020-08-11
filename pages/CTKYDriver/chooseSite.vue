<template>
	<view>
		<view class="head">
			<view class="status_bar"></view>
			<view style="padding:10rpx 30rpx;text-align: center;">
				<text class="titleFont">上下车点选择</text>
			</view>
		</view>
		<view style="margin-left: 30rpx;margin-right: 30rpx;">
			<!--选择上车点-->
			<view class="startSiteBlock">
				<view style="margin-bottom: 30rpx;">
					<text class="SiteTitleFont">选择上车点</text>
				</view>
				<scroll-view style="height: 300rpx;" :style="{height:siteHeight}"  :scroll-y='true'>
					<view class="siteBlock">
						<view v-for="(item,index) in startSite" :key='index' @click="startSiteClick(item,index)" :class="chooseStartSiteIndex == index?'activated':'unActivated'"
						 style="margin-right: 20rpx;margin-bottom: 20rpx;background-color: #E3E3E3;">
							<text class="siteFont">{{item.SiteName}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<!--选择下车点-->
			<view class="endSiteBlock">
				<view style="margin-bottom: 30rpx;">
					<text class="SiteTitleFont">选择下车点</text>
				</view>
				<scroll-view style="height: 300rpx;" :style="{height:siteHeight}" :scroll-y='true'>
					<view class="siteBlock">
						<view v-for="(item,index) in endSite" :key='index' @click="endSiteClick(item,index)" :class="chooseEndSiteIndex == index?'activated':'unActivated'"
						 style="margin-right: 20rpx;margin-bottom: 20rpx;">
							<text class="siteFont">{{item.SiteName}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view>
				<button :disabled="Disabled" @click="finished" :class="[Disabled?'unfinishedButtom':'finishedButtom']" style="width: 100%;">
					<text>完成</text>
				</button>
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
	export default {
		data() {
			return {
				tabbarArr: [{
						title: '首页',
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/index-black.png',
						imageStyle: 'width: 51rpx;height: 45rpx;',
						canClick: true
					},
					/* {
						title: '购票',
						color: 'color: #FC4646',
						imageSrc: '../../static/tabbar/buy-red.png',
						imageStyle: 'width: 49rpx;height: 36rpx;',
						canClick: false
					}, */
					{
						title: '检票',
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/check-black.png',
						imageStyle: 'width: 47rpx;height: 38rpx;',
						canClick: true
					}
				],
				startSite: [],
				endSite: [],
				Disabled:true,
				siteHeight:'',
				
				chooseStartSiteIndex:-1,
				chooseEndSiteIndex:-1,
				ScheduleAndTickets:'',
			}
		},
		onShow() {
			var that=this;
			uni.getSystemInfo({
				success(res) {
					that.siteHeight=res.windowHeight*0.23+'px';
				}
			});
			that.ScheduleAndTickets = uni.getStorageSync('scheduleInfo') || '';
			if(that.ScheduleAndTickets !== ''){
				that.startSite = that.ScheduleAndTickets.SiteTicketList;
				that.endSite = that.ScheduleAndTickets.SiteTicketList;
			}
		},
		methods: {
			startSiteClick: function(el,index) {
				//上车点点击事件
				let that = this;
				that.chooseStartSiteIndex = index;
				//取消按钮禁用
				if(that.isUndisabled()){
					that.Disabled = false;
				}
				
			},
			endSiteClick: function(el,index) {
				//上车点点击事件
				let that = this;
				that.chooseEndSiteIndex = index
				//取消按钮禁用
				if(that.isUndisabled()){
					that.Disabled = false;
				}
			},
			
			isUndisabled:function(){
				let that = this;
				//是否关闭禁用按钮
				//console.log(that.chooseStartSiteIndex < that.chooseEndSiteIndex); 
				return 	that.chooseStartSiteIndex!=-1 && that.chooseEndSiteIndex!=-1 && that.chooseStartSiteIndex < that.chooseEndSiteIndex
			},
			
			finished:function(){
				let that = this;
				let startSite = that.ScheduleAndTickets.SiteTicketList[that.chooseStartSiteIndex].SiteName;
				let endSite = that.ScheduleAndTickets.SiteTicketList[that.chooseEndSiteIndex].SiteName;
				
				//console.log(`./buyTicket?startSite=${startSite}&endSite=${endSite}`);
				uni.navigateTo({
					url:`./buyTicket?startSite=${startSite}&endSite=${endSite}`,
				})
			},
			
			tabbarClick: function(el) {
				let url = '';
				if (el.canClick) {
					switch (el.title) {
						case '首页':
							url = './index';
							break;
						case '购票':
							url = './chooseSite';
							break;
						case '检票':
							url = './checkTicket';
							break;
						default:
							break;
					};
					uni.redirectTo({
						url:url
					})
				}
			},
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

	.titleFont {
		font-size: 38rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.siteBlock {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.startSiteBlock {
		margin-top: -90rpx;
		padding: 30rpx 40rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
	}

	.endSiteBlock {
		margin-top: 30rpx;
		padding: 30rpx 40rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
	}

	.SiteTitleFont {
		font-size: 32rpx;
		font-family: Source Han Sans SC;
		font-weight: 500;
		color: #333333;
	}

	.unActivated {
		display: flex;
		border: 1px solid #666666;
		padding: 20rpx 30rpx;
		border-radius: 12rpx;
	}

	.unActivated .siteFont {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: #333333;
	}

	.activated {
		display: flex;
		border: 1px solid #FC4646;
		padding: 20rpx 30rpx;
		border-radius: 12rpx;
	}

	.activated .siteFont {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: #FC4646;
	}

	.finishedButtom {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		background: linear-gradient(270deg, rgba(249, 92, 117, 1), rgba(250, 116, 101, 1));
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
		border-radius: 12rpx;
	}
	
	.unfinishedButtom {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		background: #CBCBCB;
		border-radius: 12rpx;
	}

	.finishedButtom text {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
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
