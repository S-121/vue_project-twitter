<template>
<!--用户中心-->
<v-card flat
        class="mx-2 mb-2 "
        elevation='1' >

  <!--用户信息区-->

  <v-expansion-panels accordion flat >

    <!--START 扩展面版头部-->
    <v-expansion-panel >
      <v-expansion-panel-header  class="py-0 px-2">

        <v-list-item  class="d-flex justify-center" >

          <!--START 头像-->
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-badge
                  bordered
                  color="orange accent-3"
                  icon="ri-group-fill"
                  overlap
                  offset-x="32"
                  offset-y="20"
                  :value="$store.getters['Post/userInfoState'].IsGroup > 0"
              >
              <v-list-item-avatar size="36" class="my-0 ml-0"
                                  @click.stop="getUserCenter($store.getters['Post/userInfoState'])" >

                <v-img :src="$store.getters['Post/userInfoState'].Avatar96 | getFullUrl" :lazy-src="require('../../assets/users/user-d.png')" />

                <v-fade-transition>
                  <v-overlay
                      v-if="hover"
                      absolute
                      color="#036358"
                  >
                    <v-btn
                        icon
                        color="white"
                    >
                      <v-icon small>ri-eye-line</v-icon>
                    </v-btn>
                  </v-overlay>
                </v-fade-transition>

              </v-list-item-avatar>

              </v-badge>

            </template>
          </v-hover>
          <!--END 头像-->

          <!--用户名称/群组-->
          <v-list-item-title

              style="cursor:pointer !important;"
              class="py-0 text-subtitle-1 font-weight-black">
            <span @click.stop="getUserCenter($store.getters['Post/userInfoState'])">
              {{ $store.getters['Post/userInfoState'].DisplayName }}
            </span>
            <span class="ml-1 grey--text text-subtitle-2 font-weight-regular">
              {{ $store.getters['Post/userInfoState']['TwCount'] }}  {{ $t('posts') }}
            </span>
          </v-list-item-title>
          <!--END 用户名称/群组-->


        </v-list-item>

        <template v-slot:actions>
          <!--START 更多-->
<!--          <v-icon>ri-profile-line</v-icon>-->
          <!--END 更多-->
        </template>
      </v-expansion-panel-header >
      <!--END 扩展面版头部-->

      <!--START 扩展面版内容-->
      <v-expansion-panel-content eager class="px-0 py-0">

        <!--START BIO-->
        <v-card tile flat class="px-0 text-caption my-2" >


          <div class="text-body-1 font-weight-medium"
               style="cursor:pointer !important;"
               @click.stop="getUserCenter($store.getters['Post/userInfoState'])"
          >
            {{ $store.getters['Post/userInfoState'].Description }}
          </div>

          <!--START 被谁关注了的列表提示-->
          <div  class="text-caption grey--text  font-weight-medium">
            <template v-if="$store.getters['Post/userInfoState'].FWithMeList">
              followed by {{ $t('followed by') }}
              <template v-for="(item,index) in $store.getters['Post/userInfoState'].FWithMeList">
                {{ item }},
              </template>
              <template v-if="$store.getters['Post/userInfoState'].FWithMe > 3">

                {{ $t('and') }} {{ $store.getters['Post/userInfoState'].FWithMe - 3 }} {{ $t('others you follow') }}

              </template>

            </template>
          </div>
          <!--END 被谁关注了的列表提示-->


        </v-card>
        <!--END BIO-->

        <!--水平线-->
        <v-divider light></v-divider>
        <!--水平线-->

        <!--START 统计信息-->
        <v-card  flat class="px-0 pt-2" >

          <div class="d-flex justify-start py-1">
            <span class="font-weight-black grey--text">
             {{ $t('following') }}
            </span>
            <span class="ml-3 black--text"
                  style="cursor:pointer"
                  @click="getFollowTo()"
            >
            {{ $store.getters['Post/userInfoState'].FollowToA }} /
            {{ $store.getters['Post/userInfoState'].FollowTo }}
            </span>

          </div>

          <div class="d-flex justify-start py-1">
            <span class="font-weight-black grey--text ">
              {{ $t('followers') }}
            </span>
            <span class="ml-3  black--text"
                  style="cursor:pointer"
                  @click="getFollowBy()"
            >
            {{ $store.getters['Post/userInfoState'].FollowByA }} /
            {{ $store.getters['Post/userInfoState'].FollowBy }}
            </span>
          </div>

          <div class="d-flex justify-start py-1">
            <span class="font-weight-black grey--text ">
             {{ $t('blocks') }}
            </span>
            <span class="ml-3 black--text"
                  style="cursor:pointer;"
                  @click="getBlock()"
            >
            {{ $store.getters['Post/userInfoState'].Blocked }}
            </span>
          </div>

          <div class="d-flex justify-start py-1">
            <span class="font-weight-black grey--text ">
             {{ $t('reported') }}
            </span>
            <span class="ml-3 black--text"
                  style="cursor:pointer;"
                  @click="getReports()"
            >
            {{ $store.getters['Post/userInfoState'].Reported }}
            </span>
          </div>

          <div class="d-flex justify-start py-1">
            <span class=" ">
             <v-icon color="info">ri-calendar-2-line</v-icon>
            </span>
            <span class="ml-3  text-body ">

            {{ $store.getters['Post/userInfoState'].CreateTime | formatDate }}
            </span>


          </div>


        </v-card>
        <!--END 统计信息-->


        <!--START 私信 关注按钮-->
