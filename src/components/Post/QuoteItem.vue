<template>
  <!--显示被引用的原推文内容，文字、多图片、音视频等-->
  <v-card
      v-if="QotS !== null"
      class="pb-2 transparent quote-card" flat

  >

    <v-card-actions class="py-0 pl-0">
      <v-list-item class="grow px-3 mt-1" >
        <!--START 头像-->
        <v-list-item-avatar color="grey darken-3" size="20" class="mr-2 my-0">

          <v-img
              v-if="QotS[0].User['UserA']"
              :src="QotS[0].User['UserA'] | getFullUrl"
              :alt="QotS[0].User['UserD']"
          />
          <v-img v-else :src="dAvatar.url" :alt="dAvatar.alt" />

        </v-list-item-avatar>
        <!--END 头像-->

        <v-list-item-content class="py-0" @click.stop="getDetailPost(QotS[0])">
          <v-list-item-title>
            <label class="mr-1 font-weight-bold">{{ QotS[0].User['UserD'] }}</label>
            <!--<label class="mr-0 font-weight-medium text-subtitle-2  grey&#45;&#45;text">@{{ QotS[0].User.User }}</label>-->
            <label class="ml-1 mr-1 font-weight-bold   text--lighten-1 grey--text">·</label>
            <label class="font-weight-normal text-subtitle-2  grey--text">{{ postTime(QotS[0]) | formatDate }}</label>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
    <v-card-text class="font-weight-normal pt-0 pb-0 ">
      <p class="font-weight-normal black--text mb-0" @click.stop="getDetailPost(QotS[0])">
        {{ QotS[0].Tw }}
      </p>

      <!--引用中的多媒体信息-->

        <div  class="tweetImage mt-1 mb-1 " >
          <template v-if="QotS[0].P !== null">
            <!--多图片-->
            <template v-if="QotS[0].P !== null || (QotS[0].Typ === 'S' && QotS[0].Url !== '') || (QotS[0].Typ === 'V' && QotS[0].Url !== '' )" >
              <MultiPhoto :images="QotS[0].P" :qotS="true"/>
            </template>

          <!--其他-->
          <template v-else />

          </template>
          <!--音频-->
          <template v-else-if="QotS[0].MTyp === 'S' && QotS[0].Url !== '' ">
            <AudioPlayer :audio-url="QotS[0].Url"/>

          </template>
          <!--视频-->
          <template v-else-if="QotS[0].MTyp === 'V' && QotS[0].Url !== '' ">
            <VideoPlayer :video-url="QotS[0].Url"/>
          </template>
        </div>

      <!--END 引用中的多媒体信息-->
    </v-card-text>
  </v-card>
  <!--END 显示被引用的原推文内容，文字、多图片、音视频等-->
</template>

<script>
import MultiPhoto from "@/components/Post/MultiPhoto";
import AudioPlayer from "@/components/Post/AudioPlayer";
import VideoPlayer from "@/components/Post/VideoPlayer";
import untils from "@/utils/untils";



export default {
  name: "QuoteItem",
  components: {VideoPlayer, AudioPlayer, MultiPhoto},
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
    QotS: Array
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
    getDetailPost: function (source) {

      this.api.getOriginPost(source)

    },
    getOriginPost: function (source) {

      console.log('getPost:'+ JSON.stringify(source))

      let t

      // 点击评论时，只显示当前评论与主贴
      if(source.Retw === '' && source.QotS === null  && source.PatS !== null) {

        console.log('当前评论与主贴:' + JSON.stringify(source))

        //存入store 跟帖列表
        this.$store.dispatch('Post/postListAddAction',source)

        this.$router.push('/postlist')


      }else { // 点击主贴时，显示主贴与相关所有评论

        //如果是转推，则进入的是原推文
        t = source.T

        this.api.getTweetsAPI(t).then(response => {

          if(response.data.Code === 0 && !untils.isEmpty(response.data['Body'])) {

            console.log("-getTweetsAPI-" + JSON.stringify(response.data['Body']))

            //存入store 跟帖列表
            this.$store.dispatch('Post/postListAddAction',response.data['Body'])

            console.log('跟帖列表：' + JSON.stringify(response.data['Body']))

            this.$router.push('/postlist')

          }
        }).catch(err => console.log(err))

      }
    }
  },

}
</script>

<style lang="scss" scoped>
.grow {
  min-height: 30px !important;
}
.tweetImage {
  max-width: 520px;
}
</style>
