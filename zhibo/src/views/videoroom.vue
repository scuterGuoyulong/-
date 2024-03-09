<template>
    <div>
      <flip-countdown  class="clock" deadline="2023-12-25 00:00:00"></flip-countdown>

    </div>
</template>

<script>
  import FlipCountdown from 'vue2-flip-countdown'
export default {
  components: { FlipCountdown },
  mounted () {
    this.getUser()
    this.listMessage()
  },
  data () {
    return {
      avatar: '',
      nickname: '',
      show: false,
      messageContent: '',
      barrageList: [],
      diretion:'default'
    }
  },
  methods: {
    async addToList () {
      if (this.messageContent.trim() === '') {
        this.$message.info('留言不能为空')
        return false
      }
      const userAvatar = this.avatar
        ? this.avatar
        : 'https://gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?d=mp&v=1.4.14'
      const userNickname = this.nickname
        ? this.nickname
        : '游客'
      const message = {
        avatar: userAvatar,
        nickname: userNickname,
        messageContent: this.messageContent,
        time: Math.floor(Math.random() * 10 + 3),
      }
      this.barrageList.push(message)
      this.messageContent = ''
      const { data: res } = await this.$http.post('/extension/message/add', message)
      if (res.flag) {
        // 弹出提示信息
        this.$message.success('新增留言成功')
      } else { // 执行失败
        this.$message.error('留言失败')
      }
    },
    async listMessage () {
      const { data: res } = await this.$http.get('/extension/message/getMessageList')
      if (res.flag) {
        // this.$message.success(res.message)
        this.barrageList = res.data
      } else {
        this.$message.error(res.message)
      }
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.nickname = JSON.parse(this.user).nickname
        this.avatar = JSON.parse(this.user).avatar
      }
    }
  }
}
</script>

<style scoped>
  .message-banner {
    
    position: absolute;
    /*top: -58px;*/
    left: 0;
    right: 0;
    height: 100vh;
    background: url() center center /
    cover no-repeat;
    background-color: #49b1f5;
    animation: header-effect 1s;
  }
  .message-title {
    color: #eee;
    animation: title-scale 1s;
  }
  .message-container {
    
    position: absolute;
    width: 360px;
    top: 35%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 5;
    margin: 0 auto;
    color: #fff;
  }
  .message-input-wrapper {
    display: flex;
    justify-content: center;
    height: 2.5rem;
    margin-top: 2rem;
  }
  .message-input-wrapper input {
    outline: none;
    width: 70%;
    border-radius: 20px;
    height: 100%;
    padding: 0 1.25rem;
    color: #eee;
    border: #fff 1px solid;
  }
  .message-input-wrapper input::-webkit-input-placeholder {
    color: #eeee;
  }
  .message-input-wrapper button {
    outline: none;
    border-radius: 20px;
    height: 100%;
    padding: 0 1.25rem;
    border: #fff 1px solid;
  }
  .barrage-container {
    background-color: rgb(49, 43, 43);
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100% -50px);
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
.clock{
  left: 20%;
  right: 30%;
  background-color: #49b1f5;
  width: 100px;
}
</style>

