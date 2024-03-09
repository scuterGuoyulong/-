<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-avatar :src="avatar" :size="100" @click.native="routeToUserDetail"></el-avatar>
            </el-col>
            <el-col :span="16">
                <el-descriptions :title="nickname" :column="1" size="mini">
                    <el-descriptions-item label="被点赞">{{like}}</el-descriptions-item>
                    <el-descriptions-item label="发帖数">{{postNumber}}</el-descriptions-item>
                </el-descriptions>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "FloatingDetail",
    props: ['nickname', 'avatar', 'like', 'postNumber'],
    methods: {
        routeToUserDetail() {
            console.log("route to user detail");
            this.$router.push('user')
        }
    }
}
</script>

<style scoped>
.floating-name {
    font-size: 24sp;
    background-color: aqua;
}

.el-avatar {
    cursor: pointer;
}
</style>