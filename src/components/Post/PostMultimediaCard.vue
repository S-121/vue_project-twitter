<template>
  <div v-if="msgFilter(source).Typ === 'I' || msgFilter(source).Typ === 'U' || msgFilter(source).Typ === 'ReI' || msgFilter(source).Typ === 'S' || msgFilter(source).Typ === 'V' || msgFilter(source).Typ === 'ReV' " class="tweetImage mt-2 mb-2 mr-2" >
    <LightBox
      ref="lightbox"
      :media="media"
      :show-caption="false"
      :show-light-box="false"
      :show-thumbs="false"
    ></LightBox>

    <!--多图片-->
    <template v-if="msgFilter(source).Typ === 'I' || msgFilter(source).Typ === 'ReI'">
      <MultiPhoto :images="source.P" v-on:photoClick="onPhotoClick"/>
    </template>
    <!--音频-->
    <template v-else-if="msgFilter(source).Typ === 'S'">
      <AudioPlayer :audio-url="source.Url"/>
    </template>
    <!--视频-->
    <template v-else-if="msgFilter(source).Typ === 'V' || msgFilter(source).Typ === 'ReV'">
      <VideoPlayer :video-url="source.Url"/>
      <!-- <PDFViewer :pdf-url="source.Url" v-on:pdfClick="onPdfClick" /> -->
    </template>
    <!--直播-->
    <template v-else-if="msgFilter(source).Typ === 'L'">
      Live Player
    </template>
    <!--文章-->
    <template v-else-if="msgFilter(source).Typ === 'U'">
      <TimeLineUrlPreviewCard :preview-data="source.Url" />
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


</template>

<script>

import MultiPhoto from "@/components/Post/MultiPhoto"
import VideoPlayer from "@/components/Post/VideoPlayer"
import AudioPlayer from "@/components/Post/AudioPlayer"
import PDFViewer from "@/components/Post/PDFViewer"
import LightBox from 'vue-image-lightbox'
import VuePdfApp from "vue-pdf-app";
import UrlPreviewCard from "@/components/Post/UrlPreviewCard";
import TimeLineUrlPreviewCard from "@/components/Post/TimeLineUrlPreviewCard";

export default {
  name: "PostMultimediaCard",
  components: {
    TimeLineUrlPreviewCard,
    UrlPreviewCard, MultiPhoto, VideoPlayer, AudioPlayer, LightBox, PDFViewer, VuePdfApp },
  data() {
    return {
      mSecond: 1,
      dAvatar: {
        url: require('../../assets/users/user-d.png'),
        alt: this.$t('default avatar')
      },
      media: [
        {
          thumb: '',
          src: '',
          type: ''
        }
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
    qot: Boolean
  },
  computed: {
    //计算消息类型
    msgFilter() {
      let _this = this
      return function (source) {
        //转发状态
        if((source.Retw !=='') && (source.Retw !=='0')) {

          if(source.Retw !== '' && source.MTyp === 'S') {
            return _this.msgStatus['ReS']
            //视频转推
          }else if(source.Retw !== '' && source.MTyp === 'V') {
            return _this.msgStatus['ReV']
            //文章转推
          }else if(source.Retw !== '' && source.MTyp === 'U')  {
            return _this.msgStatus['ReU']
            //图片转推
          }else if(source.Retw !== '' && source.MTyp === '' && source.P !== null)  {
            return _this.msgStatus['ReI']
            //文字转推
          }else if(source.Retw !== '' && source.MTyp === '' && source.P === null  && source.Url === '')  {
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
        }else if(source.Retw === '' && (source.QotS === null ) && source.MTyp === 'S') {
          return _this.msgStatus['S']
          //视频
        }else if(source.Retw === '' && (source.QotS === null ) && source.MTyp === 'V') {
          return _this.msgStatus['V']
          //文章
        }else if(source.Retw !== '' && (source.QotS === null ) && source.MTyp === 'U')  {
          return _this.msgStatus['U']
          //直播
        }else if(source.Retw === '' && (source.QotS === null ) && source.MTyp === 'L') {
          return _this.msgStatus['L']
          //心跳
        }else if(source.MTyp === 'P') {
          return _this.msgStatus['P']
          //通知
        }else if(source.MTyp === 'N') {
          return _this.msgStatus['N']
          //文章
        }else if(source.MTyp === 'U') {
          return _this.msgStatus['U']
          //广告
        }else if((source.Retw === '') && (source.QotS === null) && source.MTyp === 'A' ) {
          return _this.msgStatus['A']
          //多图片
        }else if(source.MTyp === '' && source.P !== null) {
          return _this.msgStatus['I']
        }
        else {
          return _this.msgStatus['OT']  //原文
        }
      }
    }
  },
  methods: {
    onPhotoClick(images, index) {
      let t_media = [];
      images.forEach(image => {
        t_media.push({
          thumb: image,
          src: image,
          type: 'image'
        });
      });

      this.media = t_media;
      this.$refs.lightbox.showImage(index);
    },
    onPdfClick(pdfUrl) {
      this.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
