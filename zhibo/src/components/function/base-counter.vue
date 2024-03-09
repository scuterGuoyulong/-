<template>
   <div class="_base-count-down">
    还剩{{day}}天{{hours}}:{{mins}}:{{seconds}}
  </div>
</template>

<script>
export default {
    data:()=>({
        days:'0',
        hours:'00',
        mins:'00',
        seconds:'00',
        timer:null,
        curTime:0,
    }),
    props:{
        time:{
            type:[Number,String],
            default:0
        },
        refreshCounter: {
            type: [Number, String],
            default: 0
        },
        end: {
            type: [Number, String],
            default: 0
        },
        isMilliSecond:{
            type:Boolean,
            default:false
        },
    },
    computed:{
            duration(){
                if(this.end){
                    let end=String(this.end).length>=13?+this.end:+this.end*1000;
                    end-=Date.now();
                    return end
                }
                const time=this.isMilliSecond?Math.round(+this.time/1000):Math.round(+this.time);
                return time;
            }
    },
    mounted(){
        this.countDown();
    },
    watch:{
        duration(){
            this.countDown();
        },
    refreshCounter() {
      this.countDown();
    }
    },
    methods:{
        durationFormatter(time) {
        if (!time) return { ss: 0 };
        let t = time;
        const ss = t % 60;
        t = (t - ss) / 60;
        if (t < 1) return { ss };
        const mm = t % 60;
        t = (t - mm) / 60;
        if (t < 1) return { mm, ss };
        const hh = t % 24;
        t = (t - hh) / 24;
        if (t < 1) return { hh, mm, ss };
        const dd = t;
        return { dd, hh, mm, ss };
        },
        countDown(){
            this.curTime=Date.now();
            this.getTime(this.duration);
        },
        getTime(duration){
            this.timer&&clearTimeout(this.timer);
            if(duration<0){
                return;
            }
            const {dd,hh,mm,ss}=this.durationFormatter(time);
            this.days=dd||0;
            this.hours=hh||0;
            this.mins=mm||0;
            this.seconds=ss||0;
            this.timer=setTimeout(()=>{
                const now=Date.now();
                const diffTime=Math.floor((now-this.curTime)/1000);
                const step = diffTime > 1 ? diffTime : 1; // 页面退到后台的时候不会计时，对比时间差，大于1s的重置倒计时
                this.curTime=now;
                this.getTime(duration-diffTime);
            },1000)
        }
    }
}
</script>

<style lang='scss' scoped>
._base-count-down {
  color: #fff;
  text-align: left;
  position: relative;
  .content {
    width: auto;
    display: flex;
    align-items: center;
  }
  span {
    display: inline-block;
  }
  .section {
    position: relative;
  }
}
</style>