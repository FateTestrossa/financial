import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import moment from 'moment'//导入文件
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');//需要汉化
Vue.use(ElementUI);
Vue.config.productionTip = false

//axios请求设置
Vue.prototype.$instance = axios.create({
  baseURL: "http://localhost:3000/api/financial",
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: false,//定义为跨域是否为指定的某个网站
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
