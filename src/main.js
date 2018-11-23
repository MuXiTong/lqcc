
import Vue from 'vue'
import router from '@/router'

import store from '@/store/'

// 按需引入mint-ui
import MintUI from '@/mintui/'

//完整引入mint-ui,但体积过大
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

// 引入图标控件
import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon); 

import '@/css/common.css'

import axios from 'axios'
// 开发环境
// axios.defaults.baseURL = 'http://101.200.223.57:5151/Comm/CommonData_Phone';
// axios.defaults.baseURL = '/wl';
// 正式环境
axios.defaults.baseURL = '/Comm/CommonData';

axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    let parms = data.parms ? JSON.parse(data.parms) : [];
    let userInfo = JSON.parse(sessionStorage.getItem('user'));
    // 不是登录接口的时候添加默认参数
    if(data.procedure != "Q1"){      
        parms.push({
            ParaName:"loginid",
            ParaValue:userInfo.userInfo.USERID
        },{
            ParaName:"loginname",
            ParaValue:userInfo.userInfo.USER_NAME
        })
        data.parms = JSON.stringify(parms);        
    }
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    // console.log(ret)
    return ret
}];
Vue.prototype.$http = axios

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts 

import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.config.productionTip = false



router.beforeEach(({meta, path}, from, next) => {
    
    let { auth = true } = meta
    let isLogin = Boolean(store.state.userInfo)
    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})

new Vue({
    router,
    store,
}).$mount('#app')