<template>
<div class="pb-12">
<!--START 加载动画-->
<!--<v-sheet
    v-if="loading"
    class="pa-3"
>
  <v-skeleton-loader
      class="mx-auto"
      type="image"
  ></v-skeleton-loader>

  <v-skeleton-loader
      class="mx-auto  mt-4"
      type="list-item-avatar-three-line, divider, list-item-three-line, card-heading"
  ></v-skeleton-loader>

  <v-skeleton-loader
      class="mx-auto  mt-4"
      type=" divider,list-item-avatar-three-line, divider, list-item-three-line, card-heading, divider"
  ></v-skeleton-loader>

  <v-skeleton-loader
      class="mx-auto  mt-4"
      type=" divider,list-item-avatar-three-line, divider, list-item-three-line, card-heading"
  ></v-skeleton-loader>

  <v-skeleton-loader
      class="mx-auto  mt-4"
      type=" divider,list-item-avatar-three-line, divider, list-item-three-line, card-heading, divider"
  ></v-skeleton-loader>

</v-sheet>-->
<!--END 加载动画-->

<!--START banner * tabs-->
<v-card
    tile
    flat
    class="overflow-hidden">
    <v-app-bar
        color="#6A76AB"
        dark
        shrink-on-scroll
        :src="$store.getters['Post/currentUserGroupState'].BannerPic"
    >
    <!--src="https://picsum.photos/1920/1080?random"-->
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(39,65,110,.1), rgba(25,32,72,.1)"
        ></v-img>
      </template>

      <v-btn icon @click="backHistory">
        <v-icon color="white" >ri-arrow-left-line</v-icon>
      </v-btn>

      <v-toolbar-title class="align-self-start pt-2 pl-1">
        {{ $store.getters['Post/currentUserGroupState'].Username }}
      </v-toolbar-title>

      <template v-slot:extension>

        <v-tabs align-with-title v-model="tab" dark color="pink" slider-color="info" background-color="#42424230" >
          <v-tab>{{ $t('posts') }}</v-tab>
<!--          <v-tab disabled>Articles</v-tab>
          <v-tab disabled>Video</v-tab>-->

          <v-spacer></v-spacer>
          <!--START 用户组按钮-->
          <v-btn
              v-if="$store.getters['Post/currentUserGroupState'].IsGroup > 0"
              text
              color="orange accent-3"
              small
              class="px-4 my-2 mx-2"
              right
              @click="getGroupTimeline($store.getters['Post/currentUserGroupState'])"
          >
            <v-icon color="orange accent-3" left>ri-group-line</v-icon>
            {{ $store.getters['Post/currentUserGroupState'].Username }}' Group
          </v-btn>
          <!--END  用户组按钮-->
        </v-tabs>

      </template>

    </v-app-bar>
</v-card>
<!--END banner * tabs-->
<!--START 如果被对方屏蔽，显示提示-->
<template v-if="$store.getters['Post/currentUserGroupState'].HeBlocksMe">

    <div class="d-flex justify-center py-12 text-h4 font-weight-bold">
      {{ $t('you have been blocked') }}.
    </div>
    <div class="d-flex justify-center ma-12  text-h6">
      {{ $t('you cannot follow and look up') }}  {{ $store.getters['Post/currentUserGroupState'].Username }} {{ $t("'s posts") }} .
    </div>

</template>
<!--END 如果被对方屏蔽，显示提示-->

