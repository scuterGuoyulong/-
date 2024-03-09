const getters = {
    loading(state) {
        return state.loading
    },
    isLogin(state) {
        return state.isLogin;
    },
    getUser(state) {
        return state.user;
    }
}

export default getters;