<!--        <v-card  flat class="px-0 py-1" >

          &lt;!&ndash;START  私信按钮&ndash;&gt;
          <v-btn
              text
              color="green"
              small
              class="px-2"
          >
            <v-icon color="green" left>ri-chat-1-line</v-icon>
            message
          </v-btn>
          &lt;!&ndash;END  私信按钮&ndash;&gt;

          &lt;!&ndash;START  关注/取关&ndash;&gt;
          <template v-if="$store.getters['Post/currentUserGroupState'].IsGroup === 1">
            <v-btn
                text
                color="pink"
                small
                class="px-1"
                @click="remFo($store.getters['Post/currentUserGroupState'].UserId)"
            >
              <v-icon color="pink" left>ri-group-line</v-icon>
              unfollow
            </v-btn>
          </template>
          <template v-else>
            <v-btn
                text
                color="pink"
                small
                class="px-1"
                v-if="$store.getters['Post/currentUserGroupState'].IFollowed"

                @click="remFo($store.getters['Post/currentUserGroupState'].UserId)"
            >
              <v-icon color="pink" left>ri-user-unfollow-line</v-icon>
              unfollow
            </v-btn>

            <v-btn
                text
                color="info"
                small
                class="px-1"
                v-else
                @click="addFo($store.getters['Post/currentUserGroupState'].UserId)"
            >
              <v-icon color="info" left>ri-user-follow-fill</v-icon>
              following
            </v-btn>


          </template>
          &lt;!&ndash;END  关注/取关&ndash;&gt;

        </v-card>-->
        <!--END 私信 关注按钮-->

        <!--START 屏蔽 分享按钮-->
<!--        <v-card  flat class="px-0 py-1" >

          &lt;!&ndash;START  私信按钮&ndash;&gt;
          <v-btn
              text
              color="pink"
              small
              class="px-2"
          >
            <v-icon color="pink" left>ri-forbid-2-line</v-icon>
            Block
          </v-btn>
          &lt;!&ndash;END  私信按钮&ndash;&gt;

          &lt;!&ndash;START  分享&ndash;&gt;
          <v-btn
              text
              color="info"
              small
              class="px-1"
          >
            <v-icon color="info" left>ri-share-line</v-icon>
            share
          </v-btn>
          &lt;!&ndash;END  分享&ndash;&gt;

        </v-card>-->
        <!--END 屏蔽 分享按钮-->

        <!--水平线-->
        <v-divider light></v-divider>
        <!--水平线-->

        <!--START 退出 编辑按钮-->
        <v-card  flat class="px-0 pt-3" >

          <!--START  私信按钮-->
          <v-btn
              outlined
              color="grey"
              small
              class="px-2"
              @click="logout"
          >
            <v-icon color="grey" left>ri-logout-circle-line</v-icon>
            {{ $t('logout') }}
          </v-btn>
          <!--END  私信按钮-->

          <!--START  分享-->
          <v-btn
              outlined
              color="info"
              small
              class="px-2 mx-1"
              @click="$router.push('/profile')"
          >
            <v-icon color="info" left>ri-edit-2-line</v-icon>
            {{ $t('edit profile') }}
          </v-btn>
          <!--END  分享-->

          <v-btn
              outlined
              color="info"
              small
              class="px-2 my-1"
              @click="$router.push('/setting')"
          >
            <v-icon color="info" left>ri-settings-5-line</v-icon>
            {{ $t('setting') }}
          </v-btn>

<!--          <v-btn
              outlined
              color="pink lighten-2"
              small
              class="px-2 mx-1 my-1"
              @click="$router.push('/reports')"
          >
            <v-icon color="pink lighten-2" left>ri-alarm-warning-line</v-icon>
            {{ $t('reports') }}
          </v-btn>-->

        </v-card>
        <!--END 退出 编辑按钮-->

      </v-expansion-panel-content>
      <!--END 扩展面版内容-->
    </v-expansion-panel>

  </v-expansion-panels>


  <!--END 用户信息区-->

</v-card>
<!--END 用户中心-->
</template>

<script>
import untils from "@/utils/untils"
import {formatDate} from "@/utils/formatDate";



// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default {
  name: "MyUserCard",
  //过滤器
  filters: {
    formatDate(time) {
      time = time * 1000
      let date = new Date(time)
      let fDate = formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      moment.locale('en')

      return moment(fDate).format('LL')
    },

  },
  methods:{
    //登出
    logout: function () {

      //跳转到登录页
      this.$router.push('/sign-in')

      //登出
      this.api.postLogoutAPI().then(response => {
        if(response.data['Code'] === 0) {

          console.log('-logout-登出成功：' + JSON.stringify(response.data['Body']))

          //清空会话信息
          this.api.clearSessionInfo()

        }
      }).catch(err => console.log(err))


    },

    // 关注
    getFollowTo: function ()  {

      this.$router.push({
        path: "/userstats",
        query: {
          name: this.$store.getters['Post/userInfoState'].Username,
          tab: 0
        }
      })

    },
    // 关注，粉丝，统计页面
    getFollowBy: function ()  {

      this.$router.push({
        path: "/userstats",
        query: {
          name: this.$store.getters['Post/userInfoState'].Username,
          tab: 1
        }
      })

    },
    // 关注，粉丝，统计页面
    getBlock: function ()  {

      this.$router.push({
        path: "/userstats",
        query: {
          name: this.$store.getters['Post/userInfoState'].Username,
          tab: 2
        }
      })

    },
    // Reports
    getReports: function ()  {
      this.$router.push(`/reports`)
    },

    //进入所选用户中心
    getUserCenter: function (user) {

      //跳转到用户中心页面
      this.$router.push({
        path: "/usercenter",
        query: {
          name: user.Username,
        }
      })

    },

  }
}
</script>

<style scoped>

.v-expansion-panel-content__wrap{
  padding: 0 !important;
}




</style>
