<template>
<div >
<!-- START 显示出评论的父亲贴 -->
<template  v-if="source.PatS">
  <!--START 父亲贴内容区 -->
  <div class="p-container comment-container mt-2">
    <!--START 父亲贴用户头像  -->
    <div id="parentPos" class="profileImage">

      <v-avatar size="52" @click.stop="getUserCenter(source.PatS[0].User)">
        <img v-if="source.PatS[0].User['UserA']" :src="source.PatS[0].User['UserA'] | getFullUrl" :alt="source.PatS[0].User['UserD']"/>
        <img v-else :src="dAvatar.url" :alt="dAvatar.alt"/>
      </v-avatar>

      <!--START 贴子父子关系连接线-->
      <div style="height: 100%;width: 2px;margin-left: auto;margin-right: auto;margin-top: 4px;background-color: #bfbfbf" />
      <!--END 贴子父子关系连接线-->
    </div>
    <!--END   父亲贴用户头像  -->

    <!--START 父亲贴 用户名、时间、内容  信息区-->
    <div class="tweet">
      <!--START 父亲贴 用户名、时间-->
      <div class="tweetDetail">

        <span  class="font-weight-bold mr-0" >
        {{source.PatS[0].User['UserD']}} <!--   {{source.PatS[0].T}}-->
        </span>
        <span class="body-2 grey--text text--darken-1" >
          @{{source.PatS[0].User['User']}}
        <label class="">·</label>
        </span>
        <span class="body-2  grey--text text--darken-1">
          <label>{{ postTime(source) | formatDate }}</label>
        </span>

      </div>
      <!--END 父亲贴 用户名、时间-->

      <!--START 父亲贴 贴子内容-->
      <div class="tweetText" style="word-break: break-word">
        {{ source.PatS[0].Tw }}
        <!--START 父亲贴 显示被引用的原推文内容，文字、多图片、音视频等-->
        <QuoteItem :QotS="source.PatS[0].QotS" class="mt-2" />
        <!--END 父亲贴 显示被引用的原推文内容，文字、多图片、音视频等-->

      </div>
      <!--END 父亲贴 贴子内容-->

      <!--START 父亲贴 多媒体 显示区-->
      <div
          v-if="(source.PatS[0].MTyp === '' && source.PatS[0].P !== null) || source.PatS[0].MTyp === 'S' || source.PatS[0].MTyp === 'V' "
          class="tweetImage mt-6 mb-6 mr-6" >

        <!--多图片-->
        <template v-if="(source.PatS[0].MTyp === '' && source.PatS[0].P !== null) || (source.PatS[0].Retw !== '' && source.PatS[0].MTyp === '' && source.PatS[0].P !== null)">
          <MultiPhoto :images="source.P" />
        </template>
        <!--音频-->
        <template v-else-if="source.PatS[0].Retw === '' && (source.PatS[0].QotS === null ) && source.PatS[0].MTyp === 'S'">
          <AudioPlayer :audio-url="source.Url"/>
        </template>
        <!--视频-->
        <template v-else-if="(source.PatS[0].Retw !== '' && source.PatS[0].MTyp === 'V') || (source.PatS[0].Retw === '' && (source.PatS[0].QotS === null ) && source.PatS[0].MTyp === 'V')">
          <VideoPlayer :video-url="source.Url"/>
        </template>
        <!--直播-->
        <template v-else-if="source.PatS[0].MTyp === 'L'">
          Live Player
        </template>
        <!--文章-->
        <template v-else-if="source.PatS[0].MTyp === 'U'">
          Article Card
        </template>
        <!--广告-->
        <template v-else-if="source.PatS[0].MTyp === 'A'">
          <v-img :src="source.P[0]"
                 aspect-ratio="1"
                 class="grey lighten-2 rounded"
          />
        </template>
        <!--心跳数据-->
        <template v-else-if="source.PatS[0].MTyp === 'P'">
          Beat
        </template>
        <!--其他-->
        <template v-else/>

      </div>
      <!--END 父亲贴 多媒体 显示区-->

      <!--START 父亲贴 按钮操作区 广告贴时不显示操作按钮   -->
      <PostActionCard :source="source.PatS[0]" />
      <!--END  父亲贴 按钮操作区   -->

    </div>
    <!--END 父亲贴 用户名、时间、内容  信息区-->

  </div>
  <!--END 父亲贴内容区 -->

</template>
<!-- END 显示出评论的父亲贴 -->

<DetailPostItem id="detailPos" :detail-post="source" />

<!--显示被引用的原推文内容，文字、多图片、音视频等-->
<QuoteItem :QotS="source.QotS" class="mx-4 mt-2" />
<!--END 显示被引用的原推文内容，文字、多图片、音视频等-->

