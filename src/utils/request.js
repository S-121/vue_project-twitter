/****   request.js   ****/
// 导入axios
import axios from 'axios-https-proxy-fix'
import * as tunnel from 'tunnel';
import router from "@/router";

/*// 代理设置
const agent = tunnel.httpsOverHttp({
  proxy: {
    host: '127.0.0.1',
    port: 7890,
  }
});*/


const service = axios.create({
  // 公共接口
  baseURL: '',
  timeout: 300 * 1000,
  /*httpsAgent: agent,
  proxy: false,*/
})
service.interceptors.request.use(config => {
  config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换 qs.stringify
  // config.headers = {
  //   'Content-Type':'application/json', //配置请求头
  //   'Access-Control-Allow-Origin':"*"
  // }
  // alert('data'+config.data)
  config.headers['Content-Type'] = 'application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'

  // if(token){
  //   config.params = {'token':token} //如果要求携带在参数中
  //   config.headers.token= token; //如果要求携带在请求头中
  // }
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        // alert('未授权，请重新登录')
        //跳转到登录页
        router.push('/sign-in').then(r => console.log(r))
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '404请求错误,未找到该资源'
        //window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      console.log('服务器响应超时，请刷新当前页')
    }
    error.message('连接服务器失败')
  }

  console.log(error.message)
  return Promise.resolve(error.response)
})
export default service
