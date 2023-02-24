<!--suppress SpellCheckingInspection -->
<template >
<v-sheet tile color="grey lighten-4">

  <!--菜单-->
  <v-card tile flat class="my-2" >

    <!--START LOGO-->
    <img class="my-2 mx-4" src='../../assets/img/vogger-logo.png'  height="36"  alt="logo" />
    <!--END LOGO-->

      <v-list  tile light nav subheader >
        <v-list-item-group
            v-model="menuStatus"

            mandatory
            color="info"
        >

        <!--START 菜单HOME-->
        <v-list-item  link @click.stop="homePage">
            <v-list-item-icon>
              <v-badge
                  bordered
                  color="light-blue accent-3"
                  dot
                  offset-x="06"
                  offset-y="06"
                  :value="$store.getters['Post/cacheMessagesState'].length > 0"
              >
              <v-icon >ri-home-2-line</v-icon>
              </v-badge>
            </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-black" >{{ $t('home') }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon @click.stop="reConnect">

             <div class="loader" v-if="$store.getters['Home/isHomeSSEOnlineState']"></div>
            <div v-else>
              <v-icon class="mr-1" color="info">ri-wifi-fill</v-icon>
            </div>


            <!--<Loading
                   :active="true"
                   :can-cancel="true"
                   :is-full-page="false"></Loading>-->

          </v-list-item-icon>

        </v-list-item>
        <!--END 菜单HOME-->
        <!--START 菜单Notifications-->
        <v-list-item link @click.stop="notifyPage">
          <v-list-item-icon>
            <v-badge
                color="light-blue accent-3"
                overlap
                :content="$store.getters['Post/notifyCountState']"
                :value="$store.getters['Post/notifyCountState'] > 0"
            >
              <v-icon >ri-notification-line</v-icon>
            </v-badge>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-black"  >{{ $t('notifications') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--END 菜单Notifications-->

        <!--START 菜单Articles-->
<!--        <v-list-item link @click.stop="articlePage" input-value="">
          <v-list-item-icon>
            <v-badge
                bordered
                color="light-blue accent-3"
                dot
                offset-x="06"
                offset-y="06"
                :value="notifyBadge"
            >
              <v-icon >ri-article-line</v-icon>
            </v-badge>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-black"  >Articles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
        <!--END 菜单Articles-->

        <!--START 菜单Bookmark-->
<!--        <v-list-item link @click.stop="bookmarkPage">
          <v-list-item-icon>
            <v-badge
                bordered
                color="light-blue accent-3"
                dot
                offset-x="06"
                offset-y="06"
                :value="false"
            >
              <v-icon >ri-bookmark-3-line</v-icon>
            </v-badge>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-black" >Bookmark</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
        <!--END 菜单Bookmark-->


        <!--START 用户所关注的群组-->
        <template v-if="!this.untils.isEmpty($store.getters['Post/userInfoState'])">
             <v-list-group color="info" :value="true" :eager="true" disabled >
              <!-- START Menu Following-->
              <template v-slot:activator >
                <v-list-item-icon>
                  <v-icon >ri-group-line</v-icon>
                </v-list-item-icon>
                <v-list-item-content @click="updateFollowing">

                  <v-list-item-title class="text-h6 font-weight-black" >
                    {{$t('following')}}
                  </v-list-item-title>

                </v-list-item-content>
              </template>
               <!-- END Menu Following-->

              <!--START 登录帐号为群组时，默认显示在第一位-->
