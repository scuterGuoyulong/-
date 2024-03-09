<template>
  <div>
  <el-row :gutter="20">
    <!-- 头像，时间安排表这一列 -->
    <el-col :span="4">
      <!-- 头像 -->
      <div class="grid-content bg-purple">
        <img class="img" :src="studyRoom.studyRoomImageName"/>
      </div>
      <!-- 时间安排 -->
      <el-card  shadow="hover"  style="width: 100%;">
        <div slot="header" class="clearfix">
          <span>倒计时</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisibleForCountDown = true">添加</el-button>

          <el-dialog
          title="输入标题时间"
          :visible.sync="dialogVisibleForCountDown"
          width="30%">
          <span>标题</span>
          <el-input type="text" v-model="countDown.title"></el-input>
          <span>时间</span>
          <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
          v-model="countDown.deadline"
          type="datetime"
          placeholder="选择日期">
          </el-date-picker>
          </div>
          <el-button @click="dialogVisibleForCountDown = false">取 消</el-button>
          <el-button type="primary" @click="createCountDown">确 定</el-button>
          </el-dialog>
          
          <div v-for="(item,index) in  countDownShow" :key="index" class="text item">
          <el-statistic ref="statistic" format="DD天 HH时 mm分 ss秒" :value="Date.parse(formatDateT(item.deadline)) " :title="item.title" time-indices > </el-statistic>
           <div class="buttonText">
            <el-button  type="text" @click="deleteCountDown(item.targetId)">删除</el-button>
        </div>
      </div>
    </div>

        

      </el-card>
    
    <!-- 时间提醒 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日计划</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="(dialogVisibleForPlan=true)
          ">添加计划</el-button>
        </div>
        <div v-for="(item,index) in  userPlanList" :key="index" class="text item">
           {{(index+1)}}.{{item.planContent }}
           <div class="buttonText">
            <el-button  type="text" @click="deleteStudyRoomPlan(item.userPlanId)">删除</el-button>
        </div>
           
        </div>
      </el-card>
    </el-col>   

    <!-- 自习室名，在线人数，画面，按钮等 -->
    <el-col :span="15" style="height:100%;">
         <!-- banner -->
      <!-- 弹幕列表 -->
        <div >
        <el-row :gutter="20">
          <el-col :span="12" class="grid-content bg-purple">
            <div class="fill">
               <div>自习室名称:{{studyRoom.studyRoomName}}   在线人数：{{onLinePeopleNumber}}</div>
                <div>室长:{{studyRoom.userName}}</div>
            </div>

          </el-col>
          <el-col :span="12" class="grid-content bg-purple">
            <div class="fill">
               <div>
                <el-button @click="joinStudyRoom">加入自习室</el-button>
                <el-button @click="shareStudyRoom">分享</el-button>
                <el-button @click="changeBullet" type="primary">{{buttonText}}</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 创建计划的对话框 -->
      <el-dialog
  title="请输入您的计划"
  :visible.sync="dialogVisibleForPlan"
  width="30%">
  <div>
    <div>计划项：
      <el-input type="textarea" v-model="planContentInputText" placeholder="请输入您的规划"></el-input>
    </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleForPlan = false">取 消</el-button>
    <el-button type="primary" @click="addStudyRoomPlan">确 定</el-button>
  </span>
