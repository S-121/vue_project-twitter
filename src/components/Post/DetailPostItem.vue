<template>
  <!--显示被引用的原推文内容，文字、多图片、音视频等-->
  <v-card
      v-if="DetailPost !== null"
      class="transparent" flat
  >

    <v-card-actions class="py-0 pl-0">
      <v-list-item class="grow py-2 pl-4 pr-2 mt-1" >
        <v-list-item-avatar color="grey darken-3" size="48" class="mr-3 my-0">

          <v-img
              v-if="DetailPost.User['UserA']"
              :src="DetailPost.User['UserA'] | getFullUrl"
              :alt="DetailPost.User['UserD']"
          />
          <v-img v-else :src="dAvatar.url" :alt="dAvatar.alt" />

        </v-list-item-avatar>

        <v-list-item-content class="py-0">
          <v-list-item-title>
            <label class="mr-1 font-weight-bold">{{ DetailPost.User['UserD'] }}</label>
            <!--<label class="mr-0 font-weight-medium text-subtitle-2  grey&#45;&#45;text">@{{ DetailPost.User.User }}</label>
            <label class="ml-1 mr-1 font-weight-bold   text--lighten-1 grey--text">·</label>
            <label class="font-weight-normal text-subtitle-2  grey--text">{{ postTime(DetailPost) | formatDate }}</label>-->

            <!--START 右侧操作按钮-->
            <RightMoreBtn :source="DetailPost" />
            <!--END  右侧操作按钮-->
          </v-list-item-title>



        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
    <v-card-text class="font-weight-normal pt-0 pb-0 px-4">
      <p class="text-h5 black--text mb-0">
        {{ DetailPost.Tw }}
      </p>

      <!--引用中的多媒体信息-->
      <template v-if="DetailPost.P !== null">
        <div  class="tweetImage" >
          <!--多图片-->
          <template v-if="DetailPost.P !== null || (DetailPost.MTyp === 'S' && DetailPost.Url !== '') || (DetailPost.MTyp === 'V' && DetailPost.Url !== '' )" >
            <MultiPhoto :images="DetailPost.P" />

          </template>

          <!--其他-->
          <template v-else />

        </div>
      </template>

      <!--音频-->
      <template v-else-if="DetailPost.MTyp === 'S' && DetailPost.Url !== '' ">
        <AudioPlayer :audio-url="DetailPost.Url"/>
      </template>
      <!--视频-->
      <template v-else-if="DetailPost.MTyp === 'V' && DetailPost.Url !== '' ">
        <VideoPlayer :video-url="DetailPost.Url"/>

      </template>

      <!--END 引用中的多媒体信息-->
    </v-card-text>
  </v-card>
  <!--END 显示被引用的原推文内容，文字、多图片、音视频等-->
</template>

<script>
import MultiPhoto from "@/components/Post/MultiPhoto";
import AudioPlayer from "@/components/Post/AudioPlayer";
import VideoPlayer from "@/components/Post/VideoPlayer";
import RightMoreBtn from "@/components/Post/RightMoreBtn";
export default {
  name: "DetailPostItem",
  components: {RightMoreBtn, VideoPlayer, AudioPlayer, MultiPhoto},
  data() {
    return {
      mSecond: 1,
      dAvatar: {
        url: require('../../assets/users/user-d.png'),
        alt: this.$t('default avatar')
      },
    };
  },

  props: {
    DetailPost: Object
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
  }
}
</script>

<style scoped>
.grow {
  min-height: 30px !important;
}
</style>
