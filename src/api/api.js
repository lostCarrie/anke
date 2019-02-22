import axios from 'axios'
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

export default {
    //此处是接口
    //获取用户数据
    _get() {
        return oGet('http://dddd');
    }
}