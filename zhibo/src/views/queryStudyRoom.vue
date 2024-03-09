<template>
    <div class="bigBox">
        <div>
            <div>查询到的自习室为</div>
            <div>
                <div class="box4">
            <!-- 展示所有自习室 -->
            <div  v-for="(item,index) in studyRoomList"
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
            </div>
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
    data(){
        return{
            inputText:"",//要搜索的自习室的信息
            studyRoomList:[],//自习室列表
            dialogVisible:false,//是否打开输入密码界面
            password:"",//输入的密码
        }
    },
    methods:{
        //查询自习室
        queryStudyRoom(){
            this.$axios({
                url:"/search/queryStudyRoomToElasticSearch?keyword="+this.inputText,
                method:"get"
            })
            .then((res) => {
                this.studyRoomList=res.data.data;
                //重新封装图片
                for(let i=0;i<this.studyRoomList.length;i++){
                    this.studyRoomList[i].studyRoomImageName="/api/storage/image/getImage?imageUrl="
                    +this.studyRoomList[i].studyRoomImageName
                }
                
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
      }




    },
    mounted(){
        //获取参数
        this.inputText=this.$route.query.inputText
        //查询
        this.queryStudyRoom();
    }
}
</script>
<style scoped>
.bigBox{
    text-align: left;
}
.box4{
    display: flex;
    flex-wrap: wrap;
}
.learnRoomHostText{
    font-size: 0.5em;

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
.learnRoomImage2{
    margin-left: 40px;
    margin-top: 20px;
    width: 240px;
    height: 155px;
    cursor: pointer;
}
</style>