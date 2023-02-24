<template>
  <v-card
      flat
      class="mx-2 mt-4"
      elevation='1'
  >

    <v-list three-line color="">
      <v-list-item-title class="ml-4 text-h6 font-weight-black">
         {{ $t('recommend users') }}
      </v-list-item-title>

      <template v-if="RecoU.length > 0">
        <template v-for="(item, index) in RecoU">
          <v-divider
              v-if="index !==0"
              :inset="true"
          ></v-divider>

          <v-list-item

              :key="index">
            <v-badge
                bordered
                color="orange accent-3"
                icon="ri-group-fill"
                overlap
                size="20"
                offset-x="32"
                offset-y="34"
                :value="item.IsGroup > 0"
            >
              <v-list-item-avatar size="50"  @click.stop="getUserCenter(item.Username)" style="cursor:pointer">
                <v-img v-if="item.Avatar96" :src="item.Avatar96 | getFullUrl"  :lazy-src="require('../../assets/users/user-d.png')" />
                <v-img v-else :src="require('../../assets/users/user-d.png')" />
              </v-list-item-avatar>
            </v-badge>
            <v-list-item-content style="cursor:pointer" @click.stop="getUserCenter(item.Username)" class="align-self-start mt-2">
              <v-list-item-title class="text-no-wrap font-weight-bold">
                {{item.DisplayName}}
                <!--                <span class="font-weight-light grey&#45;&#45;text lighten-1">
                               @{{item.Username}}
                                </span>-->
                <!--                <v-btn
                                    icon
                                    color="pink"
                                    @click="blkU(item.UserId,index)"
                                >
                                  <v-icon>mdi-account-cancel</v-icon>
                                </v-btn>
                                <v-btn
                                    icon
                                    color="blue"
                                    @click="disBlkU(item.UserId,index)"
                                >
                                  <v-icon>mdi-account-plus</v-icon>
                                </v-btn>
                                <v-btn
                                    icon
                                    color="green"
                                    @click="addFo(item.UserId,index)"
                                >
                                  <v-icon>mdi-account-check</v-icon>
                                </v-btn>
                                <v-btn
                                    icon
                                    color="grey"
                                    @click="remFo(item.UserId,index)"
                                >
                                  <v-icon>mdi-account-minus</v-icon>
                                </v-btn>-->
              </v-list-item-title>
              <v-list-item-subtitle class="grey--text lighten-1 mt-0">{{item.Description}} </v-list-item-subtitle>

            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                  :key="item.UserId"
                  small
                  depressed
                  outlined
                  dark
                  :color="item.followStat ? 'grey' : 'info'"
                  @click.stop="item.followStat ? remFo(item) : addFo(item)"
              >
                {{ $t('follow') }}
              </v-btn>
            </v-list-item-action>

          </v-list-item>

        </template>
      </template>

    </v-list>
  </v-card>
</template>

<script>
import untils from "@/utils/untils";


export default {
name: "RecoUsers",
  data: () => ({
    followText: '关注',
    RecoU:[],
    showMore: 4,
  }),

  created() {
    this.api.getRecoUAPI().then(response => {
      if(response.data['Code'] === 0) {
        if(response.data['Body']) {

          console.log("-reco-获取推荐用户共"+response.data['Body'].length + "条")
          let recoList = []
          for(let i = 0; i < response.data['Body'].length; i++){
            let obj = response.data['Body'][i]
            //添加关注按钮状态标识
            obj.followStat = false
            recoList.push(obj)
          }

          console.log('修改推荐用户列表数组：' + JSON.stringify(recoList))

          this.RecoU = recoList
        }
      }
    }).catch(err => console.log(err))
  },
  computed: {
    blk_btn:function (event) {
      return !event
    }
  },
  methods: {
    //进入所选用户中心
    getUserCenter: function (name) {

      //跳转到用户中心页面
      this.$router.push({
        path: "/usercenter",
        query: {
          name: name
        }
      })

    },


    //添加关注
    addFo: function (item) {

      //切换按钮状态
      item.followStat = true

      let params = {
        "fol": item.UserId
      }
      this.api.postAddFoAPI(params).then(response => {
        if(response.data['Code'] === 0) {
          console.log('-addfollow-关注用户成功：' + JSON.stringify(response.data['Body']))
          //更新左侧关注列表
          this.api.updateUserFollowTo()
          //更新timeline
          this.getTimeLine()

        }
      }).catch(err => console.log(err))
    },

    //移除关注
    remFo: function (item) {

      //切换按钮状态
      item.followStat = false

      let params = {
        "fol": item.UserId
      }

      this.api.postRemFoAPI(params).then(response => {

        if(response.data['Code'] === 0) {
          console.log('-remfollow-取消用户成功：' + JSON.stringify(response.data['Body']))
          //更新左侧关注列表
          this.api.updateUserFollowTo()
        }
      }).catch(err => console.log(err))
    },

    //拖黑
    blkU: function (uid,index) {

      //数组中添加元素
      this.RecoU[index].show = true


      let params = {
        "blk": uid
      }

      this.api.postBlkUAPI(params).then(response => {

        if(response.data['Code'] === 0) {
          console.log("添加关注用户成功:"+response.data)
          if(response.data['Body']) {
          }
        }

      }).catch(err => console.log(err))
    },

    //取消拖黑
    disBlkU: function (uid,index) {

      //数组中添加元素
      this.RecoU[index].show = false

      let params = {
        "blk": uid
      }

      this.api.postDisBlkUAPI(params).then(response => {
        if(response.data['Code'] === 0) {
          console.log("添加关注用户成功:"+response.data)
          if(response.data['Body']) {
          }
        }
      }).catch(err => console.log(err))

    }
  }
}
</script>

<style scoped>

</style>
