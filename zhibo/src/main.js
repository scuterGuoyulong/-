// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入axios
import axios from 'axios'
//引入elementUI
import ElementUI from 'element-ui'
//引入elementUI的样式
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/font/font.css";
import { vueBaberrage } from 'vue-baberrage'
import VueParticles from 'vue-particles'
Vue.use(vueBaberrage)
//使用粒子特效
Vue.use(VueParticles)

//在原型上绑定axios
Vue.prototype.$axios=axios;
//设置统一请求路径前缀api
axios.defaults.baseURL='/api'
//定义拦截器，添加统一请求头
axios.interceptors.request.use(config=>{
  config.headers.authentication=window.localStorage.getItem("authentication")
  return config;
})

Vue.config.productionTip = false

//使用elemetnUI
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
