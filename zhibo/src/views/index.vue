<template>
    <div>
        
        <!-- 页面自习室布局 -->
        <!-- 最外面的盒子 -->
        <el-row  >
            <el-col :span="10" >
        <div >
            <!-- 轮播图 -->
            <div>
                <div class="showImg">
        <img
        v-for="(item,index) in imgArr"
        :key="index"
        :src="item.url"
        v-show="item.id===currentIndex"

        />

        <div class="box" >
            <div class="banner-circle">
        <ul>
            <li @click="changeImg(item.id)"
                v-for="(item,index) in imgArr"
                :key="index"
                :class="item.id===currentIndex? 'active': '' "
             ></li>
        </ul>
    </div>
    <div  @click="clickIcon('up')" class="leftCaret">
        <i class="el-icon-arrow-left"></i>
    </div>

    <div  @click="clickIcon('down')" class="rightCaret" >
        <i class="el-icon-arrow-right"></i>
    </div>
</div>


    </div>
            </div>
        </div>
    </el-col>

            <!-- 视频列表 -->
            <el-col :span="14">
                <div class="box2">
                    <div class="box3" v-for="(item,index) in imgArr2"
                     :key="index" 
                     @click="enterRoom(item.studyRoomId)">
                        <img
                    :src="item.studyRoomImageName"
                    class="learnRoomImage"
                    >
                    <div class="text1">
                        <div>{{item.studyRoomName}}
                            <nobr class="roomType">{{item.studyRoomType}}</nobr>
                        </div>
                        <div>自习室在线人数：{{item.studyRoomMemberNumber}}</div>
                        <div class="learnRoomHostText">{{item.studyRoomIntroduction}}</div>
                        <div class="learnRoomHostText">{{item.userName}}的自习室  {{item.createTime}}
                            
                        </div>
                    </div>
                    </div>
                    <div @click="changePage" id="changeButton" @mouseover="mouseover" @mouseleave="mouseleave" class="changeButton">换一批</div>


                </div>
            </el-col>



        </el-row>
        <br>
        <div class="title1">所有自习室</div>
        <div class="box4">
            <!-- 展示所有自习室 -->
            <div  v-for="(item,index) in imgArr3"
             :key="index" 
             @click="enterRoom(item.studyRoomId)">
                        <img
                    :src="item.studyRoomImageName"
                    class="learnRoomImage2"
                    >
                    <div class="text2">
                        <div>{{item.studyRoomName}}
                            <nobr class="roomType">{{item.studyRoomType}}</nobr>
                        </div>
                        <div>自习室在线人数：{{item.studyRoomMemberNumber}}</div>
                        <div class="learnRoomHostText">{{item.studyRoomIntroduction}}</div>
                        <div class="learnRoomHostText">{{item.userName}}的自习室  {{item.createTime}}
                            
                        </div>
                    </div>
                    </div>


        </div>
      <!-- 分页器 -->
     <div class="block page">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
  </div>






  <!-- 加入自习室，填写密码的对话框 -->
  <el-dialog
  title="请输入自习室的密码（若是公共自习室，请直接点击确定按钮）"
  :visible.sync="dialogVisible"
  width="30%">
  <el-input type="text" placeholder="请输入自习室的密码" v-model="password"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="enterRoom2()">确 定</el-button>
  </span>
</el-dialog>








    </div>
</template>

