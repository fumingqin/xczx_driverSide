<template>
	<view class="content">
		<view class="box1">
			<view class="itemClass">
				<text class="fontStyle">驾照等级</text>
				<picker class="inputClass" name="licenseGrade"  mode="selector" @change="gradeChange" :range="gradeBox" :value="licenseGrade">
					{{selector}}
				</picker>	
			</view>
		</view>
		
		<view class="frontClass" @click="getPhoto1">
			<view v-if="auditState1=='待上传'">
				<image src="../../static/grzx/addImg.png" class="addClass"></image>
				<text class="fontClass">点击上传驾照的主页</text>
			</view>
			<view v-if="auditState1!='待上传'">
				<image class="imgClass" :src="homepage" name="frontImg"  mode="aspectFill"></image>
				<text class="stateClass">{{auditState1}}</text>
			</view>

		</view>
		<view class="backClass" @click="getPhoto2">
			<view v-if="auditState2=='待上传'">
				<image src="../../static/grzx/addImg.png" class="addClass"></image>
				<text class="fontClass">点击上传驾照的副页</text>
			</view>
			<view v-if="auditState2!='待上传'">
				<image class="imgClass" :src="secondSheets" name="backImg"  mode="aspectFill"></image>
				<text class="stateClass">{{auditState2}}</text>
			</view>
		</view>
		
		<button type="warn" class="btnClass" @click="submit">提交</button>
	</view>
</template>

<script>
	import wPicker from "@/components/grzx/w-picker/w-picker.vue";
	export default{
		data(){
			return{
				auditState1:'待上传',
				auditState2:'待上传',
				gradeBox:['A1','A2','A3','B1','B2','C1','C2','C3'],
				selector:'请选择',
				licenseGrade:'',
				homepage:'',
				secondSheets:'',
			}
		},
		onLoad(){
			
		},
		methods:{
			gradeChange(e){
				this.selector =this.gradeBox[e.detail.value]; 
			},
			submit(){
				console.log(this.selector)
				console.log(this.homepage)
				console.log(this.secondSheets)
				console.log(this.auditState1)
				console.log(this.auditState2)
			},
			getPhoto1(){  	//证件正面
				var that=this;
				
				uni.chooseImage({
					count:1,
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
							success: function (res1) {
								that.homepage=res1.savedFilePath;
								that.auditState1="待审核";
							}
						});
					}
				})
			},
			getPhoto2(){	//证件主页
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						//console.log(res,"res11");
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
							success: function (res1) {
								that.secondSheets=res1.savedFilePath;
								that.auditState2="待审核";
							}
						});
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F8FC;
	}
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.box1{
		display: flex;
		flex-direction: column;
		width: 93.07%;
		margin-top: 10upx;
		margin-left: 3.47%;
		background-color: #FFFFFF;
		border-radius: 25upx;
	}
	.itemClass{
		width: 618upx;
		height: 110upx;
		margin-left: 40upx;
		margin-top: 0upx;
	}
	.fontStyle{
		color: #2C2D2D;
		font-size: 30upx;
		position: absolute;
		left: 9%;
		line-height: 108upx;
	}
	.inputClass{
		position: absolute;
		width: 50%;
		height: 108upx;
		font-size: 32upx;
		right: 9%;
		line-height: 108upx;
		text-align: right;
	}
	.frontClass{  //驾照主页
		width: 93.07%;
		height: 440upx;
		margin-top: 20upx;
		margin-left: 3.47%;
		// border: 1upx solid #EAEAEA;
		background-color: #FFFFFF;
		border-radius: 25upx;
		position: relative;
	}
	.backClass{ //驾照副页
		width: 93.07%;
		height:	440upx;
		margin-top: 20upx;
		margin-left: 3.47%;
		// border: 1upx solid #EAEAEA;
		background-color: #FFFFFF;
		border-radius: 25upx;
		position: relative;
	}
	.addClass{	//添加图片
		width: 100upx;
		height: 100upx;
		position: absolute;
		left: 42%;
		top:150upx;
	}
	.fontClass{		//字体（证件）
		text-align: center;
		width: 100%;
		font-size: 32upx;
		position: absolute;
		top:270upx;
		color:#cdcdcd;
	}
	.imgClass{
		width: 100%;
		height: 440upx;
		border-radius: 25upx;
	}
	.stateClass{	//审核状态的文字样式
		position: absolute;
		left: 20upx;
		top: 0;
		//width: 112upx;
		height: 52upx;
		line-height: 52upx;
		font-size: 32upx;
		color: #ff0000;
	}
	.btnClass{
		width: 90%;
		height: 108upx;
		line-height: 108upx;
		background-color: #FC4B4B;
		color: #FFFFFF;
		position: fixed;
		bottom: 40upx;
		left: 5%;
	}
</style>
