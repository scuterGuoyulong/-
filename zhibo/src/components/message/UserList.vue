<template>
    <el-scrollbar class="chatroom">
        <el-container>
            <el-main>
                <el-menu default-active="1">
                    <el-menu-item v-for="(user, idx) in users" :key="idx" @click.native="chatWith" class="item">
                        <el-avatar :src="user.avatar"></el-avatar>
                        <span slot="title">{{user.nickname}}</span>
                    </el-menu-item>
                </el-menu>
            </el-main>
        </el-container>
    </el-scrollbar>
</template>

<script>
export default {
    name: "UserList",
    props: ["users"],
    methods: {
        chatWith(idx) {
            this.$emit("chatWith", idx);
        }
    }
}
</script>

<style scoped>
.chatroom {
    width: 100%;
    height: 75vh;
}
.card {
    border-radius: 15px;
}

.el-menu-item {
    text-align: start;
}

.el-avatar {
    margin-right: 20px;
}
</style>