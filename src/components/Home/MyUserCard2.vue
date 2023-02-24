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

          <!--头像-->
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-list-item-avatar size="26" class="my-0 ml-0" @click="userCenter($store.getters['Post/userInfoState'])" >

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

            </template>
          </v-hover>
          <!--END 头像-->

          <!--用户名称/群组-->
          <v-list-item-title

              style="cursor:pointer !important;"
              class="py-0 text-subtitle-1 font-weight-black">
            {{ $store.getters['Post/userInfoState'].DisplayName }}
            <span class="ml-1 grey--text text-subtitle-2 font-weight-regular">
          {{ $store.getters['Post/userInfoState']['TwCount'] }}  Posts
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


          <div class="text-body-1 font-weight-medium">
            {{ $store.getters['Post/userInfoState'].Description }}
          </div>

          <!--START 被谁关注了的列表提示-->
          <div  class="text-caption grey--text  font-weight-medium">
            <template v-if="$store.getters['Post/userInfoState'].FWithMeList">
              Followed by
              <template v-for="(item,index) in $store.getters['Post/userInfoState'].FWithMeList">
                {{ item }},
              </template>
              <template v-if="$store.getters['Post/userInfoState'].FWithMe > 3">

                and {{ $store.getters['Post/userInfoState'].FWithMe - 3 }} others you follow

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
            <span class="font-weight-black grey--text ">
            living following
            </span>
            <span class="ml-3 font-weight-black">
            {{ $store.getters['Post/userInfoState'].FollowByA }}
            </span>

          </div>

          <div class="d-flex justify-start py-1">
            <span class="font-weight-black grey--text ">
            living follower
            </span>
            <span class="ml-3 font-weight-black">
            {{ $store.getters['Post/userInfoState'].FollowToA }}
            </span>
          </div>

          <div class="d-flex justify-start py-1">
            <span class="font-weight-black grey--text ">
            block
            </span>
            <span class="ml-3 font-weight-black">
            {{ $store.getters['Post/userInfoState'].Blocked }}
            </span>
          </div>

          <div class="d-flex justify-start py-1">
            <span class=" ">
             <v-icon color="info">ri-calendar-2-line</v-icon>
            </span>
            <span class="ml-3  text-body font-weight-black">

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
            logout
          </v-btn>
          <!--END  私信按钮-->

          <!--START  分享-->
          <v-btn
              outlined
              color="info"
              small
              class="px-2 mx-1"
          >
            <v-icon color="info" left>ri-edit-2-line</v-icon>
            edit profile
          </v-btn>
          <!--END  分享-->

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

      //登出
      this.api.postLogoutAPI().then(response => {
        if(response.data['Code'] === 0) {

          console.log('-logout-登出成功：' + JSON.stringify(response.data['Body']))

        }
      }).catch(err => console.log(err))

      //清空系统记录用户token值
      this.$store.dispatch('Post/authTokenAction','')
      //清空用户信息
      //localStorage.setItem('userinfo','')
      this.$store.dispatch('Post/userInfoAction', '')



      //跳转到登录页
      this.$router.push('/sign-in')
    },
    //进入所选用户中心
    userCenter: function (user) {


      let uid = user.UserId

      this.$store.dispatch('Post/currentMenuAction',6)

      //查询当前用户信息
      this.api.getCurrentUserInfoAPI(uid).then(response => {

        if(response.data.Code === 0 ) {
          console.log("-tweetuser-查询当前用户信息成功" + response.data['Body'])

          this.$store.dispatch('Post/currentUserGroupAction',response.data['Body'])

        }
      }).catch(err => console.log(err))

      //获取当前用户所有推文
      this.api.getUserTwByIdAPI(uid).then(response => {

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body']['timeline'])) {
          console.log("-usertw-获取用户timeline成功，共有贴子" + response.data['Body']['timeline'].length +'条')

          //当前用户的所有推文存入到messages数组
          this.$store.dispatch('Post/messagesAction',{
            "type": "assign",
            "message": response.data['Body']['timeline']
          })

          //存入store timeline获取到messages数组
          this.$store.dispatch('Post/messagesAction',{
            "type": "assign",
            "message": response.data['Body']['timeline']
          })

          //查询获取顶置贴的具体内容
          this.api.getTweetsAPI(response.data['Body']['toptw']).then(response => {

            if(response.data.Code === 0 ) {
              console.log("-get-查询顶置贴子内容成功" + response.data['Body'])

              //查询成功后，将内容存进store
              let data = {
                'T': response.data['Body']['T'],
                'message': response.data['Body']
              }

              this.$store.dispatch('Post/currentTopTwAction',data)

            }else{
              this.$store.dispatch('Post/currentTopTwAction','')
            }
          }).catch(err => console.log(err))

          this.$router.push(`/usercenter/${user.Username}`)

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

  }
}
</script>

<style scoped>

.v-expansion-panel-content__wrap{
  padding: 0 !important;
}




</style>
