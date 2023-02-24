<template>
  <!--START 右侧操作按钮-->
  <v-menu bottom right>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          small
          light
          icon
          v-bind="attrs"
          v-on="on"
          right
          color="info"
          class="float-right"
      >
        <v-icon color="grey darken-2" size="18">ri-more-fill</v-icon>
      </v-btn>
    </template>

    <v-list dense rounded>
      <v-list-item-group
          color="primary"
      >
        <!--START 关注按钮-->
        <v-list-item
            v-if="!getIsMe(source)"
            @click="followUser(source)"
        >
          <v-list-item-icon class="mr-2">
            <v-icon >ri-user-follow-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" >
              {{ $t('follow') }}
              <label class="blue--text">{{ getUser(source).UserD }}</label>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--END 关注按钮-->

        <!--START block用户按钮-->
        <v-list-item
            v-if="!getIsMe(source)"
            @click="blockUser(source)"
        >
          <v-list-item-icon class="mr-2">
            <v-icon >ri-forbid-2-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" >
              {{ $t('blocks') }}
              <label class="blue--text">{{ getUser(source).UserD }}</label>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--END block用户按钮-->

        <!--START 顶置按钮-->
        <v-list-item
            v-if="getIsMe(source)"
            @click="pinTw(source)"
        >
          <v-list-item-icon class="mr-2">
            <v-icon >ri-pushpin-2-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" >
              {{ $t('pin') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--END 顶置按钮-->

        <!--START 添加bookmark按钮-->
        <v-list-item
            @click="addBookmark(source)"
        >
          <v-list-item-icon class="mr-2">
            <v-icon >ri-bookmark-3-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" >{{ $t('add to bookmark') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--END 添加bookmark按钮-->


        <!--START 举报贴子按钮-->
        <v-list-item
            v-if="!getIsMe(source)"
            @click="reportPost(source)"
        >
          <v-list-item-icon class="mr-2">
            <v-icon color="pink">ri-alarm-warning-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" >{{ $t('report this post') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--END 举报贴子按钮-->


        <!--START 删除贴子按钮-->
        <v-list-item
            v-if="getIsMe(source)"
            @click="delTw(source)"
        >
          <v-list-item-icon class="mr-2">
            <v-icon color="pink">ri-delete-bin-2-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" >
              {{ $t('delete this post') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--END 删除贴子按钮-->


      </v-list-item-group>
    </v-list>


  </v-menu>
  <!--END  右侧操作按钮-->
</template>

<script>

export default {
  name: "RightMoreBtn",
  data: () => ({

  }),
  props: {
    source: Object,
    patS: Boolean,
  },

  // 计算贴子T的值，区分转推或者正常贴
  computed: {
    //计算User name
    getUser() {

      return function (source) {

        // 先判断是否为父亲贴
        if(this.patS) {

          return source.User

        }else{

          return source.Retw === '' ? source.User : source.ReUser

        }

      }

    },

    //计算是否为本人
    getIsMe() {

      return function (source) {

        let  u = this.$store.getters['Post/userInfoState']

        // 先判断是否为父亲贴
        if(this.patS) {

          return u.UserId === source.User.Uid

        }else{

          // 为普通贴时
          if(source.Retw === ''){
            return u.UserId === source.User.Uid
          }
          // 为转贴时
          else{
            return u.UserId === source.ReUser.Uid
          }

        }

      }


    },
    //计算T
    getT() {
      return function (source) {

        // 先判断是否为父亲贴
        if(this.patS) {

          return source.T

        }else{

          return source.Retw === '' ? source.T : source.Retw

        }



      }
    }
  },

  methods : {
    //顶置贴子
    pinTw: function (source) {

      let data = {
        "toptw": this.getT(source)
      }

      //设置顶置贴
      this.api.postSetTopTwAPI(data).then(response => {

        if(response.data.Code === 0 ) {

          console.log("-settoptw- 设置置顶贴成功" + response.data['Body'])

        }
      }).catch(err => console.log(err))

    },
    //删除贴子
    delTw: function (source) {
      let data = {
        "block": this.getT(source),
        "device": 'web'
      }
      this.api.postBlockTweetAPI(data).then(response => {

        if(response.data.Code === 0) {

          console.log("屏蔽推文成功，:"+JSON.stringify(response.data))
          // 屏蔽成功后，不显示此贴子
          this.$store.dispatch('Post/messagesAction',{
            "type": "del",
            "message": source.T
          })


        }
      }).catch(err => console.log(err))
    },
    followUser:function (source) {
      let params = {
        "fol": this.getUser(source).Uid
      }
      this.api.postAddFoAPI(params).then(response => {

        if(response.data['Code'] === 0) {

          console.log('-addfollow-关注用户成功：' + JSON.stringify(response.data['Body']))

        }else{
          // 显示信息
          this.$store.dispatch('Home/snackBarTextAction',response.data['Msg'])
          this.$store.dispatch('Home/snackBarShowAction',true)
        }

      }).catch(err => console.log(err))

    },
    unFollowUser:function (source) {

      let params = {
        "fol": this.getUser(source).Uid
      }

      this.api.postRemFoAPI(params).then(response => {

        if(response.data['Code'] === 0) {

          console.log('-remfollow-取消用户成功：' + JSON.stringify(response.data['Body']))

        }else{
          // 显示信息
          this.$store.dispatch('Home/snackBarTextAction',response.data['Msg'])
          this.$store.dispatch('Home/snackBarShowAction',true)
        }

      }).catch(err => console.log(err))

    },
    blockUser: function (source) {

      let params = {
        "blk": this.getUser(source).Uid
      }

      this.api.postBlkUAPI(params).then(response => {

        if(response.data['Code'] === 0) {

          console.log("-block-屏蔽用户成功:"+response.data)

        }else{
          // 显示信息
          this.$store.dispatch('Home/snackBarTextAction',response.data['Msg'])
          this.$store.dispatch('Home/snackBarShowAction',true)
        }

      }).catch(err => console.log(err))

    },
    //举报贴子
    reportPost:function (source){

      this.$store.dispatch('Post/reportDialogAction',true)

      //将被举报的贴子数据储存store
      this.$store.dispatch('Post/reportPostAction',source)

    },
    //添加书签
    addBookmark:function (source) {
      let data = {
        "T": this.getT(source),
      }
      this.api.postAddBookmarkAPI(data).then(response => {

        if(response.data.Code === 0) {

          console.log("添加书签成功，:"+JSON.stringify(response.data))

        }else{
          // 显示信息
          this.$store.dispatch('Home/snackBarTextAction',response.data['Msg'])
          this.$store.dispatch('Home/snackBarShowAction',true)
        }

      }).catch(err => console.log(err))
    },
  },
  beforeCreate() {

  }

}
</script>

<style scoped>

</style>
