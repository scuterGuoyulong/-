<template>
    <div>
        <br/>
        <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">
                直播
            </div>
        </el-col>
        </el-row>
        <br/>
    <div class="flex flexwrap">
        <div v-for="(item,index) in liveRoomList" :key="index" class="liveroom">

<div class="text1"  @click="enterRoom(item.pullUrl)">
    <img class="picture" :src="item.roomImage" />
<div>房间名称：{{item.roomName}}</div>
<div>类型：{{item.roomType}}</div>
</div>
</div>
    </div>

    </div>
   
</template>

<script>
import HeaderAvatar from '../components/layout/HeaderAvatar.vue'
export default {
  components: { HeaderAvatar },
    name:'liveroom',//对外暴露的接口的名字
    data() {
        return {
            liveRoomList:[],//直播间数据
        }
    },
    methods:{
        //获取所有直播视频
        getAllLiveRoomToLook(){
            this.$axios({
                method:"get",
                url:"/liveRoom/getAllLiveRoomToLook"
            })
            .then(res=>{
                console.log(res.data)
                this.liveRoomList=res.data.data
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
      enterRoom(pullUrl){
        this.$router.push({
            path:"/myliveroom",
            query: {pullUrl:pullUrl}
        })

      }
    },
    mounted(){
        //获取所有直播视频流
        this.getAllLiveRoomToLook();
    }
}
</script>

<!-- 只在当前页面生效的样式 -->
<style  scoped>
  .liveroom{
    width: 200px;
    height: auto;
    border-radius: 5%;
    border-style: groove;
  }
  .text1{
    font-family: "华文楷体";
    font-size: 0.5em;
  }
  .picture{
    height: 100px;
    width: 100px;
}
.flex{
	display: flex!important; flex-direction: row;
}
.flex-wrap{
		flex-wrap: wrap;
}
.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>>