</el-dialog>




      
      <!-- 视频窗口 -->
             <video controls class="v"
             id="video1"
             src="url1"
             autoplay
             muted
             style="left:17%
				padding-top:10rpx ;padding-bottom: 30rpx;display: flex!important; flex-direction: row; " />
         <video controls class="v"
         id="video2"
             src="url2"
             autoplay
             muted
             style="
             right:21%;
				padding-top:10rpx ;
        padding-bottom: 30rpx;
        display: flex!important; 
        flex-direction: row;
        " 
        />
         <video controls class="v"
         id="video3"
             src="url3"
             autoplay
             muted
             style="
            left:17%;bottom: 0%;
				padding-top:20rpx ;
        padding-bottom: 10rpx;
        display: flex!important; 
        flex-direction: row;
         " />
         <video controls class="v"
         id="video4"
             src="url4"
             autoplay
             muted
             style="
             right:21%;bottom: 0%;
				padding-top:20rpx ;
        padding-bottom: 10rpx;
        display: flex!important; 
        flex-direction: row; 
        " 
        />
         <div style="height:90%;width:62%; position: absolute ;margin:0px auto;">

        <vue-baberrage
            :isShow="isShowBullet"
            :barrageList="bulletList"
            :loop="false">

            </vue-baberrage>
      </div>
      
 
      
    </el-col>
    <!-- 用户列表排行榜，评论，弹幕等 -->
        <el-col :span="5" style="height:100%">
          <!-- 用户列表 -->
          <el-table
            :data="tableData4"
            style="width: 100%"
            max-height="200">
            <el-table-column
              prop="userName"
              label="室友"
              width="100">
            </el-table-column>
            <el-table-column
              prop="lengthOfStudy"
              label="学习时长(/小时)"
              width="125">
            </el-table-column>
            <el-table-column
              prop="memberIdentify"
              label="身份"
              width="120">
            </el-table-column>
            <el-table-column
              prop="isOnline"
              label="状态（1为在线，0为离线）"
              width="120">
            </el-table-column>
          </el-table>
          <!-- 评论区 -->
          <div class="container">
            <my-virtual-scroller :items="list" />
          </div>
          <!-- 弹幕 -->
          <!-- 弹幕输入框 -->
      <div>
        <div class="message-input-wrapper">
          <input
            v-model="messageContent"
            @click="show = true"
            placeholder="说点什么吧" style="background: transparent;"
          />
          <el-button
          type="primary"
            class=""
            @click="websocketsend"
            v-show="show = true"
          >
            发送
          </el-button>
        </div>
      </div>
    </el-col>
  </el-row>

    <!-- 加入自习室，填写密码的对话框 -->
    <el-dialog
  title="请手动复制，分享给你的朋友"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="shareMessage">
    <div>自习室的名称 {{ StudyRoomToShare.studyRoomName}}</div>
    <div>自习室类型：{{ StudyRoomToShare.studyRoomType}}</div>
    <div>简介：{{ StudyRoomToShare.studyRoomIntroduction}}</div>
    <div v-if="StudyRoomToShare.studyRoomPassword!=''">
      密码：{{ StudyRoomToShare.studyRoomPassword}}</div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>






</div>

</template>

