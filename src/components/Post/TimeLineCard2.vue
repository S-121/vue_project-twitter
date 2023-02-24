<template>
  <div>

    <!--START 骨架装载器-->
    <TimeLineSkeletonLoader v-if="loading" />
    <!--END 骨架装载器-->

    <!--新消息提示条-->
    <v-snackbar
        timeout="-1"
        color="blue"
        rounded
        top
        :value="$store.getters['Post/cacheMessagesState'].length > 0"
        class="pa-0 ma-0"
        @click.native="updateTimeline"
        style="cursor:pointer !important;"
    >

      <div class="d-flex justify-center">
        <!--START 新消息用户头像-->
        <template v-for="(a,index) in $store.getters['Post/cacheMessagesAvatarState']">

          <template v-if="index < 8">
            <v-avatar size="24" >
              <v-img v-if="a" :src="a | getFullUrl" :lazy-src="require('../../assets/users/user-d.png')"  />
            </v-avatar>
          </template>
          <template v-else >
              ...
          </template>

        </template>

        <label class="ml-1 font-weight-bold" style="cursor:pointer !important;">
          您收到 {{ this.$store.getters['Post/cacheMessagesState'].length }} 条新动态
        </label>
      </div>

    </v-snackbar>
    <!--END 新消息提示条-->

    <!--活跃用户列表-->
    <v-card tile flat  v-show="$store.getters['Post/actUsersState']" >

      <div class="d-flex justify-start">
      <!--START 当前用户头像-->
        <v-chip
            pill
            class="mx-2 my-2"
            color="light-blue darken-3"
            text-color="white"
            @click.stop="getUserCenter($store.getters['Post/currentUserGroupState'])"
            style="cursor:pointer !important;"
        >
          <!--进入用户中心-->
          <v-avatar left >
            <v-img
                :src="$store.getters['Post/currentUserGroupState'].Avatar96 | getFullUrl"
                :alt="$store.getters['Post/currentUserGroupState'].DisplayName"
                :lazy-src="require('../../assets/users/user-d.png')"
            >
            </v-img>
          </v-avatar>
          <label class="font-weight-bold">
            profile
<!--            {{ $store.getters['Post/currentUserGroupState'].DisplayName }}-->
          </label>

        </v-chip>
      <!--END 当前用户头像-->

      <!--START 活跃用户头像-->
      <template v-for="(user,index) in $store.getters['Post/actUsersState']"  >
            <v-avatar
                style="cursor:pointer !important;"
                size="30" class="mx-1 my-2" @click="getUserTw(user)">
              <v-img
                  :src="user.UserA | getFullUrl"
                  :alt="user.UserD"
                  :lazy-src="require('../../assets/users/user-d.png')"
              >
              </v-img>
            </v-avatar>

        </template>
      <!--END 活跃用户头像-->

      </div>

      <v-divider></v-divider>

    </v-card>
    <!--END 活跃用户列表-->

    {{ this.$store.getters['Post/messagesState'].length > 0 }}

    <!--START 虚拟滚动条 优化页面性能-->
    <VirtualPostList
        v-if="this.$store.getters['Post/messagesState'].length > 0 "
        :page-name="'timeline'"
        :data-sources="this.$store.getters['Post/messagesState']"
        :data-component="this.itemComponent" />
    <!--END 虚拟滚动条 优化页面性能-->

  </div>
</template>

<script>
import untils from "@/utils/untils"

import TweetItem from '@/components/Post/TweetItem'
import CommentDialog from "@/components/Post/CommentDialog"
import QotDialog from "@/components/Post/QotDialog"
import VirtualPostList from "@/components/Post/VirtualPostList";
import TimeLineSkeletonLoader from "@/components/Home/TimeLineSkeletonLoader";




// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true



