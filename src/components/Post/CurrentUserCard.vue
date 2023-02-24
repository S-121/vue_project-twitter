<!--suppress ALL -->
<template>
<div>
  <!--START 左侧上部当前用户信息-->
  <template v-if="$store.getters['Post/currentUserGroupState']">
  <v-card flat
          class="mx-2 mb-2 pt-2 px-2"
          elevation='1' >
      <!--START 当前用户信息区-->
      <v-card  flat>
        <v-list-item  class="d-flex justify-center">
          <!--头像-->
          <v-badge
              bordered
              color="orange accent-3"
              icon="ri-group-fill"
              overlap
              offset-x="32"
              offset-y="20"
              :value="$store.getters['Post/currentUserGroupState'].IsGroup > 0"
          >

            <v-hover>
              <template v-slot:default="{ hover }">
                <v-badge
                    bordered
                    bottom
                    color="green accent-4"
                    dot
                    offset-x="28"
                    offset-y="18"
                    value="true"
                >
                  <v-list-item-avatar size="52" class="mt-0 ml-0" @click="getUserCenter" >
                    <v-img :src="$store.getters['Post/currentUserGroupState'].Avatar96 | getFullUrl" :lazy-src="require('../../assets/users/user-d.png')" />

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

          </v-badge>
          <!--END 头像-->

          <!--用户名称/群组-->
          <v-list-item-content class="pt-0" >

            <v-list-item-title
                @click="getUserCenter"
                style="cursor:pointer !important;"
                class="text-subtitle-1 font-weight-black">
              {{ $store.getters['Post/currentUserGroupState'].DisplayName }}
