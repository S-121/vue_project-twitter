// noinspection SpellCheckingInspection,DuplicatedCode

import http from '../utils/http'
import VueCookies from 'vue-cookies'
import store from '@/store'
import router from "@/router";
import untils from "@/utils/untils";
/**
 *  @parms Server 请求地址
 *
 */

let uServer = "https://uploadtest.vog.media/uapi"

let staticServer = "vapi"

export default{

  /*
  *
  系统数据相关API
  */

  //获取服务器地址
  getStaticServer() {
    return staticServer
  },
  //计算服务器路径
  getServerUrl() {
    //获取HomeDomain
    let homeDomain

    if(!localStorage.getItem('helloData')) {

      return '/' + staticServer

    }else{

      if(JSON.parse(localStorage.getItem('helloData')).Domain) {
        homeDomain = JSON.parse(localStorage.getItem('helloData')).Domain
      }else{
        homeDomain = staticServer
      }

    }
    console.log('getServerUrl: ' + homeDomain)
    return '/' + homeDomain
  },
  //计算Group服务器路径
  getGroupServerUrl() {
    //获取HomeDomain
    let homeDomain

    if(!localStorage.getItem('helloData')) {
      this.getHelloData()

      return '/' + staticServer

    }else{

      if(JSON.parse(localStorage.getItem('helloData')).Domain) {
        homeDomain = JSON.parse(localStorage.getItem('helloData')).Domain
      }else{
        homeDomain = staticServer
      }

    }

    console.log('getServerUrl: ' + homeDomain)

    //如果数据为空，则使用内置服务器进行连接


    return '/' + homeDomain
  },

  //获取用户授权Token
  getAuthToken:function() {


    console.log('getAuthToken:' + untils.isEmpty(localStorage.getItem('userToken')))

    //如果没有授权信息，跳转到登录
    if(untils.isEmpty(localStorage.getItem('userToken'))) {

      router.push('/sign-in')

      return null

    }else{
      return localStorage.getItem('userToken')
    }

  },

  //获取用户指纹数据
  getFingerCookie() {
    console.log('API---getFingerCookie')
    return VueCookies.get('user_code')
  },
  //获取游客Token
  postGuestRegAPI(params) {
    console.log('API---postGuestRegAPI')
    return http.post(this.getServerUrl() + `/vgr1/guestreg`,params)
  },
  //登出
  postLogoutAPI() {
    return http.post(this.getServerUrl() +  `/vgr1/logout`,null, this.getAuthToken())
  },
  //重置密码
  postResetPwAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/resetpw`, params)
  },

  //获取可用域名
  getHelloAPI(token) {
    return http.get(this.getServerUrl() +  `/vgr1/hello?token=`+token,null)
  },
  //测试服务器
  getServerHealthAPI() {
    return http.get(this.getServerUrl() +  `/vgr1/hello`,null)
  },
  //获取当前活跃群组与人
  getGroupActiveUserAPI(uid) {
    return http.get(this.getServerUrl() +  `/vgr1/groupactiveuser?uid=`+uid,null, this.getAuthToken())
  },
  //获取当前关注的群组用户
  getFollowToAPI(uid) {
    return http.get(this.getServerUrl() +  `/vgr1/followto?uid=${uid}&addme=1&start=1&count=20`,null, this.getAuthToken())
  },
  //获取meta
  getMetaDataAPI(url) {
    return http.get(this.getServerUrl() +  `/vgr1/scrapy?url=${url}`,null, this.getAuthToken())
  },
  //获取通知列表
  getLogAPI() {
    return http.get(this.getServerUrl() +  `/vgr1/ulog?start=1&count=20`,null, this.getAuthToken())
  },
  //获取通知统计数字
  getUnReadLogAPI() {
    return http.get(this.getServerUrl() +  `/vgr1/unreadulog`,null, this.getAuthToken())
  },
  getAccountInfoAPI() {
    return http.get(this.getServerUrl() +  '/vgr1/userinfo', null, this.getAuthToken())
  },
  // 更改用户名
  changeUserNameAPI(name) {
    let payload = {
      Username: name
    }
    return http.post(this.getServerUrl() +  '/vgr1/changeusername', payload, this.getAuthToken())
  },
  // 更改用户名
  changeDisplayNameAPI(name) {
    let payload = {
      Displayname: name
    }
    return http.post(this.getServerUrl() +  '/vgr1/changedisplayname', payload, this.getAuthToken())
  },
  // 更改简介
  changeDescriptionAPI(description) {
    const payload = {
      Description: description
    }
    return http.post(this.getServerUrl() +  '/vgr1/changedescription', payload, this.getAuthToken())
  },
  get_token() {
    return http.post(this.getServerUrl() +  '/vgr1/requestupload?conf=avt', null, this.getAuthToken())
  },
  // 更改banner
  changeBannerPicAPI(banner) {
    const payload = {
      Banner: banner
    }
    return http.post(this.getServerUrl() +  '/vgr1/changebanner', payload, this.getAuthToken())
  },
  // 更改头像
  changeAvatarPicAPI(payload) {
    return http.post(this.getServerUrl() +  '/vgr1/changeavatar', payload, this.getAuthToken())
  },
  changeEmailAPI(email, encryptedPassword) {
    const payload = {
      Email: email,
      Pw: encryptedPassword,
    }
    return http.post(this.getServerUrl() +  '/vgr1/changemail', payload, this.getAuthToken())
  },
  changePassword(params) {
    return http.post(this.getServerUrl() +  '/vgr1/changepw', params, this.getAuthToken())
  },
  suspendAccount() {
    return http.post(this.getServerUrl() +  '/vgr1/suspend', null, this.getAuthToken())
  },
  logout() {
    return http.post(this.getServerUrl() +  '/vgr1/logout', null, this.getAuthToken())
  },
  getReportList(params) {
    return http.get(`${this.getServerUrl()}/vgr1/getreport?uid=${params.uid}&start=${params.start}&count=${params.count}`, null, this.getAuthToken())
  },
  changeToGroup() {
    return http.post(`${this.getServerUrl()}/vgr1/changetogroup`, null, this.getAuthToken())
  },
  changeToUser() {
    return http.post(`${this.getServerUrl()}/vgr1/changetouser`, null, this.getAuthToken())
  },
  setGroup(post, follow) {
    const payload = {
      groupltw: post,
      grouplfol: follow
    }

    return http.post(`${this.getServerUrl()}/vgr1/setgroup`, payload, this.getAuthToken())
  },

  searchFollow(str) {
    return http.get(`${this.getServerUrl()}/vgr1/searchfollow?s=${encodeURIComponent(str)}&count=5`, null, this.getAuthToken())
  },

  /*
  用户API
*/
  //获取用户信息,用户置顶贴
  getSearchUserAPI(key) {

    return http.get(this.getServerUrl() +  `/vgr1/searchuser?s=${key}&start=1&count=10`,null, this.getAuthToken())
  },

  //获取用户信息,用户置顶贴
  getCoinAPI(key) {

    return http.get(`https://api.coingecko.com/api/v3/coins/list`,null,null)
  },

  //获取用户信息 自定义域名路径
  getTweetUserAPI(uri,uid) {

    let url = null
    if(uid) {
      url = `${uri}/vgr1/tweetuser?uid=${uid}`
    }else{
      url = `${uri}/vgr1/tweetuser`
    }

    return http.get( url,null,this.getAuthToken())
  },
  //获取用户信息,用户置顶贴
  getUserInfoAPI() {
    console.log('API---getUserInfoAPI')
    return http.get(this.getServerUrl() +  `/vgr1/tweetuser`,null,this.getAuthToken())
  },
  //查询当前用户信息
  getCurrentUserInfoAPI(uid) {
    console.log('API---getCurrentUserInfoAPI')
    return http.get(this.getServerUrl() +  `/vgr1/tweetuser?uid=${uid}`,null, this.getAuthToken())
  },
  //查询当前用户信息
  getCurrentUserInfoByNameAPI(name) {
    return http.get(this.getServerUrl() +  `/vgr1/tweetuser?user=${name}`,null, this.getAuthToken())
  },
  //更改用户信息
  postChanUserInfoAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/changeuserinfo`,params, this.getAuthToken())
  },
  //添加关注
  postAddFoAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/addfollow`,params, this.getAuthToken())
  },
  //移除关注
  postRemFoAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/remfollow`,params, this.getAuthToken())
  },
  //拉黑
  postBlkUAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/addblock`,params, this.getAuthToken())
  },
  //取消拉黑
  postDisBlkUAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/remblock`,params, this.getAuthToken())
  },
  //关注哪些用户
  getFoToAPI(uid) {
    return http.get(this.getServerUrl() +  `/vgr1/followto?uid=${ uid }`,null, this.getAuthToken())
  },
  //被哪些用户关注
  getFoByAPI(uid) {
    return http.get(this.getServerUrl() +  `/vgr1/followby?uid=${ uid }`,null, this.getAuthToken())
  },
  //拉黑用户列表
  getBlockUserAPI(uid) {
    return http.get(this.getServerUrl() +  `/vgr1/blocklist?uid=${ uid }`,null, this.getAuthToken())
  },
  //用户推荐列表
  getRecoUAPI() {
    return http.get(this.getServerUrl() +  `/vgr1/reco`,null, this.getAuthToken())
  },
  //变更为group
  postChangeToGroupAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/changetogroup`,params, this.getAuthToken())
  },
  //变更为user
  postChangeToUserAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/changetouser`,params, this.getAuthToken())
  },
  //更新密码
  postChangePwAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/changepw`,params, this.getAuthToken())
  },
  //上传头像
  postUserAvatarAPI(params) {
    return http.post(this.getServerUrl() +  `/vgr1/avatar`,params, this.getAuthToken())
  },

  /*
    推文相关API
  */



  // 切换group的SSE消息  需指定当前域名地址
  postStreamGroupAPI(uri,params){
    return http.post(uri +  `/vgr1/streamgroup`,params, this.getAuthToken())
  },
  // 切换group的timeline
  getUserTwByIdAPI(uid){
    return http.get(this.getServerUrl() +  `/vgr1/usertw?uid=${uid}`, null, this.getAuthToken())
  },
  // 切换group的timeline
  getGroupTwByNameAPI(uname){
    return http.get(this.getServerUrl() +  `/vgr1/grouptw?user=${uname}`, null, this.getAuthToken())
  },
  // 获取user贴文
  getUserTwByNameAPI(uname, timeto){

    if(timeto){
      return http.get(this.getServerUrl() +  `/vgr1/usertw?user=${uname}&count=20&timeto=` + timeto,null, this.getAuthToken())
    }

    return http.get(this.getServerUrl() +  `/vgr1/usertw?user=${uname}&count=20`, null, this.getAuthToken())
  },
  // 获取群主所发的Post
  getGroupOwnerTwByNameAPI(uname){
    return http.get(this.getServerUrl() +  `/vgr1/usertw?user=${uname}&isgroup=0&count=10`, null, this.getAuthToken())
  },
  getTimeLineAPI(timeline){

    if(timeline){
      return http.get(this.getServerUrl() +  `/vgr1/timeline/`+timeline,null, this.getAuthToken())
    }

    return http.get(this.getServerUrl() +  `/vgr1/timeline`,null, this.getAuthToken())
  },
  //post tweet
  postTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`,params, this.getAuthToken())
  },
  //post tweet&pic
  postTweetPicAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`,params, this.getAuthToken())
  },
  //post vitweet
  postVitTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`,params, this.getAuthToken())
  },
  //post like tweet
  postLiTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`,params, this.getAuthToken())
  },
  //post dislike tweet
  postDisLiTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`,params, this.getAuthToken())
  },
  //post repost tweet
  postReTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`,params, this.getAuthToken())
  },
  //post dis repost tweet
  postDisReTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`,params, this.getAuthToken())
  },
  //post qoute  tweet
  postQoTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`,params, this.getAuthToken())
  },
  //post comment tweet
  postCoTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`,params, this.getAuthToken())
  },
  //post block tweet
  postBlockTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`, params, this.getAuthToken())
  },
  //sync  tweet
  postSyncAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/sync`,params, this.getAuthToken())
  },
  //get tweets
  getTweetsAPI(str){
    return http.get(this.getServerUrl() +  `/vgr1/get/` + str, null, this.getAuthToken())
  },
  //添加bookmark
  postAddBookmarkAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/addbookmark`, params, this.getAuthToken())
  },
  //移除bookmark
  postRemBookmarkAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/rembookmark`, params, this.getAuthToken())
  },
  //读取bookmark列表
  getBookmarkAPI(str){
    return http.get(this.getServerUrl() +  `/vgr1/getbookmark?start=1&count=5`, null, this.getAuthToken())
  },
  //统计多媒体播放次数
  postViTweetAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`, params, this.getAuthToken())
  },
  //举报贴子
  postReportPostAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/report`, params, this.getAuthToken())
  },

  //新建文章 更新文章
  /*
  * {
      "title": "标题标题",
      "excerpt": "简介简介",
      "content": "内容内容",
      "pic": "1618077860619490208"
    }
  *
  * {
      "article": "ydhdntqd3cmy36q8",
      "title": "标题标题",
      "excerpt": "简介简介",
      "content": "内容内容",
      "pic": "1618077860619490208"
    }
  *
  * */
  postSaveArticleAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/savearticle`, params, this.getAuthToken())
  },
  //发布文章
  /*
  * {
    "tweetid": "1619308963320406600",
    "article": "ydhdntqd3cmy36q8"
    }
  * */
  postPublishArticleAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/publisharticle`, params, this.getAuthToken())
  },
  //读取文章
  /*
  * http://127.0.0.1:8000/vapi/vgr1/article/wyjue33gjzufv3fl
  * */
  getArticleAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`, params, this.getAuthToken())
  },
  //读取用户文章列表
  /*
  * http://127.0.0.1:8000/vapi/vgr1/articles?start=1&count=5
  * */
  getArticlesAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/send`, params, this.getAuthToken())
  },

  /*
  设置用户置顶贴
  params:
  {
    "toptw": "123"
  }
  */
  postSetTopTwAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/settoptw`, params, this.getAuthToken())
  },

  /*
    登录授权API
  */
  //post signup
  postSignuUpAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/login` ,params)
  },

  //post signup
  postUpdatePwAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/updatepw` ,params, this.getAuthToken())
  },

  //comfirm signup
  postLoginComfirmAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/confirm` ,params)
  },
  //comfirm signin
  postRegisterAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/register` ,params)
  },
  //check exist
  postCheckRegAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/checkreg` ,params)
  },


  /*
  上传相关API
  */

  //post upload file token
  postUploadTokensAPI(n){
    let countStr = ''
    if(n>1){
      countStr = '&tkcount=' + n
    }

    let params = {
      "config": "tweet-front",
      "userid": 111,
      "tkcount": 5
    }

    return http.post(this.getServerUrl() +  `/vgr1/requestupload?conf=frt${countStr}`, null, this.getAuthToken())
  },

  //post upload file token
  postTokensAPI(n, typ){

    let countStr = ''
    if(n>1){
      countStr = '&tkcount=' + n
    }

    let t

    if(typ) {
      t = typ
    }else{
      t = 'frt'
    }

    return http.post(this.getServerUrl() +  `/vgr1/requestupload?conf=${t}${countStr}`, null, this.getAuthToken())
  },

  getAvatarUrlAPI(token) {

    return http.get(this.getServerUrl() +  `/vgr1/avatar?token=${token}`, null, this.getAuthToken())

  },

  //get server final url
  postFinalUrlsAPI(params){
    return http.post(this.getServerUrl() +  `/vgr1/getfinalurls`,params, this.getAuthToken())
  },
  //get s3 final url
/*  getS3UrlAPI(token){
    return http.get(`${uServer}/vgr1/getfinalurl?token=`+token)
  }*/


  /*
  * 公共调用方法
  *
  * */

  updateUnreadULog(){

    //查询当前用户/群组信息
    this.getUnReadLogAPI().then(response => {

      if(response.data.Code === 0 ) {
        console.log("未读消息数：" + JSON.stringify(response.data['Body']))

        //存储到store
        store.dispatch('Post/notifyCountAction', response.data['Body'])


      }
    }).catch(err => console.log(err))

  },

  //更新当前用户的数据
  updateTweetUserInfo(uri,uid) {
    //查询当前用户/群组信息
    this.getTweetUserAPI(uri,uid).then(response => {

      if(response.data.Code === 0 ) {
        console.log("-tweetuser-查询当前用户信息成功" + JSON.stringify(response.data['Body']))
        //存储到store
        store.dispatch('Post/currentUserGroupAction',response.data['Body'])

      }
    }).catch(err => console.log(err))
  },

  //更新当前用户的数据
  updateCurrentUserInfoWithUri(uid,uri) {
    //查询当前用户/群组信息
    this.getCurrentUserInfoAPI(uid).then(response => {

      if(response.data.Code === 0 ) {
        console.log("-tweetuser-查询当前用户信息成功" + response.data['Body'])
        //存储到store
        store.dispatch('Post/currentUserGroupAction',response.data['Body'])

      }
    }).catch(err => console.log(err))
  },

  //更新当前用户的数据
  updateCurrentUserInfo(uid) {
    //查询当前用户/群组信息
    this.getCurrentUserInfoAPI(uid).then(response => {

      if(response.data.Code === 0 ) {
        console.log("-tweetuser-查询当前用户信息成功" + response.data['Body'])
        //存储到store
        store.dispatch('Post/currentUserGroupAction',response.data['Body'])

      }
    }).catch(err => console.log(err))
  },

  //屏蔽贴文
  postBlockTweet(T){

    let data = {
      "block": T
    }

    this.postBlockTweetAPI(data).then(response => {
      if(response.data.Code === 0) {
        console.log("屏蔽推文成功，:"+JSON.stringify(response.data))
        // 屏蔽成功后，不显示此贴子

      }
    }).catch(err => console.log(err))
  },

  //更新用户公共基础信息
  updateUserInfo() {
    //API：tweetuser  更新用户基础信息
    this.getUserInfoAPI().then(response => {
      if(response.data['Code'] === 0) {
        // alert('API返回：' + JSON.stringify(response.data['Body']))
        console.log("更新用户基础信息-getUserInfoAPI-SignIn :" + JSON.stringify(response.data['Body']))
        if(response.data['Body']) {

          //存储用户基础信息
          localStorage.setItem('userinfo',JSON.stringify(response.data['Body']))

          //储存到store
          store.dispatch('Post/userInfoAction',response.data['Body'])

        }
      }
    }).catch(err => console.log(err))
  },

  //更新群组内活跃的用户
  updateGroupActiveUser(uid) {
    //清空之前的信息
    this.getGroupActiveUserAPI(uid).then(response => {
      if(response.data.Code === 0) {
        console.log("获取活跃用户成功:"+JSON.stringify(response.data))
        //存入store
        store.dispatch('Post/actUsersAction',response.data['Body'])

      }
    }).catch(err => console.log(err))

  },
  //
  updateUserFollowTo() {
    //获取关注群组列表
    this.getFollowToAPI(JSON.parse(localStorage.getItem('userinfo')).UserId).then(response => {
      if(response.data.Code === 0) {
        if(response.data['Body']) {
          console.log("获取关注群组成功，长度："+response.data['Body'].length)
        }

        store.dispatch('Post/userFollowToAction',response.data['Body'])

        // this.$forceUpdate()
      }
    }).catch(err => console.log(err))
  },
  //进入所选用户中心
  getUserCenter(user) {

    let uid = user.UserId

    store.dispatch('Post/currentMenuAction',6)

    // alert(JSON.stringify(user))
    //查询当前用户信息
    this.getCurrentUserInfoAPI(uid).then(response => {

      if(response.data.Code === 0 ) {
        console.log("-tweetuser-查询当前用户信息成功" + response.data['Body'])

        store.dispatch('Post/currentUserGroupAction',response.data['Body'])

      }
    }).catch(err => console.log(err))

    //获取当前用户所有推文
    this.getUserTwByIdAPI(uid).then(response => {

      if(response.data.Code === 0 && !untils.isEmpty(response.data['Body']['timeline'])) {
        console.log("-usertw-获取用户timeline成功，共有贴子" + response.data['Body']['timeline'].length +'条')

        //当前用户的所有推文存入到messages数组
        store.dispatch('Post/messagesAction',{
          "type": "assign",
          "message": response.data['Body']['timeline']
        })

        //存入store timeline获取到messages数组
        store.dispatch('Post/messagesAction',{
          "type": "assign",
          "message": response.data['Body']['timeline']
        })

        //查询获取顶置贴的具体内容
        this.getTweetsAPI(response.data['Body']['toptw']).then(response => {

          if(response.data.Code === 0 ) {
            console.log("-get-查询顶置贴子内容成功" + response.data['Body'])

            //查询成功后，将内容存进store
            let data = {
              'T': response.data['Body']['T'],
              'message': response.data['Body']
            }

            store.dispatch('Post/currentTopTwAction',data)

          }else{
            store.dispatch('Post/currentTopTwAction','')
          }
        }).catch(err => console.log(err))

        router.push(`/usercenter/${user.Username}`)

      }
    }).catch(err => console.log(err))

  },
  //获取群组Timeline/用户Timeline
  getGroupTimeline: function (user) {

    let uid = user.UserId

    let uname = user.Username
    // console.log('UserInfo:' + JSON.stringify(user))

    //清空当前数据
    store.dispatch('Post/messagesClearAction','')

    //查询当前用户/群组信息
    this.getCurrentUserInfoAPI(uid).then(response => {

      if(response.data.Code === 0 ) {
        console.log("-tweetuser-查询当前用户信息成功" + response.data['Body'])

        //存储到store
        store.dispatch('Post/currentUserGroupAction',response.data['Body'])

      }
    }).catch(err => console.log(err))

    //只有group类型切换SSE与Timeline
    if(user.IsGroup > 0) {
      //群组类型url
      router.push(`/timeline?group=${uname}`)
      //切换SSE为相应用户群组
      this.switchStreamSSE(uid)

      //切换Group的Timeline
      this.getUserTw(uname)

      //获取当前组内的活跃用户
      this.getGroupActiveUser(uid)

    }else{

      //隐藏活跃用户条
      store.dispatch('Post/actUsersAction','')

      router.push(`/timeline?user=${uname}`)
      //用户类型不切换SSE，只获取timeline

      //切换Group的Timeline
      this.getUserTw(uname)

    }

    //记录当前user group
    store.dispatch('Post/currentUserGroupAction',user)

    console.log(`用户/群组信息：名称：${user.Username},id:${user.UserId},群组状态：${user.IsGroup}`)

  },
  //切换对应的用户群组SSE
  switchStreamSSE: function (uri,uid) {

    let params = {
      "chatid": localStorage.getItem('chatid'),
      "groupid": uid
    }
    //切换sse为group
    this.postStreamGroupAPI(uri,params).then(response => {
      if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {
        console.log("-postStreamGroupAPI-切换Group SSE成功");

      }
    }).catch(err => console.log(err))
  },

  //获取群组内活跃的用户
  getGroupActiveUser: function (gid) {
    //清空之前的信息

    this.getGroupActiveUserAPI(gid).then(response => {
      if(response.data.Code === 0) {
        console.log("获取活跃用户成功:"+JSON.stringify(response.data))

        //存入store
        store.dispatch('Post/actUsersAction',response.data['Body'])

      }
    }).catch(err => console.log(err))

  },
  //切换Group的Timeline
  getUserTw: function(name) {

    //显示timeline loader
    store.dispatch('Post/timelineLoaderAction',true)
    //清空当前timeline
    store.dispatch('Post/messagesClearAction','')

    //API:usertw?user=name 切换timeline
    this.getUserTwByNameAPI(name).then(response => {

      //隐藏timeline loader
      store.dispatch('Post/timelineLoaderAction',false)

      if(response.data.Code === 0 && !untils.isEmpty(response.data['Body']['timeline'])) {
        console.log("-sidebar-getGroupTimeline-切换Group时间线成功,共有数据" + response.data['Body']['timeline'].length +'条')

        //存入store timeline获取到messages数组
        store.dispatch('Post/messagesAction',{
          "type": "assign",
          "message": response.data['Body']['timeline']
        })

      }
    }).catch(err => console.log(err))

    //API：tweetuser  更新用户基础信息
    this.updateUserInfo()

  },

  //获取可用域名
  getHelloData() {

    let token = this.getAuthToken()

    this.getHelloAPI(token).then(response => {
      if(response.data.Code === 0) {

        console.log("调用hello接口更新:" + JSON.stringify(response.data['Body']))

        if(response.data['Body']) {

          //计算本地时间与服务器时间差
          let diffTime =parseInt((Date.now()/1000).toString()) - response.data['Body'].TimeStamp

          //存储时间差
          localStorage.setItem('diffTime',diffTime.toString())

          //存储头像服务器路径
          localStorage.setItem('aUrl',response.data['Body'].Avatar)

          //储存hellodata数据
          localStorage.setItem('helloData',JSON.stringify(response.data['Body']))

          console.log('localStorage helloData:' + localStorage.getItem('helloData'))

          console.log(`本地时间：${parseInt((Date.now()/1000).toString())},服务器时间：${JSON.parse(localStorage.getItem('helloData')).TimeStamp}`)

        }
      }
    }).catch(err => console.log(err))
  },

  //将缓存消息显示在timeline
  showCacheMsgs() {

    let cacheMessages = store.getters['Post/cacheMessagesState']

    //遍历缓存消息数组
    for(let i = 0; i < cacheMessages.length; i++){
      //将缓存消息存入到消息数组中
      store.dispatch('Post/messagesAction',{
        "type": "unshift",
        "message": cacheMessages[i]
      })
    }
    //隐藏消息提示
    store.dispatch('Post/newMessagesShowAction',false)
    // 清空消息缓存
    store.dispatch('Post/cacheMessagesClearAction','')
    store.dispatch('Post/cacheMessagesAvatarClearAction','')

  },
  //获取父亲贴的详细列表
    getParentPost: function (post) {

      //跳转到贴子详细列表
      router.push({
        path: "/postlist",
        query: {
          pid: post.T
        }
      })

    },

  // 获取原始贴子
  getOriginPost: function (source) {

    //跳转到贴子详细列表
    router.push({
      path: "/postlist",
      query: {
        pid: source.T
      }
    })

  },

  //查看详细推文list
  getDetailPost: function (source) {

    let t = source.T

    // 点击评论时，只显示当前评论与主贴
    if(source.Retw === '' && source.QotS === null  && source.PatS !== null) {

      console.log('当前评论与主贴:' + JSON.stringify(source))

      //存入store 跟帖列表
      store.dispatch('Post/postListAddAction',source)

      //跳转到贴子详细列表
      router.push({
        path: "/postlist",
        query: {
          pid: t
        }
      })


    }else { // 点击主贴时，显示主贴与相关所有评论

      //如果是转推，则进入的是原推文
      source.Retw !== '' ? t = source.Retw : t = source.T

      //跳转到贴子详细列表
      router.push({
        path: "/postlist",
        query: {
          pid: t
        }
      })

    }

  },

  clearSessionInfo: function () {

    //清空系统记录用户token值
    store.dispatch('Post/authTokenAction','')
    //清空用户信息
    //localStorage.setItem('userinfo','')
    store.dispatch('Post/userInfoAction', '')

    //清空当前用户群组信息
    store.dispatch('Post/currentUserGroupAction','')

    //清空timeline
    store.dispatch('Post/messagesAction', '')

    //清空用户token
    localStorage.setItem('userToken','')
  },

  // 获取proxy url路径
/*  getProxyUrl(url) {

    return 'https://tweettest3.vog.media/vapi'
  },*/

/*  getProxyUrl(url) {

     if(url === 'https://tweettest.vog.media') {
       return '/vapi'
     }else if(url === 'https://tweettest1.vog.media') {
       return '/v1api'
     }else if(url === 'https://tweettest2.vog.media') {
       return '/v2api'
     }else if(url === 'https://tweettest3.vog.media') {
       return '/v3api'
     }else{
       return '/vapi'
     }

  },*/

}
