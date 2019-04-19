import { LoginByUsername, logout, getUserInfo } from '../../api/login'
import { getToken, setToken, removeToken} from '../../utils/auth'
const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        roles: [],

    },
    mutations: {
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },
    actions: {
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password).then(response => {
                    const data = response.data;
                    commit('SET_TOKEN', data.token);
                    setToken(response.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        Logout({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN','')
                    commit('SET_ROLES','')
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                    if(!response.data) {
                        reject('验证失败，请重新登录！')
                    }
                    const data = response.data;
                    if (data.roles && data.roles.length > 0) {
                        commit('SET_ROLES', data.roles);
                    }else {
                        reject('角色必须是非空数组！')
                    }
                    commit('SET_NAME', data.name);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }

    }
}
export default user