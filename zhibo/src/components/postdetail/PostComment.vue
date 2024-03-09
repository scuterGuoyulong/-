<template>
    <el-row class="comment-row">
        <el-col :span="16" :offset="4">
            <el-card v-animate-css="'fadeInUpBig'">
                <!-- 头像 名字 发布时间 -->
                <el-row type="flex" align="middle">
                    <el-col :span="2">
                        <el-popover placement="bottom-start" width="350" trigger="hover" :open-delay="400">
                            <FloatingDetail :nickname="comment.nickname" :avatar="comment.avatar" :like="comment.like" :postNumber="comment.postNumber"></FloatingDetail>
                            <el-avatar slot="reference" :src="comment.avatar" :size="40"></el-avatar>
                        </el-popover>
                    </el-col>
                    <el-col :span="2" class="left-col">
                        <span class="nickname">{{comment.nickname}}</span>
                    </el-col>
                    <el-col :span="5" :offset="15" class="right-col">
                        <span class="time">发表于 {{comment.createTime}}</span>
                    </el-col>
                </el-row>
                <!-- 回复内容 -->
                <el-row>
                    <el-col class="commennt-col">
                        {{comment.content}}
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row class="bottom-util">
                    <!-- 下面的“点赞” -->
                    <el-col :span="2">
                        <el-button icon="el-icon-thumb" size="mini" round @click="toggleLike">{{likeNum}}</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button v-if="!showSubComment" icon="el-icon-chat-round" size="mini" round @click="toggleShowSubComment">回复 {{subComments.length}}</el-button>
                        <el-button v-else icon="el-icon-caret-top" size="mini" round @click="toggleShowSubComment">收起 {{subComments.length}}</el-button>
                    </el-col>
                </el-row>
                <!-- 子评论相关 -->
                <el-row v-if="showSubComment" class="reply-input">
                    <!-- 子评论输入框 -->
                    <el-row class="sub-comment-input">
                        <el-input v-model="commentContent" placeholder="请输入内容" >
                            <el-button slot="append" icon="el-icon-position" @click="sendSubComment"></el-button>
                        </el-input>
                    </el-row>
                    <!-- 子评论 -->
                    <div v-for="(sc, idx) in subComments" :key="idx" class="sub-comment">
                        <!-- 子评论头像 名字 时间 -->
                        <el-row type="flex" align="middle">
                            <el-col :span="1">
                                <el-avatar :src="sc.avatar" size="small"></el-avatar>
                            </el-col>
                            <el-col :span="2" class="sub-comment-name">{{sc.nickname}}</el-col>
                            <el-col :span="3" class="time">发表于 {{sc.time}}</el-col>
                        </el-row>
                        <!-- 子评论内容 -->
                        <el-row>
                            <el-col class="sub-comment-content">
                                {{sc.content}}
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import FloatingDetail from "@/components/FloatingDetail.vue"
import api from "@/api/index";
export default {
    name: "PostComment",
    components: { FloatingDetail },
    props: ["comment"],
    data() {
        return {
            likeNum: 0,
            commentContent: "",
            showSubComment: false,
            subComments: []
        }
    },
    created() {
        this.likeNum = Math.ceil(Math.random()*10);
        api.getSubComment().then(data => {
            this.subComments = data.data.res;
            if (this.comment.nickname == this.$store.state.user.nickname) {
                this.likeNum = 0;
                this.subComments = [];
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
    methods: {
        toggleLike() {
            if (this.$store.state.isLogin) {
                // 点赞和取消点赞
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
        sendSubComment() {
            if (!this.$store.state.isLogin) {
                this.$message.warning("请先登录");
                return ;
            }
            if (this.commentContent.trim() == "") {
                this.$message.warning("回复不能为空");
                return ;
            }
            if (this.$store.state.isLogin) {
                const user = this.$store.state.user;
                this.subComments.push({
                    nickname: user.nickname,
                    avatar: user.avatar,
                    content: this.commentContent,
                    time: "2022-05-29"
                })
                this.commentContent = "";
            } else {
                this.$message.warning("请先登录");
            }
        },
        toggleShowSubComment() {
            this.showSubComment = !this.showSubComment;
        }
    }
}
</script>

<style scoped>
.el-card {
    border-radius: 20px;
}

.comment-row {
    margin-top: 20px;
}

.left-col {
    text-align: start;
}

.right-col {
    text-align: end;
    padding-right: 20px;
}

.nickname {
    font-size: 15px;
    color: #8a8383;
}
.time {
    font-size: 10px;
    color: #8a8383;
}

.commennt-col {
    margin-top: 10px;
    padding-left: 20px;
    text-align: start;
    line-height: 25px;
    padding-right: 15px;
}

.bottom-util {
    font-size: 15px;
    color: #8a8383;
}

.reply-input {
    margin-top: 20px;
}
.sub-comment-input {
    margin: 0px 20px 10px 20px;
}
.sub-comment {
    background-color: #f7f7f7;
    margin: 10px 20px 10px 20px;
    padding: 10px 0px 10px 20px;
    border-radius: 10px;
}
.sub-comment-name {
    padding-left: 10px;
    text-align: left;
    font-size: 13px;
    color:#8a8383;
}
.sub-comment-content {
    text-align: start;
    margin-top: 5px;
    padding-right: 10px;
}

</style>