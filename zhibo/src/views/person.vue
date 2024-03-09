<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-row :gutter="50">
      <!-- 用户信息 -->
      <el-col :span="7">
        <el-card v-show="tab===1">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <el-row style="text-align: center">
              <el-avatar class="el-dropdown-avatar" :size="100" :src="userImageUrl"></el-avatar>
          </el-row>
          <el-row class="user-info-userName">
            <label>用户名：{{User.userName}}</label>
          </el-row>
          <el-divider/>
          <el-row class="user-info-fullInfo">
            <label>推流地址: {{pushUrl}}</label><br/>
            <label>推流密钥：{{User.streamWord}}</label><br/>
          </el-row>
        </el-card>
        <br/>
        <!-- 直播间信息 -->
        <el-card v-if="createdLive" v-show="tab===2">
          <div slot="header" class="clearfix">
            <span>直播间信息</span>
          </div>
          <el-row style="text-align: center">
            <el-upload action="/api/student/upload/image"  accept=".jpg,.png" :show-file-list="false">
              <el-avatar class="el-dropdown-avatar" :size="100" :src="form.roomImage"></el-avatar>
            </el-upload>
          </el-row>
          <el-row class="user-info-userName">
            <label>房间名称：{{roomsMessage[0].roomName}}</label>
          </el-row>
          <el-divider/>
          <el-row class="user-info-fullInfo">
            <label>简介：{{roomsMessage[0].roomContent}}</label><br/>
            <label>类型：{{roomsMessage[0].roomType}}</label><br/>
            <label>开播时间：{{roomsMessage[0].startTime}}</label><br/>

 
          </el-row>
        </el-card>
        <br/>
        <!-- 自习室信息 -->
        <el-card v-if="createdStudy" v-show="tab===3">
          <div slot="header" class="clearfix">
            <span>自习室信息</span>
          </div>
          <el-row style="text-align: center">
            <el-upload action="/api/student/upload/image"  accept=".jpg,.png" :show-file-list="false">
              <img class="el-dropdown-avatar" :size="100" :src="studyRoomToShow.studyRoomImageName">
            </el-upload>
          </el-row>
          <el-row class="user-info-userName">
            <label>房间名称：{{studyRoomToShow.studyRoomName}}</label>
          </el-row>
          <el-divider/>
          <el-row class="user-info-fullInfo">
            <label>房间id:{{studyRoomToShow.studyRoomId}}</label><br/>
            <label>简介：{{studyRoomToShow.studyRoomIntroduction}}</label><br/>
            <label>类型：{{studyRoomToShow.studyRoomType}}</label><br/>
            
 
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card shadow="hover">
          <el-tabs active-name="event" type="card" @tab-click="handle">
            <el-tab-pane label="用户动态" name="event">
              <div class="block">
                <el-timeline>
                  <el-timeline-item >
                    <el-card>
                     
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
                
              </div>
            </el-tab-pane>
            <el-tab-pane label="我的直播间" name="update">
              <el-form :model="form" ref="form" label-width="100px">
                <el-form-item label="房间名称*" >
                  <el-input v-model="form.roomName" placeholder="请输入房间的名称"></el-input>
                </el-form-item>
                  <el-form-item label="直播类型：">
                  <el-select v-model="form.roomType" placeholder="请选择直播的类型">
                    <el-option label="游戏" value="游戏"></el-option>
                    <el-option label="学习" value="学习"></el-option>
                    <el-option label="健身" value="健身"></el-option>
                    <el-option label="助眠" value="助眠"></el-option>
                    <el-option label="教育" value="教育"></el-option>
                    <el-option label="美妆" value="美妆"></el-option>
                    <el-option label="舞蹈" value="舞蹈"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="直播简介*" >
                <el-input type="textarea" v-model="form.roomContent" placeholder="请输入对该房间的简介，让观众更加了解你的直播间"></el-input>
              </el-form-item>
              <el-form-item label="开播时间*">
                <el-date-picker
                  v-model="form.startTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择开播时间">
                </el-date-picker>
                </el-form-item>
                <el-form-item label="封面图片" >
                  <el-upload
                    class="avatar-uploader"
                    action="http://175.178.85.36:10010/storage/image/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="upDate()">更新</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="我的自习室" name="studyRoomMsg" @select="tab=2">
               <!-- 创建自习室 -->
 <el-button type="primary" @click="listVisible=true">创建自习室</el-button>
              <!-- 我创建的自习室 -->
              <div>
                <div class="title">
                  我创建的自习室
                </div>
                <div class="box">


                <div @click="manageStudyRoom(item.studyRoomId)" class="box2" v-for="(item,index) in studyRoomBeCreated" :key="index">
                  <img class="image" :src="item.studyRoomImageName">
                  <div>
                    <div>自习室名称：{{item.studyRoomName}}</div>
                    <div> 类型：{{item.studyRoomType}}</div>
                    <div> 成员人数：{{item.studyRoomMemberNumber}}</div>
                    <div class="time">创建时间：{{item.createTime}}</div>
                             
                  </div>
                </div>

              </div>
              <br>
              <hr>
              <br>
              </div>
          <!-- 我加入的自习室 -->
              <div>
                <div class="title">
                  我加入的自习室
                </div>
                <div class="box">
                <div  class="box2" v-for="(item,index) in studyRoomBeJoined" :key="index">
                  <img class="image" :src="item.studyRoomImageName">
                  <div>
                    <div >自习室名称：{{item.studyRoomName}}</div>
                    <div> 类型：{{item.studyRoomType}}</div>
                    <div> 成员人数：{{item.studyRoomMemberNumber}}</div>
                    <div class="time">创建时间：{{item.createTime}}</div>
                             
                  </div>
                </div>
              </div>
                
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

