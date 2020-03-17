import Vue from 'vue';
import App from './App';
import VueCookies from 'vue-cookies'
import BaiduMap from 'vue-baidu-map'
Vue.use(VueCookies)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '1zLEOK6KTgudgCZcbabqxdsjCk2Pt4sV'
})
import axios from './config/axios-init.js'
// import request from './config/index'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios
// import axios from 'axios';
// import VueResource from 'vue-resource'
// import depot from './config/index.js'
import common from './config/common.js'
Vue.prototype.common = common

import './config/remConfig.js'
import '../static/css/reset.css'
import {
  router
} from './router';

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


new Vue({
  router,
  el: '#app',
  render: h => h(App)
});