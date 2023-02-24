<template>
<!--
  贴子详情
  包括：
  主贴内容
  跟帖列表
  -->
  <v-card
      class="mx-auto"
      tile
      flat
  >
    <!--START 返回按钮 标题-->
    <v-toolbar
        light
        flat
    >
      <v-btn icon @click="backHistory">
      <v-icon color="info" >ri-arrow-left-line</v-icon>
      </v-btn>

      <v-toolbar-title class="pl-0 font-weight-black">{{ $t('posts') }}</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-toolbar>
    <!--END 返回按钮 标题-->

    <!--START 分割线-->
    <v-divider ></v-divider>
    <!--END  分割线-->

    <!--START 贴子内容区-->
    <template v-if="$store.getters['Post/postListState']" >
      <MainPost  :source="$store.getters['Post/postListState']" />
    </template>
    <!--END 贴子内容区-->

  </v-card>
</template>

<script>
import untils from "@/utils/untils"
import MainPost from "@/components/Post/MainPost";


export default {
  name: "PostList",
  components: {MainPost},
  data: () => ({

  }),
  methods: {
    backHistory: function () {

      this.$router.go(-1);//返回上一层
    },
    //获取贴子数据
    fetchPostData: function () {

      //获取贴子id
      let pid = this.$route.query.pid

      //获取贴子信息
      this.api.getTweetsAPI(pid).then(response => {

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {

          console.log("-getTweetsAPI-" + JSON.stringify(response.data['Body']))

          //存入store 跟帖列表
          this.$store.dispatch('Post/postListAddAction',response.data['Body'])

          console.log('跟帖列表：' + JSON.stringify(response.data['Body']))

          //滚动到上部
          this.$vuetify.goTo(10, { duration: 300,offset: 0, easing: 'linear' })


        }
      }).catch(err => console.log(err))

    },
  },

  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchPostData()
  },

}
</script>

<style scoped>

</style>
