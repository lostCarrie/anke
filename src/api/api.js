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
    //获取数据接口
    _get(params) {
        return oGet('/users', params);
    },
    _getR(params) {
        return oGet('/', params);
    },
    _getB(params) {
        return oGet('/', params);
    },
    _getS(params) {
        return oGet('/', params);
    },
    _getT(params) {
        return oGet('/', params);
    },
    _getP(params) {
        return oGet('/', params);
    },
    //新建数据接口
    _post(params) {
        return oPost('/users', params)
    },
    _postB(params) {
        return oPost('/users', params)
    },
    _postR(params) {
        return oPost('/users', params)
    },
    _postS(params) {
        return oPost('/users', params)
    },
    //更新数据接口
    _update(id, params) {
        return oUpdate('/users/'+id, params)
    },
    _updateB(id, params) {
        return oUpdate('/users/'+id, params)
    },
    _updateR(id, params) {
        return oUpdate('/users/'+id, params)
    },
    _updateS(id, params) {
        return oUpdate('/users/'+id, params)
    },
    //删除数据接口
    _remove(params){
        return oRemove('/users/'+ params.user_id);
    },
    _removes(users){
        var ids = [];
        users.forEach((user,i) => {
            ids.push(user.user_id);
        });
        ids = ids.join(",")
        return oRemove('/users/'+ids)
    },
    _removeB(params){
        return oRemove('/'+ params.id);
    },
    _removeR(params){
        return oRemove('/'+ params.id);
    },
    _removeS(params){
        return oRemove('/'+ params.id);
    },
}