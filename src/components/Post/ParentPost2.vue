<template>
<div class="mb-2">
<!-- START 显示出评论的父亲贴 -->
<template v-if="source.PatS">

  <!--START 父亲贴内容区 -->
  <div class="c-container comment-container mt-2">
    <!--START 父亲贴用户头像  -->
    <div class="profileImage">

      <v-avatar size="52" @click.stop="userCenter(source.PatS[0].User)">
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
        <v-card
            v-if="source.PatS[0].Qots !== null"
            class="pb-2 transparent quote-card" flat
        >

          <v-card-actions class="py-0 pl-0">
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3 my-0" size="20" class="mr-2">
                <v-img
                    :src="source.PatS[0].Qots[0].User['UserA'] | getFullUrl"
                    :alt="source.PatS[0].Qots[0].User['UserD']"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <label class="mr-1 font-weight-bold">{{ source.PatS[0].Qots[0].User['UserD'] }}</label>
                  <label class="mr-0 font-weight-medium text-subtitle-2  grey--text">@{{ source.PatS[0].Qots[0].User.User }}</label>
                  <label class="ml-1 mr-1 font-weight-bold   text--lighten-1 blue-grey--text">·</label>
                  <label class="font-weight-normal text-subtitle-2  grey--text">{{ postTime(source) | formatDate }}</label>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>

          <v-card-text class=" pt-0 pb-0">
            <p class="font-weight-normal black--text mb-0">
              {{ source.PatS[0].Qots[0].Tw }}
            </p>

            <!--START 父亲贴的引用中的多媒体信息-->
            <template v-if="source.PatS[0].Qots[0].P !== null">

              <div  class="tweetImage mt-6 mb-6 mr-6" >
                <!--多图片-->
                <template v-if="source.PatS[0].Qots[0].P !== null || (source.PatS[0].Qots[0].Typ === 'S' && source.PatS[0].Qots[0].Url !== '') || (source.PatS[0].Qots[0].Typ === 'V' && source.PatS[0].Qots[0].Url !== '' )" >
                  <MultiPhoto :images="source.PatS[0].Qots[0].P" />
                </template>
                <!--音频-->
                <template v-else-if="source.PatS[0].Qots[0].Typ === 'S' && source.PatS[0].Qots[0].Url !== '' ">
                  <AudioPlayer :audio-url="source.QotS[0].Url"/>
                </template>
                <!--视频-->
                <template v-else-if="source.PatS[0].Qots[0].Typ === 'V' && source.PatS[0].Qots[0].Url !== '' ">
                  <VideoPlayer :video-url="source.PatS[0].Qots[0].Url"/>
                </template>
                <!--直播-->
                <template v-else-if="msgFilter(source).Typ === 'L'">
                  Live Player
                </template>
                <!--文章-->
                <template v-else-if="msgFilter(source).Typ === 'U'">
                  Article Card
                </template>
                <!--其他-->
                <template v-else/>

              </div>

            </template>
            <!--END START 父亲贴的引用中的多媒体信息-->
          </v-card-text>
        </v-card>
        <!--END 父亲贴 显示被引用的原推文内容，文字、多图片、音视频等-->

      </div>
      <!--END 父亲贴 贴子内容-->

      <!--START 父亲贴 多媒体 显示区-->
      <div
          v-if="(source.PatS[0].Typ === '' && source.PatS[0].P !== null) || source.PatS[0].Typ === 'S' || source.PatS[0].Typ === 'V' "
          class="tweetImage mt-6 mb-6 mr-6" >

        <!--多图片-->
        <template v-if="(source.PatS[0].Typ === '' && source.PatS[0].P !== null) || (source.PatS[0].Retw !== '' && source.PatS[0].Typ === '' && source.PatS[0].P !== null)">
          <MultiPhoto :images="source.P" />
        </template>
        <!--音频-->
        <template v-else-if="source.PatS[0].Retw === '' && (source.PatS[0].QotS === null ) && source.PatS[0].Typ === 'S'">
          <AudioPlayer :audio-url="source.Url"/>
        </template>
        <!--视频-->
        <template v-else-if="(source.PatS[0].Retw !== '' && source.PatS[0].Typ === 'V') || (source.PatS[0].Retw === '' && (source.PatS[0].QotS === null ) && source.PatS[0].Typ === 'V')">
          <VideoPlayer :video-url="source.Url"/>
        </template>
        <!--直播-->
        <template v-else-if="source.PatS[0].Typ === 'L'">
          Live Player
        </template>
        <!--文章-->
        <template v-else-if="source.PatS[0].Typ === 'U'">
          Article Card
        </template>
        <!--广告-->
        <template v-else-if="source.PatS[0].Typ === 'A'">
          <v-img :src="source.P[0]"
                 aspect-ratio="1"
                 class="grey lighten-2 rounded"
          />
        </template>
        <!--心跳数据-->
        <template v-else-if="source.PatS[0].Typ === 'P'">
          Beat
        </template>
        <!--其他-->
        <template v-else/>

      </div>
      <!--END 父亲贴 多媒体 显示区-->

      <!--START 父亲贴 按钮操作区 广告贴时不显示操作按钮   -->
      <div class="tweetAction">

        <!--START 父亲贴 评论数-->
        <div>
          <v-btn
              icon
              color="grey"
              light
              @click.stop="commentDialog(source.PatS[0])"
          >
            <v-icon size="20">ri-chat-1-line</v-icon>
          </v-btn>
          <span class="subheading mr-2 text-caption grey--text text--darken-2" >{{source.PatS[0].Stat.Cot }}</span>
        </div>
        <!--END 父亲贴 评论数-->

        <!--START 父亲贴 转推按钮-->
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
                    :color=" source.PatS[0].StatU.RetU !== 1 ? 'grey' : 'blue' "
                    light
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon size="20">ri-repeat-2-line</v-icon>
                </v-btn>
                <span class="subheading mr-2 text-caption grey--text text--darken-2" >{{source.PatS[0].Stat.Qot + source.PatS[0].Stat.Ret }}</span>
              </div>
            </template>

            <v-list class="ma-0 pa-0">
              <!--RetU = 1时是已转推-->
              <template v-if="source.PatS[0].StatU.RetU !== 1">
                <v-list-item
                    v-for="(item, index) in retItems"
                    :key="index"
                    @click="postRet(item.type,source.PatS[0])"
                    class="ma-0"
                >
                  <v-list-item-action-text >{{ item.title }}</v-list-item-action-text>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item
                    v-for="(item, index) in disRetItems"
                    :key="index"
                    @click="postRet(item.type,source.PatS[0])"
                    class="ma-0"
                >
                  <v-list-item-action-text >{{ item.title }}</v-list-item-action-text>
                </v-list-item>
              </template>

            </v-list>
          </v-menu>
        </div>
        <!--END 父亲贴 转推按钮-->

        <!--START 父亲贴 点赞按钮-->
        <div @click.stop="source.PatS[0].StatU.ULikeU !== 1 ? postLiTweet(source.PatS[0],$event) : postDisLiTweet(source.PatS[0],$event)">
          <v-btn
              icon
              color="grey"
              light
          >
            <v-icon size="20" :color="source.PatS[0].StatU.ULikeU !== 1 ? 'grey' : 'info'">{{ source.PatS[0].StatU.ULikeU !== 1 ? "ri-thumb-up-line" : "ri-thumb-up-fill" }}</v-icon>
          </v-btn>
          <span class="subheading mr-2 text-caption grey--text text--darken-2">
            {{ source.PatS[0].Stat.ULike }}
            <!--<AnimNum :num="source.Stat.ULike" />-->
          </span>
        </div>
        <!--END 父亲贴 点赞按钮-->

        <!--START 父亲贴 分享按钮-->
        <div>
          <v-btn icon color="grey" light>
            <v-icon size="20">mdi-share-variant-outline</v-icon>
          </v-btn>
        </div>
        <!--END 父亲贴 分享按钮-->

      </div>
      <!--END  父亲贴 按钮操作区   -->

    </div>
    <!--END 父亲贴 用户名、时间、内容  信息区-->

  </div>
  <!--END 父亲贴内容区 -->

