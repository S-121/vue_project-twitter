<!--用户中心贴子列表-->

<template>
<div>
  <!-- START 标题状态显示（原貼 转推 音频 视频 直播）   -->
  <template v-if="msgFilter(source).Typ === 'RE' || msgFilter(source).Typ === 'ReV' || msgFilter(source).Typ === 'ReI'  || msgFilter(source).Typ === 'ReS'  || msgFilter(source).Typ === 'ReU'  || msgFilter(source).Typ === 'ReL'">
    <div class="ml-12 mt-2">
      <v-icon size="20" class="grey--text text--darken-3">{{ msgFilter(source).Icon }}</v-icon>
      <label class="font-weight-medium text-body-2 text--darken-3 grey--text">
        {{source.User['UserD']}} {{msgFilter(source).Title}}
      </label>
    </div>
  </template>

  <!-- START 音频 视频 直播 -->
  <template v-else-if="msgFilter(source).Typ === 'S' || msgFilter(source).Typ === 'V'  || msgFilter(source).Typ === 'L' ">
    <div class="mx-4 my-2">
      <v-icon small class="text--lighten-1 blue-grey--text">{{ msgFilter(source).Icon }}</v-icon>
      <label class="font-weight-medium text-caption text--lighten-1 blue-grey--text">
        {{msgFilter(source).Title}}
      </label>
    </div>
  </template>
  <!-- END 音频 视频 直播 -->

  <!-- START 显示出评论的父亲贴 -->
  <template v-else-if="msgFilter(source).Typ === 'CO'">

  </template>
  <!-- START 显示出评论的父亲贴 -->

  <template v-else />
  <!--  END 标题状态显示（原貼 转推 音频 视频 直播）  -->

  <template v-if="msgFilter(source).Typ === 'CO'">
    <!--START 父亲贴内容区 -->
    <div class="c-container comment-container"  @click.stop="getParentPost(source.PatS[0])">
      <!--START 父亲贴用户头像  -->
      <div class="profileImage">

        <v-avatar size="48" >
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
          {{source.PatS[0].User['UserD']}}
          </span>
          <span class="font-weight-bold  text--lighten-1 grey--text" >
          <label class="">·</label>
          </span>
          <span class="font-weight-normal text-subtitle-2  grey--text">
            <label>{{ postTime(source.PatS[0]) | formatDate }}</label>
          </span>

          <!--START 右侧操作按钮-->
          <UserCenterRightMoreBtn :source="source.PatS[0]" />
          <!--END  右侧操作按钮-->

        </div>
        <!--END 父亲贴 用户名、时间-->

        <!--START 父亲贴 贴子内容-->
        <div class="tweetText" >
          <p class="text-justify mr-2 mb-2" style="word-break: break-word" >
            {{ source.PatS[0].Tw }}
          </p>

          <!--START 父亲贴 显示被引用的原推文内容，文字、多图片、音视频等-->
          <QuoteItem :QotS="source.PatS[0].QotS" />
          <!--END 父亲贴 显示被引用的原推文内容，文字、多图片、音视频等-->

        </div>
        <!--END 父亲贴 贴子内容-->

        <!--START 父亲贴 多媒体 显示区-->
        <div v-if="msgFilter(source).Typ === 'I' || msgFilter(source).Typ === 'ReI' || msgFilter(source).Typ === 'S' || msgFilter(source).Typ === 'V' || msgFilter(source).Typ === 'ReV' " class="tweetImage mt-6 mb-6 mr-6" >

          <!--多图片-->
          <template v-if="msgFilter(source).Typ === 'I' || msgFilter(source).Typ === 'ReI'">
            <MultiPhoto :images="source.P" />
          </template>
          <!--音频-->
          <template v-else-if="msgFilter(source).Typ === 'S'">
            <AudioPlayer :audio-url="source.Url"/>
          </template>
          <!--视频-->
          <template v-else-if="msgFilter(source).Typ === 'V' || msgFilter(source).Typ === 'ReV'">
            <VideoPlayer :video-url="source.Url"/>
          </template>
          <!--直播-->
          <template v-else-if="msgFilter(source).Typ === 'L'">
            Live Player
          </template>
          <!--文章-->
          <template v-else-if="msgFilter(source).Typ === 'U'">
            Article Card
          </template>
          <!--广告-->
          <template v-else-if="msgFilter(source).Typ === 'A'">
            <v-img :src="source.P[0]"
                   aspect-ratio="1"
                   class="grey lighten-2 rounded"
            />
          </template>
          <!--心跳数据-->
          <template v-else-if="msgFilter(source).Typ === 'P'">
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
                color="grey darken-2"
                light
                @click.stop="commentDialog(source.PatS[0])"
            >
              <v-icon size="20">ri-chat-1-line</v-icon>
            </v-btn>
            <span class="subheading mr-2 text-caption grey--text text--darken-2 font-weight-medium" >{{source.PatS[0].Stat.Cot }}</span>
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
                      :color=" source.PatS[0].StatU.RetU !== 1 ? 'grey darken-2' : 'blue' "
                      light
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-icon size="20">ri-repeat-2-line</v-icon>
                  </v-btn>
                  <span class="subheading mr-2 text-caption grey--text text--darken-2 font-weight-medium" >{{source.PatS[0].Stat.Qot + source.PatS[0].Stat.Ret }}</span>
                </div>
              </template>

              <v-list class="ma-0 pa-0">
                <!--RetU = 1时是已转推-->
                <template v-if="source.PatS[0].StatU.RetU !== 1">
                  <v-list-item
                      v-for="(item, index) in retItems"
                      :key="index"
                      @click.stop="postRet(item.type,source.PatS[0])"
                      class="ma-0"
                  >
                    <v-list-item-action-text >{{ item.title }}</v-list-item-action-text>
                  </v-list-item>
                </template>
                <template v-else>
                  <v-list-item
                      v-for="(item, index) in disRetItems"
                      :key="index"
                      @click.stop="postRet(item.type,source.PatS[0])"
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
                color="grey darken-2"
                light
            >
              <v-icon size="20" :color="source.PatS[0].StatU.ULikeU !== 1 ? 'grey darken-2' : 'pink'">{{ source.PatS[0].StatU.ULikeU !== 1 ? "ri-thumb-up-line" : "ri-thumb-up-fill" }}</v-icon>
            </v-btn>
            <span class="subheading mr-2 text-caption grey--text text--darken-2 font-weight-medium">
              <label :class="source.PatS[0].StatU.ULikeU !== 1 ? 'grey--text text--darken-2' : 'pink--text'">
              {{ source.PatS[0].Stat.ULike }}
              </label>
              <!--<AnimNum :num="source.Stat.ULike" />-->
            </span>
          </div>
          <!--END 父亲贴 点赞按钮-->

          <!--START 父亲贴 分享按钮-->
          <div>
            <v-btn icon color="grey darken-2" light>
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

  <!--START 信息显示区 -->
  <div class="c-container" @click="getAllPost(source)" >

    <!--START 用户头像显示区  -->
    <div class="profileImage">
      <!--START 头像（转推）-->
      <template @click.stop="userCenter(source.User)" v-if="msgFilter(source).Typ === 'RE' || msgFilter(source).Typ === 'ReI' || msgFilter(source).Typ === 'ReV' || msgFilter(source).Typ === 'ReS' || msgFilter(source).Typ === 'ReU'  || msgFilter(source).Typ === 'ReL'">

        <v-avatar v-if="source.ReUser['UserA'] !== null && source.ReUser['UserA'] !== ''" size="48" >
          <img :src="source.ReUser['UserA'] | getFullUrl" :alt="source.ReUser['UserD']"/>
        </v-avatar>
        <v-avatar v-else size="48">
          <template v-if="msgFilter(source).Typ !== 'A'">
            <img :src="dAvatar.url" :alt="dAvatar.alt"/>
          </template>
          <template v-else>
            AD
          </template>
        </v-avatar>

      </template>
      <!--END 头像（转推）-->

      <!--END 头像（评论）-->
      <template v-else-if="msgFilter(source).Typ === 'CO'">

        <v-avatar  size="48" >
          <img v-if="source.User['UserA']" :src="source.User['UserA'] | getFullUrl" :alt="source.User['UserD']"/>
          <img v-else :src="dAvatar.url" :alt="dAvatar.alt"/>
        </v-avatar>

      </template>
      <!--END 头像（评论）-->

      <!--START 头像（原文）-->
      <template  v-else>
        <v-avatar v-if="source.User['UserA'] !== null && source.User['UserA'] !== ''" size="48" >
          <img :src="source.User['UserA'] | getFullUrl" :alt="source.User['UserD']"  @click.stop="userCenter(source.User)" />
        </v-avatar>
        <v-avatar v-else  size="48">

          <template v-if="msgFilter(source).Typ !== 'A'">
            <img :src="dAvatar.url" :alt="dAvatar.alt" @click.stop="userCenter(source.User)" />
          </template>
          <template v-else>
            AD
          </template>

        </v-avatar>

      </template>
      <!--END 头像（原文）-->

      </div>
    <!--END  用户头像显示区  -->

    <!--START 用户名、时间、内容 信息区-->
    <div class="tweet">

      <!--START 用户名、时间-->
      <div class="tweetDetail">
        <!--START 用户名称-->
        <span  class="font-weight-bold mr-0" >

            <template v-if="msgFilter(source).Typ === 'A'">
              广告
            </template>

            <template v-if="msgFilter(source).Typ === 'RE' || msgFilter(source).Typ === 'ReI'  || msgFilter(source).Typ === 'ReI' || msgFilter(source).Typ === 'ReV' || msgFilter(source).Typ === 'ReS' || msgFilter(source).Typ === 'ReU'  || msgFilter(source).Typ === 'ReL'" >
              {{source.ReUser['UserD']}}
            </template>

            <template v-else-if="msgFilter(source).Typ === 'QO'">
              {{source.User['UserD']}}
            </template>

            <template v-else-if="msgFilter(source).Typ === 'CO'">
             {{source.User['UserD']}}

            </template>

            <template v-else>
              {{source.User['UserD']}}
            </template>

          </span>
        <!--END 用户名称-->

        <!--START 发送时间-->
        <span class="body-2 grey--text text--darken-1" v-if="msgFilter(source).Typ !== 'A'" >
            <label class="">·</label>
          </span>
        <span class="body-2 text-subtitle-2  font-weight-normal grey--text ">
            <label>{{ postTime(source) | formatDate }}</label>
          </span>
        <!--END 发送时间-->

        <!--START  显示所在群组-->
        <span v-if="(source.Group.Uid > 0 && $store.getters['Post/currentUserGroupState'].IsGroup < 1) || (!$store.getters['Post/currentUserGroupState'] && source.Group.User)"
              @click.stop="getGroupTimeline(source.Group)"
              class="body-2 grey--text text--darken-4 font-weight-black ml-1" >
          @{{ source.Group.User }} group
          <v-avatar size="18">
            <v-img :src="source.Group.UserA | getFullUrl" />
          </v-avatar>
          </span>
        <!--END 显示所在群组-->

        <!--START 右侧操作按钮-->
        <UserCenterRightMoreBtn :source="source" />
        <!--END  右侧操作按钮-->
      </div>
      <!--END 用户名、时间-->

      <!--START 贴子内容-->
      <div class="tweetText" >

        <p class="text-justify mr-1 mb-2" style="word-break: break-word" >
          {{ source.Tw }}
        </p>
        <!--显示被引用的原推文内容，文字、多图片、音视频等-->
        <QuoteItem :QotS="source.QotS" />
        <!--END 显示被引用的原推文内容，文字、多图片、音视频等-->

      </div>
      <!--END 贴子内容-->

      <!--START 多媒体 显示区-->
      <div  class="tweetImage mt-2 mb-2 mr-2" >
        <!--多图片-->
        <template v-if="msgFilter(source).Typ === 'I' || msgFilter(source).Typ === 'ReI'">
          <MultiPhoto :images="source.P" />
        </template>
        <!--音频-->
        <template v-else-if="msgFilter(source).Typ === 'S' || msgFilter(source).Typ === 'ReS'">
          <AudioPlayer :audio-url="source.Url"/>
        </template>
        <!--视频-->
        <template v-else-if="msgFilter(source).Typ === 'V' || msgFilter(source).Typ === 'ReV'">
          <VideoPlayer :video-url="source.Url"/>
        </template>
        <!--直播-->
        <template v-else-if="msgFilter(source).Typ === 'L'  || msgFilter(source).Typ === 'ReL' ">
          Live Player
        </template>
        <!--文章-->
        <template v-else-if="msgFilter(source).Typ === 'U'  || msgFilter(source).Typ === 'ReU'">
          Article Card
        </template>
        <!--广告-->
        <template v-else-if="msgFilter(source).Typ === 'A'">
          <v-img :src="source.P[0]"
                 aspect-ratio="1"
                 max-height="240"
                 class="grey lighten-2 rounded"
          />
        </template>
        <!--心跳数据-->
        <template v-else-if="msgFilter(source).Typ === 'P'">
          Beat
        </template>
        <!--其他-->
        <template v-else/>

      </div>
      <!--END 多媒体 显示区-->

      <!--START 按钮操作区 广告贴时不显示操作按钮   -->
      <PostActionCard v-if="msgFilter(source).Typ !== 'A'" :source="source" />
      <!--END  按钮操作区   -->
    </div>
    <!--END 用户名、时间、内容 信息区-->
  </div>
  <!--END 信息显示区 -->
