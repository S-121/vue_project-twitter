<template>
<div class="post-title mb-1" @click.stop="getDetailPost(source)">

  <template v-if="msgFilter(source).Typ === 'RE' || msgFilter(source).Typ === 'ReV' || msgFilter(source).Typ === 'ReI'  || msgFilter(source).Typ === 'ReS'  || msgFilter(source).Typ === 'ReU'  || msgFilter(source).Typ === 'ReL'">
    <div class="ml-8">
      <v-icon size="20" class="grey--text text--darken-3 mr-1">{{ msgFilter(source).Icon }}</v-icon>
      <label class="font-weight-medium text-body-2 text--darken-3 grey--text">
        {{source.User['UserD']}} {{msgFilter(source).Title}}
      </label>
    </div>
  </template>

  <!-- START 音频 视频 直播 -->
<!--  <template v-else-if="msgFilter(source).Typ === 'S' || msgFilter(source).Typ === 'V'  || msgFilter(source).Typ === 'L' ">
    <div class="mx-4 my-2">
      <v-icon small class="grey&#45;&#45;text text&#45;&#45;darken-3">{{ msgFilter(source).Icon }}</v-icon>
      <label class="font-weight-medium text-body-2 text&#45;&#45;darken-3 grey&#45;&#45;text">
        {{msgFilter(source).Title}}
      </label>
    </div>
  </template>-->
  <!-- END 音频 视频 直播 -->

  <!-- START 显示出评论的父亲贴 -->
  <template v-else-if="msgFilter(source).Typ === 'CO'">

  </template>
  <!-- END 显示出评论的父亲贴 -->

  <template v-else />

</div>
</template>

<script>
export default {
  name: "PostTitleItem",
  data() {
    return {
      msgStatus: {
        "DEL": {
          "Typ": "DEL",
          "Icon": "mdi-repeat",
          "Title": this.$t('delete')
        },
        "RE": {
          "Typ": "RE",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReI": {
          "Typ": "ReI",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReV": {
          "Typ": "ReV",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReS": {
          "Typ": "ReS",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReL": {
          "Typ": "ReL",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "ReU": {
          "Typ": "ReU",
          "Icon": "mdi-repeat",
          "Title": this.$t('reposts')
        },
        "QO": {
          "Typ": "QO",
          "Icon": "mdi-repeat",
          "Title": this.$t('qoposts')
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


    };
  },
  props: {
    source: Object
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
    getDetailPost: function (source) {
      this.api.getDetailPost(source)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
