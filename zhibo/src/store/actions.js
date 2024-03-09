const actions = {
    login(state, nickname, password) {
        api.userLogin(nickname, password).then(({user}) => {
          state.isLogin = true;
          state.user = user;
        })
    }
}

export default actions;