</template>
<!-- END 显示出评论的父亲贴 -->



<!--START 内容显示区 -->
<div id="start" class="c-container pb-2 "  >

  <!--START 用户头像显示区  -->
  <div class="profileImage">

    <!--END 头像（原文）-->
    <template >
      <v-avatar  size="52" @click.stop="userCenter(source.User)">
        <img v-if="source.User['UserA'] !== null && source.User['UserA'] !== ''" :src="source.User['UserA'] | getFullUrl" :alt="source.User['UserD']"   />
        <img v-else :src="dAvatar.url" :alt="dAvatar.alt" />
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

      <!--      <v-menu
                bottom
                right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    light
                    icon
                    v-bind="attrs"
                    v-on="on"
                    right
                    color="info"
                    class="float-right"
                >
                  <v-icon color="grey" small>ri-more-fill</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title v-text="source.User"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>-->

    </div>
    <div class="tweetText" >

<!--      <div class="text-justify mr-2 grey&#45;&#45;text">
        Replying to
        <label class="blue&#45;&#45;text">
          @{{ parentUser[0].User.User }}
        </label>
      </div>-->

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
                    v-if="source.QotS[0].User['UserA']"
                    :src="source.QotS[0].User['UserA'] | getFullUrl"
                    :alt="source.QotS[0].User['UserD']"
                />
                <v-img v-else :src="dAvatar.url" :alt="dAvatar.alt" />

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

    <!--START 统计信息-->
    <div class="d-flex justify-content-start text-subtitle-2 py-2">
      <!--      <label class="ml-1 font-weight-bold">
              {{ source.Stat.Ret }}
            </label>
            <label class="ml-1 font-weight-regular grey&#45;&#45;text">
              Reposts
            </label>

            <label class="ml-4 font-weight-bold ">
              {{ source.Stat.Qot }}
            </label>
            <label class="ml-1 font-weight-regular grey&#45;&#45;text">
              Quote
            </label>

            <label class="ml-4 font-weight-bold t">
              {{ source.Stat.ULike }}
            </label>
            <label class="ml-1 font-weight-regular grey&#45;&#45;text">
              Likes
            </label>

            <label class="ml-4 font-weight-bold ">
              {{ source.Stat.Cot }}
            </label>
            <label class="ml-1 font-weight-regular grey&#45;&#45;text">
              Comments
            </label>-->

      <label class="ml-1 font-weight-bold ">
        {{ source.Stat.Exposure }}
      </label>
      <label class="ml-1 font-weight-regular grey--text">
        Exposure
      </label>


    </div>
    <!--END 统计信息-->

    <v-divider ></v-divider>

    <!-- 操作区 广告贴时不显示操作按钮   -->
    <div class="tweetAction">
      <div>
        <v-btn
            icon
            color="grey"
            light
            @click.stop="commentDialog(source)"
        >
          <v-icon >ri-chat-1-line</v-icon>
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
                <v-icon >ri-repeat-2-line</v-icon>
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
          <v-icon :color="source.StatU.ULikeU !== 1 ? 'grey' : 'info'">{{ source.StatU.ULikeU !== 1 ? "ri-thumb-up-line" : "ri-thumb-up-fill" }}</v-icon>
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
            @click="goTo"
        >
          <v-icon>mdi-share-variant-outline</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
  <!--END 用户名 推文ID 发送时间等信息区-->
</div>
<!--END 内容显示区 -->

<!--<PostReplyCard  :user="replyUser" />-->

</div>
</template>

<script>
import {formatDate} from "@/utils/formatDate"
import untils from "@/utils/untils"
import MultiPhoto from "@/components/Post/MultiPhoto"
import VideoPlayer from "@/components/Post/VideoPlayer"
import AudioPlayer from "@/components/Post/AudioPlayer"
import PostReplyCard from "@/components/Post/PostReplyCard";
// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true



export default {
  name: "ParentPost",
  components: {PostReplyCard, MultiPhoto, VideoPlayer, AudioPlayer },
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
    // this.$vuetify.goTo('#start', { duration: 300,offset: 0, easing: 'linear' })
  },
  computed: {
    replyUser() {
      return source.User.User + 'hahaha'
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
    //进入所选用户中心
    userCenter: function (user) {

      this.api.getUserCenter(user)

    },
    goTo:function (){
      this.$vuetify.goTo('#start', { duration: 300,offset: 0, easing: 'linear' })
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
  padding: 12px 12px 12px 12px;
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
