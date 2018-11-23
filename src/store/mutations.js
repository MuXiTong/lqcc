
import {
	USER_SIGNIN,
    USER_SIGNOUT,
	USER_REGISTER,
} from './mutation-types.js'


export default {

	[USER_SIGNIN](state, user) {
        sessionStorage.setItem('user', JSON.stringify(user))
        // state.username=user.username
        // state.userpass=user.pword
        state.userInfo=user.userInfo
    },
    [USER_SIGNOUT](state) {
        sessionStorage.removeItem('user')
        // state.username=null
        // state.userpass=null
        state.userInfo=""
    },
    [USER_REGISTER](state,registerInfo) {

        state.userInfo.push(registerInfo)
        sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        console.log(state)
    }

}