<script>    
export default {
    name:'Index',  //暴露给外部的接口名称
    data(){
        return{
            activeIndex: '1',
            pullUrl:"",
            liveRoomList:{//直播间数据
},
            studyRoom:[],//缓存的自习室数据
            //轮播图的图片列表
            imgArr:[
                {
                    id:0,
                    url:"../../static/picture/yue.jpg"
                },
                {
                    id:1,
                    url:"../../static/picture/2.jpeg"
                },
                {
                    id:2,
                    url:"../../static/picture/3.jpg"
                },
            ],
            imgArr2:[],
            //当前展示哪张轮播图
              currentIndex:0,
              //分页
              page:1,//当前页数
              pageSize:6,//页面大小
              maxPageNumber:0,//最大页面数
            //   分页器相关参数
            currentPage2:1,//当前页面
            imgArr3:[],
            totalPage:1,//总页面数
            dialogVisible:false,//是否打开输入密码界面
            password:"",
            currentStudyRoomId:"",//当前点击的自习室的id
        }
    },
    methods:{
        // 获取自己的自习室
        getAllStudyRoom(){
            this.studyRoom=JSON.parse( localStorage.getItem('study'))
        },
        //获取所有直播视频
        getAllLiveRoomToLook(){
            this.$axios({
                method:"get",
                url:"/liveRoom/getAllLiveRoomToLook"
            })
            .then(res=>{
                
                this.liveRoomList=res.data.data
                localStorage.setItem('allLiveRoom',JSON.stringify(this.liveRoomList))
                //拼装图片信息
                for(let i=0;i<this.liveRoomList.length;i++){
                    this.liveRoomList[i].roomImage="/api/storage/image/getImage?imageUrl="+this.liveRoomList[i].roomImage;
                }
            })
            .catch(res=>{
                this.$message.error("出错了"+res)
            })
        },
     //调转到直播间页面
      enterRoom(studyRoomId){
        //发送请求，验证是否能够加入自习室
        var userId=JSON.parse(localStorage.getItem('user')).userId;
        //封装数据
        var data={
            "studyRoomId":studyRoomId,
            "userId":userId,
            "studyRoomPassword":this.password
        }
        //发送请求，验证登录信息
        this.$axios({
            method:"post",
            url:"/studyRoom/enterStudyRoom",
            data:data
        })
        .then(res=>{
            console.log(res)
            if(res.data.code==-1){
                this.dialogVisible = true;
                this.currentStudyRoomId=studyRoomId;
            }
            else{
                this.$message.success("欢迎进入自习室")
                this.$router.push({
                    path:"/studyRoom",
                    query:{studyRoomId:studyRoomId}
                })
            }
        })

      },
      //使用密码进入自习室
      enterRoom2(){
        //发送请求，验证是否能够加入自习室
        var userId=JSON.parse(localStorage.getItem('user')).userId;
        //封装数据
        var data={
            "studyRoomId":this.currentStudyRoomId,
            "userId":userId,
            "studyRoomPassword":this.password
        }
        //发送请求，验证登录信息
        this.$axios({
            method:"post",
            url:"/studyRoom/enterStudyRoom",
            data:data
        })
        .then(res=>{
            if(res.data.code==-1){
                this.$message.error("密码错误，请重新输入")
            }
            else{
                this.$message.success("欢迎进入自习室")
                this.dialogVisible=false;
                this.$router.push({
                    path:"/studyRoom",
                    query:{studyRoomId:this.currentStudyRoomId}
                })
            }
        })
      },
        //检查通行证是否过期
        checkAccess(){
            this.$axios({
            method:"get",
            url:"/user/hello"
        })
        .then(res=>{
            if(res.data.code==401){
                alert("会话已过期，请重新登录")
                this.$router.push({
                
                    path:"/login"
                })
            }
        })
      },
      handleSelect(key) {
            this.activeIndex=key;
            if(this.activeIndex==='1'){
                this.$router.push({
                    path:"/index/liveroom"
                })
            }
            else if (this.activeIndex==='2'){
                this.$router.push({
                    path:"/index/videoroom"
                })
            }
            else if (this.activeIndex==='3'){
                this.$router.push({
                    path:"/index/person"
                })
            }
      },
      //轮播图相关

      //开启定时器
			startInterval(){
				// 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
				clearInterval(this.timer);
				this.timer = setInterval(()=>{
					this.currentIndex++;
					if(this.currentIndex > this.imgArr.length-1){
						this.currentIndex = 0
					}
				},3000)
			},
			// 点击左右箭头
			clickIcon(val){
				if(val==='down'){
					this.currentIndex++;
					if(this.currentIndex===this.imgArr.length){
						this.currentIndex = 0;
					}
				}else{
					if(this.currentIndex === 0){
						this.currentIndex = this.imgArr.length;
					}
					this.currentIndex--;
				}
			},
			// 点击控制圆点
			changeImg(index){
				this.currentIndex = index
			},
			//鼠标移入移出控制
			changeInterval(val){
				if(val){
					clearInterval(this.timer)
				}else{
					this.startInterval()
				}
			},
            //获取推荐加入的自习室
            getGoodStudyRoom(){
                this.$axios({
                    url:"/studyRoom/getPopularStudyRoom?pageNumber="+this.page+"&pageSize="
                    +this.pageSize,
                    method:"get"
                })
                .then(res=>{
                    this.imgArr2=res.data.data.records;
                    //遍历之，重新设置图片格式
                    for(let i=0;i<this.imgArr2.length;i++){
                        this.imgArr2[i].studyRoomImageName="/api/storage/image/getImage?imageUrl="
                        +this.imgArr2[i].studyRoomImageName;
                    }
                    //获取最大页面数
                    this.maxPageNumber=res.data.data.pages;
                    //循环
                    if(this.page>=this.maxPageNumber-1){
                        this.page=0;
                    }
                })
                .catch(res=>[
                    console.log("获取推荐的自习室出错了"+res)
                ])
            },
            //鼠标移入移出换一批按钮
            mouseover(){
                document.getElementById("changeButton").style.backgroundColor="#AAFFEE"
            },
            mouseleave(){
                document.getElementById("changeButton").style.backgroundColor=""
            },
            //换一批推荐的自习室
            changePage(){
                this.page=this.page+1;
                this.getGoodStudyRoom();
            },
            //分页器页数改变
            handleCurrentChange(val) {
                this.currentPage2=val;
                //获取所有自习室
                this.getStudyRoomOrderByCreatedTime();
            },
            //根据创建时间获取全部自习室,分页操作
            getStudyRoomOrderByCreatedTime(){
                this.$axios({
                    url:"/studyRoom/getAllStudyRoomCreated?pageNumber="+this.currentPage2+"&pageSize="
                    +10
                })
                .then(res=>{
                    this.imgArr3=res.data.data.records;
                    this.totalPage=res.data.data.total;
                    //遍历之，重新设置图片格式
                    for(let i=0;i<this.imgArr3.length;i++){
                        this.imgArr3[i].studyRoomImageName="/api/storage/image/getImage?imageUrl="
                        +this.imgArr3[i].studyRoomImageName;
                    }

                })
                .catch(res=>{
                    this.$message.error("获取所有自习室失败了"+res);
                })
            }
            







        },

    created(){
        this.checkAccess();
        this.getAllStudyRoom();
    },
    mounted(){
        //获取所有直播视频流
        this.getAllLiveRoomToLook();
        //开启定时器
        this.startInterval();
        //获取推荐的自习室
        this.getGoodStudyRoom();
        //获取所有自习室
        this.getStudyRoomOrderByCreatedTime();
    }
}
</script>