<!--START 内容显示区 -->
<div  class="c-container pb-2"  >

  <!--用户名 推文ID 发送时间等信息区-->
  <div class="tweet">

    <!--START 统计信息-->
    <div class="d-flex justify-content-start text-subtitle-2 py-2">

      <v-chip small outlined text-color="grey">
        <label class="font-weight-bold">
        {{ postTime(source) | formatFromDate }}
        </label>
      </v-chip>

      <v-chip small outlined class="ml-1" text-color="grey">
        <label class="font-weight-bold">
          Post from Web  {{ $t('Post from Web') }}
        </label>
      </v-chip>


    </div>
    <!--END 统计信息-->

    <!--START 分割线-->
<!--    <v-divider ></v-divider>-->
    <!--END 分割线-->

    <!--START 统计信息-->
<!--    <div class="d-flex justify-content-start text-subtitle-2 py-2">

      <label class="ml-1 font-weight-bold ">
        {{ source.Stat.Exposure }}
      </label>
      <label class="ml-1 font-weight-regular grey&#45;&#45;text">
        Exposure
      </label>

    </div>-->
    <!--END 统计信息-->

    <!--START 分割线-->
    <v-divider ></v-divider>
    <!--END 分割线-->

    <!-- START 操作区 广告贴时不显示操作按钮   -->
    <PostDetailActionCard :source="source" />
    <!-- END 操作区 广告贴时不显示操作按钮   -->

  </div>
  <!--END 用户名 推文ID 发送时间等信息区-->
</div>
<!--END 内容显示区 -->

<PostReplyCard  :re-post="source" />

</div>
</template>

<script>
import untils from "@/utils/untils"
import MultiPhoto from "@/components/Post/MultiPhoto"
import VideoPlayer from "@/components/Post/VideoPlayer"
import AudioPlayer from "@/components/Post/AudioPlayer"
import PostReplyCard from "@/components/Post/PostReplyCard";
import QuoteItem from "@/components/Post/QuoteItem";
import DetailPostItem from "@/components/Post/DetailPostItem";
import PostDetailActionCard from "@/components/Post/PostDetailActionCard";
import PostActionCard from "@/components/Post/PostActionCard";
// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true



export default {
  name: "ParentPost",
  components: {
    PostActionCard,
    PostDetailActionCard, DetailPostItem, QuoteItem, PostReplyCard, MultiPhoto, VideoPlayer, AudioPlayer },
  data() {
    return {
      mSecond: 1,
      dAvatar: {
        url: require('../../assets/users/user-d.png'),
        alt: this.$t('default avatar')
      },
      new_message: {
        users: [],
        show: false,
        count:0
      },
      cacheMessages:[],
      retItems: [
        { title: '转推' , type:'Ret' },
        { title: '引用' , type: 'Qot'}
      ],
      disRetItems: [
        { title: '取消转推' , type:'DisRet' },
        { title: '引用' , type: 'Qot'}
      ],
      closeOnClick: true,
      messages: []

    };
  },
  props: {
    source: Object,
    parentUser: Array,
  },

  mounted() {
    // this.$vuetify.goTo('#parentPos', { duration: 300,offset: 200, easing: 'linear' })
    /*if(this.source.PatS) {
      this.$vuetify.goTo('#parentPos', { duration: 300,offset: 0, easing: 'linear' })
    }else {
      this.$vuetify.goTo('#detailPos', { duration: 300,offset: 0, easing: 'linear' })
    }*/

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
  },

  methods: {
    //屏蔽贴子
    postBlockTweet: function (source) {

      this.api.postBlockTweet(source.T)

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

    goTo:function (){

      this.$vuetify.goTo('#parentPos', { duration: 300,offset: 0, easing: 'linear' })

    },
    //打开评论窗口
    commentDialog:function (source){

      console.log('打开评论窗口，数据：' + JSON.stringify(source))

      let t

      if(source.Retw) {
        t = source.Retw === '' ? source.T : source.Retw
      }else {
        t = source.T
      }


      //更新评论弹窗状态，打开
      this.$store.dispatch('Post/commentDialogStatusAction',true)

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
          MTyp: source.MTyp,
          Url: source.Url,
          St: '',
          QotS: null
        }]
      }

      console.log('拼装评论数据：' + JSON.stringify(data))

      //保存评论弹窗数据到store
      this.$store.dispatch('Post/commentDialogAction',data)

    },
    //引用弹窗
    qotDialog:function (source){
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
          MTyp: source.MTyp,
          Url: source.Url,
          St: '',
        }]
      }

      console.log('拼装引用评论数据：' + JSON.stringify(data))

      //保存评论弹窗数据到store
      this.$store.dispatch('Post/qotDialogAction',data)
    },
    //选择是转贴还是引用
    postRet:function (type,source) {
      let T
      //如果推文是转推，则被转的帖子是原贴
      if(source.Retw !== '' && source.Retw){
        T = source.Retw
      }else{
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
    //转贴
    postReTweet:function (t){
      let data = {
        'retweet':t
      }
      this.api.postReTweetAPI(data).then(response => {
        if(response.data.Code === 0) {
          console.log("发推成功，T:"+response.data);
        }
      }).catch(err => console.log(err))
    },
    //取消转贴
    postDisReTweet:function (t){
      let data = {
        'disretw':t
      }
      this.api.postDisReTweetAPI(data).then(response => {
        if(response.data.Code === 0) {
          console.log("取消转推成功，T:"+response.data);
        }
      }).catch(err => console.log(err))
    },
    //点赞
    postLiTweet:function (source,event){

      this.$store.dispatch('Post/messageUpdateAction',{
        "type": "like",
        "message": source
      })

      let data = {
        "litweet":source.T
      }

      this.api.postLiTweetAPI(data).then(response => {
        if(response.data.Code === 0) {
          console.log("点赞成功，" + JSON.stringify(response.data))
        }else if(response.data.Code === 1) {
          console.log("点赞失败，" + JSON.stringify(response.data));
        }

      }).catch(err => console.log(err))


    },
    //取消点赞
    postDisLiTweet:function (source){

      this.$store.dispatch('Post/messageUpdateAction',{
        "type": "dislike",
        "message": source
      })

      let data = {
        'dislitw': source.T
      }

      this.api.postDisLiTweetAPI(data).then(response => {
        if(response.data.Code === 0) {
          console.log("取消点赞成功，" + response.data)
        }else if(response.data.Code === 1) {
          console.log("取消点赞失败，" + response.data)
        }

      }).catch(err => console.log(err))
    },
  },
}
</script>