export default {
  name: "TimeLineCard",
  data() {
    return {
      loading: true,
      itemComponent: TweetItem,
    };
  },
  components: {TimeLineSkeletonLoader, VirtualPostList, QotDialog, CommentDialog },
  watch: {
    "$route": "fetchTimeLineData"
  },
  methods: {
    fetchTimeLineData: function () {
      //获取浏览器url参数
      let group = this.$route.query.group

      if(group) {
        this.getGroupTw(group)
      }else{
        this.getTimeLine(null)
      }

    },

    //获取群组timeline
    getGroupTw: function (group) {
      //API:usertw?user=name 切换timeline
      this.api.getGroupTwByNameAPI(group).then(response => {

        //隐藏timeline loader
        this.$store.dispatch('Post/timelineLoaderAction',false)

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body']['timeline'])) {
          console.log("-sidebar-getGroupTimeline-切换Group时间线成功,共有数据" + response.data['Body']['timeline'].length +'条')

          //存入store timeline获取到messages数组
          this.$store.dispatch('Post/messagesAction',{
            "type": "assign",
            "message": response.data['Body']['timeline']
          })

        }
      }).catch(err => console.log(err))
    },

    //追加timeline
    getTimeLine: function (lastTime){
      //清空活跃用户数据
      this.$store.dispatch('Post/actUsersAction','')

      //显示timeline loader
      this.$store.dispatch('Post/timelineLoaderAction',true)
      //当第一次调取timeline后获得了Home列表，列表中最后一条推文的time就是这个接口的入参时间
      this.api.getTimeLineAPI(lastTime).then(response => {
        //隐藏timeline loader
        this.$store.dispatch('Post/timelineLoaderAction',false)

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {
          console.log("-tweet timeline-追加时间线成功,共有"+response.data['Body']['timeline'].length + "条数据");

          this.loading = false

          if(lastTime) {
            //存入store timeline获取到messages数组
            this.$store.dispatch('Post/messagesAction',{
              "type": "concat",
              "message": response.data['Body']['timeline']
            })
          }else{
            //存入store timeline获取到messages数组
            this.$store.dispatch('Post/messagesAction',{
              "type": "assign",
              "message": response.data['Body']['timeline']
            })
          }

        }
      }).catch(err => console.log(err))

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

    //获取群主所有贴文
    getGroupOwnerTw: function () {


      //API:usertw?user=name 切换timeline
      this.api.getGroupOwnerTwByNameAPI(this.$store.getters['Post/currentUserGroupState'].Username).then(response => {

        if (response.data.Code === 0 && !untils.isEmpty(response.data['Body']['timeline'])) {
          console.log("-tweet-getGroupOwnerTwByNameAPI-切换Group时间线成功,共有数据" + response.data['Body']['timeline'].length + '条')

          //存入store timeline获取到messages数组
          this.$store.dispatch('Post/messagesAction', {
            "type": "assign",
            "message": response.data['Body']['timeline']
          })

        }
      }).catch(err => console.log(err))
    },

    //获取群主所有贴文
    getUserTw: function (user) {

      //API:usertw?user=name 切换timeline
      this.api.getUserTwByNameAPI(user.User).then(response => {

        if (response.data.Code === 0 && !untils.isEmpty(response.data['Body']['timeline'])) {
          console.log("-tweet-getUserTwByNameAPI-切换user时间线成功,共有数据" + response.data['Body']['timeline'].length + '条')

          //存入store timeline获取到messages数组
          this.$store.dispatch('Post/messagesAction', {
            "type": "assign",
            "message": response.data['Body']['timeline']
          })

        }
      }).catch(err => console.log(err))
    },

    activeUserCenter: function (user) {

      console.log('activeUserCenter:'+ JSON.stringify(user))

      let User = {
        'UserId': user.Uid,
        'Username': user.User
      }

      this.getUserCenter(User)

    },

    //将缓存消息显示在timeline
    updateTimeline:function (){

      let cacheMessages = this.$store.getters['Post/cacheMessagesState']

      //遍历缓存消息数组
      for(let i=0; i < cacheMessages.length; i++){
        //将缓存消息存入到消息数组中
        this.$store.dispatch('Post/messagesAction',{
          "type": "unshift",
          "message": cacheMessages[i]
        })
      }
      //隐藏消息提示
      this.$store.dispatch('Post/newMessagesShowAction',false)
      // 清空消息缓存
      this.$store.dispatch('Post/cacheMessagesClearAction','')
      this.$store.dispatch('Post/cacheMessagesAvatarClearAction','')

    },

  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchTimeLineData()
  }
};

</script>

<style scoped>
.timeline-content {
  border-left:1px solid #EFEFEF !important;
  border-right:1px solid #EFEFEF !important;
}

.loader {
  font-size: 10px;
  margin: 20px auto;
  text-indent: -9999em;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
  background: linear-gradient(to right, #3f9fe0 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  animation: load3 1.4s infinite linear;
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #3f9fe0;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: #ffffff;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}




</style>