<!--              <label class="grey&#45;&#45;text text-subtitle-2 font-weight-regular">
                @{{ $store.getters['Post/currentUserGroupState'].Username }}
              </label>-->

              <label v-if="$store.getters['Post/currentUserGroupState'].HeBlocksMe" class="red--text text-subtitle-2 font-weight-black">
                have been blocked
              </label>

              <label v-if="$store.getters['Post/currentUserGroupState'].IBlockHim" class="red--text text-subtitle-2 font-weight-black">
                blocked
              </label>

            </v-list-item-title>
            <v-list-item-subtitle class="grey--text text-subtitle-2 font-weight-regular">
              <v-chip
                  x-small
                  label
                  color="white"
                  class="px-0 font-weight-medium grey--text text--darken-1"
                  >
                {{ $store.getters['Post/currentUserGroupState']['TwCount'] }} Posts
              </v-chip>
              <v-chip
                  x-small
                  label
                  class="px-1 mx-1 font-weight-medium grey--text text--darken-1"
                  v-if="$store.getters['Post/currentUserGroupState'].FollowToMe">
                  follows you
              </v-chip>
            </v-list-item-subtitle>

            <!--          <v-list-item-subtitle>@{{ userinfo.Username }}</v-list-item-subtitle>-->
          </v-list-item-content>
          <!--END 用户名称/群组-->

          <!--更多-->
          <v-list-item-action class="py-0 px-0 my-0" >

            <v-menu
                bottom
                right
                transition="scale-transition"
                origin="top left"
            >
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" small  color="grey" icon >
                  <v-icon>ri-more-2-fill</v-icon>
                </v-btn>
              </template>

                <v-list >
                  <!--START  屏蔽用户-->
                  <v-list-item>
                    <template v-if="$store.getters['Post/currentUserGroupState'].IBlockHim">
                      <v-btn
                          text
                          color="info"
                          small
                          class="px-1"
                          @click="disBlkU($store.getters['Post/currentUserGroupState'].UserId)"
                      >
                        <v-icon left size="16">
                          ri-indeterminate-circle-line
                        </v-icon>
                        unblock
                      </v-btn>
                    </template>
                    <template v-else>
                      <v-btn
                          text
                          color="pink"
                          small
                          class="px-1"
                          @click="blkU($store.getters['Post/currentUserGroupState'].UserId)"
                      >
                        <v-icon left size="16">
                          ri-indeterminate-circle-line
                        </v-icon>
                        block
                      </v-btn>
                    </template>
                  </v-list-item>
                  <!--END  屏蔽用户-->

                  <!--START 升级成群组-->
                  <v-list-item v-if="$store.getters['Post/currentUserGroupState'].IsGroup === 0 && $store.getters['Post/userInfoState'].UserId === $store.getters['Post/currentUserGroupState'].UserId">
                      <v-btn
                          text
                          color="info"
                          small
                          class="px-1"
                          @click="changToGroup($store.getters['Post/currentUserGroupState'].UserId)"
                      >
                        <v-icon left size="16">
                          ri-group-line
                        </v-icon>
                        switch to group
                      </v-btn>
                  </v-list-item>
                  <!--END 升级成群组-->
                </v-list>

            </v-menu>
          </v-list-item-action>
          <!--END 更多-->

        </v-list-item>



      </v-card>
      <!--END 当前用户信息区-->

      <!--START 统计信息-->
      <v-card tile flat class="d-flex justify-space-around" >

        <!--START 关注人数-->
        <v-card tile flat  class="justify-center  my-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center "
                   style="cursor:pointer !important;"
                   @click="getFollowTo($store.getters['Post/currentUserGroupState']['Username'])"
                   v-bind="attrs"
                   v-on="on">
                <v-icon  small color="deep-purple lighten-2">ri-user-line</v-icon>
                <label class="ml-1 font-weight-regular" style="cursor:pointer !important;">
                  {{ $store.getters['Post/currentUserGroupState'].FollowTo }}
                </label>
              </div>
            </template>
            <span>Following</span>
          </v-tooltip>

        </v-card>
        <!--END 关注人数-->

        <!--START 粉丝人数-->
        <v-card tile flat  class="justify-center  my-2" >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center"
                   @click="getFollowBy($store.getters['Post/currentUserGroupState']['Username'])"
                   v-bind="attrs"
                   v-on="on"
                   style="cursor:pointer !important;"
              >
                <v-icon small color="success">ri-user-follow-line</v-icon>
                <label class="ml-1 font-weight-regular" style="cursor:pointer !important;">
                  {{ $store.getters['Post/currentUserGroupState'].FollowBy }}
                </label>
              </div>
            </template>
            <span>Follower</span>
          </v-tooltip>
        </v-card>
        <!--END 粉丝人数-->

        <!--START 拉黑人数-->
        <v-card tile flat  class="justify-center my-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center"
                   style="cursor:pointer !important;"
                   @click="getBlock($store.getters['Post/currentUserGroupState']['Username'])"
                   v-bind="attrs"
                   v-on="on"
              >
                <v-icon small color="pink" >ri-indeterminate-circle-line</v-icon>
                <label class="ml-1 font-weight-regular" style="cursor:pointer !important;">
                  {{ $store.getters['Post/currentUserGroupState'].Blocked }}
                </label>
              </div>
            </template>
            <span>Block users</span>
          </v-tooltip>
        </v-card>
        <!--END 拉黑人数-->

      </v-card>
      <!--END 贴文信息-->


      <!--START BIO-->
      <v-card tile flat class="px-4 text-caption my-2" >


        <div class="text-body-1 font-weight-medium">
          {{ $store.getters['Post/currentUserGroupState'].Description }} <br/>
        </div>

        <!--START 被谁关注了的列表提示-->
        <div  class="text-caption grey--text  font-weight-medium">
        <template v-if="$store.getters['Post/currentUserGroupState'].FWithMeList">
          Followed by
          <template v-for="(item,index) in $store.getters['Post/currentUserGroupState'].FWithMeList">
            {{ item }},
          </template>
          <template v-if="$store.getters['Post/currentUserGroupState'].FWithMe > 3">

            and {{ $store.getters['Post/currentUserGroupState'].FWithMe - 3 }} others you follow

          </template>

        </template>
        </div>
        <!--END 被谁关注了的列表提示-->


      </v-card>
      <!--END BIO-->

      <!--水平线-->
      <v-divider light></v-divider>
      <!--水平线-->

      <!--START 操作栏-->
      <v-card  flat class="px-2 py-1" >

        <!--START  私信按钮-->
<!--        <v-btn
            text
            color="green"
            small
            class="px-2"
        >
          <v-icon color="green" left>ri-chat-1-line</v-icon>
          message
        </v-btn>-->
        <!--END  私信按钮-->

        <!--START  关注/取关-->
        <template v-if="$store.getters['Post/currentUserGroupState'].IsGroup === 1">
          <v-btn
              outlined
              color="pink"
              small
              class="px-3 ma-1"
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
              class="px-2"
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
        <!--END  关注/取关-->

      </v-card>
      <!--END 操作栏-->

    <!--START 操作栏-->
      <!--    <v-card  flat class="px-2 pb-1" >

      &lt;!&ndash;START 屏蔽用户&ndash;&gt;
      <template v-if="$store.getters['Post/currentUserGroupState'].IBlockHim">
        <v-btn
            x-small
            color="green"
            dark
            depressed
            class="mx-2"
            @click="disBlkU($store.getters['Post/currentUserGroupState'].UserId)"
        >
          <v-icon left>ri-indeterminate-circle-line</v-icon>unblock
        </v-btn>

      </template>
      <template v-else>
        <v-btn
            x-small
            color="pink"
            dark
            depressed
            class="mx-2"
            @click="blkU($store.getters['Post/currentUserGroupState'].UserId)"
        >
          <v-icon left>ri-indeterminate-circle-line</v-icon>block
        </v-btn>
      </template>
      &lt;!&ndash;END  屏蔽用户&ndash;&gt;

      &lt;!&ndash;START 升级成群组&ndash;&gt;
      <template v-if="$store.getters['Post/currentUserGroupState'].IsGroup === 0 && $store.getters['Post/userInfoState'].UserId === $store.getters['Post/currentUserGroupState'].UserId">
        <v-btn
            x-small
            color="info"
            dark
            depressed
            @click="changToGroup($store.getters['Post/currentUserGroupState'].UserId)"
        >
          <v-icon  left>ri-group-line</v-icon>switch
        </v-btn>
      </template>

      &lt;!&ndash;END  升级成群组&ndash;&gt;



    </v-card>-->
    <!--END 操作栏-->

    </v-card>
  </template>
  <!--END 左侧上部当前用户信息-->