<style lang="scss"  scoped>

.quote-card {
  border:1px solid #dddddd !important;
}

.commentLine {
  border-bottom: 1px solid #fff !important;
}

.comment-container {
  background-color: #ffffff !important;
  border-bottom: 1px solid #ffffff !important;
}

.p-container {
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  border-bottom: 1px solid #efefef;

  padding: 0px 12px 12px 12px;


  .profileImage {
    margin-right: 10px;
  }
  .tweet {
    width: 100%;
    .tweetImage {
      max-width: 510px;
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
    .tweetAction {
      display: flex;
      width: 100%;
      margin-top: 7px;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        border-radius: 50%;
        width: max-content;
        svg {
          padding: 5px;
          border-radius: 50%;
          width: 30px;
          fill: #8899a6;
          margin-right: 2px;
        }

        .actionHover,
        svg,
        span {
          /*transition: 300ms;*/
        }

        &:hover {
          .actionHover {
            padding: 5px;
            border-radius: 50%;
          }
          svg.comment,
          svg.share {
            background: rgba(#1da1f2, 0.1);
            fill: #1da1f2;
          }
          span.comment {
            color: #1da1f2;
          }
          svg.rt {
            background: rgba(#17bf63, 0.1);
            fill: #17bf63;
          }
          span.rt {
            color: #17bf63;
          }
          svg.fav {
            background: rgba(#e0245e, 0.1);
            fill: #e0245e;
          }
          span.fav {
            color: #e0245e;
          }
        }
        &.clicked {
          svg.comment,
          svg.share {
            fill: #1da1f2;
          }
          span.comment {
            color: #1da1f2;
          }
          svg.rt {
            fill: #17bf63;
          }
          span.rt {
            color: #17bf63;
          }
          svg.fav {
            fill: #e0245e;
          }
          span.fav {
            color: #e0245e;
          }
        }
      }
    }
  }
}

.c-container {
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  border-bottom: 1px solid #efefef;

  padding: 0px 12px 12px 12px;


  .profileImage {
    margin-right: 10px;
  }
  .tweet {
    width: 100%;
    .tweetImage {
      max-width: 510px;
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
      line-height: 30px;
      font-weight: 400;
      font-size: 23px;
      color: #000;
      p {
        font-family: inherit;
        line-height: inherit;
        font-weight: inherit;
        font-size: inherit;
        color: inherit;
      }
    }
    .tweetAction {
      display: flex;
      width: 100%;
      margin-top: 7px;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        border-radius: 50%;
        width: max-content;
        svg {
          padding: 5px;
          border-radius: 50%;
          width: 30px;
          fill: #8899a6;
          margin-right: 2px;
        }

        .actionHover,
        svg,
        span {
          /*transition: 300ms;*/
        }

        &:hover {
          .actionHover {
            padding: 5px;
            border-radius: 50%;
          }
          svg.comment,
          svg.share {
            background: rgba(#1da1f2, 0.1);
            fill: #1da1f2;
          }
          span.comment {
            color: #1da1f2;
          }
          svg.rt {
            background: rgba(#17bf63, 0.1);
            fill: #17bf63;
          }
          span.rt {
            color: #17bf63;
          }
          svg.fav {
            background: rgba(#e0245e, 0.1);
            fill: #e0245e;
          }
          span.fav {
            color: #e0245e;
          }
        }
        &.clicked {
          svg.comment,
          svg.share {
            fill: #1da1f2;
          }
          span.comment {
            color: #1da1f2;
          }
          svg.rt {
            fill: #17bf63;
          }
          span.rt {
            color: #17bf63;
          }
          svg.fav {
            fill: #e0245e;
          }
          span.fav {
            color: #e0245e;
          }
        }
      }
    }
  }
}

</style>
