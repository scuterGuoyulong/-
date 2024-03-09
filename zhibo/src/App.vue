<template>
    <div id="app" class="app">
        <el-container >
            <el-header>
                <LayoutHeader></LayoutHeader>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import LayoutHeader from "./components/layout/LayoutHeader.vue";
import LayoutBody from "./components/layout/LayoutBody.vue";
import LayoutFooter from "./components/layout/LayoutFooter.vue";


// 引入登录页面
export default {
  name: 'App',
  components: {
        LayoutHeader,
        LayoutBody,
        LayoutFooter,
    },
  created(){
    //调转到首页
    this.$router.push({
      path:'/index'
    })
  }
}
</script>

<style>

body{
  font-family: "difer";
}

.app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.el-container {
    height: 100%;
    width: 100%;
}
.el-header {
    background-color: #FFFFFF;
    text-align: start;
}

.el-main {
    background-color: #f7f8fa;
    color: #333;
    text-align: center;
    height: 100%;
}

.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-select-dropdown .el-scrollbar {
  padding-bottom: 17px;
}

</style>

