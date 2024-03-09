<template>
    <div>
    <vue-particles
      class="login-bg"
      style="position:absolute;width:100%;height: 100%"
      自己设置css样式控制粒子显示的位置
      color="#00FFFF"
      :particle-opacity="0.8"
      :particles-number="150"
      shape-type="circle"
      :particle-size="4"
      lines-color="#00FFFF"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="4"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
    />

        <div class="loginBox">
          <i class="el-icon-s-platform text" > 寒窗自习室登录界面</i>
    
 
            <el-form ref="form" label-width="80px" class="loginContainer">
            <el-form-item class="acount" label="账号">
            <el-input  v-model="userName" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item class="acount" label="密码">
            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
            </el-form-item>
            <el-form-item >
            <el-checkbox v-model="checked">记住密码 </el-checkbox>
            <el-button @click="login">登录</el-button>
            <el-button @click="dialogVisible=true">注册</el-button>
            </el-form-item>

             </el-form>
        </div>

    

    <!-- 注册对话框 -->

    <el-dialog
  title="注册新用户"
  :visible.sync="dialogVisible"
  width="30%">

  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="用户头像">
<el-upload
  class="avatar-uploader"
  action="http://175.178.85.36:10010/storage/image/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</el-form-item>
  

  </el-form>
  <el-button @click="dialogVisible = false">取 消</el-button>
  <el-button type="primary" @click="register">确 定</el-button>
</el-dialog>
    </div>
</template>

<script>
export default {
    name:'Login', //暴露给外部接口的名字
    data() {
        return {
            userName:"",
            password:"",
            verifyCode:"",
            dialogVisible: false,
            form:{
                name:"",
                password:"",
                imageName:""
            },
            imageUrl: '',
            checked: true
        }
    
    },
    methods:{
         //上传图片成功
         handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.imageName=res.data;
      }, //发送注册信息
      register(){

        if(this.form.name==""||this.form.password==""||this.imageName==""){
            this.$message.error("请先填写完信息")
        } //发送请求
        else{
        //发送注册请求
        //整合信息
        var Data={
            "userName":this.form.name,
            "password":this.form.password,
            "imageUrl":this.imageName
        }
        this.$axios({
            method:"post",
            url:"/user/register",
            data:Data,
        })
        .then(res=>{
            if(res.data.code==1){
              this.$message.success("用户注册成功")
            }else{
              this.$message.error(res.data.msg)
            }

        })
        .catch(res=>{
            this.$message.error("出错了")
        })
        //关闭对话框
        this.dialogVisible = false;
        }
      },
      //登录
      login(){
        //检查输入是否齐全
        if(this.userName==""){
          this.$message.error("请输入正确的账号，密码和验证码")
        }else{
          //封装数据
          var Data={
            "userName":this.userName,
            "password":this.password,
            "checked":this.checked
          }
          //发送请求
          this.$axios({
            method:"post",
            url:"/user/login",
            data:Data,
          })
          .then(res=>{
            if(res.data.code==1){
              //将通行证存放到localStorage中
              localStorage.setItem("authentication",res.data.data)
              this.getUserMessage();
              this.$router.push(
                {
                  path:'/index'
                }
                )
            }else{
              this.$message.error(res.data.msg)
            }
          })
          .catch(res=>{
            this.$message.error("出错了"+res)
          })

        }
      },
      //获取用户信息
       getUserMessage(){
        let _this=this;
            this.$axios({
                method:"get",
                url:"/user/getUserMessage"
            })
            .then(res=>{
                this.User=res.data.data;
                // 缓存用户的信息
                localStorage.setItem('user',JSON.stringify(this.User))             
            })
            .catch(res=>{
                console.log("获取用户信息失败"+res)
            })
        },





      //加载cookies
      getCookies(){
        //获取cookies数组
        let arr=document.cookie.split(';');
        for(let i=0;i<arr.length;i++){
          let temArr=arr[i].split('=');//返回key
          if(temArr[0]===" userName"){
            this.userName=this.revertUTF8(temArr[1]);
          }
          if(temArr[0]===" password"){
            this.password=this.revertUTF8(temArr[1]);
          }
        }
      },
      
// UTF8编码转成汉字字符串
revertUTF8(szInput) {
	var x,wch,wch1,wch2,uch="",szRet="";
	for (x=0; x<szInput.length; x++) {
		if (szInput.charAt(x)=="%") {
			wch =parseInt(szInput.charAt(++x) + szInput.charAt(++x),16);
			if (!wch) {break;}
			if (!(wch & 0x80)) {
				wch = wch;
			} else if (!(wch & 0x20)) {
				x++;
				wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x),16);
				wch  = (wch & 0x1F)<< 6;
				wch1 = wch1 & 0x3F;
				wch  = wch + wch1;
			} else {
				x++;
				wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x),16);
				x++;
				wch2 = parseInt(szInput.charAt(++x) + szInput.charAt(++x),16);
				wch  = (wch & 0x0F)<< 12;
				wch1 = (wch1 & 0x3F)<< 6;
				wch2 = (wch2 & 0x3F);
				wch  = wch + wch1 + wch2;
			}
			szRet += String.fromCharCode(wch);
		} else {
			szRet += szInput.charAt(x);
		}
	}
	return(szRet);
},






      
    },
    created(){
      this.getCookies();
    }
}
</script>

<!-- 只在当前页面起作用的样式 -->
<style  scoped>

.loginBox{
        margin-left: 20%;
        margin-top: 100px;
        width: 60%;
        height: 200px;
    }
    .text{
        font-family: "华文楷体";
        font-size: 2em;
        text-align: center;
        margin-bottom: 5%;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .loginContainer{
  border-radius: 15px;
  background-clip: padding-box;

  padding: 10% 10% 2.5% 3.3%;
  background: #d3dce6;
  border: 1px;
  box-shadow: 0 0 25px #d3dce6;
}
.acount{
  margin-left: -10%;
}
.btn{
  margin-left: -100%;
}
.button{
  width: 5%;
}
</style>>
