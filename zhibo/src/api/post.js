import axios from "axios";
import qs from "qs";

const post = {
    createPost(form) {
        return axios.post("post/create", qs.stringify(form));
    },
    getPostDetailByPostId(id) {
        return axios.get(`post/detail/${id}`)
    },
    // 主页的post
    getPosts() {
        return axios.get("post/posts/10")
    },
    getMyPosts() {
        return axios.get("post/myposts")
    }
};

export default post;
