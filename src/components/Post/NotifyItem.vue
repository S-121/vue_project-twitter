<template>
<!--START 信息显示区 -->
<div class="c-container " >
  <!--START 用户头像显示区  -->
  <PostAvatar :source="source" />

  <!--END  用户头像显示区  -->

  <!--START 用户名、时间、内容 信息区-->
  <div class="tweet">

    <!--START 用户名、时间-->
    <div class="tweetDetail">
      <!--START 用户名称-->
      <span  class="font-weight-bold mr-0" >

         {{source.User['UserD']}}

        </span>
      <!--END 用户名称-->

      <!--START 发送时间-->
      <span class="body-2 grey--text text--darken-1"  >
          <label class="">·</label>
        </span>
      <span class="body-2 text-subtitle-2 font-weight-normal grey--text ">
          <label>{{ postTime(source) | formatDate }}</label>
        </span>
      <!--END 发送时间-->

      <!--START  显示所在群组-->
      <span v-if="(source.Group.Uid > 0 && $store.getters['Post/currentUserGroupState'].IsGroup < 1) || (!$store.getters['Post/currentUserGroupState'] && source.Group.User)"
            class="body-2 grey--text text--darken-4 font-weight-black ml-1" >
        @{{ source.Group.User }} {{ $t('group') }}
        <v-avatar size="18">
          <v-img :src="source.Group.UserA | getFullUrl " />
        </v-avatar>
      </span>
      <!--END 显示所在群组-->

      <span>

        <v-chip small>

          <template v-if="Resps.length > 0">

            <template v-for="(item,index) in Resps">

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-avatar left v-bind="attrs"
                            v-on="on">
                    <v-img :src="item.UserA | getFullUrl"></v-img>
                  </v-avatar>

                </template>
                <span>{{ item.User }}</span>
              </v-tooltip>



            </template>



          </template>



          <template v-if="act === 1">
             {{ $t('followed you') }}
          </template>
          <template v-else-if="act === 2" >
          {{ $t('re-post your post') }}
          </template>
          <template v-else-if="act === 3" >
             {{ $t('commented your post') }}
          </template>
          <template v-else-if="act === 4" >
            {{ $t('quoted your post') }}
          </template>
          <template v-else-if="act === 5" >
             {{ $t('liked your post') }}
          </template>
          <template v-else-if="act === 11" >
             {{ $t('add friend') }}
          </template>
          <template v-else-if="act === 12" >
           {{ $t('request to add you') }}
          </template>
          <template v-else-if="act === 13">
            {{ $t('agree to add you') }}
          </template>
          <template v-else-if="act === 14">
             {{ $t('followers') }}
          </template>
          <template v-else-if="act === 15" >
            {{ $t('followers') }}
          </template>
          <template v-else small>
            {{ $t('no status') }}
          </template>

        </v-chip>


      </span>

      <!--START 右侧操作按钮-->
      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              light
              icon
              v-bind="attrs"
              v-on="on"
              right
              color="info"
              class="float-right"
              small
          >
            <v-icon color="info" v-if="act === 1">
              ri-user-follow-line
            </v-icon>
            <v-icon color="blue" v-else-if="act === 2">
              ri-repeat-2-line
            </v-icon>
            <v-icon color="info" v-else-if="act === 3">
              ri-chat-3-line
            </v-icon>
            <v-icon color="green" v-else-if="act === 4">
              ri-chat-quote-line
            </v-icon>
            <v-icon color="pink" v-else-if="act === 5">
              ri-thumb-up-line
            </v-icon>
            <v-icon v-else color="green lighten-1">
              ri-check-line
            </v-icon>
          </v-btn>

        </template>