</div>
</template>

<script>
import untils from "@/utils/untils"

export default {
name: "CurrentUserCard",
  data: () => ({

  }),

  //过滤器
  filters: {

  },

  methods: {
    //进入所选用户中心
    getUserCenter: function () {

      //跳转到用户中心页面
      this.$router.push({
        path: "/usercenter",
        query: {
          name: this.$store.getters['Post/currentUserGroupState'].Username
        }
      })

    },
    // 关注
    getFollowTo: function (name)  {

      this.$router.push({
        path: "/userstats",
        query: {
          name: name,
          tab: 0
        }
      })

    },
    // 关注，粉丝，统计页面
    getFollowBy: function (name)  {

      this.$router.push({
        path: "/userstats",
        query: {
          name: name,
          tab: 1
        }
      })

    },
    // 关注，粉丝，统计页面
    getBlock: function (name)  {

      this.$router.push({
        path: "/userstats",
        query: {
          name: name,
          tab: 2
        }
      })
    },
    //用户转换为组
    changToGroup: function(uid) {
      let params = {
        "uid": uid
      }

      this.api.postChangeToGroupAPI(params).then(response => {
        if(response.data['Code'] === 0) {

          console.log('-addfollow-转换为群组成功：' + JSON.stringify(response.data['Body']))
          //更新左侧关注列表
          this.api.updateUserFollowTo()
          //操作成功后，更新用户数据
          this.api.updateCurrentUserInfo(uid)

        }
      }).catch(err => console.log(err))
    },
    //更新timeline
    getTimeLine: function (){
      //清空活跃用户数据
      this.$store.dispatch('Post/actUsersAction','')

      //显示timeline loader
      this.$store.dispatch('Post/timelineLoaderAction',true)
      //第一次调用timeline,不用给timeline参数
      this.api.getTimeLineAPI(null).then(response => {
        //隐藏timeline loader
        this.$store.dispatch('Post/timelineLoaderAction',false)

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {
          console.log("-timeline-获取时间线成功,共有"+response.data['Body']['timeline'].length + "条数据");

          //存入store timeline获取到messages数组
          this.$store.dispatch('Post/messagesAction',{
            "type": "assign",
            "message": response.data['Body']['timeline']
          })

          //从store中获取数据
          //this.messages = this.$store.getters['Post/messagesState']

        }
      }).catch(err => console.log(err))
    },

    //添加关注
    addFo: function (uid) {

      let params = {
        "fol": uid
      }

      this.api.postAddFoAPI(params).then(response => {
        if(response.data['Code'] === 0) {

          console.log('-addfollow-关注用户/群组成功：' + JSON.stringify(response.data['Body']))
          //更新左侧关注列表
          this.api.updateUserFollowTo()
          //操作成功后，更新用户数据
          this.api.updateCurrentUserInfo(uid)

        }
      }).catch(err => console.log(err))
    },

    //移除关注
    remFo: function (uid) {


      let params = {
        "fol": uid
      }

      this.api.postRemFoAPI(params).then(response => {

        if(response.data['Code'] === 0) {
          console.log('-remfollow-取消关注用户/群组成功：' + JSON.stringify(response.data['Body']))
          //更新左侧关注列表
          this.api.updateUserFollowTo()
          //操作成功后，更新用户数据
          this.api.updateCurrentUserInfo(uid)

        }
      }).catch(err => console.log(err))
    },

    //拖黑
    blkU: function (uid) {

      let params = {
        "blk": uid
      }

      this.api.postBlkUAPI(params).then(response => {

        if(response.data['Code'] === 0) {
          console.log("屏蔽用户成功:"+response.data)

          //操作成功后，更新用户数据
          this.api.updateCurrentUserInfo(uid)

        }

      }).catch(err => console.log(err))
    },

    //取消拖黑
    disBlkU: function (uid) {

      let params = {
        "blk": uid
      }

      this.api.postDisBlkUAPI(params).then(response => {
        if(response.data['Code'] === 0) {
          console.log("取消屏蔽用户成功:"+response.data)

          //操作成功后，更新用户数据
          this.api.updateCurrentUserInfo(uid)

        }
      }).catch(err => console.log(err))

    }
  }
}
</script>

<style scoped>

</style>
