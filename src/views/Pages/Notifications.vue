<template>
  <v-card
      class="mx-auto"
      tile
      flat
  >
    <v-toolbar
        light
        flat
    >
      <v-btn icon @click="backHistory">
        <v-icon color="info" >ri-arrow-left-line</v-icon>
      </v-btn>

      <v-toolbar-title class="pl-0 font-weight-black">{{ $t('notifications') }}
<!--        <v-chip
            class="ma-2"
            color="info"
            small
        >
          {{ $store.getters['Post/notifyMsgsState'].length }}
        </v-chip>-->
      </v-toolbar-title>

      <v-spacer></v-spacer>

  <!--<v-btn v-if="$store.getters['Post/notifyMsgsState'].length > 0" icon @click="emptyNotify">
        <v-icon color="green darken-3">ri-check-double-fill</v-icon>
      </v-btn>-->

    </v-toolbar>

    <v-divider></v-divider>


    <v-list class="py-0">
      <v-list-item-group
          active-class="blue--text"
          v-model="selected"
      >

        <!--START 通知列表循环-->
        <template v-if="$store.getters['Post/uLogsState']">
          <template v-for="(item,index) in $store.getters['Post/uLogsState']">

            <v-list-item class="pa-0" >

              <template v-slot:default="{ active }">
                <v-list-item-content class="pa-0">

                  <NotifyItem :source='item.Msg' :act="item.Act" :Resps="item.Resps" />

                </v-list-item-content>

              </template>

            </v-list-item>
            <v-divider
                v-if="index < $store.getters['Post/uLogsState'].length "
                :key="index"
            ></v-divider>
          </template>

        </template>
        <template v-else>
          <template v-if="loading">
            <NotificationsSkeletonLoader  />
          </template>
          <template v-else>
            <v-list-item class="pa-0" >

              <template v-slot:default="{ active }">
                <v-list-item-content class="pa-0 justify-center">

                  {{ $t('no data available') }}

                </v-list-item-content>

              </template>

            </v-list-item>

          </template>

        </template>
        <!--END 通知列表循环-->
        <v-divider></v-divider>

      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import {formatDate} from "@/utils/formatDate"
import untils from "@/utils/untils";
import NotifyItem from "@/components/Post/NotifyItem";
import NotificationsSkeletonLoader from "@/components/Common/NotificationsSkeletonLoader";

// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true



export default {
  name: "Notifications",
  components: {NotificationsSkeletonLoader, NotifyItem},
  data: () => ({
    loading: true,
    selected: [0,1,2,4],
  }),
  //过滤器
  filters: {

  },
  methods: {
    backHistory: function () {
      this.$router.go(-1);//返回上一层
    },
    emptyNotify: function () {
      //清空通知消息
      this.$store.dispatch('Post/notifyMsgEmptyAction','')
    },
    getLog: function () {
      //查看日志列表
      this.api.getLogAPI().then(response => {

        if(response.data.Code === 0 ) {

          if(untils.isEmpty(response.data['Body'])) {
            this.loading = false
          }

          console.log("-ulog-获取日志成功，"+JSON.stringify(response.data['Body']));

          this.$store.dispatch('Post/uLogsAction',response.data['Body'])

        }
      }).catch(err => console.log(err))
    }
  },

  mounted() {

    this.getLog()

    //清空通知消息
    this.$store.dispatch('Post/notifyMsgEmptyAction','')

    this.$store.dispatch('Post/notifyCountAction', 0)

    //十秒钟后设置成已读
    setTimeout(() => {

      this.$store.dispatch('Post/uLogsSetReadedAction','')

    }, 10000)

  },
  destroyed() {

    //清空数据
    this.$store.dispatch('Post/uLogsAction','')

  }
}
</script>

<style scoped>

</style>
