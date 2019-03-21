import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://192.168.199.149:3000'
//axios.defaults.baseURL = 'http://127.0.0.1:5000'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.params = {}

//封装获取数据
export const oGet = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params, { indices: false })
              }
        }).then(res => {
            console.log(params)
            resolve(res.data)
        }, err => {
            reject(err)
        }).catch(err => {
            reject(err)
        })
    })
}
export const oPost = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params)).then(res => {
            resolve(res.data)
        }, err => {
            reject(err)
        }).catch(err => {
            reject(err)
        })
    })
}
export const oUpdate = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, qs.stringify(params)).then(res => {
            resolve(res.data)
        },err => {
            reject(err)
        }).catch(err => {
            reject(err)
        })
    })
}
export const oRemove = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, qs.stringify(params)).then(res => {
            resolve(res.data)
        },err => {
            reject(err)
        }).catch(err => {
            reject(err)
        })
    })
}
export default {
    //此处是接口
    //获取用户数据
    _get(params) {
        return oGet('/users', params);
    },
    //新建用户
    _post(params) {
        return oPost('/users', params)
    },
    //更新用户
    _update (userid, params) {
        return oUpdate('/users/'+userid, params)
    },
    _remove(user){
        var userid = user.user_id;
        return oRemove('/users/'+ userid);
    },
    _removes(users){
        var ids = [];
        users.forEach((user,i) => {
            ids.push(user.user_id);
        });
        ids = ids.join(",")
        console.log(ids)
        return oRemove('/users/'+ids)
    }
}