<!-- 创建直播间和自习室 -->
        <!-- 创建直播间 -->
        <el-button type="primary" @click="dialogVisible=true">创建直播间</el-button>
        <!-- 创建直播间的对话框 -->
        <el-button type="primary" @click="beginZhibo()">开始直播</el-button>
        <el-dialog
  title="创建直播间"
  :visible.sync="dialogVisible"
  width="30%">
  <!-- 创建直播间的表单 -->
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="房间名称*" >
    <el-input v-model="form.roomName" placeholder="请输入房间的名称"></el-input>
  </el-form-item>
  <el-form-item label="直播类型*">
    <el-select v-model="form.roomType" placeholder="请选择直播的类型">
      <el-option label="游戏" value="游戏"></el-option>
      <el-option label="学习" value="学习"></el-option>
      <el-option label="健身" value="健身"></el-option>
      <el-option label="助眠" value="助眠"></el-option>
      <el-option label="教育" value="教育"></el-option>
      <el-option label="美妆" value="美妆"></el-option>
      <el-option label="舞蹈" value="舞蹈"></el-option>
      <el-option label="其他" value="其他"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="直播简介*" >
    <el-input type="textarea" v-model="form.roomContent" placeholder="请输入对该房间的简介，让观众更加了解你的直播间"></el-input>
  </el-form-item>
  <el-form-item label="开播时间*">
    <el-date-picker
      v-model="form.startTime"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择开播时间">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="封面图片" >
        <el-upload
  class="avatar-uploader"
  action="http://175.178.85.36:10010/storage/image/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  </el-form-item>
</el-form>

</el-dialog>

        <!-- 创建自习室的对话框 -->
        <el-dialog
  title="创建自习室"
  :visible.sync="listVisible"
  width="30%">
  <!-- 创建直播间的表单 -->
  <el-form ref="form" :model="studyRoom" label-width="80px">
  <el-form-item label="名称*" >
    <el-input v-model="studyRoom.studyRoomName" placeholder="请输入自习室的名称"></el-input>
  </el-form-item>
  <el-form-item label="类型*">
    <el-select v-model="studyRoom.studyRoomType" placeholder="请选择的类型">
      <el-option label="公共自习室" value="公共自习室"></el-option>
      <el-option label="团队自习室" value="团队自习室"></el-option>
      <el-option label="情侣自习室" value="情侣自习室"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="简介*" >
    <el-input type="textarea" v-model="studyRoom.studyRoomIntroduction" placeholder="请输入对该自习室的简介，让观众更加了解你的自习室"></el-input>
  </el-form-item>
    <el-form-item label="封面图片" >
      <el-upload
  class="avatar-uploader"
  action="http://175.178.85.36:10010/storage/image/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>


  <el-form-item>
    <el-button type="primary" @click="createStudyRoom">立即创建</el-button>
  </el-form-item>
</el-form>
</el-dialog>


