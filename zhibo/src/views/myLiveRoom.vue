<template>
    <div>
    <div class="">
        <video autoplay controls muted ref="video1"></video>
    </div>
    </div>
</template>

<script>
//引入flc
import flv from 'flv.js'
export default {
    name:'myLiveRoom',//对外暴露的接口的名字
    data() {
        return {
            pullUrl:"",//拉流地址
        }
    },
    methods:{
        playVedio(){
            //如果支持flv
            if(flv.isSupported()){
                //获取播放组件
                let videoElement=this.$refs.video1
                console.log(this.$refs.video1)
                //创建一个播放器
                let player=flv.createPlayer({
                    type:'flv',
                    isLive:true,//直播流类型的视频
                    hasAudio:true,//开启声音
                    url:this.pullUrl, //拉流地址
                })
                //将播放器绑定到组件上
                player.attachMediaElement(videoElement);
                //加载视频
                player.load();
                //播放视频
                player.play();
            }
            else{
                this.$message.error("不支持flv格式的视频")
            }
        }


    },



    mounted(){
        this.pullUrl=this.$route.query.pullUrl
        //加载视频
        this.playVedio();
    }
}
</script>

<!-- 只在当前页面生效的样式 -->
<style  scoped>
.vedio{
    height: 100%;
    white-space: inherit;
}
</style>

