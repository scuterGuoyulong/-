<template>
  <el-row v-if="item.from.userId == my.userId" type="flex" justify="end">
    <el-card class="msg-my" shadow="hover">
      <span>{{item.content}}</span>
    </el-card>
    <el-col :span="2">
      <el-avatar :src="item.from.avatar"></el-avatar>
      <div class="nickname">{{item.from.nickname}}</div>
    </el-col>
  </el-row>
  <el-row v-else type="flex" justify="start">
    <el-col :span="2">
      <el-avatar :src="item.from.avatar"></el-avatar>
      <div class="nickname">{{item.from.nickname}}</div>
    </el-col>
    <el-card class="msg" shadow="hover">
      <span>{{item.content}}</span>
    </el-card>
  </el-row>
</template>

<script>
export default {
  name: "ChatItem",
  props: ["item"],
  data() {
    return {
      my: {}
    }
  },
  created() {
    this.my = this.$store.state.user;
  }
}
</script>

<style scoped>
.el-row {
  margin-top: 10px;
}
.el-card {
  border-radius: 10px;
}
.msg-my {
  margin-right: 10px;
  text-align: start;
}

.msg {
  margin-left: 10px;
  text-align: start;
}
.nickname {
  font-size: 10px;
  color: #8a8383;
}
</style>