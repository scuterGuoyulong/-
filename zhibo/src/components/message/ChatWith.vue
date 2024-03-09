<template>
    <div>
        <!-- 聊天信息 -->
        <div id="scroll">
            <el-scrollbar class="chatroom">
                <el-container>
                    <el-main ref="chat">
                        <div v-for="(m, idx) in messages" :key="idx">
                            <ChatItem :item="m"></ChatItem>
                        </div>
                        <div ref="bottomAnchor" style="opacity: 0.0;">bottom</div>
                    </el-main>
                </el-container>
            </el-scrollbar>
        </div>
        <!-- 发送信息 -->
        <el-row class="input-row">
            <el-col :span="20">
                <el-input resize="none" type="textarea" :rows="3" maxlength="100" show-word-limit v-model="input" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" icon="el-icon-chat-square" @click="add">
                    发送
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import api from "@/api/index";
import ChatItem from "@/components/message/ChatItem.vue";
export default {
    name: "ChatWith",
    components: {
        ChatItem
    },
    props: ["chatUser"],
    created() {
        this.user = this.$store.state.user;
        api.getReply().then((data) => {
            this.messages = data.data.res;
            this.$nextTick(() => {
                this.$refs.bottomAnchor.scrollIntoView(); 
            })
        })
        .catch((err) => {
            console.log(err);
            this.$refs.bottomAnchor.scrollIntoView(); 
        })
    },
    data() {
        return {
            user: {
                nickname: "",
                userId: "",
                avatar: ""
            },
            input: "",
            messages: []
        };
    },
    methods: {
        add() {
            this.messages.push({
                from: this.user,
                to: {

                },
                content: this.input
            });
            this.input = "";
            this.$nextTick(() => {
                this.$refs.bottomAnchor.scrollIntoView();
            })
        }
    }
};
</script>

<style scoped>
.chatroom {
    width: 100%;
    height: 55vh;
}
.input {
    width: 100%;
    height: 100px;
}
.el-button {
    margin-left: 10px;
}

.input-row {
    margin-top: 20px;
}
</style>
