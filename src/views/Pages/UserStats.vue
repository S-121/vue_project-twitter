<template>
  <v-card class="mx-auto" tile flat>
    <v-toolbar light flat>
      <v-btn icon @click="backHistory">
        <v-icon color="info">ri-arrow-left-line</v-icon>
      </v-btn>

      <v-toolbar-title class="pl-0 font-weight-black"
        > {{ $store.getters['Post/currentUserGroupState'].Username }}</v-toolbar-title
      >

      <v-spacer></v-spacer>

<!--  {{ $store.getters['Post/currentUserGroupState']}}-->

      <template v-slot:extension>
        <v-tabs align-with-title v-model="active_tab" v-if="showTabs">
          <v-tab :key="0" @click="getFollowTo">
            {{ $t('following') }}
          ({{$store.getters['Post/currentUserGroupState'].FollowToA ? $store.getters['Post/currentUserGroupState'].FollowToA : 0 }}/{{$store.getters['Post/currentUserGroupState'].FollowTo ? $store.getters['Post/currentUserGroupState'].FollowTo : 0}})
          </v-tab>
          <v-tab :key="1" @click="getFollowBy">
          {{ $t('followers') }} {{ `(${curUser.FollowByA ? curUser.FollowByA : 0}/${curUser.FollowBy ? curUser.FollowBy : 0})` }}
          </v-tab>
          <v-tab :key="2" @click="getBlockUser">
          {{ $t('blocks') }} {{` (${blockCounter ? blockCounter : 0})` }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="active_tab">
      <!--START 关注用户列表-->
      <v-tab-item key="0">

        <UserSkeletonLoader :loading="loading" v-if="showTabs"/>

        <v-list two-line v-if="!loading">
          <template v-if="$store.getters['Post/followToState'].length > 0">
              <UserStatsItem
                v-for="(user, index) in $store.getters['Post/followToState']"
                :user-data="user"
                :user-state="userState.followingState"
                :key="index"
                :index="index"
                @addFollow="addFo"
                @addBlock="addBl"
                @removeFollow="remFo"
                @removeBlock="remBl"
              />
          </template>
          <template v-else>
            <div
              class="
                pa-4
                font-weight-bold
                text-subtitle-2 text-center
                blue-grey--text
              "
            >
              {{ $t('no data available') }}
            </div>
          </template>
        </v-list>
      </v-tab-item>
      <!--END 关注用户列表-->
      <!--START 粉丝列表-->
      <v-tab-item key="1">

        <UserSkeletonLoader :loading="loading" v-if="showTabs" />

        <v-list two-line v-if="!loading">
          <template v-if="$store.getters['Post/followByState'].length > 0">
            <UserStatsItem
              v-for="(user, index) in $store.getters['Post/followByState']"
              :user-data="user"
              :user-state="userState.followerState"
              :key="index"
              :index="index"
              @addFollow="addFo"
              @addBlock="addBl"
              @removeFollow="remFo"
              @removeBlock="remBl"
            />
          </template>
          <template v-else>
            <div
              class="
                pa-4
                font-weight-bold
                text-subtitle-2 text-center
                blue-grey--text
              "
            >
              {{ $t('no data available') }}
            </div>
          </template>
        </v-list>
      </v-tab-item>
      <!--END 粉丝列表-->
      <!--START 拉黑用户列表-->
      <v-tab-item key="2">

        <UserSkeletonLoader :loading="loading" v-if="showTabs" />

        <v-list two-line v-if="!loading">
          <template v-if="$store.getters['Post/blockUserState'].length > 0">
            <UserStatsItem
              v-for="(user, index) in $store.getters['Post/blockUserState']"
              :user-data="user"
              :user-state="userState.blockingState"
              :key="index"
              :index="index"
              @addFollow="addFo"
              @addBlock="addBl"
              @removeFollow="remFo"
              @removeBlock="remBl"
            />
          </template>
          <template v-else>
            <div
              class="
                pa-4
                font-weight-bold
                text-subtitle-2 text-center
                blue-grey--text
              "
            >
              {{ $t('no data available') }}
            </div>
          </template>
        </v-list>
      </v-tab-item>
      <!--END 拉黑用户列表-->
    </v-tabs-items>
  </v-card>
</template>

<script>
import untils from "@/utils/untils";
import UserSkeletonLoader from "@/components/User/UserSkeletonLoader";
import UserStatsItem from "@/components/Post/UserStatsItem"

export default {
  name: "UserStats",
  components: { UserSkeletonLoader, UserStatsItem },
  data: () => ({
    loading: true,
    tab: null,
    active_tab: 0,
    followText: '关注',
    dAvatar: {
      url: require("../../assets/users/user-d.png"),
      alt: "默认头像",
    },
    followingCount: null,
    followerCount: null,
    blockCounter: null,
    userState: {
      followingState: 0,
      followerState: 1,
      blockingState: 2,
    },
    curUser: {},
    showTabs: false,
  }),
  //过滤器
  filters: {
    //计算图片完整服务器地址
    getFullUrl(url) {
      if (localStorage.getItem("aUrl")) {
        if (untils.isEmpty(url)) {
          return require("../../assets/users/user-d.png");
        } else {
          return localStorage.getItem("aUrl") + url;
        }
      } else {
        //重新登录
        this.$router.push("/sign-in");
      }
    },
  },
  methods: {
    //返回按钮
    backHistory: function () {
      this.$router.go(-1); //返回上一层
    },
    // 关注
    getFollowTo: function (showSkeleton) {
      //先显示出加载动画
      if (showSkeleton)
        this.loading = true;


      //查看关注列表
      this.api
        .getFoToAPI(this.$store.getters['Post/currentUserGroupState'].UserId)
        .then((response) => {
          if (
            response.data.Code === 0 &&
            !untils.isEmpty(response.data["Body"])
          ) {
            this.loading = false;

            console.log(
              "-followto-1获取关注列表,共有" +
                response.data["Body"].length +
                "条数据"
            );

            this.$store.dispatch("Post/followToAction", response.data["Body"]);
            this.followingCount = response.data["Body"].length;

            //同时获取另两项数据
            // this.getFollowBy(uid)
            // this.getBlockUser(uid)
          } else {
            this.loading = false;
            this.$store.dispatch("Post/followToAction", "");
          }
        })
        .catch((err) => console.log(err));
    },

    // 关注，粉丝，统计页面
    getFollowBy: function (showSkeleton) {
      //先显示出加载动画
      if (showSkeleton)
        this.loading = true;

      //粉丝
      this.api
        .getFoByAPI(this.$store.getters['Post/currentUserGroupState'].UserId)
        .then((response) => {
          if (
            response.data.Code === 0 &&
            !untils.isEmpty(response.data["Body"])
          ) {
            this.loading = false;

            console.log(
              "-followby-获取粉丝列表,共有" +
                response.data["Body"].length +
                "条数据"
            );

            this.$store.dispatch("Post/followByAction", response.data["Body"]);
            this.followerCount = response.data["Body"].length;
          } else {
            this.loading = false;
            this.$store.dispatch("Post/followByAction", "");
          }
        })
        .catch((err) => console.log(err));
    },
    // 拉黑列表
    getBlockUser: function (showSkeleton) {
      //先显示出加载动画
      if (showSkeleton)
        this.loading = true;


      //查看拉黑列表
      this.api
        .getBlockUserAPI(this.$store.getters['Post/currentUserGroupState'].UserId)
        .then((response) => {
          if (
            response.data.Code === 0 &&
            !untils.isEmpty(response.data["Body"])
          ) {
            this.loading = false;

            console.log(
              "-blockuser-获取拉黑用户列表成功,共有" +
                response.data["Body"].length +
                "条数据"
            );

            this.$store.dispatch("Post/blockUserAction", response.data["Body"]);
            this.blockCounter = response.data["Body"].length;
          } else {
            console.log("-blockuser-无拉黑用户数据");

            this.loading = false;

            this.$store.dispatch("Post/blockUserAction", "");
          }
        })
        .catch((err) => console.log(err));
    },
    //添加关注
    addFo: function (item, userState) {
      //切换按钮状态
      item.followStat = true;

      let params = {
        fol: item.UserId,
      };
      this.api
        .postAddFoAPI(params)
        .then((response) => {
          if (response.data["Code"] === 0) {
            if (userState)
              this.getFollowBy(false);
            else
              this.getFollowTo(false);
            console.log(
              "-addfollow-关注用户成功：" +
                JSON.stringify(response.data["Body"])
            );
            if (response.data["Body"]) {
            }
          }
        })
        .catch((err) => console.log(err));
    },

    //移除关注
    remFo: function (item, userState) {
      //切换按钮状态
      item.followStat = false;

      let params = {
        fol: item.UserId,
      };

      this.api
        .postRemFoAPI(params)
        .then((response) => {
          if (response.data["Code"] === 0) {
            if (userState)
              this.getFollowBy(false);
            else
              this.getFollowTo(false);
            console.log(
              "-remfollow-取消用户成功：" +
                JSON.stringify(response.data["Body"])
            );
            if (response.data["Body"]) {
            }
          }
        })
        .catch((err) => console.log(err));
    },
    // add block
    addBl: function (item) {
      item.followStat = true;

      let params = {
        blk: item.UserId,
      };
      this.api
        .postBlkUAPI(params)
        .then((response) => {
          if (response.data["Code"] === 0) {
            this.getBlockUser(false);
            console.log(
              "-addblock-关注用户成功：" +
                JSON.stringify(response.data["Body"])
            );
            if (response.data["Body"]) {
            }
          }
        })
        .catch((err) => console.log(err));
    },
    // remove block
    remBl: function (item) {
      item.followStat = false;

      let params = {
        blk: item.UserId,
      };

      this.api
        .postDisBlkUAPI(params)
        .then((response) => {
          if (response.data["Code"] === 0) {
            this.getBlockUser(false);
            console.log(
              "-remblock-取消屏蔽用户成功：" +
                JSON.stringify(response.data["Body"])
            );
            if (response.data["Body"]) {
            }
          }
        })
        .catch((err) => console.log(err));
    },
    getUserStats: function() {
      let tab_id = Number(this.$route.query.tab)

      this.active_tab = tab_id

      if(tab_id === 0 ) {
        this.getFollowTo()
      }else if(tab_id === 1 ) {
        this.getFollowBy()
      }else if(tab_id === 2 ) {
        this.getBlockUser()
      }else {
        this.getFollowTo()
      }
    }
  },
  mounted() {
    let userState = this.$store.getters['Post/userInfoState']

    // this.api.updateTweetUserInfo(userState.GroupDomain, this.$route.query.uid)

    this.api.getCurrentUserInfoByNameAPI(this.$route.query.name).then(response => {

      if(response.data.Code === 0 ) {

        console.log("-tweetuser-查询当前用户信息成功" + JSON.stringify(response.data['Body']))
        //存储到store
        this.$store.dispatch('Post/currentUserGroupAction',response.data['Body'])

        this.curUser = this.$store.getters['Post/currentUserGroupState']


      }
    }).catch(err => console.log(err))
    .finally(() => {

      // this.getUserStats()
      this.getFollowTo(true)
      this.getFollowBy(true)
      this.getBlockUser(true)
      this.showTabs = true

    })
  },
  watch: {
    $route (to, from){
      this.active_tab = this.$route.query.tab
      this.getUserStats()
    }
  }
};
</script>

<style scoped>

</style>
