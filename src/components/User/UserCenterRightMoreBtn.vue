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

        <template v-if="$store.getters['Post/userInfoState'].UserId === source.User.Uid">

        <!--START 顶置按钮-->
          <template v-if="$store.getters['Post/userInfoState'].TopTw !=='0'">

            <v-list-item

                @click="unPinTw(source)"
            >
              <v-list-item-icon class="mr-2">
                <v-icon >ri-pushpin-2-line</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-body-2" >
                  Unpin this post
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </template>
          <template v-else>

            <v-list-item

                @click="pinTw(source)"
            >
              <v-list-item-icon class="mr-2">
                <v-icon >ri-pushpin-2-line</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-body-2" >
                  Pin the post
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </template>

        <!--END 顶置按钮-->

        </template>

        <!--START 添加bookmark按钮-->
        <v-list-item
            @click="addBookmark(source)"
        >
          <v-list-item-icon class="mr-2">
            <v-icon >ri-bookmark-3-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" >Add to bookmark</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--END 添加bookmark按钮-->

        <!--START 删除贴子按钮-->
        <v-list-item
            @click="delTw(source)"
        >
          <v-list-item-icon class="mr-2">
            <v-icon color="pink">ri-delete-bin-2-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" >Delete this post</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--END 删除贴子按钮-->

<!--        <v-list-item>
          <v-list-item-content>
            P-T: {{  source }}
            {{ $store.getters['Post/userInfoState'] }}
          </v-list-item-content>
        </v-list-item>-->

      </v-list-item-group>
    </v-list>


  </v-menu>
  <!--END  右侧操作按钮-->
</template>

<script>


export default {
  name: "UserCenterRightMoreBtn",
  props: {
    source: Object
  },
  methods : {
    //取消顶置贴子
    unPinTw: function (source) {

      let data = {
        "toptw": '0'
      }

      //设置顶置贴
      this.api.postSetTopTwAPI(data).then(response => {

        if(response.data.Code === 0 ) {
          console.log("-settoptw- 设置置顶贴成功" + response.data['Body'])

          //设置成功后，查询获取顶置贴的具体内容
          this.$store.dispatch('Post/currentTopTwAction','')

          //更新用户信息
          this.api.updateUserInfo()

        }
      }).catch(err => console.log(err))

    },
    //顶置贴子
    pinTw: function (source) {

      let data = {
        "toptw": source.T.toString()
      }

      //设置顶置贴
      this.api.postSetTopTwAPI(data).then(response => {

        if(response.data.Code === 0 ) {
          console.log("-settoptw- 设置置顶贴成功" + response.data['Body'])

          //设置成功后，查询获取顶置贴的具体内容
          this.api.getTweetsAPI(source.T).then(response => {

            if(response.data.Code === 0 ) {
              console.log("-get-查询顶置贴子内容成功" + response.data['Body'])

              //查询成功后，将内容存进store
              let data = {
                'T': source.T,
                'message': response.data['Body']
              }

              //更新用户信息
              this.api.updateUserInfo()

              this.$store.dispatch('Post/currentTopTwAction',data)

            }
          }).catch(err => console.log(err))

        }
      }).catch(err => console.log(err))

    },
    //删除贴子
    delTw: function (source) {
      let data = {
        "block": source.T,
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
    addBookmark:function (source) {
      let data = {
        "T": source.T,
      }
      this.api.postAddBookmarkAPI(data).then(response => {
        if(response.data.Code === 0) {

          console.log("添加书签成功，:"+JSON.stringify(response.data))

        }
      }).catch(err => console.log(err))
    },
  },

}
</script>

<style scoped>

</style>