<!-- 自习室信息的对话框 -->
<div>
  <el-dialog
  title="自习室信息"
  :visible.sync="dialogVisible2"
  width="30%">
  <div>
    <img class="image" :src="studyRoomToShow.studyRoomImageName">

    <div>
      <div class="box">
        更新图片:
        <el-upload
  class="avatar-uploader"
  action="http://175.178.85.36:10010/storage/image/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess2"
  :before-upload="beforeAvatarUpload2">
  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
      </div>

      <div class="box">自习室名称：<el-input class="inputBox" v-model="studyRoomToShow.studyRoomName">

      </el-input></div>
     
      <div class="box"> 类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-select v-model="studyRoomToShow.studyRoomType" placeholder="请选择的类型">
      <el-option label="公共自习室" value="公共自习室"></el-option>
      <el-option label="团队自习室" value="团队自习室"></el-option>
      <el-option label="情侣自习室" value="情侣自习室"></el-option>
    </el-select>
    </div>
      
      <div class="time box">简介：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <el-input type="textarea" class="inputBox" v-model="studyRoomToShow.studyRoomIntroduction">
      </el-input></div>
    </div>
  </div>
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="updateStudyRoomMessage">更新自习室信息</el-button>
    <el-button type="danger" @click="deleteStudyRoomCreated">删除自习室</el-button>

</el-dialog>
</div>





</div>


</template>