<!--               <v-list-item link class="pl-0"  v-if="$store.getters['Post/userInfoState'].IsGroup > 0">

                 <v-badge
                     bordered
                     color="orange accent-3"
                     icon="ri-group-fill"
                     overlap
                     size="20"
                     offset-x="32"
                     offset-y="24"
                     value="true"
                 >
                   <v-badge
                       bordered
                       bottom
                       color="green accent-4"
                       dot
                       offset-x="24"
                       offset-y="20"
                       value="true"
                   >

                     <v-list-item-avatar  @click.stop="getGroupTimeline($store.getters['Post/userInfoState'])">
                       <v-img :src="$store.getters['Post/userInfoState'].Avatar96 | getFullUrl" :alt="$store.getters['Post/userInfoState'].DisplayName" :lazy-src="require('../../assets/users/user-d.png')"></v-img>
                     </v-list-item-avatar>

                   </v-badge>
                 </v-badge>


                   <v-list-item-content  @click.stop="getGroupTimeline($store.getters['Post/userInfoState'])">
                     <v-list-item-title class="font-weight-bold">
                       {{ $store.getters['Post/userInfoState'].Username }}
                       <v-list-item-action class="ma-0 float-right text-caption" >
                         <v-list-item-action-text >{{ $store.getters['Post/userInfoState'].ALive | formatRecentTime }}</v-list-item-action-text>
                       </v-list-item-action>

                     </v-list-item-title>
                     <v-list-item-subtitle class="text-caption">{{ $store.getters['Post/userInfoState'].LTw }}</v-list-item-subtitle>
                   </v-list-item-content>


               </v-list-item>-->
               <!--END 登录帐号为群组时，默认显示在第一位-->

              <!--START Following 用户列表-->
               <template v-if="!this.untils.isEmpty($store.getters['Post/userFollowToState']) ">
                 <v-list-item link class="pl-0" v-for="(user,index) in $store.getters['Post/userFollowToState']" :key="index"  >

                   <v-badge
                       bordered
                       color="orange accent-3"
                       icon="ri-group-fill"
                       overlap
                       size="20"
                       offset-x="32"
                       offset-y="24"
                       :value="user.IsGroup > 0"
                   >
                     <v-badge
                         bordered
                         bottom
                         color="green accent-4"
                         dot
                         offset-x="24"
                         offset-y="20"
                         :value="user.Online < 60 * 10"
                     >
                       <!--START 群组头像-->
                       <v-list-item-avatar v-if="user.IsGroup > 0" @click.stop="getGroupTimeline(user)">
                         <v-img :src="user.Avatar96 | getFullUrl" :alt="user.DisplayName" :lazy-src="require('../../assets/users/user-d.png')"></v-img>
                       </v-list-item-avatar>
                       <!--END 群组头像-->

                       <!--START 用户头像-->
                       <v-list-item-avatar v-else @click.stop="getUserCenter(user)">
                         <v-img :src="user.Avatar96 | getFullUrl" :alt="user.DisplayName" :lazy-src="require('../../assets/users/user-d.png')"></v-img>
                       </v-list-item-avatar>
                       <!--END 用户头像-->
                     </v-badge>
                   </v-badge>

                   <!--START 用户名，最后贴文-->
                   <v-list-item-content v-if="user.IsGroup > 0" @click.stop="getGroupTimeline(user)">
                     <v-list-item-title class="font-weight-bold">
                       {{ user.DisplayName }}
                       <v-list-item-action class="ma-0 float-right text-caption" >
                         <v-list-item-action-text >{{ user.ALive | formatRecentTime }}</v-list-item-action-text>
                       </v-list-item-action>

                     </v-list-item-title>
                     <v-list-item-subtitle class="text-caption">{{ user.LTw }}</v-list-item-subtitle>
                   </v-list-item-content>

                   <v-list-item-content v-else @click.stop="getUserCenter(user)">
                     <v-list-item-title class="font-weight-bold">
                       {{ user.DisplayName }}
                       <v-list-item-action class="ma-0 float-right text-caption" >
                         <v-list-item-action-text >{{ user.ALive | formatRecentTime }}</v-list-item-action-text>
                       </v-list-item-action>
                     </v-list-item-title>
                     <v-list-item-subtitle class="text-caption">{{ user.LTw }}</v-list-item-subtitle>
                   </v-list-item-content>
                   <!--END 用户名，最后贴文-->


                   <!--START 显示Group标识-->
                   <!--           <v-list-item-icon v-if="user.IsGroup > 0">
                                   <v-chip
                                       class="ma-2 pa-1"
                                       label
                                       x-small
                                       color="light-blue darken-2"
                                       text-color="light-blue lighten-5"
                                   >
                                     <span class="text-caption font-weight-medium">GROUP</span>
                                   </v-chip>
                                 </v-list-item-icon>-->
                   <!--END 显示Group标识-->

                 </v-list-item>
               </template>

               <template v-else>
                 <v-list-item >

                   <v-list-item-content >
                     <v-list-item-title class="">
                       no more users
                     </v-list-item-title>
                   </v-list-item-content>

                 </v-list-item>
               </template>
               <!--END Following 用户列表-->
            </v-list-group>

        </template>
          <!--END 用户所关注的群组-->

        </v-list-item-group>
      </v-list>

  </v-card>
  <!--END 菜单-->
  <SnackBar />
</v-sheet>
</template>

<script>
import untils from "@/utils/untils"

import 'vue-loading-overlay/dist/vue-loading.css';
import SnackBar from "@/components/Common/SnackBar";

let msgServer
let favicon
let sseClient = null
let sseGroup = null
let loader = false
let sseC


// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default {
  name: "Sidebar.vue",
  components: {
    SnackBar,
  },
  data() {
    return {
      mSecond: 1,
      dAvatar: {
        url: require('../../assets/users/user-d.png'),
        alt: this.$t('default avatar')
      },
      timeout: 1000 * 60,
      timeoutCount:1,
      timeoutObj: null,
      homeSSETimeoutObj: null,
      serverTimeoutObj: null,
      aliveP: true,
      homeBadge: false,
      notifyBadge: false,
    };
  },



  computed: {
    menuStatus: {
      get () {
        return this.$store.getters['Post/currentMenuState']
      },
      set (value) {
        this.$store.dispatch('Post/currentMenuAction',value)
      }
    },

  },

  methods: {
    //heart check
    heartCheck:function () {

      console.log('>开始心跳检测...');

      // this.aliveP = true

      this.timeoutObj && clearInterval(this.timeoutObj);

      // this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);

      this.timeoutObj = setInterval(() => {

        console.log('每60秒检测心跳flag,当前aliveP:' + this.aliveP);

        /*if(this.aliveP)  {

        }*/


        // 大于5次就不再重连
        if(this.timeoutCount <=5) {

          console.log(`TimeInterval执行第${this.timeoutCount}次重连`)

          // 检测失败，重连
          console.log('60秒未收到心跳，自动执行重连')
          this.createHomeSSE()

        }else{
          //清空计时器
          clearInterval(this.timeoutObj);

          console.log(`TimeInterval执行超过5次，停止`)

        }

        this.timeoutCount ++


      }, this.timeout)

    },
    //更新关注菜单
    updateFollowing: function () {
      this.api.updateUserFollowTo()
    },
    //首页timeline
    homePage: function (){

      //timeline page
      this.$router.push({
        path: "/timeline",
      })

      //清空当前数据
      // this.$store.dispatch('Post/messagesClearAction','')

      this.$store.dispatch('Post/currentUserGroupAction','')

      //清空活跃用户数据
      this.$store.dispatch('Post/actUsersAction','')

      //更新userinfo
      this.api.updateUserInfo()

      //更新Following
      this.updateFollowing()
    },
    //通知消息页面
    notifyPage: function () {

      //清空通知数据
      // this.$store.dispatch('Post/notifyMsgEmptyAction','')

      this.$store.dispatch('Post/currentMenuAction',1)

      console.log('currentMenu:' + this.$store.getters['Post/currentMenuState'])

      //更新Following
      this.updateFollowing()

      //跳转到通知用户页
      this.$router.push({
        path: "/notifications",
        query: {
          name: this.$store.getters['Post/userInfoState'].Username
        }
      })
    },
    //文章页面
    articlePage: function () {
      this.$store.dispatch('Post/currentMenuAction',2)
      console.log('currentMenu:' + this.$store.getters['Post/currentMenuState'])
      //更新Following
      this.updateFollowing()
    },
    //收藏页面
    bookmarkPage: function () {
      this.$store.dispatch('Post/currentMenuAction',3)
      console.log('currentMenu:' + this.$store.getters['Post/currentMenuState'])
      //更新Following
      this.updateFollowing()

      //跳转到bookmark
      this.$router.push({
        path: "/bookmark",
        query: {

        }
      })
    },
    //进入所选用户中心
    getUserCenter: function (user) {

      //跳转到用户中心页面
      this.$router.push({
        path: "/usercenter",
        query: {
          name: user.Username
        }
      })

    },
    //登出
    logout: function () {
      //清空系统记录用户token值
      this.$store.dispatch('Post/authTokenAction','')
      //清空用户信息
      //localStorage.setItem('userinfo','')
      this.$store.dispatch('Post/userInfoAction', '')
      //跳转到登录页
      this.$router.push('/sign-in')
    },

   /* showLoading: function () {
      loader = this.$loading.show({
        // Optional parameters
        canCancel: false,
        color: '#2196f3',
        loader: 'dots',
        width: 64,
        height: 64,
        backgroundColor: '#1a1a1a',
        opacity: 0.2,
        lockScroll: true,
        zIndex: 999,
      });

      console.log('show loader:' + loader)

    },
    hideLoading: function () {

      console.log('hide loader:' + loader)

      if(loader) {
        loader.hide()
      }

    },*/

    //切换对应的用户群组SSE
    switchStreamSSE: function (user) {

      console.log('user:' + JSON.stringify(user))

      //显示加载动画
      // this.showLoading()

      let params = {
        "chatid": localStorage.getItem('group_chatid'),
        "groupid": user.UserId
      }

      /*
      * 1. 连接组，同一个域名直接使用切换组的方法
        2. 连接组，不同域名，sse重新连接
      * */

      //当前使用的群组域名
      let curGroupDomain = localStorage.getItem('groupDomain')

      // 如果当前group domain有数据，则进来比较
      if(curGroupDomain){

        // followto中的域名与当前域名相同，则调用streamgroup api 切换用户组
        if(curGroupDomain === user.GroupDomain) {

          // 如果当前group sse 为空，则新建连接
          // alert(JSON.stringify(sseGroup))
          if(this.untils.isEmpty(sseGroup)) {
            this.createGroupSSE(user.UserId)
          }else{
            // 如果不为空，则切换
            //切换sse为group
            this.api.postStreamGroupAPI(user.GroupDomain, params, this.api.getAuthToken()).then(response => {
              if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {

                // 隐藏Loading Animation
                // this.hideLoading()

                console.log("切换Group SSE成功");

              }else{

                //显示错误提示
                this.$store.dispatch('Home/snackBarShowAction',true)
                this.$store.dispatch('Home/snackBarTextAction',response.data['Msg'])

              }
            }).catch(err => console.log(err))

          }


          //如果不相同，则关闭当前sse，重新连接sse
        }else{

          // 储存当前gorup domain
          localStorage.setItem('groupDomain',user.GroupDomain)

          console.log('curGroupDomain:' + curGroupDomain + 'user.GroupDomain:' + user.GroupDomain)

          // 如果不相同，则需要关闭当前group sse,新建group sse
          this.createGroupSSE(user.UserId)

        }

      }else {
        // 如果没数据，则使用当前user.GroupDomain

        let uri = user.GroupDomain
        if(untils.isEmpty(uri)) {
          // 如果数据内容为空，则用默认路径
          uri = this.api.getStaticServer()
        }
        console.log('curGroupDomain没有数据了：url:'+ user.GroupDomain )
        localStorage.setItem('groupDomain',uri)

        // 创建群组SSE
        this.createGroupSSE()

      }


    },

    //切换Group的Timeline
    getGroupTw: function (user) {

      //显示timeline loader
      this.$store.dispatch('Post/timelineLoaderAction',true)
      //清空当前timeline
      this.$store.dispatch('Post/messagesClearAction','')

      //跳转到用户中心页面
      this.$router.push({
        path: "/timeline",
        query: {
          group: user.Username,
          id:user.UserId,
          t: + new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
      //API：tweetuser  更新用户基础信息
      this.api.updateTweetUserInfo(user.GroupDomain,user.UserId)

    },
    //更新timeline
    getTimeLine: function (lastTime){
      //清空活跃用户数据
      this.$store.dispatch('Post/actUsersAction','')

      //显示timeline loader
      this.$store.dispatch('Post/timelineLoaderAction',true)
      //当第一次调取timeline后获得了Home列表，列表中最后一条推文的time就是这个接口的入参时间
      this.api.getTimeLineAPI(lastTime,this.api.getAuthToken()).then(response => {
        //隐藏timeline loader
        this.$store.dispatch('Post/timelineLoaderAction',false)

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {
          console.log("-sidebar timeline-追加时间线成功,共有"+response.data['Body']['timeline'].length + "条数据");

          this.loading = false

          //存入store timeline获取到messages数组
          this.$store.dispatch('Post/messagesAction',{
            "type": "concat",
            "message": response.data['Body']['timeline']
          })

          //从store中获取数据
          //this.messages = this.$store.getters['Post/messagesState']

        }
      }).catch(err => console.log(err))
    },

    //获取群组Timeline
    getGroupTimeline: function (user) {

      console.log('getGroupTimeline:' + JSON.stringify(user))

      let uid = user.UserId

      //清空当前timeline中数据
      this.$store.dispatch('Post/messagesClearAction','')

      //只有group类型切换SSE与Timeline
      if(user.IsGroup > 0) {

        // console.log('$store currentUserGroupState.UserId:' + this.$store.getters['Post/currentUserGroupState'].UserId , 'user.UserId:' + user.UserId)

        //获取Group的Timeline
        this.getGroupTw(user)

        // 如果当前点击用户和上一次的用户相同，则不再重新连接SSE
        if(this.$store.getters['Post/currentUserGroupState'].UserId !== user.UserId) {
          //切换SSE为相应用户群组
          this.switchStreamSSE(user)
        }

      }

      //记录当前user group
      this.$store.dispatch('Post/currentUserGroupAction',user)

      console.log(`群组信息：名称：${user.Username},doamin:${user.GroupDomain},id:${user.UserId},群组状态：${user.IsGroup}`)

      console.log(`$store群组信息：名称：${this.$store.getters['Post/currentUserGroupState'].Username},doamin:${this.$store.getters['Post/currentUserGroupState'].GroupDomain},id:${this.$store.getters['Post/currentUserGroupState'].UserId},群组状态：${this.$store.getters['Post/currentUserGroupState'].IsGroup}`)

    },
    // 关注
    getFollowTo: function (uid)  {

      //查看关注列表
      this.api.getFoToAPI(uid,this.api.getAuthToken()).then(response => {

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {
          console.log("-followto-获取关注列表,共有"+response.data['Body'].length + "条数据");

          this.$store.dispatch('Post/followToAction',response.data['Body'])

          //同时获取另两项数据
          this.getFollowBy(uid)
          this.getBlockUser(uid)

        }else{
          this.$store.dispatch('Post/followToAction','')
        }
      }).catch(err => console.log(err))

      this.$router.push(`/userstats`)
    },
    // 关注，粉丝，统计页面
    getFollowBy: function (uid)  {

      //粉丝
      this.api.getFoByAPI(uid,this.api.getAuthToken()).then(response => {

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {
          console.log("-followby-获取粉丝列表,共有"+response.data['Body'].length + "条数据");

          this.$store.dispatch('Post/followByAction',response.data['Body'])
        }else{
          this.$store.dispatch('Post/followByAction','')
        }
      }).catch(err => console.log(err))

      this.$router.push(`/userstats`)
    },
    //移除关注
    remFo: function (uid) {

      let params = {
        "fol": uid
      }

      this.api.postRemFoAPI(params,this.api.getAuthToken()).then(response => {

        if(response.data['Code'] === 0) {
          console.log('-remfollow-取消关注成功：' + JSON.stringify(response.data['Body']))

          //更新左侧关注列表
          this.api.updateUserFollowTo(this.api.getAuthToken())

        }
      }).catch(err => console.log(err))
    },
    // 拉黑列表
    getBlockUser: function (uid)  {

      //查看拉黑列表
      this.api.getBlockUserAPI(uid,this.api.getAuthToken()).then(response => {

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {
          console.log("-blockuser-获取拉黑用户列表成功,共有"+response.data['Body'].length + "条数据");

          this.$store.dispatch('Post/blockUserAction',response.data['Body'])


        }else{
          this.$store.dispatch('Post/blockUserAction','')
        }
      }).catch(err => console.log(err))

      this.$router.push(`/userstats`)
    },
    //调整左侧following 用户头像顺序
    userToTopping: function (message) {
      console.log('调整左侧followto头像顺序:' + JSON.stringify(message))

      this.$store.dispatch('Post/updateUserFollowToAction',message)

    },
    //显示消息提醒bar
    showNewMsgBar: function (cacheMessages,message) {
      //头像去重复
      if(cacheMessages.length > 0) {
        //超过12个头像后不再显示
        if(cacheMessages.length < 12){

          for(let i = 0; i < cacheMessages.length; i ++) {
            // 与当前缓存中头像对比
            if(cacheMessages[i].User.Uid !== message.User.Uid) {
              console.log('头像去重复：cacheMessages[i]:'+JSON.stringify(cacheMessages[i]),'message:'+ JSON.stringify(message))
              //加入新消息用户头像
              this.$store.dispatch('Post/cacheMessagesAvatarPushAction',message.User.UserA)
            }
          }

        }

      }else{
        //加入新消息用户头像
        this.$store.dispatch('Post/cacheMessagesAvatarPushAction',message.User.UserA)
      }

      //加入新消息
      this.$store.dispatch('Post/cacheMessagesPushAction',message)

      //调整左侧following 用户头像顺序
      this.userToTopping(message)

      //显示缓存消息数
      this.$store.dispatch('Post/newMessagesCountAction',this.$store.getters['Post/cacheMessagesState'].length)

      if(this.$store.getters['Post/cacheMessagesState'].length > 0) {
        //显示消息提示bar
        this.$store.dispatch('Post/newMessagesShowAction',true)
      }
    },

    //创建Home SSE
    createHomeSSE: function () {

      // 如果当前Home sse 不为空，则关闭后重新连接
      if(!this.untils.isEmpty(sseClient)) {


        sseClient.off('message', this.handleMessage);

        sseClient.disconnect();

      }

      //延时连接，避免过多请求
      //建立Home SSE连接
      this.connectHomeSSE()

    },

    //连接Home SSE Client
    connectHomeSSE: function () {

      // CONNECTING (0), OPEN (1),  CLOSED (2)

      //显示连接动画
      this.$store.dispatch('Home/isHomeSSEOnlineAction',true)

      let url = this.api.getServerUrl()


      //建立SSE连接
      sseClient = this.$sse.create({
        url: url + '/vgr1/stream/' + this.api.getAuthToken() + '/' + localStorage.getItem('chatid'),
        format: 'json',
        withCredentials: true,
        polyfill: true,
      });

      sseClient.on('open',function () {
        console.log('Home SSE open')
      })

      // Catch any errors (ie. lost connections, etc.)
      sseClient.on('error', (e) => {

        console.error('lost connection or failed to parse!', e);


        if (e.target.readyState === EventSource.CLOSED) {
          console.log('SSE closed ' + '(' + e.target.readyState + ')')
        } else if (e.target.readyState === EventSource.CONNECTING) {
          console.log('SSE reconnecting ' + '(' + e.target.readyState + ')')
          sseClient.close()
        }

        //显示连接动画
        this.$store.dispatch('Home/isHomeSSEOnlineAction',true)
        // reconnecting sse
        // this.connectHomeSSE()

        // If this error is due to an unexpected disconnection, EventSource will
        // automatically attempt to reconnect indefinitely. You will _not_ need to
        // re-add your handlers.
      });

      // Handle messages without a specific event
      sseClient.on('message', this.handleMessage);

      // Handle 'chat' messages
      // sseClient.on('chat', this.handleChat);

      // Handle once for a ban message
      // sseClient.once('ban', this.handleBan);

      sseClient.connect()
          .then(sse => {
            console.log(localStorage.getItem('chatid') + '  Home SSE connected!');

            sseC = sse

            //隐藏连接动画
            this.$store.dispatch('Home/isHomeSSEOnlineAction',false)
            // Unsubscribes from event-less messages after 100 seconds
            /*setTimeout(() => {
              // sseClient.off('message', this.handleMessage);
              console.log('No messages received for 100 seconds! Reconnecting SSE');
              // reconnecting sse
              this.connectHomeSSE()

            }, 100000);*/

            // Unsubscribes from chat messages after 14 seconds
            /*setTimeout(() => {
              sse.off('chat', this.handleChat);
              console.log('Stopped listening to chat messages!');
            }, 14000);*/
          })
          .catch((err) => {
            // When this error is caught, it means the initial connection to the
            // events server failed.  No automatic attempts to reconnect will be made.
            console.error('Failed to connect to server,Reconnecting sse', err);

            // 延时执行，避免过多连接
            // reconnecting sse
            // 累计超过5次重连后，停止
            if(this.timeoutCount <= 5){
              console.log(`HomeSSE网络出错，执行第${this.timeoutCount}次重连`)
              this.homeSSETimeoutObj = setTimeout(this.connectHomeSSE,20000)
              this.timeoutCount ++
            }else{
              console.log(`超过5次未连上，停止`)
              clearTimeout(this.homeSSETimeoutObj)
            }

          });

    },

    //创建Group SSE
    createGroupSSE: function (id) {

      // 如果当前group sse 不为空，则关闭后重新连接
      if(!this.untils.isEmpty(sseGroup)) {

        console.log('关闭当前group sse,待重连')
        console.log('sseGroup:' + JSON.stringify(sseGroup))

        // sseClient.off('message', this.handleGroupMessage);

        sseGroup.disconnect();

      }

      //建立Group SSE连接
      this.connectGroupSSE(id)



    },

    //Group SSE Client
    connectGroupSSE: function(id) {

      //获取当前的服务器地址
      let curUrl = localStorage.getItem('groupDomain')

      console.log('sseGroup:' + JSON.stringify(sseGroup))

      // 新建chatid,并保存
      let group_chatid = Math.random().toString(36).slice(-8)
      localStorage.setItem('group_chatid',group_chatid)

      //建立GROUP SSE连接
      sseGroup = this.$sse.create({
        url: curUrl + '/vgr1/stream/' + this.api.getAuthToken() + '/' + group_chatid + '?groupid=' + id,
        format: 'json',
        withCredentials: true,
        polyfill: true,
      });

      // Catch any errors (ie. lost connections, etc.)
      sseGroup.on('error', (e) => {
        console.error('Group SSE:lost connection or failed to parse!', e);

        // reconnecting sse
        this.connectGroupSSE()

        // If this error is due to an unexpected disconnection, EventSource will
        // automatically attempt to reconnect indefinitely. You will _not_ need to
        // re-add your handlers.
      });

      // Handle messages without a specific event
      sseGroup.on('message', this.handleGroupMessage);

      // Handle 'chat' messages
      // sseClient.on('chat', this.handleChat);

      // Handle once for a ban message
      // sseClient.once('ban', this.handleBan);

      sseGroup.connect()
          .then(sse => {
            // 隐藏Loading Animation
            // this.hideLoading()

            console.log('Group SSE connected!');

            // Unsubscribes from event-less messages after 100 seconds
            /*setTimeout(() => {
              // sseClient.off('message', this.handleMessage);
              console.log('Group SSE:No messages received for 100 seconds!');

              // reconnecting sse
              this.connectGroupSSE()

            }, 100000);*/

            // Unsubscribes from chat messages after 14 seconds
            /*setTimeout(() => {
              sse.off('chat', this.handleChat);
              console.log('Stopped listening to chat messages!');
            }, 14000);*/
          })
          .catch((err) => {
            // When this error is caught, it means the initial connection to the
            // events server failed.  No automatic attempts to reconnect will be made.
            console.error(group_chatid + '  Group sse:Failed to connect to server', err);

            // reconnecting sse
            this.connectGroupSSE()
          });

    },

    //处理group sse消息
    handleGroupMessage(message) {

      console.warn(`(${localStorage.getItem('group_chatid')})GROUP SSE:Received a message w/o an event!`, message);

    if((message.Typ !== 'P')) {
      // Typ = “S” 原始推文Typ = “T” 推文
      if((message.Typ === 'S') || (message.Typ === 'T')) {

        //调整左侧following 用户头像顺序
        this.userToTopping(message)

      }else{
        // 其余类型消息
        console.log("GROUP SSE：unknows message " + JSON.stringify(message))
      }
    }


    },

    //处理home sse消息
    handleMessage(message) {

      console.warn(`(${localStorage.getItem('chatid')})HOME SSE:Received a message w/o an event!`, message);

      //获取消息缓存
      let cacheMessages = this.$store.getters['Post/cacheMessagesState']
      //获取新消息用户头像缓存
      let cacheMessagesAvatar = this.$store.getters['Post/cacheMessagesAvatarState']

      //去除心跳数据消息
      if(message.Typ !== 'P'){

        // 数据统计消息
        if(message.Typ === 'E'){
          //更新所有推送过来的统计数据
          console.log('更新数据，SSE长度：' + message.TStats.length,'内容：' + JSON.stringify(message.TStats))
          console.log('更新数据，messages长度：' + this.$store.getters["Post/messagesState"].length)

          //将message与现有数据比对，有变动才更新
          this.$store.dispatch('Post/messagesAction',{
            "type": "update",
            "message": message
          })

          //将message与现有页面缓存数据对比，更新缓存数据
          for(let i = 0;i<message.TStats.length;i++) {
            for(let j = 0; j < cacheMessages.length; j++) {
              try {
                if ((cacheMessages[j].T.toString() === message.TStats[i].T.toString() || (cacheMessages[j].Retw.toString() === message.TStats[i].T.toString()) )) {
                  cacheMessages[j].Stat.ULike = message.TStats[i].ULike
                  cacheMessages[j].Stat.Ret = message.TStats[i].Ret
                  cacheMessages[j].Stat.Qot = message.TStats[i].Qot
                  cacheMessages[j].Stat.Cot = message.TStats[i].Cot
                }
              } catch (e) {
                console.log("更新统计数据出错："+e)
              }
            }
          }

          // 新通知提醒
        }else if((message.Typ === 'N')){
          //Act int 1=被人关注，2=帖子被转推，3=帖子被评论，4=帖子被引用，5=帖子被点赞
          this.$store.dispatch('Post/notifyMsgAddAction',message)

          let cacheCount = this.$store.getters['Post/notifyMsgsState'].length

          let notifyCount = this.$store.getters['Post/notifyCountState'] + 1

          //update notify count
          this.$store.dispatch('Post/notifyCountAction', notifyCount )

          // Typ = “S” 原始推文Typ = “T” 推文
        }else if((message.Typ === 'S') || (message.Typ === 'T')) {

          //调整左侧following 用户头像顺序
          this.userToTopping(message)

          // 推送消息T与 刚刚发送的消息T相同，则是本用户发貼，不将其加入到缓存消息数组中
          if(message.T !== this.$store.getters["Post/msgJSONState"].T ) {

            // 如果处在页面最上方，则直接显示出消息
            if(!this.$store.getters['Post/autoShowMsgState'])  {

              this.$store.dispatch('Post/messagesAction',{
                "type": "unshift",
                "message": message
              })

            }else{
              // 显示消息提醒处理
              this.showNewMsgBar(cacheMessages,message)
            }

          }

        }

      }else{

        // 收到心跳消息
        if(message.Typ === 'P') {

          //隐藏连接动画
          this.$store.dispatch('Home/isHomeSSEOnlineAction',false)

          // this.aliveP = falseƒ

          //清除计时器
          // clearInterval(this.timeoutObj)
          //启动心跳检测
          this.heartCheck()

        }else{

          // 其余类型消息
          console.log("未知消息类型：" + JSON.stringify(message))
        }

      }

      //更新favicon数字
      favicon.badge(this.$store.getters['Post/newMessagesState'].count);
      // this.messages.push(message);

    },

    handleBan(banMessage) {
      // Note that we can access properties of message, since our parser is set to JSON
      // and the hypothetical object has a `reason` property.
      this.messages.push(`You've been banned! Reason: ${banMessage.reason}`);
    },

    handleChat(message) {
      // Note that we can access properties of message, since our parser is set to JSON
      // and the hypothetical object has these properties.
      this.messages.push(`${message.user} said: ${message.text}`);
    },

    /*reconnectServer() {

      setInterval(() => {
        console.log('check server health')
        console.log('sseClient:' + JSON.stringify(sseClient))
        console.log('vue sse:' + JSON.stringify(this.$sse))
        console.log('sseC:' + JSON.stringify(sseC))
        let sseOK
        if (sseClient === null) {
          console.log('sse null')
          sseOK = false
        } else {
          // console.log('sseClient.readyState:' + sseClient.readyState)
          // console.log('EventSource.OPEN:' + EventSource.OPEN)
          sseOK = (sseClient.readyState === 1)

        }

        console.log('sseOk:' + sseOK)

        if (!sseOK) {
          // only try reconnect if server health is OK
          this.api.getServerHealthAPI().then(response => {

            if(response.data.Code === 0 ) {
              console.log("服务器状态：ok！");
              this.createHomeSSE()

            }else{
              console.log("服务器状态：error！");




            }
          }).catch(err => {

            console.log("服务器出错：" + err)

            this.createHomeSSE()

          })

        }

      },60000)

    },*/


  },
  mounted() {
    //读取用户信息
    this.$store.dispatch('Post/userInfoAction',JSON.parse(localStorage.getItem('userinfo')))

    //API：tweetuser  刷新页面后更新用户基础信息
    this.api.updateUserInfo(this.api.getAuthToken());


  },
  created() {

    //当前url指向的群组
    let group = this.$route.query.group
    let id = this.$route.query.id
    //进入到对应group
    if(!untils.isEmpty(group)) {

      this.createGroupSSE(id)

    }else{
      //启动主HomeSSE，保持长连接
      this.createHomeSSE()
    }

    //心跳监测
    this.heartCheck()

    //启动Group SSE,保持长连接
    // this.createGroupSSE()
    // this.reconnectServer()

  },
  beforeCreate() {

    //储存 chatid
    let chatid = Math.random().toString(36).slice(-8)
    localStorage.setItem('chatid',chatid)

    //储存 group chatid
    let group_chatid = Math.random().toString(36).slice(-8)
    localStorage.setItem('group_chatid',group_chatid)

    if(untils.isEmpty(localStorage.getItem('aUrl'))) {
      //初始化服务器路径时间差等基础信息
      this.api.getHelloData()
    }

    // 更新未读消息数
    this.api.updateUnreadULog()

    //初始化favicon
    favicon=new this.favico({
      bgColor : '#5CB85C',
      textColor : '#ff0',
    })

  },
  beforeDestroy () {
    // Make sure to close the connection with the events server
    // when the component is destroyed, or we'll have ghost connections!
    if(sseClient) sseClient.disconnect()
    if(sseGroup) sseGroup.disconnect()

    // Alternatively, we could have added the `sse: { cleanup: true }` option to our component,
    // and the SSEManager would have automatically disconnected during beforeDestroy.

    clearInterval(this.timeoutObj)
    clearInterval(this.timeout)
  },
};
</script>

<style lang="scss" >
.v-navigation-drawer__border {
  width: 0;
}
.v-badge__wrapper .v-badge__badge.green.accent-4 {
  padding: 0 !important;
}

//scss loading animate
$foreground: #2196f3;

  .loader {
    color:$foreground;
    font-size:4px;
    margin-top: 10px;
    width:1em;
    height:1em;
    border-radius:50%;
    position:relative;
    text-indent:-9999em;
    -webkit-animation:load4 1.3s infinite linear;
    animation:load4 1.3s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }


@mixin load4-frames() {

  0%,
  100% {
    box-shadow:0 -3em 0 0.2em,
    2em -2em 0 0em,
    3em 0 0 -1em,
    2em 2em 0 -1em,
    0 3em 0 -1em,
    -2em 2em 0 -1em,
    -3em 0 0 -1em,
    -2em -2em 0 0;
  }

  12.5% {
    box-shadow:0 -3em 0 0,
    2em -2em 0 0.2em,
    3em 0 0 0,
    2em 2em 0 -1em,
    0 3em 0 -1em,
    -2em 2em 0 -1em,
    -3em 0 0 -1em,
    -2em -2em 0 -1em;
  }

  25% {
    box-shadow:0 -3em 0 -0.5em,
    2em -2em 0 0,
    3em 0 0 0.2em,
    2em 2em 0 0,
    0 3em 0 -1em,
    -2em 2em 0 -1em,
    -3em 0 0 -1em,
    -2em -2em 0 -1em;
  }

  37.5% {
    box-shadow:0 -3em 0 -1em,
    2em -2em 0 -1em,
    3em 0em 0 0,
    2em 2em 0 0.2em,
    0 3em 0 0em,
    -2em 2em 0 -1em,
    -3em 0em 0 -1em,
    -2em -2em 0 -1em;
  }

  50% {
    box-shadow:0 -3em 0 -1em,
    2em -2em 0 -1em,
    3em 0 0 -1em,
    2em 2em 0 0em,
    0 3em 0 0.2em,
    -2em 2em 0 0,
    -3em 0em 0 -1em,
    -2em -2em 0 -1em;
  }

  62.5% {
    box-shadow:0 -3em 0 -1em,
    2em -2em 0 -1em,
    3em 0 0 -1em,
    2em 2em 0 -1em,
    0 3em 0 0,
    -2em 2em 0 0.2em,
    -3em 0 0 0,
    -2em -2em 0 -1em;
  }

  75% {
    box-shadow:0em -3em 0 -1em,
    2em -2em 0 -1em,
    3em 0em 0 -1em,
    2em 2em 0 -1em,
    0 3em 0 -1em,
    -2em 2em 0 0,
    -3em 0em 0 0.2em,
    -2em -2em 0 0;
  }

  87.5% {
    box-shadow:0em -3em 0 0,
    2em -2em 0 -1em,
    3em 0 0 -1em,
    2em 2em 0 -1em,
    0 3em 0 -1em,
    -2em 2em 0 0,
    -3em 0em 0 0,
    -2em -2em 0 0.2em;
  }

}

@-webkit-keyframes load4 {@include load4-frames;}
@keyframes load4 {@include load4-frames;}




</style>
