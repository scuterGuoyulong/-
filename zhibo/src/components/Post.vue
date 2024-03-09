<template>
    <div class="post">
        <el-card v-if="post">
            <el-row :gutter="20">
                <el-col :span="2">
                    <!-- 鼠标悬浮的详细信息 -->
                    <el-popover
                        placement="top-start"
                        width="350"
                        trigger="hover"
                        :open-delay="400"
                    >
                        <FloatingDetail
                            :nickname="post.nickname"
                            :avatar="post.avatar"
                            :like="post.like"
                            :postNumber="post.postNumber"
                        />
                        <el-avatar
                            slot="reference"
                            :src="post.avatar"
                            :size="50"
                            @click.native="routeToUserDetail"
                        ></el-avatar>
                        <div slot="reference">{{ post.nickname }}</div>
                    </el-popover>
                </el-col>
                <el-col :span="18">
                    <div class="post-title" @click="routeToPostDetail">
                        {{ post.title }}
                    </div>

                    <div class="post-content">{{ summary }}</div>
                </el-col>
                <el-col :span="4">
                    <div class="post-time">
                        <i class="el-icon-time"> {{ post.createTime }}</i>
                    </div>
                </el-col>
            </el-row>
            <!-- 三张图片 -->
            <!-- <el-row class="img3">
                <el-col :span="4" :offset="2" v-for="(i, idx) in post.img" :key="idx">
                    <img :src="i">
                </el-col>
            </el-row> -->
            <!-- tags -->
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-tag v-for="tag in post.tag" :key="tag" class="tag">{{tag}}</el-tag>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import FloatingDetail from "./FloatingDetail.vue";
import api from "@/api/index"
export default {
    name: "Post",
    components: { FloatingDetail },
    props: {
        post: {
            id: "",
            title: "",
            content: "",
            nickname: "",
            avatar: "",
            like: 0,
            postNumber: 0,
            createTime: "",
            tag: [],
        }
    },
    data() {
        return {
            img: []
        }
    },
    created() {
        this.img = [];
        api.getImg3().then((data) => {
            this.img = data.data.res.img;
        })
        .catch((err) => {
            console.log(err);
        })
    },
    methods: {
        routeToPostDetail() {
            this.$router.push(`/post/${this.post.id}`);
        },
        routeToUserDetail() {
            this.$router.push(`/userdetail/${this.post.userid}`);
        }
    },
    computed: {
        summary() {
            return this.post.content.substr(0, 100) + "......";
        },
    },
};
</script>

<style scoped>
a {
    text-decoration: none;
    color: #262626;
}

.post-title {
    cursor: pointer;
    float: inline-start;
    text-align: left;
    padding: 10px;
    font-size: 20px;
}
.post-content {
    float: inline-start;
    text-align: left;
    padding: 10px;
    padding-left: 50px;
    font-size: 15px;
    color: #8a8a8e;
}

.tag {
    margin-top: 10px;
    margin-left: 10px;
}

.post {
    margin: 20px;
    transition: 0.5s;
}

.post:hover {
    transition: 0.5s;
    transform: scale(1.05);
}

.post-time {
    position: absolute;
    top: 16px;
    font-size: 15px;
    color: #989898;
    letter-spacing: 1px;
    font-family: din, "Hiragino Sans GB", "Microsoft Yahei", Arial, sans-serif;
    display: flex;
    align-items: center;
}

.el-avatar {
    cursor: pointer;
}

.el-card {
    border-radius: 15px;
}

.img3 {
    margin-top: 20px;
}
</style>
