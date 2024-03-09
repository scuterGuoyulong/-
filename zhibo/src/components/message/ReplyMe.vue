<template>
    <div>
        <el-card>回复我的</el-card>
        <el-card v-if="messages.length === 0">并没有消息</el-card>
        <el-card v-else>
            <div class="message" v-for="(m, idx) in messages" :key="idx">
                <el-row :gutter="20" type="flex" justify="start">
                    <el-col :span="4" style="text-align: start">
                        <i class="el-icon-user"></i>
                        {{ m.username }}
                    </el-col>
                    <el-col :span="14" style="text-align: start">
                        <i class="el-icon-bell"></i>
                        {{ m.content }}
                    </el-col>
                    <el-col :span="6">
                        <i class="el-icon-time"></i>
                        {{ m.time }}
                    </el-col>
                </el-row>
                <el-divider v-if="m != messages[messages.length - 1]"></el-divider>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "ReplyMe",
    props: ["messages"]
};
</script>

<style scoped>
.el-card {
    border-radius: 15px;
    margin: 15px;
}
.message {
    margin-bottom: 20px;
}
</style>
