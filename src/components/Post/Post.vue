<!--用户中心顶置贴-->
<template>
<div>
{{ source }}
<!--END 显示被引用的原推文内容，文字、多图片、音视频等-->
<div class="ml-12 mt-2">
  <v-icon small class="text--lighten-1 blue-grey--text">ri-pushpin-2-line</v-icon>
  <label class="font-weight-medium text-caption text--lighten-1 blue-grey--text">
    Pinned Post
  </label>
</div>

<!--START 内容显示区 -->
<div class="c-container pb-2 mb-2"  >
  <!--START 用户头像显示区  -->
  <div class="profileImage">
    <!--END 头像（原文）-->
    <template >
      <v-avatar v-if="!this.untils.isEmpty(source.User['UserA'])" size="52" >
        <img :src="source.User['UserA'] | getFullUrl" :alt="source.User['UserD']"   />
      </v-avatar>
    </template>
    <!--END 头像（原文）-->

  </div>
  <!--END  用户头像显示区  -->

  <!--用户名 推文ID 发送时间等信息区-->
  <div class="tweet">
    <div class="tweetDetail">
        <span  class="font-weight-bold mr-0" >

          <template >
            {{source.User['UserD']}}
          </template>

        </span>

      <span class="body-2 grey--text text--darken-1" >

          <template >
            @{{ source.User['User'] }}
          </template>

          <label class="">·</label>
        </span>
      <span class="body-2  grey--text text--darken-1"><label>{{ postTime(source) | formatDate }}</label> </span>

      <!--START 右侧操作按钮-->
      <UserCenterRightMoreBtn :source="source" />
      <!--END  右侧操作按钮-->
    </div>
    <div class="tweetText" >
      <div>
        <p class="text-justify mr-2" style="word-break: break-word">
          {{ source.Tw }}
        </p>


        <!--显示被引用的原推文内容，文字、多图片、音视频等-->
        <v-card
            v-if="source.QotS !== null"
            class="mt-2 pa-2 transparent quote-card" flat
        >
          <v-card-actions class="pt-0 pl-0">
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3" size="28" class="mr-2">

                <v-img
                    :src="source.QotS[0].User['UserA'] | getFullUrl"
                    :alt="source.QotS[0].User['UserD']"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <label class="mr-1 font-weight-bold">{{ source.QotS[0].User['UserD'] }}</label>
                  <label class="mr-0 font-weight-medium text-caption text--lighten-1 blue-grey--text">@{{ source.QotS[0].User.User }}</label>
                  <label class="ml-1 mr-1 font-weight-bold   text--lighten-1 blue-grey--text">·</label>
                  <label class="font-weight-normal text-subtitle-2   text--lighten-1 blue-grey--text">{{ postTime(source) | formatDate }}</label>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>
          <v-card-text class="font-weight-normal pt-0 pb-0">
            {{ source .QotS[0].Tw }}
            <!--引用中的多媒体信息-->
            <div  class="tweetImage mt-6 mb-6 mr-6" >
              <!--多图片-->
              <template v-if="source.QotS[0].P !== null" >
                <MultiPhoto :images="source.QotS[0].P" />
              </template>
              <!--音频-->
              <template v-else-if="source.QotS[0].Typ === 'S' && source.QotS[0].Url !== '' ">
                <AudioPlayer :audio-url="source.QotS[0].Url"/>
              </template>
              <!--视频-->
              <template v-else-if="source.QotS[0].Typ === 'V' && source.QotS[0].Url !== '' ">
                <VideoPlayer :video-url="source.QotS[0].Url"/>
              </template>

              <!--其他-->
              <template v-else/>

            </div>
            <!--END 引用中的多媒体信息-->
          </v-card-text>
        </v-card>
        <!--END 显示被引用的原推文内容，文字、多图片、音视频等-->
      </div>
    </div>

    <!--多媒体信息显示区-->
    <div  class="tweetImage mt-2 mb-2 mr-2" >
      <!--多图片-->
      <template v-if="source.Typ === '' && source.P !== null">
        <MultiPhoto :images="source.P" />
      </template>
      <!--音频-->
      <template v-else-if="source.Retw === '' && (source.QotS === null ) && source.Typ === 'S'">
        <AudioPlayer :audio-url="source.Url"/>
      </template>
      <!--视频-->
      <template v-else-if="source.Retw === '' && (source.QotS === null ) && source.Typ === 'V'">
        <VideoPlayer :video-url="source.Url"/>
      </template>
      <!--直播-->
      <template v-else-if="source.Retw === '' && (source.QotS === null ) && source.Typ === 'L'">
        Live Player
      </template>
      <!--文章-->
      <template v-else-if="source.Retw !== '' && (source.QotS === null ) && source.Typ === 'U'">
        Article Card
      </template>
      <!--广告-->
      <template v-else-if="(source.Retw === '') && (source.QotS === null) && source.Typ === 'A' ">
        <v-img :src="source.P[0]"
               aspect-ratio="1"
               max-height="240"
               class="grey lighten-2 rounded"
        />
      </template>
      <!--其他-->
      <template v-else/>

    </div>
    <!--END 多媒体信息显示区-->

    <!-- 操作区 广告贴时不显示操作按钮   -->
    <div class="tweetAction">
      <div>
        <v-btn
            icon
            color="grey"
            light
            @click.stop="commentDialog(source)"
        >
          <v-icon size="20">ri-chat-1-line</v-icon>
        </v-btn>
        <span class="subheading mr-2 text-caption grey--text text--darken-2" >{{source.Stat.Cot }}</span>
      </div>
      <div >
        <v-menu
            :close-on-click="true"
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
                  @click="postRet(item.type,source)"
                  class="ma-0"
              >
                <v-list-item-action-text >{{ item.title }}</v-list-item-action-text>
              </v-list-item>
            </template>
            <template v-else>
              <v-list-item
                  v-for="(item, index) in disRetItems"
                  :key="index"
                  @click="postRet(item.type,source)"
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
          <!--                  <AnimNum :num="source.Stat.ULike" />-->
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
  </div>
  <!--END 用户名 推文ID 发送时间等信息区-->
</div>
<!--END 内容显示区 -->

</div>
</template>

<script>
import {formatDate} from "@/utils/formatDate"
import untils from "@/utils/untils"
import MultiPhoto from "@/components/Post/MultiPhoto"
import VideoPlayer from "@/components/Post/VideoPlayer"
import AudioPlayer from "@/components/Post/AudioPlayer"
import UserCenterRightMoreBtn from "@/components/User/UserCenterRightMoreBtn";
// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true
export default {
  name: "Post",
  components: {UserCenterRightMoreBtn, MultiPhoto, VideoPlayer, AudioPlayer },
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
          Qots: null
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
