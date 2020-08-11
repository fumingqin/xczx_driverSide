<template>
	<view class="content">
		<text class="titleClass">{{title}}</text>	
		<image src="../../static/grzx/btnReturn.png" class="returnClass" @click="returnClick"></image>
		<image src="../../static/grzx/nav2.png" class="navClass"></image>
		<view class="boxClass">
			<image :src="portrait||'/static/grzx/touxiang.png'" class="portraitClass"></image>
			<text class="photoGraph" @click="getPhoto">{{photoGraph}}</text>
			<view class="boxClass1 m-t b-b">
				<text class="fontClass">姓名</text>
				<input class="inputClass"  name="userName"  placeholder="请输入真实姓名" v-model="userName" />
			</view>
			<view class="boxClass1 b-b">
				<text class="fontClass">性别</text>
				<radio-group class="sexClass" name="userSex">
					<label v-for="(item, index) in sexMode" :key="index" @click="radioClick(index)" > 
						<radio style="transform: scale(0.7)" :value="userSex" :checked="index===userSex" color="#FC4646"/>{{item.title}}
					</label>  
				</radio-group>
			</view>
			<view class="boxClass1 b-b">
				<text class="fontClass">公司</text>
				<!-- <input class="inputClass"  name="userCompany"  placeholder="请输入公司名称" v-model="userCompany" /> -->
				<picker class="companyClass" name="userCompany"  mode="selector" @change="companyChange" :range="companyBox" :value="userCompany">
					{{userCompany}}
				</picker>
			</view>
			<view class="boxClass1 b-b">
				<text class="fontClass">驾照等级</text>
				<!-- <picker class="licenseClass" name="userlicenseGrade"  mode="selector" @change="gradeChange" :range="gradeBox" :value="userlicenseGrade">
					{{selector}}
				</picker> -->
				<text class="licenseClass" @click="openPopup('bottomPopup')">{{selector}}</text>
				<!-- <image src="../../static/grzx/tubiao_Right.png" class="imgClass"></image> -->
			</view>
			<view @click="nextClick" class="nextClass">
				下一步
			</view>
		</view>
		
		<!-- 弹窗 -->
		<uni-popup ref="bottomPopup" type="bottom">
			<view class="popupBox" style="display: flex;flex-direction: column">
				<view class="topClass" >
					<view class="closeClass" @click="closePopup('bottomPopup')">取消</view>
					<view class="submitClass" @click="submitClick">确定</view>
				</view>
				<scroll-view class="listClass" scroll-y='true'>
					<checkbox-group @change="checkboxChange" >
						<label class="labelClass" v-for="item in items" :key="item.value">
							<view style="display: flex;flex-direction: row;">
								<checkbox :value="item.value" :checked="item.checked" />
								<view>{{item.name}}</view>
							</view>
						</label>
					</checkbox-group>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/components/grzx/js_sdk/gsq-image-tools/image-tools/index.js';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default{
		components: {
			uniPopup,
		},
		data(){
			return{
				title:'填写资料',
				photoGraph:'请点击拍照',
				sexMode :[
					{title:'男'},
					{title:'女'}
				],
				selector:'请选择(可多选) >',
				selectType:[],
				companyBox:[],
				companyIDBox:[],
				// company:'请选择 >',
				// gradeBox:['A1','A2','A3','B1','B2','C1','C2','C3','C4','D','E','F','M','N','P'],
				//-------数据-------
				userPortrait:'',
				userName:'',
				userSex:0,
				userCompany:'请选择 >',
				usercompanyID:'',
				userlicenseGrade:'',
				portrait:'',
				items: 
					[{
						value: 'A1',
						name: 'A1'
					},
					{
						value: 'A2',
						name: 'A2',
					},
					{
						value: 'A3',
						name: 'A3',
					},
					{
						value: 'B1',
						name: 'B1',
					},
					{
						value: 'B2',
						name: 'B2',
					},
					{
						value: 'C1',
						name: 'C1'
					},
					{
						value: 'C2',
						name: 'C2'
					},
					{
						value: 'C3',
						name: 'C3'
					},
					{
						value: 'C4',
						name: 'C4'
					}]
					// {
					// 	value: 'D',
					// 	name: 'D'
					// }
			}
		},
		onLoad(){
			this.loadcompanyList();
		},
		methods:{
			//-----------加载公司列表------------
			loadcompanyList(){
				var that=this;
				uni.request({
					url:that.$GrzxInter.Interface.GetAllCompany.value,
					method:that.$GrzxInter.Interface.GetAllCompany.method,
					success:function(res){
						console.log(res)
						console.log(res.data.data)
						for(var i=0;i<res.data.data.length;i++){
							that.companyBox.push(res.data.data[i].CompanyName);
							that.companyIDBox.push(res.data.data[i].CompanyID);
						}
					}
				})
			},
			//-----------返回------------
			returnClick(){
				uni.navigateBack();
				// uni.showModal({
				//     content: '确定要返回到选择界面',
				//     success: (e)=>{
				//     	if(e.confirm){
				//     		uni.navigateBack({
				//     			delta: 2
				//     		});
				//     	}
				//     }
				// });
			},
			//-----------性别选择------------
			radioClick:function(e){
				this.userSex = e;
			},
			//-----------驾照等级------------
			gradeChange(e){
				this.selector =this.gradeBox[e.detail.value];
				this.userlicenseGrade=this.gradeBox[e.detail.value];
			},
			//-----------提交数据------------
			nextClick(){
				//console.log(this.userPortrait)
				console.log(this.userName)
				console.log(this.userSex)
				console.log(this.userCompany)
				console.log(this.userCompanyID)
				console.log(this.selector)
				if(this.userPortrait==""||this.userPortrait==null){
					uni.showToast({
						title:'请添加头像',
						icon:'none'
					})
				}else if(this.userName==""||this.userName==null){
					uni.showToast({
						title:'请填写姓名',
						icon:'none'
					})
				}else if(this.userCompany=="请选择 >"){
					uni.showToast({
						title:'请选择公司',
						icon:'none'
					})
				}else if(this.selector=="请选择(可多选) >"){
					uni.showToast({
						title:'请选择驾照等级',
						icon:'none'
					})
				}else{
					var list={
						userPortrait:this.userPortrait,
						userName:this.userName,
						userSex:this.userSex,
						userCompany:this.userCompany.substring(0,this.userCompany.length-2),
						userCompanyID:this.userCompanyID,
						userlicenseGrade:this.selector.substring(0,this.selector.length-2),
					}
					uni.setStorageSync('registerList2',list)
					uni.navigateTo({
						url:'/pages/grzx/registerPage3',
					})
				}	
			},
			//-----------上传头像------------
			getPhoto(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							 that.portrait=res1.savedFilePath;
							 pathToBase64(res1.savedFilePath)
							 .then(base64 => {
								 that.userPortrait=base64;
							 })
						  }
						}); 
					}
				})	
			},
			//-----------关闭弹窗------------
			closePopup: function(value) {
				if(this.selector==""){
					this.selector="请选择(可多选) >";
				}
				console.log(this.items[0])
				this.$nextTick(function() {
					this.$refs[value].close();
				});
			},
			//-----------开启弹窗------------
			openPopup: function(value) {
				this.$nextTick(function() {
					this.$refs[value].open();
				});
			},
			//-----------复选框点击事件------------
			checkboxChange: function (e) {
				console.log(e)
				this.selectType=e.detail.value;
				console.log(this.selectType)
			},
			//-----------点击确定------------
			submitClick: function(){
				this.selector="";
				for(var i=0;i<this.selectType.length;i++){
					this.selector+=this.selectType[i]+",";
				}
				console.log(this.selector)
				if(this.selector==""){
					uni.showToast({
						title:'请选择驾照等级',
						icon:'none'
					})
				}else{
					this.selector=this.selector.substring(0,this.selector.length-1)+" >";
					this.closePopup("bottomPopup");
				}
			},
			//-----------公司选择------------
			companyChange:function(e){
				this.userCompany=this.companyBox[e.detail.value]+" >";
				this.userCompanyID=this.companyIDBox[e.detail.value];
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F9FC;
	}
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 84upx;
		left: 4.13%;
		position: absolute;
	}
	.titleClass{	//标题
		color: #333333;
		font-size: 40upx;
		width: 100%;
		text-align: center;
		top: 70upx;
		position: absolute;
		font-weight: bold;
	}
	.navClass{	//导航
		width: 90%;
		height: 75upx;
		margin-left: 5%;
		margin-top: 170upx;
		//position: absolute;
	}
	.boxClass{
		border-radius: 10upx;
		background-color: #FFFFFF;
		width: 90%;
		height: 1000upx;
		margin-left: 5%;
		margin-top: 33upx;
		display: flex;
		flex-direction: column;
	}
	.portraitClass{ 	//头像
		border-radius: 50%;
		width: 200upx;
		height: 200upx;
		margin-left: 34%;
		margin-top:45upx;
	}
	.photoGraph{ //请点击拍照
		width: 100%;
		text-align: center;
		font-size: 36upx;
		color: #2C2D2D;
		margin-top:25upx;
	}
	.boxClass1{
		//border: 1upx solid #000000;
		line-height:109upx;
		width: 90%;
		height: 109upx;
		margin-left: 5%;
		display: flex;
		flex-direction: row;
	}
	.m-t{
		margin-top: 40upx;
	}
	.b-b{
		border-bottom: 1upx solid #EAEAEA;
	}
	.fontClass{	//姓名，性别，公司，驾照等级
		font-size: 30upx;
		color: #2C2D2D;
		margin-left: 2%;
	}
	.nextClass{		//下一步
		width: 90%;
		height: 90upx;
		line-height: 90upx;
		margin-top: 65upx;
		margin-left: 5%;
		text-align: center;
		color:#FFFFFF;
		border-radius: 8upx;
		background-color: #FC4646;
		font-size: 34upx;
	}
	.inputClass{
		color: #2C2D2D;
		width: 80%;
		// border: 1upx solid #000000;
		margin-left: 7%;
		/* #ifdef MP-WEIXIN */
		margin-top: 31upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		margin-top: 36upx;
		/* #endif */
		font-size: 30upx;
	}
	.sexClass{
		color: #2C2D2D;
		width: 80%;
		margin-left: 7%;
		font-size: 30upx;
	}
	.licenseClass{
		color: #2C2D2D;
		width: 72%;
		margin-left: 5%;
		font-size: 30upx;
	}
	.imgClass{
		width: 20upx;
		height: 30upx;
		margin-top: 42upx;
	}
	//公司选择列表
	.companyClass{
		margin-left: 7%;
		width: 65%;
		height: 100upx;
		color: #2C2D2D;
		font-size: 30upx;
	}
	//弹框
	.popupBox{
		height: 640upx; 
		background-color: #FFFFFF; 
		border-top-left-radius: 20upx; 
		border-top-right-radius: 20upx;
		display: flex;
	}
	.topClass{
		display: flex;
		flex-direction: row; 
		background-color: #E6E6E6;
		border-top-left-radius: 20upx; 
		border-top-right-radius: 20upx;
		height: 100upx;
	}
	//弹框关闭按钮
	.closeClass{
		margin-left: 6%;
		margin-top: 30upx;
		font-size: 40upx;
		color: #B4B4B4;
	}
	//弹框确定按钮
	.submitClass{
		margin-left: 66%;
		margin-top: 30upx;
		font-size: 40upx;
		color: #71A8EB;
	}
	//弹框选择列表
	.listClass{
		margin-top: 30upx;
		margin-left: 40%;//40%;
		width: 60%;//60%;
		height: 510upx;
		// border: 1upx solid red;
	}
	.labelClass{
		line-height: 100upx;
		height: 100upx;
		position: relative;
	}
</style>
