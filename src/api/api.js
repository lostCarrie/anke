import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.params = {}

//封装获取数据
export const oGet = (url, params) => {
    return new Promise((resolve, reject) => {
        axio.get(url, params).then(res => {
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
        axios.post(url, params).then(res => {
            resolve(res.data)
        }, err => {
            reject(err)
        }).catch(err => {
            reject(err)
        })
    })
}
export const oUpdate = (url, param, params) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, param, params).then(res => {
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
        axios.delete(url, params).then(res => {
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
    _get() {
        return oGet('http://dddd');
    },
    //新建用户
    _post(params) {
        return oPost('http://192....', params)
    },
    //更新用户
    _update (param, params) {
        return ontimeupdate('http://192....'+'?ids='+param,params)
    },
    _remove(user){
        var userid = user.id;
        return onpointermove('http://....'+ userid);
    },
    _removes(){
        var ids = [];
        $.each(this.selected, (i,user) => {
            ids.push(user.id);
        });
        ids = ids.join(",");
        return oRemove('http://...'+ids);
    }
}