<script>
export default {
    name:'person',//对外暴露的接口的名字
    data() {
        return {
            User:{},//用户信息
            userImageUrl:"",//请求用户图片信息的url

            //创建直播间的表单信息
            form: {
                roomName: '',
                roomContent:"",
                roomType:"",
                startTime:"",
                roomImage:"",//房间的封面图
                
            },
            imageUrl:"",//直播封面图，页面展示部分
            roomsMessage:{

            },//用户的所有直播间的信息
            masterId:"",
            pushUrl:"",
            streamWord:"",
            pullUrl:"",
            // 创建的自习室的信息
            studyRoom:{
              studyRoomName:"",
              studyRoomIntroduction:"",
              studyRoomType:"",
              studyRoomImageName:"",
              studyRoomPassword:"",
              userId:"",
              userName:"",
            },
            allStudyRoom:{},//获取的所有自习室的信息
            // 一些用来控制显示的变量 
            listVisible:false,//是否显示创建自习室对话框
            dialogVisible: false,//是否显示创建直播间对话框
            private:false,//是否显示输入密码，如果不是选public在显示
            createdLive:false,
            createdStudy:false,
            tab:1,
            studyRoomBeCreated:[],//用户创建的所有自习室
            studyRoomBeJoined:[],//用户加入的所有自习室
            studyRoomToShow:{},//要展示的自习室的信息
            dialogVisible2: false,//是否显示自习室信息弹窗
            imageUrl2: '',//修改自习室信息，上传图片
            imageUrl2ToSend:"",//要发送的自习室图片的名称
            temStudyRoomImageName:"",//自习室原本的图片名称
        }
    },
    methods:{
      //选项卡跳转
      handle(tab,event){
        if(tab.name==='update'){
          this.tab=2
        }else if(tab.name==='event'){
          this.tab=1
        }else{
          this.tab=3
        }
      },
      // 创建自习室
      createStudyRoom(){
        this.studyRoom.userId=this.User.userId
        this.studyRoom.userName=this.User.userName
        this.studyRoom.studyRoomImageName=this.form.roomImage
        this.$axios({
                  method:"post",
                  url:"/studyRoom/createStudyRoom",
                  data:this.studyRoom,
              })
              .then(res=>{
                console.log(res)
                  this.$message({
                      message:"创建自习室成功!",
                      type:"success"
                  })
                  //关闭对话框
                  this.listVisible=false;
                  //清空表单信息
                  this.studyRoom.studyRoomName="";
                  this.studyRoom.studyRoomIntroduction="";
                  this.studyRoom.studyRoomType="";
                  this.studyRoom.studyRoomImageName="";
                  this.studyRoom.studyRoomPassword="";
                  //获取创建的自习室的信息
                  this.getStudyRoomWhichCreatedByUser();

              })
      },
      // 更新直播间信息
      upDate(){
        if(this.form.roomName==""||this.form.roomContent==""||this.form.roomType==""
        ||this.form.startTime==""){
            alert("请填写完整信息再提交")
        }else{
            var time=new Date();
            var time2=new Date(this.form.startTime)
            //如果当前时间大于选择开播时间，提示错误
            if(time>time2){
                alert("开播时间不能小于当前时间")
            }
            //一切安好，发送创建直播间请求
            else{
                this.$axios({
                    method:"put",
                    url:"/liveRoom/updateRoom",
                    data:this.form
                })
                .then(res=>{
                    this.$message({
                        message:"更新直播间成功!",
                        type:"success"
                    })
                    //关闭对话框
                    this.dialogVisible=false;
                    //清空表单信息
                    this.form.roomContent="";
                    this.form.roomName="";
                    this.form.roomType="";
                    this.form.roomImage="";
                    this.form.startTime="";
                    //获取直播间信息
                    this.getUserRoomMessage();
                })
                .catch(res=>{
                    this.$message({
                        message:"创建直播间失败"+res,
                        type:"error"
                    })
                })
            }
        }
      },
      // 获取推流地址
      async getPushUrl(){
        this.$axios({
          method:"GET",
          url:"/user/getKeyAndWord"
        }).then(res=>{
          this.pushUrl=res.data.data.pushUrl
          this.streamWord=res.data.data.key
          // 存储推流地址和串流密码
          localStorage.setItem('push',this.pushUrl)
          localStorage.setItem('streamWord',this.streamWord)
          
        })
      },
      // 获取一堆的用户信息
      async getUserMessage(){
        let _this=this;
            this.$axios({
                method:"get",
                url:"/user/getUserMessage"
            })
            .then(res=>{
                
                this.User=res.data.data;
                this.masterId=this.User.userId
                // 缓存用户的信息
                localStorage.setItem('user',JSON.stringify(this.User))
                this.userImageUrl="/storage/image/getImage?imageUrl="+this.User.imageUrl
                this.masterId=this.User.userId
                //获取用户创建的所有自习室
                this.getStudyRoomWhichCreatedByUser();
                //获取用户加入的所有自习室
                this.getStudyRoomWhichJoinedByUser();
                
                // 获取拉流地址
                _this.$axios({
                  method:"GET",
                  url:"/user/getPullUrl?masterId="+this.User.userId,
                  data:this.masterId=this.User.userId,
                }).then(res=>{
                  
                  this.pullUrl=res.data.data
                  // 缓存拉流地址
                  localStorage.setItem('pullUrl',this.pullUrl)
                })
                // 获取用户自习室的信息
                _this.$axios({
                  method:"get",
                  url:"/studyRoom/getAllStudyRoomByUserId?userId="+this.masterId
                }).then(res=>{
                  this.allStudyRoom=res.data.data
                  // 自习室数据的缓存
                  localStorage.setItem('study',JSON.stringify(this.allStudyRoom))
                })
                
            })
            .catch(res=>{
                console.log("获取用户信息失败"+res)
            })
        },
        // 获取直播间的信息
        async getUserRoomMessage(){
            this.$axios({
                method:"get",
                url:"/liveRoom/getAllLiveroom"
            })
            .then(res=>{
                this.roomsMessage=res.data.data;
                localStorage.setItem('live',JSON.stringify(this.roomsMessage[0]))
                this.form.roomImage="/storage/image/getImage?imageUrl="+this.roomsMessage[0].roomImage
            })
            .catch(res=>{
                this.$message({
                    message:"出错了"+res,
                    type:"error"
                })
            })
        },
        onSubmit() {
        alert('submit!');
      },
      //上传图片
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.roomImage=res.data;
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      //提交创建直播间信息
      onSubmit(){
        if(this.form.roomName==""||this.form.roomContent==""||this.form.roomType==""
        ||this.form.startTime==""){
            alert("请填写完整信息再提交")
        }else{
            var time=new Date();
            var time2=new Date(this.form.startTime)
            //如果当前时间大于选择开播时间，提示错误
            if(time>time2){
                alert("开播时间不能小于当前时间")
            }
            //一切安好，发送创建直播间请求
            else{
                this.$axios({
                    method:"post",
                    url:"/liveRoom/createRoom",
                    data:this.form
                })
                .then(res=>{
                    this.$message({
                        message:"创建直播间成功!",
                        type:"success"
                    })
                    //关闭对话框
                    this.dialogVisible=false;
                    //清空表单信息
                    this.form.roomContent="";
                    this.form.roomName="";
                    this.form.roomType="";
                    this.form.roomImage="";
                    this.form.startTime="";
                    //获取直播间信息
                    this.getUserRoomMessage();
                })
                .catch(res=>{
                    this.$message({
                        message:"创建直播间失败"+res,
                        type:"error"
                    })
                })
            }
        }

      },
      //调转到直播间页面
      enterRoom(pullUrl){
        this.$router.push({
            path:"/myliveroom",
            query: {pullUrl:pullUrl}
        })

      },
      //开始直播
      beginZhibo(){
        alert("页面直播功能尚未开放，请自行使用obs推流")
      },
      //获取该用户创建的所有自习室
      getStudyRoomWhichCreatedByUser(){
        this.$axios({
          method:"get",
          url:"/studyRoom/getAllStudyRoomByUserId?userId="+this.User.userId
        })
        .then(res=>{
          this.studyRoomBeCreated=res.data.data;
          //重新组装自习室图片信息
          for(let i=0;i<this.studyRoomBeCreated.length;i++){
            this.studyRoomBeCreated[i].studyRoomImageName="/api/storage/image/getImage?imageUrl="+
            this.studyRoomBeCreated[i].studyRoomImageName
          }
        })
      },
      //获取用户加入的所有自习室
      getStudyRoomWhichJoinedByUser(){
        this.$axios({
          method:"get",
          url:"/studyRoom/getAllStudyRoomJoinedByUser?userId="+this.User.userId
        })
        .then(res=>{
          this.studyRoomBeJoined=res.data.data;
          //重新组装自习室图片信息
          for(let i=0;i<this.studyRoomBeJoined.length;i++){
            this.temStudyRoomImageName=this.studyRoomBeJoined[i].studyRoomImageName;
            this.studyRoomBeJoined[i].studyRoomImageName="/api/storage/image/getImage?imageUrl="+
            this.studyRoomBeJoined[i].studyRoomImageName
          }
        })
      },
      //管理我创建的自习室
      manageStudyRoom(studyRoomId){
        //根据这个房间号去获取房间信息
        this.$axios({
          method:"get",
          url:"/studyRoom/getStudyRoomMessage?studyRoomId="+studyRoomId
        })
        .then(res=>{
          this.studyRoomToShow=res.data.data;
          //重新拼装图片
          this.studyRoomToShow.studyRoomImageName="/api/storage/image/getImage?imageUrl="
          +this.studyRoomToShow.studyRoomImageName;
          this.dialogVisible2 = true;
          if(res.data.data==null){
            alert("不存在了")
          }
        })
      },
      handleAvatarSuccess2(res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw);
        this.imageUrl2ToSend=res.data;
      },
      beforeAvatarUpload2(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      },
      //更新自习室信息
      updateStudyRoomMessage(){
        var data=this.studyRoomToShow;
        //如果图片信息被更新了
        if(this.imageUrl2ToSend!=""){
          //添加属性
          data.studyRoomImageName=this.imageUrl2ToSend;
        }
        //发送请求，更新自习室信息
        this.$axios({
          method:"put",
          url:"/studyRoom/updateStudyRoomMessage",
          data:data
        })
        .then(res=>{
          this.$message.success("更新自习室信息成功")
          this.dialogVisible2=false;
          //重新获取自习室
          this.getStudyRoomWhichCreatedByUser();
        })
        .catch(res=>{
          this.$message.error("更新自习室信息失败"+res)
        })
      },
      //删除用户创建的自习室
      deleteStudyRoomCreated(){
        //发送请求
        this.$axios({
          method:"delete",
          url:"/studyRoom/deleteStudyRoom/"+this.studyRoomToShow.studyRoomId
        })
        .then(res=>{
          this.$message.success("删除自习室成功");
          this.dialogVisible2=false;
          //重新获取自习室
          this.getStudyRoomWhichCreatedByUser();
        })
        .catch(res=>{
          this.$message.error("删除自习室失败");
        })
      }


    },
   
    // 创建页面的时候会调用的函数
    created(){
        //获取用户信息
        this.getUserMessage();
        this.getUserRoomMessage();
        this.getPushUrl();
        
    },
    // 比created后一步发生
    mounted(){
      let data=JSON.parse(localStorage.getItem('live'))
      let studydata=JSON.parse(localStorage.getItem('study'))
      if(data.isDelete===0){
        this.createdLive=true
      }
      if(studydata[0].isDelete===0){
        this.createdStudy=true
      }
     
    }

}
</script>

<!-- 只在当前页面生效的样式 -->
<style  scoped>
.picture{
    height: 100px;
    width: 100px;
}
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
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
  .liveroom{
    width: 280px;
    height: auto;
    border-radius: 5%;
    border-style: groove;
  }
  .text1{
    font-family: "华文楷体";
    font-size: 0.5em;
  }
  .title{
    text-align: left;
    font-size: 1.2em;
    margin-bottom: 20px;
  }
  .box{
    display: flex;
    flex-wrap: wrap;
  }
  .box2{
    margin-left: 20px;
    border-style: hidden;
    text-align: left;
    margin-bottom: 10px;

  }
  .image{
      cursor: pointer;
      width: 100px;
      height: 100px;
  }
  .time{
    font-size: 0.5em;
  }
.inputBox{
  width: auto;
}
/* 上传图片相关 */
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
</style>>

