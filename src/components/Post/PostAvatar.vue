<template>
  <!--START 用户头像显示区  -->
  <div class="profileImage" @click.stop="getUserCenter(source)">

    <!--START 广告贴-->
    <template v-if="source.Typ === 'A'">

      <v-avatar  size="48" >
        <template v-if="source.User['UserA']">
          <img  :src="source.User['UserA'] | getFullUrl" :alt="source.User['UserD']"/>
        </template>
        <template v-else>
          AD
        </template>
      </v-avatar>

    </template>
    <!--END 广告贴-->

    <!--START 非广告贴-->
    <template>

      <!--START 转贴-->
      <template v-if="source.Retw !== ''">

        <v-badge
            bordered
            color="orange accent-3"
            icon="ri-group-fill"
            overlap
            size="20"
            offset-x="16"
            offset-y="20"
            :value=" source.ReUser.IsGroup > 0"
        >
          <v-avatar  size="48" >
            <img v-if="source.ReUser['UserA']" :src="source.ReUser['UserA'] | getFullUrl" :alt="source.ReUser['UserD']"/>
            <img v-else :src="dAvatar.url" :alt="dAvatar.alt"/>
          </v-avatar>

        </v-badge>

      </template>
      <!--END 转贴-->
      <!--START 其他贴-->
      <template v-else>

        <v-badge
            bordered
            color="orange accent-3"
            icon="ri-group-fill"
            overlap
            size="20"
            offset-x="16"
            offset-y="20"
            :value="source.User.IsGroup > 0"
        >

          <v-avatar  size="48" >
            <img v-if="source.User['UserA']" :src="source.User['UserA'] | getFullUrl" :alt="source.User['UserD']"/>
            <img v-else :src="dAvatar.url" :alt="dAvatar.alt"/>
          </v-avatar>

        </v-badge>

      </template>
      <!--END 其他贴-->

    </template>
    <!--END 非广告贴-->



  </div>
  <!--END  用户头像显示区  -->
</template>

<script>
export default {
  name: "PostAvatar",
  data() {
    return {
      mSecond: 1,
      dAvatar: {
        url: require('../../assets/users/user-d.png'),
        alt: this.$t('default avatar')
      },
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
    //进入所选用户中心
    getUserCenter: function (source) {


      //跳转到用户中心页面
      this.$router.push({
        path: "/usercenter",
        query: {
          name: source.Retw ==='' ? source.User.UserD : source.ReUser.UserD
        }
      })

    },
  }
}
</script>

<style scoped>

</style>
