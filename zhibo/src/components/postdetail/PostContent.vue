<template>
    <el-row>
        <el-col :span="16" :offset="4">
            <el-card v-animate-css="'fadeInDownBig'">
                <!-- 头像和标题  最后面有关注按钮 -->
                <el-row type="flex" align="middle">
                    <!-- 鼠标悬浮头像 -->
                    <el-col :span="2">
                        <el-popover placement="bottom-start" width="350" trigger="hover" :open-delay="400">
                            <FloatingDetail :nickname="post.nickname" :avatar="post.avatar" :like="post.like" :postNumber="post.postNumber"></FloatingDetail>
                            <el-avatar slot="reference" :src="post.avatar" :size="40"></el-avatar>
                        </el-popover>
                    </el-col>
                    <el-col :span="10" class="title">
                        <b>{{post.title}}</b>
                    </el-col>
                    <el-col :span="2" :offset="10">
                        <el-button type="primary" plain size="mini" @click="clickFollow">
                            {{followText}}
                        </el-button>
                    </el-col>
                </el-row>
                <!-- 用户名和发表时间 -->
                <el-row>
                    <el-col :span="2" class="left-col">
                        <span class="nickname">{{post.nickname}}</span>
                    </el-col>
                    <el-col :span="5" class="left-col">
                        <span class="time">发表于 {{post.createTime}}</span>
                    </el-col>
                </el-row>
                <!-- 帖子内容 -->
                <el-row>
                    <el-col :span="24" class="content-col">
                        {{post.content}}
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row class="bottom-util">
                    <!-- 帖子分割线下面的“点赞” “收藏” ”分享“ -->
                    <el-col :span="2">
                        <el-button icon="el-icon-thumb" size="mini" round @click="toggleLike">{{likeNum}}</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button v-if="!fav" icon="el-icon-star-off" size="mini" round @click="toggleFav">收藏</el-button>
                        <el-button v-else icon="el-icon-star-on" size="mini" round @click="toggleFav">收藏</el-button>
                    </el-col>
                    <!-- <el-col :span="2">
                        <el-button icon="el-icon-share" size="mini" round>分享</el-button>
                    </el-col> -->
                    <!-- 参与讨论按钮，点击后切换为“取消”和“发送”两个按钮 -->
                    <el-col :span="2" :offset="18" v-if="!input">
                        <el-button type="primary" plain size="mini" @click="showInput" id="reply">
                            参与讨论
                        </el-button>
                    </el-col>
                    <el-col :span="4" :offset="16" v-else>
                        <el-button type="primary" plain size="mini" @click="cancelInput" id="cancel">
                            取消
                        </el-button>
                        <el-button type="primary" plain size="mini" @click="sendReply">
                            发送
                        </el-button>
                    </el-col>
                </el-row>
                <!-- 点击参与讨论之后出现的输入框  v-animate-css="'fadeInLeft'"-->
                <!-- <transition name="sub-comments"> -->
                <el-row v-if="input" class="reply-input">
                    <el-input v-model="replyContent" placeholder="请输入内容"></el-input>
                </el-row>
                <!-- </transition> -->
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import FloatingDetail from '../FloatingDetail.vue';
export default {
    name: "PostContent",
    props: ["post"],
    data() {
        return {
            like: false,
            likeNum: 12,
            fav: false,
            input: false,
            replyContent: "",
            follow: false
        };
    },
    computed: {
        followText() {
            if (this.follow) {
                return "取消关注";
            } else {
                return "关注ta";
            }
        }
    },
    methods: {
        clickFollow() {
            if (this.$store.state.isLogin) {
                this.follow = !this.follow; 
            } else {
                this.$message.warning("请先登录");
            } 
        },
        toggleLike() {
            if (this.$store.state.isLogin) {
                this.like = !this.like;
                if (this.like) {
                    this.likeNum++;
                } else {
                    this.likeNum--;
                }
            } else {
                this.$message.warning("请先登录");
            }
        },
        toggleFav() {
            if (this.$store.state.isLogin) {
                this.fav = !this.fav;
                if (this.fav) {
                    this.$message.success("收藏成功")
                } else {
                    this.$message.success("取消收藏")
                }
            } else {
                this.$message.warning("请先登录");
            }
        },
        showInput() {
            this.input = true;
            document.getElementById("reply").blur(); // 使用dom失去焦点
        },
        cancelInput() {
            this.input = false;
            this.replyContent = "";
            document.getElementById("cancel").blur(); // 使用dom失去焦点
        },
        sendReply() {
            if (this.replyContent.trim() == "") {
                this.$message.warning("回复不能为空");
                return ;
            }
            this.input = false;
            if (this.$store.state.isLogin) {
                this.$emit("addComment", this.replyContent);
                this.replyContent = "";
            } else {
                this.$message.warning("请先登录");
            }
        }
    },
    components: { FloatingDetail }
}
</script>

<style scoped>
.el-card {
    border-radius: 20px;
}
.title {
    text-align: start;
}

.left-col {
    text-align: start;
}

.nickname {
    padding-left: 20px;
    font-size: 10px;
    color: #8a8383;
}
.time {
    font-size: 10px;
    color: #8a8383;
}
.content-col {
    margin-top: 10px;
    padding-left: 20px;
    text-align: start;
    line-height: 25px;
}

.bottom-util {
    font-size: 15px;
    color: #8a8383;
}
.reply-input {
    margin-top: 20px;
}
/* 
.sub-comments-leave-active,.sub-comments-enter-active {
    transition: max-height 0.3s;
}
.sub-comments-enter,.sub-comments-leave-to {
    max-height:0 ;
}
.sub-comments-enter-to,.sub-comments-leave {
    max-height: 4rem ;
} */
</style>