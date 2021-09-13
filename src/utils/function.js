/*
工具类，包含常用工具
 */
let $global = {
    storagePrefix :'ql'
}
/**
 * 判断是否为空
 * @param str
 * @returns {boolean}
 */
export function isBlank(str) {
    if (null == str) {
        return true;
    }
    return '' === ('' + str).replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 判断不是手机号
 * @param phone
 * @returns {boolean}
 */
export function notPhone(phone) {
    return !(/^1([3456789])\d{9}$/.test(phone));
}

/**
 * 不是车牌号码
 * @param carNumber
 * @returns {boolean}
 */
export function notCarNumber(carNumber) {
    return !(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/.test(carNumber));
}

/**
 * 生成uuid
 * @returns {string}
 */
export function createUUID() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    // bits 12-15 of the time_hi_and_version field to 0010
    s[14] = "4";
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "";
    return s.join("").toUpperCase();
}

/**
 * 字符串反转
 * @param value
 */
export function reverse(value) {
    return value.split('').reverse().join('');
}

/**
 * 格式化时间戳
 * @param timestamp
 * @param format
 * @returns {string}
 */
export function timestampFormat(timestamp, format = 'yyyy-MM-dd') {
    if (null == timestamp || 0 > timestamp) {
        return '';
    }
    let date= new Date(timestamp);
    let o= {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + ""));
    }
    for (let k in o) {
        if (o.hasOwnProperty(k)) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return format;
}

/**
 * 获取今天日期
 * @returns {string}
 */
export function getNowDate() {
    let date= new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month > 9 ? month : '0' + month;
    let day = date.getDate();
    day = day > 9 ? day : '0' + day;
    return `${year}-${month}-${day}`;
}

/**
 * 获取session存储的数据
 * @param key
 * @returns {*}
 */
export function getSessionStorage(key) {
    if (null == key) {
        return null;
    }
    key = `${$global.storagePrefix}-${key}`;
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem(key));
}

/**
 * 将数据保存到session中
 * @param key
 * @param value
 */
export function setSessionStorage(key, value) {
    if (null == key) {
        return;
    }
    key = `${$global.storagePrefix}-${key}`;
    sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * 将数据从session中删除
 * @param key
 */
export function removeSessionStorage(key) {
    if (null == key) {
        return;
    }
    key = `${$global.storagePrefix}-${key}`;
    sessionStorage.removeItem(key);
}

/**
 * 获取location存储的数据
 * @param key
 * @returns {*}
 */
export function getLocationStorage(key) {
    if (null == key) {
        return null;
    }
    key = `${$global.storagePrefix}-${key}`;
    // @ts-ignore
    return JSON.parse(localStorage.getItem(key));
}

/**
 * 将数据保存到location中
 * @param key
 * @param value
 */
export function setLocationStorage(key, value) {
    if (null == key) {
        return;
    }
    key = `${$global.storagePrefix}-${key}`;
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 删除location存储的数据
 * @param key
 * @returns {*}
 */
export function removeLocationStorage(key) {
    if (null == key) {
        return;
    }
    key = `${$global.storagePrefix}-${key}`;
    localStorage.removeItem(key);
}
