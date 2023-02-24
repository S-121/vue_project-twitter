<template>
  <div>

    <!--START 内容输入区-->
    <v-card tile flat class="pt-0 px-0">

      <!--START 内容输入框-->
      <v-textarea
          :label="replyUser"
          background-color="grey lighten-3"
          :loading="loading"

          rows="1"
          row-height="18"
          v-model="postText"
          @input="updateText"
          placeholder=""
          @click="clickedTextArea = true"
          @focus="showActionBar"
          @blur="getPreviewUrl"
          auto-grow
          shaped
          filled
          hide-details
          color="#1da1f2"
          type="text"
      >
        <!--START 群组图标-->
        <template v-slot:append  >

          <v-avatar v-show="$store.getters['Post/currentUserGroupState'] && $store.getters['Post/currentUserGroupState'].IsGroup > 0" size="30">
            <v-img :src="$store.getters['Post/currentUserGroupState'].Avatar96 | getFullUrl"  :alt="$store.getters['Post/currentUserGroupState'].DisplayName" ></v-img>
          </v-avatar>

        </template>
        <!--END 群组图标-->

      </v-textarea>
      <!--END 内容输入框-->

<!--      <UrlPreviewCard :previewCard="previewCard"></UrlPreviewCard>-->

    </v-card>
    <!--END 内容输入区-->

    <!--START 功能操作按钮-->
    <v-card
        tile flat
        class="px-6 py-1 d-flex justify-start"
        v-if="actionBar"
    >

      <!--START 上传组件-->
      <VueFileAgent
          ref="vueFileAgent"
          :theme="'default'"
          :multiple="true"
          :deletable="true"
          :meta="false"
          :accept="'image/*,audio/*,video/*'"
          :resumable="true"
          :maxSize="'40MB'"
          :maxFiles="fileCount"
          :helpText="'媒体'"
          :uploadWithCredentials="false"
          :errorText="{
                type: '只能上传图片格式',
                size: '文件最大20M',
                }"
          @select="filesSelected($event)"
          @beforedelete="onBeforeDelete($event)"
          @delete="fileDeleted($event)"
          v-model="fileRecords"
          :thumbnailSize="560"

      >

        <template v-slot:before-inner >
          <template v-for="icon in icons">
            <v-btn
                :color="icon.bgcolor"
                fab
                depressed
                x-small
                class="ma-1"
            >
              <v-icon size="20" :color="icon.color">
                {{ icon.name }}
              </v-icon>
            </v-btn>
          </template>


        </template>


        <template v-slot:file-preview-new>
          preview
        </template >

        <template v-slot:file-preview="slotProps">
          <!--<v-img :src="slotProps.fileRecord.urlResized" ></v-img>-->
        </template>

      </VueFileAgent>
      <!--END 上传组件-->

      <!--START 表情功能按钮-->
      <div class="d-flex justify-content-end" style="padding: 2px">

        <!--START 表情弹出框-->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                right
                color="yellow lighten-4"
                fab
                depressed
                x-small
                class="ma-1"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon size="20" color="yellow darken-3 ">
                ri-emotion-line
              </v-icon>
            </v-btn>
          </template>
          <VEmojiPicker @select="selectEmoji" />
        </v-menu>
        <!--END 表情弹出框-->

        <!--START 表情按钮-->
        <v-btn
            right
            color="green lighten-5"
            fab
            depressed
            x-small
            class="ma-1"
            @click.stop="openEditor"
        >
          <v-icon size="20" color="green darken-1">
            ri-article-line
          </v-icon>
        </v-btn>
        <!--END 表情按钮-->
      </div>
      <!--END 表情功能按钮-->

    </v-card>
    <!--END 功能操作按钮-->

    <!--START 发送按钮-->
    <v-card tile flat
            class="px-6 pt-0 pb-2 d-flex justify-start"
            v-if="sendStatus"
    >

      <v-btn

          depressed
          dark
          color="light-blue lighten-1"
          block
          :loading="loading"
          @click.native = 'replyPost'
      >
        <span class="font-weight-black">
          {{ $t('send') }}
        </span>
      </v-btn>

    </v-card>
    <!--END 发送按钮-->

    <RichEditor :dialog="dialog" />

  </div>
</template>

<script>
import untils from "@/utils/untils"
import RichEditor from "@/components/Post/RichEditor"
import {VEmojiPicker} from "v-emoji-picker"
import UrlPreviewCard from "@/components/Post/UrlPreviewCard"
import Avatar from "@/components/Post/Avatar"
import {mapGetters} from "vuex";
import CustomFileAgent from "@/components/Post/CustomFileAgent";
import * as tus from "tus-js-client";