<script>
//引入flc
import flv from 'flv.js'
import { MESSAGE_TYPE } from 'vue-baberrage'
import myVirtualScroller from '../../src/components/myVirtualScroller.vue'
import FlipCountdown from 'vue2-flip-countdown'
// 模拟一个长列表
var list = []
export default {
    name:"studyRoom",
    components: {
      myVirtualScroller,
      FlipCountdown,
    },
    mounted () {
    this.getUser()
    this.listMessage()
    },
   data() {
    return {
      dialogVisibleForCountDown:false,//倒计时输入的显示
      // 倒计时
      deadline4: Date.now() + (new Date(2022,11,24).setHours(23,59,59)-Date.now()) ,
      // 弹幕所需的内容
      avatar: '',
      nickname: '',
      show: false,
      messageContent: '',
      barrageList: [],
      diretion:'default',
      list:list,
        tableData4: [],
        count:0,
        studyRoomId:"",//该房间的id
        studyRoom:{},//自习室的信息
        user:{},//用户信息
        dialogVisible:false,//是否显示分享对话框
        StudyRoomToShare:{},//要分享的自习室
        websock:{},//websocket对象
        currentId:0,//弹幕编号
        bulletList:[],//弹幕数组
        onLinePeopleNumber:0,//在线人数
        buttonText:"关闭弹幕",//弹幕按钮的文字提示信息
        isShowBullet:true,//默认开启弹幕
        dialogVisibleForPlan:false,//显示创建计划对话框
        planContentInputText:"",//计划输入框的内容
        userPlanList:[],//用户的计划
        countDown:{deadline:"",title:""},//倒计时所需的时间和标题
        countDownShow:[]//倒计时显示的数组
      }
    },
   methods:{
    //  删除倒计时
    deleteCountDown(targetId){
      this.$axios({
        method:"delete",
        url:"/studyRoom/deleteStudyRoomTarget/"+targetId
      }).then(res=>{
        this.$message.success("删除倒计时成功")
        this.getCountDown()
      }).catch(res=>{
        this.$message.error("删除倒计时失败"+res)
      })
    },
    //  获取倒计时
    getCountDown(){
      this.$axios({
        method:"get",
        url:"/studyRoom/getAllStudyRoomTargetThatCreated?studyRoomId="+this.studyRoomId+"&userId="+this.user.userId
      }).then(res=>{
        this.countDownShow=res.data.data
      })
    },
    //  添加倒计时
    createCountDown(){
      // 封装数据
      var data={
        "studyRoomId":this.studyRoomId,
        "userId":this.user.userId,
        "title":this.countDown.title,
        "deadline":this.timeTrans(this.countDown.deadline,2) 
      }
      // 发送请求
      this.$axios({
        method:"post",
        url:"/studyRoom/createStudyRoomTarget",
        data:data
      }).then(res=>{
       
        this.countDownShow=res.data.data
        this.getCountDown();
        this.countDown.deadline=""
        this.countDown.title=""
        this.dialogVisibleForCountDown=false
      })
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.nickname = JSON.parse(this.user).nickname
        this.avatar = JSON.parse(this.user).avatar
      }
    },
    //  获取用户头像等信息
    getUserMsg(){
     this.user=JSON.parse(localStorage.getItem('user'));
    },
    //获取自习室的信息
    getStudyRoomMessage(){
      this.$axios({
        method:"get",
        url:"/studyRoom/getStudyRoomMessage?studyRoomId="+this.studyRoomId
      })
      .then(res=>{
        this.studyRoom=res.data.data;
        //改造图片地址
        this.studyRoom.studyRoomImageName="/api/storage/image/getImage?imageUrl="
        +this.studyRoom.studyRoomImageName;
        //初始化弹幕
        this.initWebSocket();
        //获取排行榜信息
        this.getRankingList();
      })
    },
    //加入自习室
    joinStudyRoom(){
      //封装数据
      var data={
        "studyRoomId":this.studyRoomId,
        "userId":this.user.userId,
        "userName":this.user.userName
      }
      //发送请求2
      this.$axios({
        method:"post",
        url:"/studyRoom/addStudyRoom",
        data:data
      })
      .then(res=>{
        if(res.data.code===-1){
          this.$message.success(res.data.msg)
        }
        else{
          this.$message.success(res.data.data)
        }

      })

    },
    //分享自习室
    shareStudyRoom(){
      //发送请求
      this.$axios({
        method:"get",
        url:"/studyRoom/shareStudyRoom?studyRoomId="+this.studyRoomId
      })
      .then(res=>{
        this.StudyRoomToShare=res.data.data;
        //打开对话框
        this.dialogVisible=true;
      })
    },
    //获取流
    getFourStreamToPreView(){

      //发送请求
      this.$axios({
        method:"get",
        url:"/studyRoom/getDeskMate?studyRoomId="+this.studyRoomId
        +"&userId="+this.user.userId
      })
      .then(res=>{
        //看是否支持flv
        if(flv.isSupported()){
          //循环
          for(let i=0;i<res.data.data.length;i++){
            var video="video"+(i+1);
            console.log("video为"+video);
            let videoElement=document.getElementById(video);
                //创建一个播放器
                let player=flv.createPlayer({
                    type:'flv',
                    isLive:true,//直播流类型的视频
                    hasAudio:true,//开启声音
                    url:res.data.data[i], //拉流地址
                })
                //将播放器绑定到组件上
                player.attachMediaElement(videoElement);
                //加载视频
                player.load();
                //播放视频
                player.play(); 
          }
        }

      })
      .catch(res=>{
        //重连
        var timeRecord=setTimeout(function(){
          this.getFourStreamToPreView();
        },2000)
      })

    },
    //弹幕功能
    initWebSocket() { // 建立连接
                // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
                // var userId = store.getters.userInfo.id;
                var url ="ws://175.178.85.36:10010/interaction/websocket/"+this.studyRoomId+this.user.userName;
                this.websock = new WebSocket(url);
                this.websock.onmessage = this.websocketonmessage
                this.websock.onopen = this.websocketonopen
                this.websock.onerror = this.websocketonerror
                this.websock.onclose = this.websocketclose
              },
              // 连接成功后调用
              websocketonopen() {
                 // 连接建立之后执行send方法发送数据
                 console.log("websocket连接成功,状态为"+this.websock.readyState)
                },
              // 发生错误时调用
                 websocketonerror() {
                  // 连接建立失败重连
                  this.initWebSocket()
                },
              // 给后端发消息时调用
              websocketsend() {
                var data={
                    "userInformation":this.studyRoomId+this.user.userName,
                    "messageToSend":this.messageContent,
                    "type":"弹幕",
                    "imageUrl":this.user.imageUrl
                };
                if(this.websock.readyState===1&&this.messageContent!=""){
                    this.websock.send(JSON.stringify(data))
                    //情况输入框
                    this.messageContent="";

                }



                // this.getAllBullet();    
              },
				// 接收后端消息
              // vue 客户端根据返回的cmd类型处理不同的业务响应
              websocketonmessage(e) {
                 // 数据接收
                 const redata = JSON.parse(e.data)
                 console.log('接收的数据', redata)
                 //如果是更新在线人数的消息
                 if(redata.length>=6){
                  this.onLinePeopleNumber=redata[redata.length-1]
                 }
                 //填充弹幕
                 this.bulletList.push({
                    id:++this.currentId,
                    avatar:"/api/storage/image/getImage?imageUrl="+redata.imageUrl,
                    msg:redata.message,
                    time:6,
                    type:MESSAGE_TYPE.NORMAL
                 })
                 //更新弹幕显示列表
                //  this.list=this.bulletList;
                // list=this.bulletList;
                var date=this.getDate('y-m-d h:i:s',new Date());
                list.push({
                  id:this.currentId,
                  userName:redata.userName,
                  label:redata.message,
                  userImage:"/api/storage/image/getImage?imageUrl="+redata.imageUrl,
                  time:date
                 })
               },

              // 关闭连接时调用
              websocketclose(e) {
                console.log("connection closed (" + e.code + ")");
              },
              //enter键监听事件
              handleWatchEnter(e){
                //获取按下的键盘的键值
                var key=window.event?e.keyCode:e.which;

                //13代表回车键
                if(key===13){
                  //如果输入内容不为空
                  if(this.messageContent!=""){
                  this.websocketsend();
                  }

                }
                this.websocketsend
              },
               getDate(formatStr, fdate){
	                var fTime, fStr = 'ymdhis';
	                if (!formatStr)
	                	formatStr= "y-m-d h:i:s";
	                if (fdate)
	                	fTime = new Date(fdate);
	                else
	                	fTime = new Date();
                    var formatArr = [
		                fTime.getFullYear().toString(),
		                (fTime.getMonth()+1).toString(),
		                fTime.getDate().toString(),
		                fTime.getHours().toString(),
		                fTime.getMinutes().toString(),
		                fTime.getSeconds().toString() 
	              ];
                  for (var i=0; i<formatArr.length; i++){
	              	formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
	                     }
	                 
	             return formatStr;
            },
            /**
             * 获取排行榜的信息
             */
            getRankingList(){
              this.$axios({
                method:"get",
                url:"/studyRoom/getRankingList?studyRoomId="+this.studyRoomId
              })
              .then(res=>{
                this.tableData4=res.data.data;
              })
            },
            //控制弹幕
            changeBullet(){
              if(this.buttonText=="关闭弹幕"){
                this.buttonText="开启弹幕";
                this.isShowBullet=false;
              }
              else{
                this.buttonText="关闭弹幕"
                this.isShowBullet=true;
              }
            },
            //退出自习室
            exitStudyRoom(e){
                //封装数据
                var data={
                  "studyRoomId":this.studyRoomId,
                  "userId":this.user.userId,
                }
                this.$axios({
                  method:"put",
                  url:"studyRoom/exitStudyRoom",
                  data:data
                })

            },
            //添加规划
            addStudyRoomPlan(){
              if(this.userPlanList.length>=4){
                alert("贪多嚼不烂，一天只能添加4条计划哦~")
              }
              else{

              //封装数据
              var data={
                "userId":this.user.userId,
                "studyRoomId":this.studyRoomId,
                "planContent":this.planContentInputText
              }
              //发送请求
              this.$axios({
                method:"post",
                url:"/studyRoom/createStudyRoomPlan",
                data:data
              })
              .then(res=>{
                //清空输入框
                this.planContentInputText="";
                 this.dialogVisibleForPlan = false;
                this.$message.success("添加个人计划成功")
                //更新计划
                this.getDailyPlan();
              })
              .catch(res=>{
                this.$message.error("添加个人计划失败"+res)
              })
            }
            },
            //获取每日计划
            getDailyPlan(){
              //发送请求
              this.$axios({
                method:"get",
                url:"/studyRoom/getStudyRoomPlan?studyRoomId="+this.studyRoomId
                +"&userId="+this.user.userId
              })
              .then(res=>{
                this.userPlanList=res.data.data;
              })

            },
            //删除自习室计划
            deleteStudyRoomPlan(userPlanId){
              this.$axios({
                method:"delete",
                url:"/studyRoom/deleteStudyRoomPlan/"+userPlanId
              })
              .then(res=>{
                this.$message.success("删除自习室计划成功")
                //重新获取计划
                this.getDailyPlan();
              })
              .catch(res=>{
                this.$message.error("删除自习室计划失败"+res)
              })
            },
            // 申请日期：2022-02-17T16:00:00.000Z转2022-02-18 00:00:00，type===1时，返回2022-02-18
            timeTrans(time, type){
            let date = new Date(new Date(time).getTime() + 8 * 3600 * 1000)
            date = date.toJSON();
            if (type===1){
              date = date.substring(0, 10)
            }
            else {
              date = date.substring(0, 19).replace('T', ' ')
            }
            return date
          },
          // 时间戳转格林威治时间2022-02-17T16:00:00.000Z
          formatDateT(dataTime) {
            var newDate = new Date(dataTime)
            return newDate.toISOString()
          }
              




   },
       // 每当页面创建就会调用
       created() {
        this.getUserMsg();
      },
      mounted(){
        this.studyRoomId=this.$route.query.studyRoomId
        //获取自习室信息
        this.getStudyRoomMessage();
        //获取流
        this.getFourStreamToPreView();
        //获取今日计划
        this.getDailyPlan();
        //添加键盘监听事件
        document.addEventListener('keydown',this.handleWatchEnter)
        //在浏览器关闭之前执行
        window.addEventListener('unload',e=>this.exitStudyRoom(e));
        // 获取倒计时
        this.getCountDown();
      }

 }
