import axios from "axios";
import qs from "qs";

const user = {
    login(form) {
        return axios.post("user/login", qs.stringify(form));
    },
    register(form) {
        return axios.post("user/register", qs.stringify(form));
    },
    // 点击别人头像时，跳转到别人的详细页，用这个接口获取他的详细信息
    getUserDetail(userid) {
        return axios.get(`user/detail/${userid}`)
    },
    getChatUsers() {
        return axios.get('user/chatusers')
    }
};

export default user;