<template v-else>

  <!--START  屏蔽提示信息-->
  <template v-if="isShowPosts ? false : $store.getters['Post/currentUserGroupState'].IBlockHim ">

    <div class="d-flex justify-center py-16 text-h4 font-weight-bold">
      {{ $store.getters['Post/currentUserGroupState'].Username + ' is ' + $t('blocked.') }}.
    </div>
    <div class="d-flex justify-center  pa-8  text-h6">

      {{ $t('are you sure you want to view these Tweets') }}?
      <br/>
      {{ $t("viewing tweets won’t unblock") }} {{ $store.getters['Post/currentUserGroupState'].Username }}  .

    </div>
    <div class="d-flex justify-center  pa-8  text-h6">

      <v-btn outlined
             depressed
             color="info"
             width="200"
             @click.stop="showPosts"
      >
        {{ $t("view posts") }}
      </v-btn>

    </div>
    <div class="d-flex justify-center mb-8  pa-0  text-h6">

      <v-btn
          dark
          depressed
          color="pink"
          width="200"
          @click.stop="remBl($store.getters['Post/currentUserGroupState'])"
      >
        {{ $t("unblock") }}
      </v-btn>

    </div>


  </template>
  <!--END  屏蔽提示信息-->

  <!--START  贴子列表-->
  <template v-else>
    <v-tabs-items v-if="!loading" v-model="tab">
      <v-tab-item>
        <v-card flat>
          <!--START 顶置贴-->
          <template v-if="!this.untils.isEmpty($store.getters['Post/currentTopTwState']['message']) && !this.untils.isEmpty($store.getters['Post/currentTopTwState']) ">
            <Post :source="$store.getters['Post/currentTopTwState']['message']" ></Post>
          </template>
          <!--END 顶置贴-->

          <!--START 虚拟滚动条 优化页面性能-->
          <VirtualPostList
              :page-name="'usercenter'"
              :data-sources="this.$store.getters['Post/ucPostListState']"
              :data-component="this.itemComponent" />
          <!--END 虚拟滚动条 优化页面性能-->

        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </template>
  <!--END  贴子列表-->


</template>


</div>
</template>

<script>
import untils from "@/utils/untils"
import MainPost from "@/components/Post/MainPost"
import UserPostItem from "@/components/User/UserPostItem"
import Post from "@/components/Post/Post";
import VirtualPostList from "@/components/Post/VirtualPostList";


export default {
  name: "UserCenter",
  components: {VirtualPostList, Post, MainPost },
  props: {
    uname: String
  },
  data: () => ({
    loading: true,
    itemComponent: UserPostItem,
    tab: null,
    isShowPosts: false,
  }),
  methods: {
    // show posts
    showPosts: function () {

      this.isShowPosts =  true

    },
    // remove block
    remBl: function (item) {

      let params = {
        blk: item.UserId,
      };

      this.api
          .postDisBlkUAPI(params)
          .then((response) => {
            if (response.data["Code"] === 0) {

              console.log(
                  "-remblock-取消屏蔽用户成功：" +
                  JSON.stringify(response.data["Body"])
              );

              // 取消成功后更新数据
              this.fetchUserData()

            }
          })
          .catch((err) => console.log(err));
    },

    backHistory: function () {

      this.$router.go(-1);//返回上一层
    },
    //获取群组Timeline/用户Timeline
    getGroupTimeline: function (user) {

      this.api.getGroupTimeline(user)

    },
    //用户转换为组
    userToGroup: function(uid) {
        alert(uid)
    },

    //进入所选用户中心
    fetchUserData: function () {

      let name = this.$route.query.name

      //查询当前用户信息
      this.api.getCurrentUserInfoByNameAPI(name).then(response => {

        if(response.data.Code === 0 ) {
          console.log("-tweetuser-查询当前用户信息成功" + response.data['Body'])

          this.$store.dispatch('Post/currentUserGroupAction',response.data['Body'])

        }
      }).catch(err => console.log(err))

      //获取当前用户所有推文
      this.api.getUserTwByNameAPI(name).then(response => {

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body']['timeline'])) {
          console.log("-usertw-获取用户中心贴子列表成功，共有贴子" + response.data['Body']['timeline'].length +'条')
          console.log( JSON.stringify(response.data['Body']))
          this.loading = false

          //当前用户的所有推文存入到messages数组
          this.$store.dispatch('Post/ucPostListAction',response.data['Body']['timeline'])

          let toptw = response.data['Body']['toptw']

          console.log('----toptw----' + toptw)

          // 如果返回为'0'，则为没有顶置贴
          if(toptw !== '0') {

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

          }



        }
      }).catch(err => console.log(err))

    },
  },
  watch: {
    "$route": "fetchUserData"
  },

  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchUserData()
  },
  mounted() {

  }

}
</script>

<style scoped >
.v-tabs-bar .v-slide-group__wrapper .v-tab {
  color: rgba(255, 255, 255, 1) !important
}


</style>