let reg = new RegExp("(?:(?:https?|ftp|file):\\/\\/|www\\.|ftp\\.)(?:\\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\\)|[-A-Za-z0-9+&@#/%=~_|$?!:,.])*(?:\\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\\)|[A-Za-z0-9+&@#/%=~_|$])")


let upload          = null
let uploadIsRunning = false

export default {
  name: "PostReplyCard",//过滤器
  components: {CustomFileAgent, RichEditor, VEmojiPicker, UrlPreviewCard, Avatar },
  data() {
    return {
      actionBar: false,
      dialog: false,
      icons:[
        {name: 'ri-image-add-line', bgcolor: 'blue lighten-5', color: 'blue darken-1'},
        {name: 'ri-movie-line', bgcolor: 'deep-purple lighten-5',color: 'deep-purple darken-1'}
      ],
      fileCount:4,
      fileRecords: [],
      fileRecordsForUpload: [], // maintain an upload queue
      fileTyp: '',
      sendTyp:'',
      rules: [v => v.length <= 512 || '最大512个汉字'],
      loader: null,
      snackbar: false,
      snacktext: "",
      loading: false,
      clickedTextArea: false,
      sendStatus: false,
      btn_send: '发送',
      previewUrl: '',
      previewCard: {
        show: false,
        title: '',
        desc: '',
        url: '',
        img: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      userState: 'Post/userState'
    }),
    postText: {
      get () {

        //判断是否包含url
        if(reg.test(this.$store.getters["Post/postTextState"])){

          //url预览
          this.previewUrl = reg[Symbol.match](this.$store.getters["Post/postTextStat"])

          console.log(this.previewUrl)

        }else{

          this.previewUrl = ''
          this.previewCard.show = false

        }

        return this.$store.getters["Post/postTextState"]
      },
      set (value) {

        this.$store.dispatch('Post/postTextAction',value)

        if(value){
          this.sendStatus = true
        }else{
          this.sendStatus = false
        }
      }
    },
    replyUser() {
      return 'Replying to ' + this.rePost.User.User
    },
  },
  props: {
    rePost: Object
  },
  filters: {

  },

  methods: {
    showActionBar: function () {
      this.actionBar = true
    },
    postUploadFile: function (tokenCount){

      console.log('文件数量：' + this.fileRecordsForUpload.length)

      //有多张图片，遍历上传
      for (let j = 0; j < this.fileRecordsForUpload.length; j++) {
        //新增上传对象
        new tus.Upload(this.fileRecordsForUpload[j].file, this.getOptions(j)).start()
      }

      uploadIsRunning = true;

    },
    // 先获取上传文件token，再执行上传文件
    getUploadToken: function (tokenCount) {
      //获取相应数量token  Max=10
      this.api.postUploadTokensAPI(tokenCount).then(response =>{

        console.log('获取上传文件token:'+ JSON.stringify(response.data['Body']))
        //保存文件token到store
        this.$store.dispatch('Post/uploadTokensAction',response.data['Body'])

        console.log('文件token列表：' + this.$store.getters["Post/uploadTokensState"])

        //上传文件
        this.postUploadFile(tokenCount)


      })
    },
    uploadFiles: function () {

      //有几个文件就需要几个Token
      let tokenCount = this.fileRecordsForUpload.length
      if(tokenCount >0) {
        //先去获取获取文件上传token，再开始上传任务
        this.getUploadToken(tokenCount)
      }
    },

    updateUploadToken: function (e) {
      this.$store.dispatch('Post/uploadTokenAction',e.target.value)
    },

    emptyFileInput: function (file) {
      this.$refs.vueFileAgent.deleteFileRecord(file); // will trigger 'delete' event
      this.sendStatus = false
    },
    //清空所有文件
    deleteAllFiles: function (){

      this.fileRecordsForUpload = []
      this.fileRecords = []

    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
      this.sendStatus = false
    },
    filesSelected: function (fileRecordsNewlySelected) {
      //当用户选择了文件，则取消禁用发送按钮
      this.sendStatus = true

      //获取文件后缀名
      this.fileTyp = fileRecordsNewlySelected[0].type

      console.log('用户选择了文件,文件类型：'+ JSON.stringify(fileRecordsNewlySelected[0].type))

      //如果用户选择的是音视频文件，则只允许上传1个文件
      if(this.fileTyp === 'image/gif' || this.fileTyp === 'video/mp4' || this.fileTyp === 'video/mpg' || this.fileTyp === 'audio/mpeg' ) {
        this.fileCount = 1

        if(this.fileTyp === 'image/gif'){
          this.sendTyp = 'I'
        }else if(this.fileTyp === 'video/mp4' || this.fileTyp === 'video/mpg') {
          this.sendTyp = 'V'
        }else if(this.fileTyp === 'audio/mpeg'){
          this.sendTyp = 'S'
        }else {
          this.sendTyp = ''
        }
      }else if(this.fileTyp === 'image/png' || this.fileTyp === 'image/jpeg'){
        this.fileCount = 4
        this.sendTyp = 'I'
      }else {
        this.sendTyp = ''
      }

      let validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);

      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      this.sendStatus = false
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm('确认删除')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      alert("fileDeleted:"+fileRecord)
      let i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
    getOptions: function (i) {
      let _this = this
      return {
        endpoint: 'https://uploadtest.vog.media/uapi/v1/files/',
        chunkSize: 1000000,
        retryDelays: [0, 1000, 3000, 5000],
        parallelUploads: 1,
        metadata: {
          filename: this.fileRecordsForUpload[i].file.name,
          filetype: this.fileRecordsForUpload[i].file.type,
          uploadtoken: this.$store.getters["Post/uploadTokensState"][i]
        },
        onError: function (error) {
          if (error.originalRequest) {
            if (window.confirm("上传失败: " + error + "\n重试?")) {
              upload.start();
              uploadIsRunning = true;
            }
          } else {
            window.alert("上传失败: " + error);
            _this.loading = false
          }
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          let percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
          console.log(`文件序列:${i},上传进度：`+ bytesUploaded, "文件大小：" + bytesTotal, percentage + "%");

          //文本输入框处的加载动画
          _this.loading = true
          //显示上传进度数值
          // _this.btn_send = (bytesUploaded / bytesTotal * 100).toFixed(0) + '%'

        },
        onSuccess: function () {
          //上传成功后，获取地址   最后一个任务完成后，再执行获取Url
          if(i === _this.fileRecordsForUpload.length-1){
            _this.getFinalUrl()
          }
          //显示加载动画
          //_this.loading = false

        }
      }
    },

    openEditor: function () {
      this.dialog = true
    },
    //选择表情
    selectEmoji(emoji) {
      console.log(JSON.stringify(emoji))
      //显示发送按钮
      this.sendStatus = true
      this.$store.dispatch('Post/postTextAction',this.$store.getters['Post/postTextState'] + emoji.data)
    },
    //获取预览Url
    getPreviewUrl:function () {

      if(this.previewUrl !== ''){

        //获取meta信息
        this.api.getMetaDataAPI(encodeURIComponent(this.previewUrl)).then(response => {
          if(response.data['Code'] === 0 ) {
            console.log("获取meta信息:"+JSON.stringify(response.data['Body']))

            if(response.data['Body'].Description !== '') {
              //显示渲染卡片
              this.previewCard.show = true
              this.previewCard.title = response.data['Body'].Title
              this.previewCard.desc = response.data['Body'].Description
              this.previewCard.url = response.data['Body'].Url
              if(response.data.Image === '') {
                this.previewCard.img = require('../../assets/img/url.jpg')
              }else {
                this.previewCard.img = response.data['Body'].Image
              }

            }
          }else {
            this.previewCard.show = false
          }
        }).catch(err => console.log(err))

      }

    },
    //验证url
    regUrl:function(val){

      let reg = new RegExp("(?:(?:https?|ftp|file):\\/\\/|www\\.|ftp\\.)(?:\\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\\)|[-A-Za-z0-9+&@#/%=~_|$?!:,.])*(?:\\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\\)|[A-Za-z0-9+&@#/%=~_|$])")

      if(reg.test(val)){
        alert(reg[Symbol.match](val))
        // return reg.test(val)
      }
    },
    updateText: function (e) {
      this.$store.dispatch('Post/postTextAction',e)
    },
    //发送推文
    replyPost: function() {

      this.regUrl(this.$store.getters['Post/postTextState'])

      this.loading = true

      if(!this.untils.isEmpty(this.fileRecordsForUpload)){
        //发送图文消息或图片

        let result = this.uploadFiles()

      }else{
        //回复消息
        //评论数据
        let data = {
          "cotweet": this.rePost.T,
          "tweet": this.$store.getters['Post/postTextState']
        }

        //发送评论
        this.api.postCoTweetAPI(data).then(response => {
          if(response.data.Code === 0) {

            // 返回T数据后，组装message消息体，存放进messages数组中，立即显示在timeline
            if(response.data['Body']) {

              console.log('评论成功 ：' + JSON.stringify(response.data['Body']))

            }
            //隐藏动画
            this.loading = false

            //清空数据
            this.fileRecordsForUpload = []
            this.fileRecords = []
            //清空消息框
            this.$store.dispatch('Post/postTextAction','')
            //清除store中多媒体数据

            console.log("发评论成功，:" + JSON.stringify(response.data))

          }
        }).catch(err => console.log(err))

      }
    },

  },

}
</script>

<style scoped>

</style>