<!--        <v-list dense rounded>
          <v-list-item-group
              color="primary"
          >
            &lt;!&ndash;START 屏蔽贴子按钮&ndash;&gt;
            <v-list-item

            >
              <v-list-item-icon class="mr-2">
                <v-icon >ri-forbid-2-line</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-body-2" >block post</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            &lt;!&ndash;END 屏蔽贴子按钮&ndash;&gt;

            &lt;!&ndash;START 举报贴子按钮&ndash;&gt;
            <v-list-item
                @click=""
            >
              <v-list-item-icon class="mr-2">
                <v-icon >ri-alarm-warning-line</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-body-2" >report post</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            &lt;!&ndash;END 举报贴子按钮&ndash;&gt;

            <v-list-item>
              <v-list-item-content>
                T:{{source.T}}
                St:{{ source.St }}
              </v-list-item-content>
            </v-list-item>

          </v-list-item-group>
        </v-list>-->

      </v-menu>
      <!--END  右侧操作按钮-->
    </div>
    <!--END 用户名、时间-->

    <!--START 贴子内容-->
    <div class="tweetText" >

      <PostTextItem :source="source" class="mt-1" />

      <!--显示被引用的原推文内容，文字、多图片、音视频等-->
      <QuoteItem :QotS="source.QotS" />
      <!--END 显示被引用的原推文内容，文字、多图片、音视频等-->

    </div>
    <!--END 贴子内容-->

    <!--START 多媒体 显示区-->
    <div  class="tweetImage mt-2 mb-2 mr-2" >
      <PostMultimediaCard :source="source" />
    </div>
    <!--END 多媒体 显示区-->

    <!--START 按钮操作区 广告贴时不显示操作按钮   -->
    <div class="tweetAction" >
      <div>
        <v-btn
            icon
            color="grey"
            light

        >
          <v-icon size="20">ri-chat-1-line</v-icon>
        </v-btn>
        <span class="subheading mr-2 text-caption grey--text text--darken-2" >{{source.Stat.Cot }}</span>
      </div>
      <div >
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
                  :color=" source.StatU.RetU !== 1 ? 'grey' : 'blue' "
                  light
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon size="20">ri-repeat-2-line</v-icon>
              </v-btn>
              <span class="subheading mr-2 text-caption grey--text text--darken-2" >{{source.Stat.Qot + source.Stat.Ret }}</span>
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
      <div @click.stop="source.StatU.ULikeU !== 1 ? postLiTweet(source,$event) : postDisLiTweet(source,$event)">
        <v-btn
            icon
            color="grey"
            light
        >
          <v-icon size="20" :color="source.StatU.ULikeU !== 1 ? 'grey' : 'info'">{{ source.StatU.ULikeU !== 1 ? "ri-thumb-up-line" : "ri-thumb-up-fill" }}</v-icon>
        </v-btn>
        <span class="subheading mr-2 text-caption grey--text text--darken-2">
            {{ source.Stat.ULike }}
          </span>
      </div>
      <div>
        <v-btn
            icon
            color="grey"
            light
        >
          <v-icon size="20">mdi-share-variant-outline</v-icon>
        </v-btn>
      </div>
    </div>
    <!--END  按钮操作区   -->
  </div>
  <!--END 用户名、时间、内容 信息区-->
</div>
<!--END   信息显示区 -->
</template>

<script>
import {formatDate} from "@/utils/formatDate";
import MultiPhoto from "@/components/Post/MultiPhoto";
import AudioPlayer from "@/components/Post/AudioPlayer";
import VideoPlayer from "@/components/Post/VideoPlayer";
import PostAvatar from "@/components/Post/PostAvatar";
import QuoteItem from "@/components/Post/QuoteItem";
import PostTextItem from "@/components/Post/PostTextItem";
import PostMultimediaCard from "@/components/Post/PostMultimediaCard";

// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default {
  name: "NotifyItem",
  components: {PostMultimediaCard, PostTextItem, QuoteItem, PostAvatar, VideoPlayer, AudioPlayer, MultiPhoto},
  data() {
    return {
      mSecond: 1,
      dAvatar: {
        url: require('../../assets/users/user-d.png'),
        alt: this.$t('default avatar')
      },
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
    act: Number,
    Resps: Array
  },

  filters: {

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
  },
  methods: {
    //进入所选用户中心
    userCenter: function (user) {

      this.api.getUserCenter(user)

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
  padding: 12px 12px 12px 12px;
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

