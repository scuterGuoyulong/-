const state = {
    loading: false,
    isLogin: false, //是否登录，用来判断右上角显示登陆注册 / 头像
    // 当前登录的用户
    user: {
        userId: 1,
        nickname: "",
        avatar: "",
        gender: 0, // 0 女  1 男
    },
    // 注册的用户
    registerUser: {
        nickname: "",
        password: "",
        gender: "",
    },
};

export default state;
