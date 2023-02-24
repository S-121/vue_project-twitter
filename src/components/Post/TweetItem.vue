<template>
<div>

  <template v-if="msgFilter(source).Typ === 'CO'">
    <!--START 父亲贴内容区 -->
    <div class="c-container comment-container" >

      <!--START 父亲贴用户头像  -->
      <ParentPostAvatar :source="source.PatS[0]" />
      <!--END   父亲贴用户头像  -->

      <!--START 父亲贴 用户名、时间、内容  信息区-->
      <div class="tweet">
        <!--START 父亲贴 用户名、时间-->
        <div class="tweetDetail" >
          <PostNameTimeItem  :source="source.PatS[0]" :patS="true" />
        </div>
        <!--END 父亲贴 用户名、时间-->

        <!--START 父亲贴 贴子内容-->
        <div class="tweetText" >

          <PostTextItem :source="source.PatS[0]" />

          <!--START 父亲贴 显示被引用的原推文内容，文字、多图片、音视频等-->
          <QuoteItem :QotS="source.PatS[0].QotS" />
          <!--END 父亲贴 显示被引用的原推文内容，文字、多图片、音视频等-->

        </div>
        <!--END 父亲贴 贴子内容-->

        <!--START 父亲贴 多媒体 显示区-->

        <PostMultimediaCard :source="source.PatS[0]" />

        <!--END 父亲贴 多媒体 显示区-->

        <!--START 父亲贴 按钮操作区 广告贴时不显示操作按钮   -->
        <PostActionCard :source="source.PatS[0]" :patS="true"/>
        <!--END  父亲贴 按钮操作区   -->

      </div>
      <!--END 父亲贴 用户名、时间、内容  信息区-->

    </div>
    <!--END 父亲贴内容区 -->
  </template>

  <!--START 信息显示区 -->
  <div class="c-container flex-column" >

    <!-- START 标题状态显示（原貼 转推 音频 视频 直播）   -->
    <PostTitleItem :source="source"   />
    <!--  END 标题状态显示（原貼 转推 音频 视频 直播）  -->

    <div class="d-flex">
    <!--START 用户头像显示区  -->
    <PostAvatar :source="source" />
    <!--END  用户头像显示区  -->

    <!--START 用户名、时间、内容 信息区-->
    <div class="tweet">

        <!--START 用户名、时间-->
        <div class="tweetDetail" @click.stop="getDetailPost(source)">

          <!--START 用户名称-->
          <PostNameTimeItem :source="source" :patS="false" />
          <!--END 用户名称-->

        </div>
        <!--END 用户名、时间-->

        <!--START 贴子内容-->
        <div class="tweetText" >

           <PostTextItem :source="source" />

          <!--显示被引用的原推文内容，文字、多图片、音视频等-->
           <QuoteItem :QotS="source.QotS" />
          <!--END 显示被引用的原推文内容，文字、多图片、音视频等-->

        </div>
        <!--END 贴子内容-->

        <!--START 多媒体 显示区-->
        <div  class="tweetImage mt-2 mb-2 mr-2" >

          <PostMultimediaCard :source="source"  :qot="false" />

        </div>
        <!--END 多媒体 显示区-->

        <!--START 按钮操作区 广告贴时不显示操作按钮   -->
        <PostActionCard  :source="source" :patS="false" v-if="msgFilter(source).Typ !== 'A'" />
        <!--END  按钮操作区   -->
    </div>
    <!--END 用户名、时间、内容 信息区-->
    </div>
  </div>
  <!--END   信息显示区 -->
</div>
</template>

<script>
import untils from "@/utils/untils"
import QuoteItem from "@/components/Post/QuoteItem";
import PostActionCard from "@/components/Post/PostActionCard";
import PostNameTimeItem from "@/components/Post/PostNameTimeItem";
import PostTitleItem from "@/components/Post/PostTitleItem";
import PostAvatar from "@/components/Post/PostAvatar";
import PostMultimediaCard from "@/components/Post/PostMultimediaCard";
import PostTextItem from "@/components/Post/PostTextItem";
import ParentPostAvatar from "@/components/Post/ParentPostAvatar";



