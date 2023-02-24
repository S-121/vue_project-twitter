<template>
  <v-dialog
      v-model="getDialogStatus"
      width="650"
  >
    <v-card class="px-2">
      <v-container>

          <v-text-field
              label="请发表评论"
              type="text"
              v-model = "getComment"
              required
          ></v-text-field>

          <!--显示被引用的原推文内容，文字、多图片、音视频等-->
          <v-card
              class="my-0 py-0 transparent quote-card" flat
          >
            <v-card-actions class="py-0 pl-0">
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3" size="28" class="mr-2">

                  <v-img v-if="getUserA" :src="getUserA | getFullUrl" :alt="getUserD" />
                  <v-img v-else :src="dAvatar.url" :alt="getUserD" />

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
              <div  class="tweetImage mt-2" >
                <!--多图片-->
                <template v-if="getSource.QotS[0].P !== null" >
                  <MultiPhoto :images="getSource.QotS[0].P" />
                </template>
                <!--音频-->
                <template v-else-if="getSource.QotS[0].MTyp === 'S' && getSource.QotS[0].Url !== '' ">
                  <AudioPlayer :audio-url="getSource.QotS[0].Url"/>
                </template>
                <!--视频-->
                <template v-else-if="getSource.QotS[0].MTyp === 'V' && getSource.QotS[0].Url !== '' ">
                  <VideoPlayer :video-url="getSource.QotS[0].Url"/>
                </template>
                <!--直播-->
                <template v-else-if="getSource.QotS[0].MTyp === 'L'">
                  Live Player
                </template>
                <!--文章-->
                <template v-else-if="getSource.QotS[0].MTyp === 'U'">
                  Article Card
                </template>
                <!--其他-->
                <template v-else/>

              </div>
              <!--END 引用中的多媒体信息-->
            </v-card-text>
          </v-card>


      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="close"
        >
          关闭
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="postQoTweet"
        >
          发送
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import AnimNum from "@/components/Post/AnimNum"
import MultiPhoto from "@/components/Post/MultiPhoto"
import VideoPlayer from "@/components/Post/VideoPlayer"
import AudioPlayer from "@/components/Post/AudioPlayer"
import {formatDate} from "@/utils/formatDate";
// Suppress the warnings
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default {
  name: "QotDialog",
  components: {AnimNum, MultiPhoto, VideoPlayer, AudioPlayer },
  data: function () {
    return {
      dAvatar: {
        url: require('../../assets/users/user-d.png'),
        alt: this.$t('default avatar')
      },
    }
  },
  filters: {

  },
  computed: {
    getDialogStatus: {
      get () {
        return this.$store.getters['Post/qotDialogState'].dialog
      },
      set (value) {
        this.$store.dispatch('Post/qotDialogStatusAction',value)
      }
    },
    getSource: {
      get () {
        return this.$store.getters['Post/qotDialogState']
      }
    },
    getComment: {
      get () {
        return this.$store.getters['Post/qotDialogState'].Tw
      },
      set (value) {
        this.$store.dispatch('Post/qotDialogCommentAction',value)
      }
    },
    getUserA() {
      return this.$store.getters['Post/qotDialogState'].QotS[0].User.UserA
    },
    getUserD() {
      return this.$store.getters['Post/qotDialogState'].QotS[0].User.UserD
    },
    getUser() {
      return this.$store.getters['Post/qotDialogState'].QotS[0].User.User
    },
    getTw() {
      return this.$store.getters['Post/qotDialogState'].QotS[0].Tw
    },
    getT() {
      return this.$store.getters['Post/qotDialogState'].QotS[0].T.substring(0,10)
    }
  },
  methods: {
    close: function () {
      this.$store.dispatch('Post/qotDialogStatusAction',false)
    },
    postQoTweet: function () {
      this.$emit('postQoTweet',this.$store.getters['Post/qotDialogState'])
    }
  }

}
</script>

<style scoped>
.quote-card {
  border:1px solid #dddddd !important;
}
</style>
