import crypto from "crypto";

/****   untils.js   ****/

export default {

    encodePW: function (username , pw) {
        // 密码 + 用户名
        let newPW = pw + '@*`&(+0!' + username

        console.log(`newPW:${ newPW }`)

        //encode password
        let md5 = crypto.createHash("sha256")

        md5.update(newPW)

        let result1 = md5.digest('hex')

        let md5_2 = crypto.createHash("sha256")

        md5_2.update(result1)

        return md5_2.digest('hex')
    },

    isEmpty(val){
    // null or undefined
    if (val === null) return true;

    if (typeof val === 'boolean') return false;

    if (val === 'undefined' || val === undefined) return true;

    if (typeof val === 'number') return !val;

    if (val instanceof Error) return val.message === '';

    switch (Object.prototype.toString.call(val)) {
        // String or Array
        case '[object String]':
        case '[object Array]':
            return !val.length;

        // Map or Set or File
        case '[object File]':
        case '[object Map]':
        case '[object Set]': {
            return !val.size;
        }
        // Plain Object
        case '[object Object]': {
            return !Object.keys(val).length;
        }
    }
    return false;
    },

    formatTime(msTime) {

    let time = msTime / 1000

    let year = Math.floor(time / 60 / 60 / 24 / 365);
    year = year.toString();

    let month = Math.floor(time / 60 / 60 / 24 / 30);
    month = month.toString();

    let week = Math.floor(time / 60 / 60 / 24 / 7);
    week = week.toString();

    let day = Math.floor(time / 60 / 60 / 24);
    day = day.toString();

    let hour = Math.floor(time / 60 / 60) ;
    hour = hour.toString();

    let minute = Math.floor(time / 60) % 60;
    minute = minute.toString();

    let second = Math.floor(time) % 60;
    second = second.toString();

    if(year>=1){
        return `${year}年前`;
    }else if(month>=1&&year<1){
        return `${month}月前`;
    }else if(week>=1&&month<1){
        return `${week}周前`;
    }else if(day>=1&&week<1){
        return `${day}天前`;
    } else if(hour>=1&&day<1){
        return `${hour}小时前`;
    }else if(hour<1&&minute<60){
        return `${minute}分钟前`;
    }else if(hour<1&&minute<1){
        return `${second}秒前`;
    }else{
        return `${hour}:${minute}:${second}`;
    }
}
}
