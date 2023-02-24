<template>
<div class="tweetAction">
  <!--START 评论数-->
  <div>
    <v-btn
        icon
        color="grey darken-2"
        light
        @click.stop="commentDialog(source)"
    >
      <v-icon size="20">ri-chat-1-line</v-icon>
    </v-btn>
    <span class="subheading mr-2 text-subtitle-2 grey--text text--darken-2 font-weight-medium" >{{source.Stat.Cot }}</span>
  </div>
  <!--END 评论数-->

  <!--START 转推按钮-->
  <div>
    <v-menu
        :close-on-click="closeOnClick"
        nudge-width="40px"
        rounded="sm"
        open-on-hover
        offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <div>
          <v-btn
              icon
              :color=" source.StatU.RetU !== 1 ? 'grey darken-2' : 'blue' "
              light
              v-bind="attrs"
              v-on="on"
          >
            <v-icon size="20">ri-repeat-2-line</v-icon>
          </v-btn>
          <span class="subheading mr-2 text-subtitle-2 font-weight-medium" >
            <label :class="source.StatU.RetU !== 1 ? 'grey--text text--darken-2' : 'info--text'">
              {{source.Stat.Qot + source.Stat.Ret }}
            </label>
          </span>
        </div>
      </template>

      <v-list class="ma-0 pa-0">
        <!--RetU = 1时是已转推-->
        <template v-if="source.StatU.RetU !== 1">
          <v-list-item
              v-for="(item, index) in retItems"
              :key="index"
              @click.stop="postRet(item.type,source)"
              class="ma-0"
          >
            <v-list-item-action-text >{{ item.title }}</v-list-item-action-text>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item
              v-for="(item, index) in disRetItems"
              :key="index"
              @click.stop="postRet(item.type,source)"
              class="ma-0"
          >
            <v-list-item-action-text >{{ item.title }}</v-list-item-action-text>
          </v-list-item>
        </template>

      </v-list>
    </v-menu>
  </div>
  <!--END 转推按钮-->

  <!--START 点赞按钮-->
  <div @click.stop="source.StatU.ULikeU !== 1 ? postLiTweet(source,$event) : postDisLiTweet(source,$event)">
    <v-btn
        icon
        color="grey darken-2"
        light
    >
      <v-icon size="20" :color="source.StatU.ULikeU !== 1 ? 'grey darken-2' : 'pink'">
        {{ source.StatU.ULikeU !== 1 ? "ri-thumb-up-line" : "ri-thumb-up-fill" }}
      </v-icon>
    </v-btn>
    <span class="subheading mr-2 text-subtitle-2  font-weight-medium">
      <label :class="source.StatU.ULikeU !== 1 ? 'grey--text text--darken-2' : 'pink--text'">
      {{ source.Stat.ULike }}
      </label>
    </span>
  </div>
  <!--END 点赞按钮-->

  <!--START 父亲贴 分享按钮-->
  <div>
    <v-btn icon color="grey darken-2" light>
      <v-icon size="20">mdi-share-variant-outline</v-icon>
    </v-btn>
  </div>
  <!--END 父亲贴 分享按钮-->

  <!--START 父亲贴  曝光量-->
  <div style="justify-content: flex-end; max-width: 20px">

    <v-icon size="20">ri-bar-chart-line</v-icon>
    <span class="subheading ml-1 mr-2 text-subtitle-2  font-weight-medium" >
      <label class="grey--text text--darken-2">
      {{ source.Stat.Exposure }}
      </label>
    </span>

  </div>
  <!--END 父亲贴  曝光量-->
</div>
</template>

<script>

export default {
  name: "PostActionCard",
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
          "Title": "删除"
        },
        "RE": {
          "Typ": "RE",
          "Icon": "mdi-repeat",
          "Title": "RePost"
        },
        "ReI": {
          "Typ": "ReI",
          "Icon": "mdi-repeat",
          "Title": "RePost"
        },
        "ReV": {
          "Typ": "ReV",
          "Icon": "mdi-repeat",
          "Title": "RePost"
        },
        "ReS": {
          "Typ": "ReS",
          "Icon": "mdi-repeat",
          "Title": "RePost"
        },
        "ReL": {
          "Typ": "ReL",
          "Icon": "mdi-repeat",
          "Title": "RePost"
        },
        "ReU": {
          "Typ": "ReU",
          "Icon": "mdi-repeat",
          "Title": "RePost"
        },
        "QO": {
          "Typ": "QO",
          "Icon": "mdi-repeat",
          "Title": "Quote"
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
    source: Object,
    patS: Boolean,
  },
  methods: {
    //打开评论窗口
    commentDialog:function (source){

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
          Group: {
            Uid: source.Group.Uid,
            User: source.Group.User,
            UserD: source.Group.UserD,
            UserA: source.Group.UserA,
            IsGroup: source.Group.IsGroup
          },
          User: {
            Uid: source.User.Uid,
            User: source.User.User,
            UserD: source.User.UserD,
            UserA: source.User.UserA,
            IsGroup: source.User.IsGroup
          },
          Tw: source.Tw,
          P: source.P,
          MTyp: source.MTyp,
          Url: source.Url,
          St: '',
          Stat: Stat,
          StatU:source.StatU,
          QotS: source.QotS
        }]
      }

      console.log('-PostActionCard-拼装评论数据：' + JSON.stringify(data))

      //保存评论弹窗数据到store
      this.$store.dispatch('Post/commentDialogAction',data)

    },
    //打开引用弹窗
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
          Typ: source.Typ,
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
    //转贴
    postReTweet:function (t){
      let data = {
        'retweet':t,
        "device": 'web'
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
        'disretw':t,
        "device": 'web'
      }
      this.api.postDisReTweetAPI(data).then(response => {
        if(response.data.Code === 0) {
          console.log("取消转推成功，T:"+response.data);
        }
      }).catch(err => console.log(err))
    },
    //点赞
    postLiTweet:function (source){

      console.log('点赞操作：' + JSON.stringify(source))

      this.$store.dispatch(this.patS ? 'Post/messagePatSUpdateAction' : 'Post/messageUpdateAction',{
        "type": "like",
        "message": source
      })

      let data = {
        "litweet": source.T,
        "device": 'web'
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

      this.$store.dispatch(this.patS ? 'Post/messagePatSUpdateAction' : 'Post/messageUpdateAction',{
        "type": "dislike",
        "message": source
      })

      let data = {
        'dislitw': source.T,
        "device": 'web'
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

<style lang="scss" scoped>
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
</style>
