import axios from 'axios'
import qs from 'qs'
import user from './user'
import post from './post'
// axios配置
axios.defaults.baseURL = "http://localhost:8080/api";

export default {
    user,
    post,
    // 主页的轮播图
    getCarousels: () => {
        return axios.get(
            "post/carousels"
        )
    },
    // 获取图片
    getImage: (url) => {
        return axios.get(
            `file/image/${url}`
        )
    },
    upload: () => {
        // mock 图片
        return axios.post("file/image")
    },
    getImg3() {
        return axios.get("image")
    },
    getReply() {
        return axios.get("reply")
    },
    getSubComment() {
        return axios.get("subcomment")
    }
}