</script>

<style scoped>
  .message-input-wrapper {
    display: flex;
    justify-content:left ;
    height: 2.5rem;
    margin-top: 2rem;
  }
  .message-input-wrapper input {
    outline: none;
    width: 60%;
    border-radius: 20px;
    height: 100%;
    padding: 0 1.25rem;
    color: rgb(174, 152, 152);
    border: rgb(156, 122, 122) 1px solid;
  }
  .message-input-wrapper input::-webkit-input-placeholder {
    color: rgba(148, 120, 120, 0.933);
  }
  .message-input-wrapper button {
    outline: none;
    border-radius: 20px;
    height: 100%;
    padding: 0 1.25rem;
    border: rgb(142, 100, 100) 1px solid;
  }
  .barrage-container {

    height: 100%;
    width: 100%;
  }
  .barrage-items {
    background: rgb(0, 0, 0, 0.7);
    border-radius: 100px;
    color: #fff;
    padding: 5px 10px 5px 5px;
    align-items: center;
    display: flex;
  }
.container {
  height: 400px;
  border: 1px solid rgb(255, 254, 254);
}
.fill{
  width: max-content;
  height: 50px;
  background-color: antiquewhite;
}
.img{
  
  max-width: 50px;
  background-color: rgb(230, 169, 169);
}
 .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #86c0c0;
  }
  .bg-purple {
    background: #a8c7ea;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    text-align: left;
  }

  .head-right {
    float: right;
    width: fit-content;
}
.vedio{
    width: 100%;
    height: inherit;
    object-fit: contain;
}
/* 播放按钮 */
video::-webkit-media-controls-play-button {
    display: none;
}
/* 进度条不显示 */
video::-webkit-media-controls-timeline {
    display: none;
}
/* 观看的当前时间 */
video::-webkit-media-controls-current-time-display{
    display: none;           
}
/* 剩余时间 */
video::-webkit-media-controls-time-remaining-display {
    display: none;           
}
/* 所有控件 */
/* video::-webkit-media-controls-enclosure{
    
} */
.v{
  width:31%;height:50%;position: absolute;
}
.shareMessage{
  text-align: left;
}
.buttonText{
  text-align: right;
}
.clock{
  transform: scaleY(0.5);
  float:left;
  background-color: #86c0c0;
}
</style>