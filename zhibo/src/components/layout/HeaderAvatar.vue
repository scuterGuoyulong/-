<template>
    <div>
        <el-popover placement="bottom" trigger="hover">
            <div>
                <el-link :underline="false" @click="routeToMy">我的</el-link>
            </div>
            <div>
                <el-link :underline="false" @click="routeToMessage">消息</el-link>
            </div>
            <div>
                <el-link :underline="false" @click="logout">退出登录</el-link>
            </div>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: "HeaderAvatar",
    methods: {
        routeToMy() {
            this.$router.push("/my")
        },
        routeToMessage() {
            this.$router.push("/message")
        },
        logout() {
            this.$store.commit("logout")
            this.$router.push("/home")
        }
    }
};
</script>

<style scoped></style>
