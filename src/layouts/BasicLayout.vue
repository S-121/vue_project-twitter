<template>

  <v-main class="grey lighten-4">

    <v-container  class="pt-1 d-flex justify-center ">

      <div class="left">
        <v-sheet  min-width="300" max-width="300" class="hidden-xs-only"
                  style="position:fixed;
                    height:100%;
                "
        >
          <Sidebar ></Sidebar>
        </v-sheet>
      </div>

      <div class="middle">
        <keep-alive>
        <v-sheet min-width="600" max-width="600" class="timeline-content">

            <router-view  ></router-view>

        </v-sheet>
        </keep-alive>
      </div>

      <div class="right">
        <v-sheet max-width="350" min-width="350" class="hidden-xs-only grey lighten-4"
                 style="position:fixed;
         "
        >
          <RightBar  />
        </v-sheet>
      </div>

      <!--        <div class="d-flex  justify-center grey lighten-4" >

                <v-sheet  min-width="270" max-width="270" class="hidden-xs-only"
                          style="position:fixed;
                      height:100%;
                      float: right;
                      right:0;
                      bottom: 0;
                      top:0;
                      left:100px;"
                >
                  <Sidebar ></Sidebar>
                </v-sheet>

                <v-sheet min-width="600" max-width="600" class="timeline-content">
                    <router-view  ></router-view>
                </v-sheet>
                <v-sheet max-width="350" min-width="350" class="hidden-xs-only grey lighten-4"
                 style="position:fixed;
                top:10px;
                right:5px;"
                >
                  <RightBar  />
                </v-sheet>

              </div>-->


    </v-container>

    <CommentDialog   v-on:postCoTweet = 'postCoTweet' />

    <QotDialog v-on:postQoTweet = 'postQoTweet' />

  </v-main>


</template>

<script>
import TweetSendArea from "@/components/Post/TweetSendArea"
import RightBar from "@/views/Pages/RightBar"
import Sidebar from "@/views/Pages/Sidebar"
import untils from "@/utils/untils"
import QotDialog from "@/components/Post/QotDialog";
import CommentDialog from "@/components/Post/CommentDialog";



export default {
  components: {QotDialog, CommentDialog, RightBar, Sidebar, TweetSendArea },
  data: () => ({
    tab: null,
    hotUsers: null,
    value: 1
  }),
  methods: {
    //发送引用
    postQoTweet:function (qotObj){

      //引用评论成功立即关闭窗口
      this.$store.dispatch('Post/qotDialogStatusAction',false)

      console.log('引用评论窗口中的消息体：' + JSON.stringify(qotObj))

      //评论数据
      let data = {
        "qotweet": qotObj.QotS[0].T,
        "tweet": qotObj.Tw,
        "device": 'web'
      }

      this.api.postQoTweetAPI(data).then(response => {
        if(response.data.Code === 0) {

          // 返回T数据后，组装message消息体，存放进messages数组中，立即显示在timeline
          if(response.data['Body']) {

            console.log('发送引用评论成功 ：' + JSON.stringify(response.data['Body']))

          }

          //隐藏动画
          this.btn_loading = false
          this.loading = false

          //清空数据
          this.fileRecordsForUpload = []
          this.fileRecords = []
          //清空消息框
          this.$store.dispatch('Post/tweetAction','')

          //清空评论弹窗中的输入内容
          this.$store.dispatch('Post/qotDialogCommentAction','')

        }
      }).catch(err => console.log(err))
    },
    //发送评论 被子组件调用
    postCoTweet:function (commentObj){

      //评论成功立即关闭窗口
      this.$store.dispatch('Post/commentDialogStatusAction',false)

      console.log('评论窗口中的消息体：' + JSON.stringify(commentObj))

      //评论数据
      let data = {
        "cotweet": commentObj.PatS[0].T,
        "tweet": commentObj.Tw,
        "device": 'web'
      }

      if(untils.isEmpty(localStorage.getItem('userinfo'))) {

        this.api.updateUserInfo()

      }

      this.api.postCoTweetAPI(data).then(response => {
        if(response.data.Code === 0) {

          // 返回T数据后，组装message消息体，存放进messages数组中，立即显示在timeline
          if(response.data['Body']) {

            console.log('发送评论成功 ：' + JSON.stringify(response.data['Body']))

          }

          //隐藏动画
          this.loading = false

          //清空数据
          this.fileRecordsForUpload = []
          this.fileRecords = []
          //清空消息框
          this.$store.dispatch('Post/tweetAction','')

          //清空评论弹窗中的输入内容
          this.$store.dispatch('Post/commentDialogCommentAction','')

        }
      }).catch(err => console.log(err))
    },
  },
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return 'info'
        case 1:
          return 'grey'
        case 2:
          return 'info'
        case 3:
          return 'info'
        default:
          return 'blue-grey'
      }
    },
  },
  beforeCreate() {

    // 更新helloData数据
    this.api.getHelloData()
  },

  created() {
    //获取用户所关注的群组列表
    this.api.getFollowToAPI(JSON.parse(localStorage.getItem('userinfo')).UserId).then(response => {
      if(response.data.Code === 0) {
        console.log("获取关注群组成功，长度："+response.data['Body'].length)
        this.$store.dispatch('Post/userFollowToAction',response.data['Body'])
      }
    }).catch(err => console.log(err))
  }
};
</script>

<style scoped>
.left {
  /* 左右固定长度 */
  flex-basis: 300px;
  /* 将增长比和缩小比都设置为 0 ,避免宽度变化 */
  flex-grow: 0;
  flex-shrink: 0;
}
.right {
  /* 左右固定长度 */
  flex-basis: 350px;
  /* 将增长比和缩小比都设置为 0 ,避免宽度变化 */
  flex-grow: 0;
  flex-shrink: 0;
}
.middle {
  /* 中间自动适应 */
  flex-basis: 600px;
  flex-grow: 0;
  flex-shrink: 0;
}


.timeline-content {
  border-left:1px solid #EFEFEF !important;
  border-right:1px solid #EFEFEF !important;
}
.line {
  height: 16px;
  background-color: #f5f5f5;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s ,transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

</style>
