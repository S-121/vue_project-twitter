import untils from "@/utils/untils"
import router from "@/router"
import {formatDate} from "@/utils/formatDate";
// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true
/*
* **公共过滤器**
*
*
* */

const vFilter ={
    //计算图片完整服务器地址
    getFullUrl: function (url) {
        if(localStorage.getItem('aUrl')) {
            if(untils.isEmpty(url)) {
                return require('@/assets/users/user-d.png')
            }else{
                return localStorage.getItem('aUrl') + url
            }
        }else {
            //重新登录
            router.push('/sign-in').then(r => { console.log('r:' + r) })
        }
    },
    //格式化相对时间显示  参数：秒
    formatRecentTime: function (sTime) {

        let time = sTime

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

        let minute = Math.floor(time / 60);
        minute = minute.toString();

        let second = Math.floor(time);
        second = second.toString();

        if(year>=1){
            return `${year}y`;
        }else if(month>=1&&year<1){
            return `${month}mo`;
        }else if(week>=1&&month<1){
            return `${week}w`;
        }else if(day>=1&&week<1){
            return `${day}d`;
        } else if(hour>=1&&day<1){
            return `${hour}h`;
        }else if(minute>=1&&hour<1){
            return `${minute}m`;
        }else if(second>=1&&minute<1){
            if(second === '1') {
                return `just now`;
            }else{
                return `${second}s`;
            }

        }else{
            return `${hour}:${minute}:${second}`;
        }
    },
    //相对毫秒时间
    msTimeNow: function (msTime) {
        return untils.formatTime(msTime)
    },
    //格式化时间
    formatFromDate: function (time) {
        time = time * 1000
        let date = new Date(time)
        let fDate = formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        moment.locale('en')

        return moment(fDate).format('llll')
    },
    //格式化绝对时间显示
    formatDate: function (time) {
        time = time * 1000
        let date = new Date(time)
        let fDate = formatDate(date, 'yyyy-MM-dd hh:mm:ss')

        moment.locale('zh-cn')
        moment.updateLocale('zh-cn', {
            relativeTime : {
                future: "%s",
                past:   "%s",
                s  : 'just now',
                ss : '%d seconds',
                m:  "1m",
                mm: "%dm",
                h:  "1h",
                hh: "%dh",
                d:  "1d",
                dd: "%dd",
                M:  "1m",
                MM: "%dm",
                y:  "1y",
                yy: "%dy"
            }
        });
        return moment(fDate).startOf('s').fromNow()
    },
}
export default vFilter


