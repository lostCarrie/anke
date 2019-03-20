
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        //Tue Mar 19 2019 11:32:22 GMT+0800 (中国标准时间),为object
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        //result为{y}，key为y
        //value表示对应的具体时间，如2019
        let value = formatObj[key]
        //规定星期只显示大写数字
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
        //不为空字段，并且具体时间为一位数字的前面加0
        if (result.length > 0 && value < 10) {
        value = '0' + value
        }
        return value || 0
    })
    return time_str
}