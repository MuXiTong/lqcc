import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

// let user = JSON.parse(sessionStorage.getItem('user')) || {}

let userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || null

const state = {
    // username:user.username,
    // userpass:user.userpass,
    userInfo:userInfo
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    state,
    mutations,
    actions,
    getters,
})