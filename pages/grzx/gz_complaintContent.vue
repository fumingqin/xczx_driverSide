<template>
	<view>
		<form @submit="formSubmit">
			<view class="cc_content">
				<text class="ct_text1">投诉时间</text>
				<text class="ct_text2">{{or_dateString}}</text>
				<text class="ct_text1">投诉内容</text>
				<text class="ct_text2">{{or_content}}</text>
			</view>
			<!-- 内容 -->
			<view class="content">
				<!-- 投诉原因 -->
				<view class="ComplaintYY">
					<text class="yyText">申诉原因</text>
					<textarea class="yyTitle" placeholder-style="#AAAAAA" placeholder="描述详尽助于提升处理速度" maxlength="500" @input="descInput"
					 v-model="detailInfo.a" style="width: 295px;height: 100px;" />
					<view class="num">{{remnant}}/500字</view>
				</view>
				<!-- 原因范本 -->
				<view class="reasonFB">
					<text class="fbText">原因范本</text>
					<text class="tiemBtn" @click="paste">复制</text>
					<view class="fbTitle" v-model="b" style="width: 295px;height: 71px;color: #AAAAAA;">{{b}}</view>
				</view>
			</view>
			
			<view class="cl_bottom"></view>
			<button class="tjButton" type="primary" :color="'#2b9df2'" form-type="submit" >提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				b:'本人于 #填写时间  在#填写事发地详细地址# 发生 了 #描述申诉原因# ， 本人希望 #填写您的述求， 如退票#',
				remnant: 0,//字数
				or_entrance:0,//入口状态参数
				a:'',//投诉原因
				complaintObject:'',//投诉对象
				or_number:'',
				or_DriverContent:'',
				or_dateString:'',
				or_name:'',
				or_phoneNumber:'',
				or_nameId:'',
				userInfo:'',
				or_content:'',
				
				detailInfo : {
					a:'',//投诉原因
					complaintObject:'',//投诉对象
					
				},
			}
		},
		onLoad:function(options) {
			var userInfo = uni.getStorageSync('userInfo') || '';
			this.or_number = JSON.parse(options.or_number);
			this.or_content = options.or_content;
			this.or_dateString = options.or_dateString;
			console.log(this.or_number)
		},
		
		methods: {
			//-------------------------字数-------------------------------
			descInput: function(e) {
				// console.log(e)
				this.remnant = e.detail.value.length;
			},
			//--------------------复制------------------------------------
			paste:function(){
				this.detailInfo.a=this.b;
				this.remnant=this.b.length;
			},
			
			//-----------------------------投诉提交----------------------------------------
			formSubmit:function(e){
				var that = this;
				uni.showLoading({
					title:'提交申诉中...'
				})
				if(that.remnant==0){
					if(that.or_DriverContent==''){
						uni.showToast({
							title:'请输入申诉原因',
							icon: 'none',
						})
					}
				}else if(that.remnant!==0){
					// console.log(that.detailInfo.a)
					// console.log(that.userId)
					// console.log(that.or_telephone)
					// console.log(that.or_entrance)
					// console.log(that.or_nameId)
					// console.log(that.or_name)
					// console.log(that.detailInfo.complaintObject)
					// console.log(that.or_complainant)
					// console.log(that.or_class)
					uni.request({
						url:this.$GrzxInter.Interface.complaintList.value,
						method:this.$GrzxInter.Interface.complaintList.method,
						header: {'content-type': 'application/json'},
						data:{
							or_nameId:that.userInfo.driverId,
							or_phoneNumber:that.userInfo.phoneNumber,
							or_name:that.userInfo.userName,
							or_number:that.or_number,
							or_DriverContent:that.detailInfo.a,
							or_content:that.or_content,
							or_dateString:that.or_dateString,
						},
						success: (res) => {
							console.log(res)
							if(res.data.status== true){
								uni.hideLoading()
								uni.showToast({
									title:'申诉成功',
									icon: 'none',
								})
								setTimeout(function(){
									uni.navigateBack();
								},2000);
							}else if(res.data.status== false ){
								uni.hideLoading()
								uni.showToast({
									title:'2分钟内请勿重复发表投诉',
									icon: 'none',
								})
							}
						},
						fail:function(){
							uni.hideLoading()
							uni.showToast({
								title:'申诉失败',
								icon:'none'
							})
						},
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}
	
	.cc_content{
		background-color: #ffffff;
		// padding-bottom: 32upx;
		margin-bottom: 20upx;
		padding-left: 30upx;
		padding-right: 30upx;
		
		.ct_text1{
			display: flex;
			font-weight: bold;
			font-size: 32upx;
			padding-top: 30upx;
		}
		
		.ct_text2{
			padding-top: 20upx;
			padding-bottom: 20upx;
			font-size: 31upx;
			display: block;
			color: #666;
			border-bottom: 1px #F5F5F5 dotted;
		}
	}
	
	// 投诉对象样式
	.complaintDX {
		background-color: #ffffff;
		// padding-bottom: 32upx;
		margin-bottom: 20upx;
		padding-top: 30upx;
		padding-left: 30upx;
		padding-right: 30upx;
	
		.tsdxText {
			font-weight: bold;
			font-size: 32upx;
		}
	
		.tsnrText {
			display: flex;
			padding-top: 40upx;
			font-size: 30upx;
			color: #333333;
			padding-bottom: 32upx;
	
			.jdticon {
				position: relative;
				top: 9upx;
				left: 20upx;
			}
		}
	}
	
	// 内容
	.content {
		margin: 0 0 24upx 0;
		padding-top: 56upx;
		padding-left: 32upx;
		padding-right: 32upx;
		background-color: #FFFFFF;
	
		// 投诉内容
		.ComplaintYY {
			border-bottom: 1px #F5F5F5 dotted;
	
			.yyText {
				font-weight: bold;
				font-size: 32upx;
			}
	
			.yyTitle {
				padding-top: 40upx;
				font-size: 30upx;
			}
	
			.num {
				text-align: right;
				font-size: 30upx;
				color: #AAAAAA;
				padding-bottom: 23upx;
			}
		}
	
		// 原因范本
		.reasonFB {
			position: relative;
			padding-top: 28upx;
	
			.fbText {
				font-weight: bold;
				font-size: 32upx;
			}
			
			.fbTitle {
				padding-top: 40upx;
				font-size: 30upx;
			}
			.tiemBtn{
				position: absolute;
				right: 6upx;
				font-size: 30upx;
				text-align: right;
				color: #47A5FC;
			}
		}
	}
	
	//底部多余
	.cl_bottom{
		width: 100%;
		height: 150upx;
	}
	
	//底部按钮
	.tjButton {
		position: fixed;
		bottom: 32upx;
		left: 0;
		right: 0;
		// padding: 24upx 0;
		border-radius: 64upx;
		margin: 0 40upx;
		background: #1EA2FF;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}
</style>
