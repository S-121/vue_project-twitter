<template>
  <v-dialog
      v-model="getDialogStatus"
      width="650"
      transition="dialog-transition"
  >
    <v-card>
      <v-container class="pa-0">

        <v-card-text class="pb-0">
          <!--显示被引用的原推文内容，文字、多图片、音视频等-->
          <v-card
              class="transparent" flat
          >
            <v-card-actions class="pt-0 pl-0">
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3" size="28" class="mr-2">

                  <v-img
                      :src="getUserA | getFullUrl"
                      :alt="getUserD"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    <label class="mr-1 font-weight-bold">{{ getUserD }}</label>
                    <label class="mr-0 font-weight-medium text-caption text--lighten-1 blue-grey--text">@{{ getUser }}</label>
                    <label class="ml-1 mr-1 font-weight-bold   text--lighten-1 blue-grey--text">·</label>
                    <label class="font-weight-normal text-subtitle-2   text--lighten-1 blue-grey--text">{{ getT | formatDate }}</label>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
            <v-card-text class="font-weight-normal pt-0 pb-0">
              {{ getTw }}
              <!--引用中的多媒体信息-->
             <template v-if="getSource.PatS">
               <div  class="tweetImage mt-2" >
                 <!--多图片-->
                 <template v-if="getSource.PatS[0].P !== null" >
                   <MultiPhoto :images="getSource.PatS[0].P" />
                 </template>
                 <!--音频-->
                 <template v-else-if="getSource.PatS[0].MTyp === 'S' && getSource.PatS[0].Url !== '' ">
                   <AudioPlayer :audio-url="getSource.PatS[0].Url"/>
                 </template>
                 <!--视频-->
                 <template v-else-if="getSource.PatS[0].MTyp === 'V' && getSource.PatS[0].Url !== '' ">
                   <VideoPlayer :video-url="getSource.PatS[0].Url"/>
                 </template>
                 <!--直播-->
                 <template v-else-if="getSource.PatS[0].MTyp === 'L'">
                   Live Player
                 </template>
                 <!--文章-->
                 <template v-else-if="getSource.PatS[0].MTyp === 'U'">
                   Article Card
                 </template>
                 <!--其他-->
                 <template v-else/>

               </div>
             </template>
              <!--END 引用中的多媒体信息-->

              <!--显示被引用的原推文内容，文字、多图片、音视频等-->
              <QuoteItem :QotS="getSource.PatS[0].QotS" />
              <!--END 显示被引用的原推文内容，文字、多图片、音视频等-->
            </v-card-text>
          </v-card>
          <!--END 显示被引用的原推文内容，文字、多图片、音视频等-->

          <!-- <v-text-field
              label="请发表评论"
              type="text"
              v-model = "getComment"
              required
          ></v-text-field> -->

          <CommentSendArea @sendData="sendData"/>

        </v-card-text>

      </v-container>


      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="close"
        >
          {{ $t('close') }}
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="postCoTweet"
        >
          {{ $t('send') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {formatDate} from "@/utils/formatDate";
import AnimNum from "@/components/Post/AnimNum"
import MultiPhoto from "@/components/Post/MultiPhoto"
import VideoPlayer from "@/components/Post/VideoPlayer"
import AudioPlayer from "@/components/Post/AudioPlayer"
import CommentSendArea from "@/components/Post/CommentSendArea"
import QuoteItem from "@/components/Post/QuoteItem";
// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default {
  name: "CommentDialog",
  components: {QuoteItem, AnimNum, MultiPhoto, VideoPlayer, AudioPlayer, CommentSendArea },
  data: function () {
    return {

    }
  },
  filters: {

  },
  computed: {
    getDialogStatus: {

      get () {
        return this.$store.getters['Post/commentDialogState'].dialog
      },
      set (value) {
        this.$store.dispatch('Post/commentDialogStatusAction',value)
      }
    },
    getSource: {
      get () {
        return this.$store.getters['Post/commentDialogState']
      }
    },
    getComment: {
      get () {
        return this.$store.getters['Post/commentDialogState'].Tw
      },
      set (value) {
        this.$store.dispatch('Post/commentDialogCommentAction',value)
      }
    },
    getUserA() {
      console.log('getuserA: ' + JSON.stringify(this.$store.getters['Post/commentDialogState']))
      return this.$store.getters['Post/commentDialogState'].PatS[0].User.UserA

    },
    getUserD() {
      return this.$store.getters['Post/commentDialogState'].PatS[0].User.UserD
    },
    getUser() {
      return this.$store.getters['Post/commentDialogState'].PatS[0].User.User
    },
    getTw() {
      return this.$store.getters['Post/commentDialogState'].PatS[0].Tw
    },
    getT() {
      return this.$store.getters['Post/commentDialogState'].PatS[0].T.substring(0,10)
    }
  },
  methods: {
    sendData(value) {
      this.$store.dispatch('Post/commentDialogCommentAction',value)
    },
    close: function () {
      this.$store.dispatch('Post/commentDialogStatusAction',false)
    },
    postCoTweet: function () {

      this.$emit('postCoTweet',this.$store.getters['Post/commentDialogState'])

    }
  }

}
</script>

<style lang="scss"  scoped>
.profileImage {
  margin-right: 5px;
}
.tweet {
  width: 100%;
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
        transition: 300ms;
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
</style>
