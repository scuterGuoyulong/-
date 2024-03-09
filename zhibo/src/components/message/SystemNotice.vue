<template>
    <div>
        <el-card>回复我的</el-card>
        <el-card v-if="notices.length === 0">并没有消息</el-card>
        <el-card v-else>
            <div class="message" v-for="(n, idx) in notices" :key="idx">
                <el-row :gutter="20" type="flex" justify="start">
                    <el-col :span="18" style="text-align: start">
                        <i class="el-icon-bell"></i>
                        {{ n.content }}
                    </el-col>
                    <el-col :span="6">
                        <i class="el-icon-time"></i>
                        {{ n.time }}
                    </el-col>
                </el-row>
                <el-divider v-if="n != notices[notices.length - 1]"></el-divider>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "SystemNotice",
    props: ["notices"]
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
