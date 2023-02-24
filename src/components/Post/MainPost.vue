<template>
<div>


<!--START 父亲贴内容显示区 -->
<ParentPost :source="source" :parentUser="source.PatS"/>
<!--END 父亲贴内容显示区 -->

<!--START 评论列表显示区 -->
<CommentPost :sources="source.CotS"  :mainUser="source.User" :qotUser="qotUser"/>
  <!--END 评论列表显示区 -->
</div>
</template>

<script>
import MultiPhoto from "@/components/Post/MultiPhoto"
import VideoPlayer from "@/components/Post/VideoPlayer"
import AudioPlayer from "@/components/Post/AudioPlayer"
import CommentPost from "@/components/Post/CommentPost"
import untils from "@/utils/untils"
import ParentPost from "@/components/Post/ParentPost";
// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default {
  name: "MainPost",
  components: {ParentPost, CommentPost, MultiPhoto, VideoPlayer, AudioPlayer },
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
    source: Object
  },
  computed: {
    qotUser() {
      let qotUser = null
      if(this.source.QotS && (this.source.QotS[0].User !== '')) {
        qotUser = this.source.QotS[0].User
      }
      return qotUser
    },
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
  filters: {

  },
  methods: {
    //打开评论窗口
    commentDialog:function (source){

      console.log('打开评论窗口，数据：' + JSON.stringify(source))

      //更新评论弹窗状态，打开
      this.$store.dispatch('Post/commentDialogStatusAction',true)

      //拼装数据
      let data = {
        dialog: true,
        Tw: '',
        PatS:[{
          T: source.Retw === '' ? source.T : source.Retw,
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
          QotS: null
        }]
      }

      console.log('-MainPost-拼装评论数据：' + JSON.stringify(data))

      //保存评论弹窗数据到store
      this.$store.dispatch('Post/commentDialogAction',data)

    },
    //引用弹窗
    qotDialog:function (source){
      //更新评论弹窗状态，打开
      this.$store.dispatch('Post/qotDialogStatusAction',true)

      //拼装引用评论数据
      let data = {
        dialog: true,
        Tw: '',
        QotS:[{
          T: source.Retw === '' ? source.T : source.Retw,
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
    },
    //选择是转贴还是引用
    postRet:function (type,source) {
      let T
      //如果推文是转推，则被转的帖子是原贴
      if(source.Retw !== ''){
        T = source.Retw
      }else{
        T = source.T
      }

      if(type === 'Ret'){

        this.$store.dispatch('Post/messageUpdateAction',{
          "type": "ret",
          "message": source
        })

        //更新本主贴中的统计数据
        this.$store.dispatch('Post/postListMainUpdateAction',{
          "type": "ret",
          "T": source.T
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

        //更新本主贴中的统计数据
        this.$store.dispatch('Post/postListMainUpdateAction',{
          "type": "disret",
          "T": source.T
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
          console.log("转推成功，T:"+response.data);
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

      //更新全局消息数据
      this.$store.dispatch('Post/messageUpdateAction',{
        "type": "like",
        "message": source
      })

      //更新本主贴中的统计数据
      this.$store.dispatch('Post/postListMainUpdateAction',{
        "type": "like",
        "T": source.T
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

      //更新本主贴中的统计数据
      this.$store.dispatch('Post/postListMainUpdateAction',{
        "type": "dislike",
        "T": source.T
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

.c-container {
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  padding: 4px 12px 12px 12px;
  /*transition: 200ms;*/
  &:hover {
    background: lighten(#000, 95%);
  }
  .profileImage {
    margin-right: 5px;
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
    .tweetAction {
      display: flex;
      width: 100%;
      margin-top: 7px;
      div {
        display: flex;
        align-items: center;
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
