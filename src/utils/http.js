/****   http.js   ****/
// 导入封装好的axios实例
import request from './request'

const http ={
  /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param auth
   */
  get(url,params,auth){
    // console.log('get:' + url)
    const config = {
      method: 'get',
      url:url,
    }
    if(auth) {
      config.headers = {'Authorization':auth}
    }
    if(params) config.params = params
    return request(config)
  },
  post(url,params,auth){
    // alert(url)
    const config = {
      method: 'post',
      url:url
    }
    if(auth) {
      config.headers = {'Authorization':auth}
    }
    if(params) config.data = params
    return request(config)
  },
  put(url,params){
    const config = {
      method: 'put',
      url:url
    }
    if(params) config.params = params
    return request(config)
  },
  delete(url,params){
    const config = {
      method: 'delete',
      url:url
    }
    if(params) config.params = params
    return request(config)
  }
}
//导出
export default http
