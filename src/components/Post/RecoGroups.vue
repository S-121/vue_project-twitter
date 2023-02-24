<template>
  <v-card
      flat
      class="mx-2 mt-4"
      elevation='1'
  >

    <v-list three-line color="">
      <v-list-item-title class="ml-4 text-h6 font-weight-black">
        {{ $t('recommend groups') }}
      </v-list-item-title>


      <template v-if="groups.length > 0">
        <template v-for="(group, index) in groups">

          <v-divider
              v-if="index !==0"
              :inset="true"
          ></v-divider>

          <v-list-item
              :key="index">
            <v-badge
                bordered
                bottom
                color="green accent-4"
                dot
                offset-x="25"
                offset-y="30"
                :value="group.online"
            >
            <v-list-item-avatar  size="50">
              <v-img v-if="group.url" :src="group.url" />
              <v-img v-else :src="dAvatar.url" />
            </v-list-item-avatar>
            </v-badge>
            <v-list-item-content class="align-self-start mt-2">
              <v-list-item-title class="text-no-wrap font-weight-bold">
                {{ group.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="grey--text lighten-1 mt-0">@{{ group.name }} </v-list-item-subtitle>

            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                  :key="group.UserId"
                  depressed
                  fab
                  outlined
                  dark
                  :color="group.followStat ? 'grey' : 'info'"
                  @click.native="group.followStat ? remFo(item) : addFo(item)"
              >
                <v-icon >{{ group.followStat ? 'ri-user-unfollow-line' : 'ri-group-line' }}</v-icon>
              </v-btn>
            </v-list-item-action>

          </v-list-item>

        </template>
      </template>

    </v-list>
  </v-card>
</template>

<script>

export default {
name: "RecoGroups",
  data: () => ({
    followText: this.$t('following'),
    RecoU:[],
    showMore: 4,
    dAvatar: {
      url: require('../../assets/users/user-d.png'),
      alt: this.$t('default avatar')
    },
  }),

  created() {
    /*this.api.getRecoUAPI().then(response => {
      if(response.data['Code'] === 0) {
        console.log("-reco-获取推荐用户共"+JSON.stringify(response.data['Body'].length) + "条")
        if(response.data['Body']) {

          //添加关注按钮状态标识
          let recoList = []
          for(let i = 0; i < response.data['Body'].length; i++){
            let obj = response.data['Body'][i]
            obj.followStat = false
            recoList.push(obj)
          }

          console.log('修改推荐用户列表数组：' + JSON.stringify(recoList))

          this.RecoU = recoList
        }
      }
    }).catch(err => console.log(err))*/
  },
  computed: {
    blk_btn:function (event) {
      return !event
    }
  },
  methods: {



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
          if(response.data['Body']) {
          }
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
          if(response.data['Body']) {
          }
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