export default {
  name: "TweetItem",
  components: {
    ParentPostAvatar,
    PostTextItem,
    PostMultimediaCard,
    PostAvatar,
    PostTitleItem,
    PostNameTimeItem, PostActionCard, QuoteItem },
  data() {
    return {
      mSecond: 1,
      dAvatar: {
        url: require('../../assets/users/user-d.png'),
        alt: this.$t('default avatar')
      },
      msgStatus: {
        "DEL": {
          "Typ": "DEL",
          "Icon": "mdi-repeat",
          "Title": this.$t('delete')
        },
        "RE": {
          "Typ": "RE",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReI": {
          "Typ": "ReI",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReV": {
          "Typ": "ReV",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReS": {
          "Typ": "ReS",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReL": {
          "Typ": "ReL",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReU": {
          "Typ": "ReU",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "QO": {
          "Typ": "QO",
          "Icon": "mdi-repeat",
          "Title": this.$t('qoposts')
        },
        "CO": {
          "Typ": "CO",
          "Icon": "mdi-comment-multiple-outline",
          "Title": "评论"
        },
        "S": {
          "Typ": "S",
          "Icon": "mdi-music-circle-outline",
          "Title": "音频"
        },
        "V": {
          "Typ": "V",
          "Icon": "mdi-video-outline",
          "Title": "视频"
        },
        "I": {
          "Typ": "I",
          "Icon": "comment-multiple-outline",
          "Title": "图片"
        },
        "U": {
          "Typ": "U",
          "Icon": "comment-multiple-outline",
          "Title": "文章"
        },
        "L": {
          "Typ": "L",
          "Icon": "mdi-broadcast",
          "Title": "直播"
        },
        "A": {
          "Typ": "A",
          "Icon": "comment-multiple-outline",
          "Title": "广告"
        },
        "P": {
          "Typ": "P",
          "Icon": "comment-multiple-outline",
          "Title": "心跳"
        },
        "N": {
          "Typ": "N",
          "Icon": "comment-multiple-outline",
          "Title": "消息通知"
        },
        "OT": {
          "Typ": "OT",
          "Icon": "",
          "Title": "OT"
        }
      },

      new_message: {
        users: [],
        show: false,
        count:0
      },
      cacheMessages:[],
      retItems: [
        { title: this.$t('reposts') , type:'Ret' },
        { title: this.$t('qoposts') , type: 'Qot'}
      ],
      disRetItems: [
        { title: this.$t('disreposts')  , type:'DisRet' },
        { title: this.$t('qoposts') , type: 'Qot'}
      ],
      closeOnClick: true,
      messages: []

    };
  },
  props: {
    source: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    postTime() {
      let _this = this
      return function (source) {
        if(source.T) {
          // console.log('T:' + parseInt(source.T.substring(0,10)),'diffTime:'+parseInt(localStorage.getItem('diffTime')),'mSecond:'+ parseInt(_this.mSecond))
          // console.log('postTime:'+ Number(Number(source.T.substring(0,10)) + Number(localStorage.getItem('diffTime')) + Number(_this.mSecond)))
          //计算时间差
          return  Number(Number(source.T.substring(0,10)) + Number(localStorage.getItem('diffTime')) + Number(_this.mSecond))
        }
      }
    },
    btnLikeStatus() {
      return function (source) {
        return source.StatU.ULikeU !== 1;
      }
    },
    likeCount(source,status) {
      if(status === 'like'){
        source.Stat.ULike += 1
      }else if(status === 'dislike'){
        source.Stat.ULike -= 1
      }else{

      }
    },
    //计算消息类型
    msgFilter() {
      let _this = this
      return function (source) {
        //转发状态
        if((source.Retw !=='') && (source.Retw !=='0')) {

          if(source.Retw !== '' && source.MTyp === 'S') {
            return _this.msgStatus['ReS']
            //视频转推
          }else if(source.Retw !== '' && source.MTyp === 'V') {
            return _this.msgStatus['ReV']
            //文章转推
          }else if(source.Retw !== '' && source.MTyp === 'U')  {
            return _this.msgStatus['ReU']
            //图片转推
          }else if(source.Retw !== '' && source.MTyp === '' && source.P !== null)  {
            return _this.msgStatus['ReI']
            //文字转推
          }else if(source.Retw !== '' && source.MTyp === '' && source.P === null  && source.Url === '')  {
            return _this.msgStatus['RE']
          }else {
            return _this.msgStatus['RE']
          }

        //发贴状态
        }else if(source.St === 1){ //St状态 贴子是否禁用
          return _this.msgStatus['DEL']
        }//引用转推
        else if(source.QotS !== null && source.QotS.length > 0){
          return _this.msgStatus['QO']
          //评论
        }else if(source.Retw === '' && source.QotS === null  && source.PatS !== null) {
          return _this.msgStatus['CO']
          //音频
        }else if(source.Retw === '' && (source.QotS === null ) && source.MTyp === 'S') {
          return _this.msgStatus['S']
          //视频
        }else if(source.Retw === '' && (source.QotS === null ) && source.MTyp === 'V') {
          return _this.msgStatus['V']
          //文章
        }else if(source.Retw !== '' && (source.QotS === null ) && source.MTyp === 'U')  {
          return _this.msgStatus['U']
          //直播
        }else if(source.Retw === '' && (source.QotS === null ) && source.MTyp === 'L') {
          return _this.msgStatus['L']
          //心跳
        }else if(source.MTyp === 'P') {
          return _this.msgStatus['P']
          //通知
        }else if(source.MTyp === 'N') {
          return _this.msgStatus['N']
          //广告
        }else if((source.Retw === '') && (source.QotS === null) && source.MTyp === 'A' ) {
          return _this.msgStatus['A']
          //多图片
        }else if(source.MTyp === '' && source.P !== null) {
          return _this.msgStatus['I']
        }
        else {
          return _this.msgStatus['OT']  //原文
        }
      }
    }
  },
  methods: {
    //获取父亲贴的详细列表
    getParentPost: function (post) {

      //跳转到贴子详细列表
      this.api.getParentPost(post)

    },
    //获取父亲贴中引用贴的详细信息
    getParentQoPost: function (post) {
      console.log('getParentQoPost:' + JSON.stringify(post))

      this.api.getTweetsAPI(post.T).then(response => {

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {

          console.log("-getTweetsAPI-" + JSON.stringify(response.data['Body']))

          //存入store 跟帖列表
          this.$store.dispatch('Post/postListAddAction',response.data['Body'])

          console.log('跟帖列表：' + JSON.stringify(response.data['Body']))

          //跳转到贴子详细列表
          this.$router.push({
            path: "/postlist",
            query: {
              pid: post.T
            }
          })

        }
      }).catch(err => console.log(err))

    },
    //查看详细推文list
    getDetailPost: function (source) {

      //调用公用方法
      this.api.getDetailPost(source)

    },
    //进入所选用户中心
    getUserCenter: function (user) {

      //跳转到用户中心页面
      this.$router.push({
        path: "/usercenter",
        query: {
          name: user.Username
        }
      })

    },

    scroll: function() {
      let isLoading = false
      window.onscroll = () => {
        // 距离底部200px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 100
        if (bottomOfWindow && isLoading === false) {
          isLoading = true

          let lastTime = this.$store.getters["Post/messagesState"][this.$store.getters["Post/messagesState"].length - 1].T.substring(0,10)

          this.api.getTimeLineAPI(lastTime).then(response => {
            if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {
              console.log("获取时间线成功:"+response.data);
              //将获取到数据添加到数组中
              for(let i=0;i<response.data['Body'].length;i++){

                this.$store.dispatch('Post/messagesAction',{
                  "type": "push",
                  "message": response.data['Body'][i]
                })

                // this.messages.push(response.data['Body'][i])
              }
              isLoading = false
            }
          }).catch(err => console.log(err))

        }
      }
    },

    openGallery(index) {
      this.$refs.lightbox.showImage(index)
    },

    //打开评论窗口
 /*   commentDialog:function (source){

      console.log('打开评论窗口，数据：' + JSON.stringify(source))

      //更新评论弹窗状态，打开
      this.$store.dispatch('Post/commentDialogStatusAction',true)

      let t
      //判断是否为转推
      if(source.Retw) {
        t = source.Retw === '' ? source.T : source.Retw
      }else {
        t = source.T
      }

      //更新评论数量
      let Stat = JSON.parse(JSON.stringify(source.Stat))  //  ★★★★★避免浅拷贝导致报错★★★★★★
      Stat.Cot += 1

      //拼装数据
      let data = {
        dialog: true,
        Tw: '',
        PatS:[{
          T: t,
          User: {
            Uid: source.User.Uid,
            User: source.User.User,
            UserD: source.User.UserD,
            UserA: source.User.UserA
          },
          Tw: source.Tw,
          P: source.P,
          Typ: source.Typ,
          Url: source.Url,
          St: '',
          Stat: Stat,
          StatU:source.StatU,
          QotS: null
        }]
      }

      console.log('-TweetItem-拼装评论数据：' + JSON.stringify(data))

      //保存评论弹窗数据到store
      this.$store.dispatch('Post/commentDialogAction',data)

    },*/
    //打开引用弹窗
/*    qotDialog:function (source){
      //更新评论弹窗状态，打开
      this.$store.dispatch('Post/qotDialogStatusAction',true)

      let t

      if(source.Retw) {
        t = source.Retw === '' ? source.T : source.Retw
      }else {
        t = source.T
      }

      //拼装引用评论数据
      let data = {
        dialog: true,
        Tw: '',
        QotS:[{
          T: t,
          User: {
            Uid: source.User.Uid,
            User: source.User.User,
            UserD: source.User.UserD,
            UserA: source.User.UserA
          },
          Reply: [],
          Tw: source.Tw,
          P: source.P,
          Typ: source.Typ,
          Url: source.Url,
          St: '',
        }]
      }

      console.log('拼装引用评论数据：' + JSON.stringify(data))

      //保存评论弹窗数据到store
      this.$store.dispatch('Post/qotDialogAction',data)
    },*/
    //选择是转贴还是引用
    postRet:function (type,source) {
      let T
      //如果推文是转推，则被转的帖子是原贴
      if(source.Retw) {
        T = source.Retw === '' ? source.T : source.Retw
      }else {
        T = source.T
      }


      if(type === 'Ret'){

        this.$store.dispatch('Post/messageUpdateAction',{
          "type": "ret",
          "message": source
        })

        this.postReTweet(T)
      }else if(type === 'Qot'){

        this.qotDialog(source)

      }else if(type === 'DisRet'){

        //取消转推同时要把贴子删除掉 0正常、1帖子禁用、2发贴用户被禁用
        // source.St = 1
        this.$store.dispatch('Post/messageUpdateAction',{
          "type": "disret",
          "message": source
        })

        this.postDisReTweet(T)
      }
    },
    //将缓存消息更新到timeline
    updateTimeline:function (){

      //遍历缓存消息数组
      for(let i=0; i < this.cacheMessages.length; i++){
        //将缓存消息存入到消息数组中
        this.$store.dispatch('Post/messagesAction',{
          "type": "unshift",
          "message": this.cacheMessages[i]
        })
      }
      //隐藏消息提示
      this.new_message.show = false
      // 清空消息缓存
      this.cacheMessages = []
    },


    //初始化定时更新时间
    initupdateTime: function () {
      //每60秒触发时间数据更新
      setInterval(() => {
        this.mSecond +=1
      }, 1000 * 60)

    }

  },

  mounted() {
    //启动定时刷新时间
    this.initupdateTime()
  }
}
</script>

<style lang="scss"  scoped>

.quote-card {
  border:1px solid #dddddd !important;
  &:hover {
    background: lighten(#000, 90%) !important;
  }
}

.commentLine {
  border-bottom: 1px solid #fff !important;
}

.comment-container {
  background-color: #ffffff !important;
  border-bottom: 1px solid #ffffff !important;
  transition: 200ms;
  &:hover {
    background: lighten(#000, 95%) !important;
  }
}

.c-container {
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  padding: 12px 16px 8px 16px;
  transition: 200ms;
  &:hover {
    background: lighten(#000, 95%);
  }
  .profileImage {
    margin-right: 10px;
  }
  .tweet {
    //width: 100%;
    width: 520px;
    .tweetImage {
      max-width: 520px;
    }
    .tweetDetail {
      span {
        margin-right: 5px;
      }
      .username,
      .date {
        color: #8899a6;
      }
      .date:hover {
        text-decoration: underline;
      }
    }
    .tweetText {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 20px;
      font-weight: 400;
      font-size: 15px;
      color: #000;
      p {
        font-family: inherit;
        line-height: inherit;
        font-weight: inherit;
        font-size: inherit;
        color: inherit;
      }
    }

  }
}

</style>