</div>
</template>

<script>
import untils from "@/utils/untils"
import AnimNum from "@/components/Post/AnimNum"
import MultiPhoto from "@/components/Post/MultiPhoto"
import VideoPlayer from "@/components/Post/VideoPlayer"
import AudioPlayer from "@/components/Post/AudioPlayer"
import QuoteItem from "@/components/Post/QuoteItem";
import PostActionCard from "@/components/Post/PostActionCard";
import UserCenterRightMoreBtn from "@/components/User/UserCenterRightMoreBtn";

// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default {
  name: "UserPostItem",
  components: {
    UserCenterRightMoreBtn,
    PostActionCard, QuoteItem, MultiPhoto, VideoPlayer, AudioPlayer },
  data() {
    return {
      mSecond: 1,
      dAvatar: {
        url: require('../../assets/users/user-d.png'),
        alt: this.$t('default avatar')
      },
      selectedItem: 1,
      items: [
        { icon: 'ri-pushpin-2-line', text: 'pin post' },
        { icon: 'ri-forbid-2-line', text: 'block post' },
      ],
      msgStatus: {
        "DEL": {
          "Typ": "DEL",
          "Icon": "mdi-repeat",
          "Title": "删除"
        },
        "RE": {
          "Typ": "RE",
          "Icon": "mdi-repeat",
          "Title": "转发"
        },
        "ReI": {
          "Typ": "ReI",
          "Icon": "mdi-repeat",
          "Title": "转发"
        },
        "ReV": {
          "Typ": "ReV",
          "Icon": "mdi-repeat",
          "Title": "转发"
        },
        "ReS": {
          "Typ": "ReS",
          "Icon": "mdi-repeat",
          "Title": "转发"
        },
        "ReL": {
          "Typ": "ReL",
          "Icon": "mdi-repeat",
          "Title": "转发"
        },
        "ReU": {
          "Typ": "ReU",
          "Icon": "mdi-repeat",
          "Title": "转发"
        },
        "QO": {
          "Typ": "QO",
          "Icon": "mdi-repeat",
          "Title": "已引用"
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

          if(source.Retw !== '' && source.Typ === 'S') {
            return _this.msgStatus['ReS']
            //视频转推
          }else if(source.Retw !== '' && source.Typ === 'V') {
            return _this.msgStatus['ReV']
            //文章转推
          }else if(source.Retw !== '' && source.Typ === 'U')  {
            return _this.msgStatus['ReU']
            //图片转推
          }else if(source.Retw !== '' && source.Typ === '' && source.P !== null)  {
            return _this.msgStatus['ReI']
            //文字转推
          }else if(source.Retw !== '' && source.Typ === '' && source.P === null  && source.Url === '')  {
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
        }else if(source.Retw === '' && (source.QotS === null ) && source.Typ === 'S') {
          return _this.msgStatus['S']
          //视频
        }else if(source.Retw === '' && (source.QotS === null ) && source.Typ === 'V') {
          return _this.msgStatus['V']
          //文章
        }else if(source.Retw !== '' && (source.QotS === null ) && source.Typ === 'U')  {
          return _this.msgStatus['U']
          //直播
        }else if(source.Retw === '' && (source.QotS === null ) && source.Typ === 'L') {
          return _this.msgStatus['L']
          //心跳
        }else if(source.Typ === 'P') {
          return _this.msgStatus['P']
          //通知
        }else if(source.Typ === 'N') {
          return _this.msgStatus['N']
          //广告
        }else if((source.Retw === '') && (source.QotS === null) && source.Typ === 'A' ) {
          return _this.msgStatus['A']
          //多图片
        }else if(source.Typ === '' && source.P !== null) {
          return _this.msgStatus['I']
        }
        else {
          return _this.msgStatus['OT']  //原文
        }
      }
    }
  },
  methods: {

    //查看用户所有贴子
    userPostList: function (user) {
        this.$store.dispatch('Post/currentMenuAction',6)
        this.api.getUserTwAPI(user.Uid).then(response => {

          if(response.data.Code === 0 && !untils.isEmpty(response.data['Body']['timeline'])) {
            console.log("-getGroupTimeline-切换Group时间线成功,共有数据" + response.data['Body']['timeline'].length +'条')

            //存入store timeline获取到messages数组
            this.$store.dispatch('Post/messagesAction',{
              "type": "assign",
              "message": response.data['Body']['timeline']
            })

            this.$router.push('/usercenter')

          }
        }).catch(err => console.log(err))

    },
    //查看详细推文list
    getAllPost: function (source) {

      let t

      // 有评论
      if(source.Retw === '' && source.QotS === null  && source.PatS !== null) {

        t = source.PatS[0].T

      // 无评论
      }else {
        t = source.T
      }


      this.$store.dispatch('Post/currentMenuAction',7)

      this.api.getTweetsAPI(t).then(response => {

        if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {

          console.log("-getTweetsAPI-" + JSON.stringify(response.data['Body']))

          //存入store 跟帖列表
          this.$store.dispatch('Post/postListAddAction',response.data['Body'])

          this.$router.push('/postlist')

        }
      }).catch(err => console.log(err))

    },
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
    //屏蔽贴文
    postBlockTweet:function (t){
      let data = {
        "block": t
      }
      this.api.postBlockTweetAPI(data).then(response => {
        if(response.data.Code === 0) {
          console.log("屏蔽成功，:"+JSON.stringify(response.data))
        }
      }).catch(err => console.log(err))
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
