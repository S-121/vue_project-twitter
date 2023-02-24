<template>
  <!--START 虚拟滚动条 优化页面性能-->
  <VirtualList v-if="!loading" class="list-page scroll-touch" ref="vsl"

                :data-key="'T'"
                :data-sources="dataSources"
                :data-component="dataComponent"
                :keeps="100"
                :estimate-size="140"
                :item-class="'list-item-page'"
                :page-mode="true"
                v-on:totop="totop"
                v-on:tobottom="tobottom"
                @scroll="getScroll"
  >
    <div v-show="$store.getters['Post/timelineLoaderState']" slot="footer" >
      <PostSkeletonLoader />
    </div>
  </VirtualList>
  <!--END 虚拟滚动条 优化页面性能-->
</template>

<script>

import PostSkeletonLoader from "@/components/Post/PostSkeletonLoader";
import untils from "@/utils/untils";
import VirtualList from 'vue-virtual-scroll-list'


export default {
  name: "VirtualPostList",
  components: {PostSkeletonLoader,VirtualList},
  data() {
    return {

    };
  },
  props: {
    loading: Boolean,
    dataComponent: Object,
    dataSources: Array,
    pageName: String

  },
  methods: {
    totop () {
      console.log('reach totop')

      //滚动到最上部时，把缓存的新消息直接显示在timeline
      if(this.$store.getters['Post/cacheMessagesState'].length > 0) {
        this.api.showCacheMsgs()
      }

    },
    tobottom () {

      if(this.pageName === 'timeline') {
        let T  = this.$store.getters['Post/messagesState'][this.$store.getters['Post/messagesState'].length - 1 ].T

        console.log('timeline reach tobottom:' + T)
        //到达底部后，继续加载推文
        this.getTimeLine(T)

      }else if(this.pageName === 'usercenter'){

        let T  = this.$store.getters['Post/ucPostListState'][this.$store.getters['Post/ucPostListState'].length - 1 ].T

        console.log('usercenter reach tobottom:' + T)

        //到达底部后，继续加载推文
        this.getUserTw(T)

      }else{
        console.log('reach tobottom:')
      }

    },
    //切换Group的Timeline
    getUserTw: function (timeto) {
      //获取当前用户所有推文
      this.api.getUserTwByNameAPI(this.$store.getters['Post/currentUserGroupState'].Username, timeto).then(response => {

        if(response.data.Code === 0 ) {

          this.loading = false

          if(!untils.isEmpty(response.data['Body']['timeline'])) {

            //当前用户的所有推文存入到messages数组
            this.$store.dispatch('Post/ucPostListAppendAction',response.data['Body']['timeline'])

          }else{
            //显示错误提示
            this.$store.dispatch('Home/snackBarShowAction',true)
            this.$store.dispatch('Home/snackBarTextAction','No more data available')
          }


        }else {

          //显示错误提示
          this.$store.dispatch('Home/snackBarShowAction',true)
          this.$store.dispatch('Home/snackBarTextAction',response.data['Msg'])

        }
      }).catch(err => console.log(err))


    },
    //更新timeline
    getTimeLine: function (lastTime){
      //清空活跃用户数据
      this.$store.dispatch('Post/actUsersAction','')

      //显示timeline loader
      this.$store.dispatch('Post/timelineLoaderAction',true)
      //当第一次调取timeline后获得了Home列表，列表中最后一条推文的time就是这个接口的入参时间
      this.api.getTimeLineAPI(lastTime).then(response => {
        //隐藏timeline loader
        this.$store.dispatch('Post/timelineLoaderAction',false)

        if(response.data.Code === 0 ) {

          this.loading = false

          if(!untils.isEmpty(response.data['Body']['timeline'])) {

            //存入store timeline获取到messages数组
            this.$store.dispatch('Post/messagesAction',{
              "type": "concat",
              "message": response.data['Body']['timeline']
            })

          } else {

            //显示错误提示
            this.$store.dispatch('Home/snackBarShowAction',true)
            this.$store.dispatch('Home/snackBarTextAction','No more data available')

          }

        } else {

          //显示错误提示
          this.$store.dispatch('Home/snackBarShowAction',true)
          this.$store.dispatch('Home/snackBarTextAction',response.data['Msg'])

        }


      }).catch(err => console.log(err))
    },

    //计算虚拟滚动条渲染范围
    getScroll() {
      // console.log('>>>>scroll start:' + this.$refs.vsl.range.start,'end:' + this.$refs.vsl.range.end,'offset:' + this.$refs.vsl.range.padFront,'offsetAll:' + this.$refs.vsl.range.padBehind)

      // for(let i = 0; i < this.$refs.vsl.range.end - this.$refs.vsl.range.start; i++)
      // console.log('start T:' +this.messages[this.$refs.vsl.range.start].T)
      // console.log('end T:'+ this.messages[this.$refs.vsl.range.end].T)

      //存放用户当前用户浏览messages数组中的range
      // let end = 0
      //避免第一次进行页面，end为0
      /*if(this.$refs.vsl.range.end < 1) {
        end = 15
      }

      let data = {
        start: this.$refs.vsl.range.start,
        end: end
      }
      this.$store.dispatch('Post/browseRangeAction',data)*/

      // console.log('>>>>scroll offset:' + this.$refs.vsl.getOffset())

      // 当偏移值大于200高度时，启动显示消息提醒
      // if(this.$refs.vsl.getOffset() > 150) {

      //   this.$store.dispatch('Post/autoShowMsgAction',true)

      // }else {
      //   //当便宜值小于10高度时，取消显示消息提醒，收到新消息直接显示在timeline中
      //   this.$store.dispatch('Post/autoShowMsgAction',false)
      // }


      //new code
      var videoEl = document.querySelectorAll('video[autoplay]');
      for(var i=0; i<videoEl.length; i++) {
        var thisVideoEl = videoEl[i];
        var videoClientRect = thisVideoEl.getBoundingClientRect().top;

        if(videoClientRect > 170 && videoClientRect < 530) {
          thisVideoEl.play();
        } else {
          thisVideoEl.pause();
        }
      }

      var audioEl = document.querySelectorAll('.audiofrom');
      for(var i=0; i<audioEl.length; i++) {
        var thisAudioEl = audioEl[i];
        var audio = thisAudioEl.querySelectorAll('button');
        var thisIcon = audio[0].querySelectorAll('i')

        var audioClientRect = thisAudioEl.getBoundingClientRect().top;
        console.log("audio", thisIcon[0].className)

        if(audioClientRect < -100 || audioClientRect > 1000) {
          if(thisIcon[0].className == "v-icon notranslate mdi mdi-pause theme--light") {
            audio[0].click();
          }
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
