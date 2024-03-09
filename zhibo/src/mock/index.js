const Mock = require('mockjs')
import user from './user'
import post from "./post"
import carousels from "./carousels"
import file from "./file"
import reply from "./reply"

Mock.setup({
    timeout: '300-600'
})
var baseURL = "http://localhost:8080/api/"
Mock.mock(baseURL + 'user/login', 'post', user.login)
Mock.mock(baseURL + 'post/posts/10', 'get', post.getPost)
Mock.mock(baseURL + 'post/carousels', 'get', carousels.getCarousels)
Mock.mock(baseURL + 'post/1', 'get', post.postDetail)
Mock.mock(baseURL + 'post/create', 'post', post.createPost)
Mock.mock(baseURL + 'post/myposts', 'get', post.getMyPosts)
Mock.mock(RegExp(baseURL + 'post/detail/' + ".*"), 'get', post.getPostDetailByPostId)
Mock.mock(baseURL + 'file/image', 'post', file.upload)
Mock.mock(baseURL + 'image', 'get', file.getImg)
Mock.mock(baseURL + 'reply', 'get', reply.getReply)
Mock.mock(baseURL + 'user/chatusers', 'get', user.getChatUsers)
Mock.mock(baseURL + 'subcomment', 'get', post.getSubComment)