<!-- 该样式只在该页面生效 -->
<style scoped>
.box{
    display: flex;
}
.box2{
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;

}
.box3{
    border-style: hidden;
    margin-left: 20px;

}
.box4{
    display: flex;
    flex-wrap: wrap;
}
/* 轮播图相关的样式 */
.showImg img{
	width: 100%;
	height: 100%;
    cursor: pointer;
}
/* 箭头图标 */
.leftCaret{
    color: white;
    border-style: groove;
    width: 5%;
    height: 2.5%;
    margin-top: -40px;
    margin-left: 80%;
    cursor: pointer;

}
.rightCaret{
    color: white;
    border-style: groove;
    width: 5%;
    height: 2.5%;
    margin-top: -40px;
    margin-left: 10px;
    cursor: pointer;
}

/* 控制圆点 */
.banner-circle{
	position: absolute;
	bottom: 0;
    margin-bottom: 10px;
    margin-left: -50px;
    cursor: pointer;

}
.banner-circle ul{
	margin: 0 50px;
	height: 100%;

}
.banner-circle ul li{
	display: inline-block;
	width: 8px;
	height: 8px;
	margin: 0 5px;
	border-radius: 7px;
	background-color: rgba(125,125,125,.8);

}
.active{
	background-color: white !important;
    width: 10px;
	height: 10px;
}
.learnRoomImage{
    width: 240px;
    height: 155px;

}
.learnRoomImage2{
    margin-left: 40px;
    margin-top: 20px;
    width: 240px;
    height: 155px;
    cursor: pointer;
}
.learnRoomHostText{
    font-size: 0.5em;

}
.text1{
    text-align: left;
}
.text2{
    margin-left: 40px;
    margin-top: 20px;
    text-align: left;
}
.roomType{
    color: 	#00FFFF;
    border-style: groove;
    border-radius: 10px;
}
.changeButton{
    width: 25px;
        border: 1px solid 	#00FFFF;
        height: 60px;
        margin-top: -220px;
        line-height: 20px;
        word-wrap: break-word;/*英文的时候需要加上这句，自动换行*/ 
        text-align: center;
        /* 鼠标移入，有手势图标 */
        cursor: pointer;
        text-align: start;
}
.changeButton2{
    width: 25px;
        border: 1px solid 	#00FFFF;
        height: 60px;
        margin-top: -220px;
        background-color: #00FFFF;
        line-height: 20px;
        word-wrap: break-word;/*英文的时候需要加上这句，自动换行*/ 
        text-align: center;
        /* 鼠标移入，有手势图标 */
        cursor: pointer;
        text-align: start;
}
.title1{
    text-align: left;
    font-size: 1.5em;
}
/* 分页器 */
.page{
    text-align: right;
}
.relative{
    margin-left: 80%;
}
</style>