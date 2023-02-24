<!--suppress ALL -->
<template>
  <div>
    <LightBox
      v-if="imagePreviewUrl.length"
      ref="lightbox"
      :media="imagePreviewUrl"
      :show-caption="false"
      :show-light-box="false"
      :show-thumbs="false"
    ></LightBox>
    <v-snackbar v-model="snackbar" :timeout="2000" color="blue">
      {{ snackBarMesasge }}
    </v-snackbar>
    <v-sheet>
      <v-card tile flat class="pt-4 px-6">
        <v-textarea
          :label="$t('post your ideas')"
          background-color="white lighten-3"
          :loading="loading"
          :rules="rules"
          rows="2"
          row-height="24"
          v-model="tweet"
          @input="updateTweet"
          placeholder=""
          @click="clickedTextArea = true"
          @keypress="onKeyPress"
          @keydown="onKeyDown"
          @blur="getPreviewUrl"
          auto-grow
          filled
          hide-details
          color="#1da1f2"
          type="text"
        >
          <template v-slot:append>
            <v-badge
                v-show="
                $store.getters['Post/currentUserGroupState'] &&
                $store.getters['Post/currentUserGroupState'].IsGroup > 0
              "
                bordered
                color="orange accent-3"
                icon="ri-group-fill"
                overlap
                size="20"
                offset-x="16"
                offset-y="20"
                value="true"
            >
            <v-avatar

              size="40"
            >
              <v-img
                :src="
                  $store.getters['Post/currentUserGroupState'].Avatar96
                    | getFullUrl
                "
                :alt="$store.getters['Post/currentUserGroupState'].DisplayName"
              ></v-img>
            </v-avatar>
            </v-badge>
          </template>
        </v-textarea>
        <h5 v-show="sendStatus" class="text-right pt-3">
          {{ remainedCharactersCount }} / 500
        </h5>

        <div v-if="showUserAutoComplete && showUserList" class="user-auto-complete py-2">
          <v-card>
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
               v-if="showUserList.length"
              style="min-height: 50px; max-height: 500px; overflow-y:auto; display: fixed"
            >
              <v-list-item link class="pl-0" v-for="(user,index) in showUserList" :key="index" @click="onSelectItem(index)">
                <v-badge
                    bordered
                    color="orange accent-3"
                    icon="ri-group-fill"
                    overlap
                    size="20"
                    offset-x="32"
                    offset-y="22"
                    :value="user.IsGroup > 0"
                >
                <v-badge
                    bordered
                    bottom
                    color="green accent-4"
                    dot
                    offset-x="24"
                    offset-y="20"
                    :value="user.Online < 60 * 10"
                >

                  <v-list-item-avatar v-if="user.IsGroup > 0">
                    <v-img :src="user.Avatar96 | getFullUrl" :alt="user.DisplayName" :lazy-src="require('../../assets/users/user-d.png')"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-avatar v-else>
                    <v-img :src="user.Avatar96 | getFullUrl" :alt="user.DisplayName" :lazy-src="require('../../assets/users/user-d.png')"></v-img>
                  </v-list-item-avatar>
                </v-badge>
                </v-badge>


                <v-list-item-content v-if="user.IsGroup > 0">
                  <v-list-item-title class="font-weight-bold">
                    {{ user.Username }}

                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">{{ user.LTw }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content v-else>
                  <v-list-item-title class="font-weight-bold">
                    {{ user.Username }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">{{ user.LTw }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-card>
        </div>

        <UrlPreviewCard :previewData="previewData" :show.sync="previewShow" ></UrlPreviewCard>

      </v-card>

      <v-card tile flat class="px-6 py-1 d-flex justify-start">
        <!--输入框下部表情能按钮-->
        <div class="d-flex justify-content-end" style="padding: 2px">
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

          <v-btn
            right
            color="blue lighten-5"
            fab
            depressed
            x-small
            class="ma-1"
            @click="imageClick"
          >
            <!-- @click.stop="openEditor" -->
            <v-icon size="20" color="blue darken-1"> ri-image-add-line </v-icon>

            <input
              ref="imageUploadRef"
              class="d-none"
              type="file"
              accept="image/*"
              multiple
              @change="imageFileChanged"
            />
          </v-btn>

          <v-btn
            right
            color="deep-purple lighten-5"
            fab
            depressed
            x-small
            class="ma-1"
            @click="videoClick"
          >
            <!-- @click.stop="openEditor" -->
            <v-icon size="20" color="deep-purple darken-1">
              ri-movie-line
            </v-icon>

            <input
              ref="videoUploadRef"
              class="d-none"
              type="file"
              accept="video/*"
              @change="videoFileChanged"
            />
          </v-btn>

          <v-btn
            right
            color="green lighten-5"
            fab
            depressed
            x-small
            class="ma-1"
            @click="audioClick"
          >
            <!-- @click.stop="openEditor" -->
            <v-icon size="20" color="green darken-1">
              ri-surround-sound-line
            </v-icon>

            <input
              ref="audioUploadRef"
              class="d-none"
              type="file"
              accept="audio/*"
              @change="audioFileChanged"
            />
          </v-btn>
        </div>
        <!--END 输入框下部表情能按钮-->
      </v-card>

      <div v-if="showPreview">
        <div style="padding: 5px 20px">
          <div v-if="sendTyp === 'I'" class="preview-images-holder">
            <div class="preview-images-list">
              <template v-for="(image, index) in this.imagePreviewUrl">
                <div
                  :key="index"
                  class="preview-images-list-item"
                  style="height: 125.75px"
                >
                  <div class="li-inner-content">
                    <img
                      :src="image.src"
                      alt="Image"
                      class="preview-image"
                      @click="onPhotoClick(index)"
                    />
                    <v-btn
                      small
                      icon
                      class="delete-preview-image"
                      @click="deleteItem(index)"
                    >
                      <v-icon size="20" color="white"> ri-close-line </v-icon>
                    </v-btn>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div
            v-if="sendTyp === 'V' && fileSource"
            class="preview-video-holder"
          >
            <video
              ref="videoPlayer"
              style="width: 100%; border-radius: 16px"
              autoPlay
              controls
            >
              <source :src="fileSource" type="video/mp4" />
            </video>
            <v-btn
              small
              icon
              class="delete-preview-video-audio"
              @click="deleteItem(0)"
            >
              <v-icon size="20" color="white"> ri-close-line </v-icon>
            </v-btn>
          </div>
          <div
            v-if="sendTyp === 'S' && fileSource"
            class="preview-audio-holder"
          >
            <AudioPlayer :audio-url="fileSource" />
            <v-btn
              small
              icon
              class="delete-preview-video-audio"
              @click="deleteItem(0)"
            >
              <v-icon size="20" color="white"> ri-close-line </v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <v-card tile flat class="px-6 pt-0 pb-2 d-flex justify-start">
        <v-btn
          v-show="sendStatus"
          depressed
          dark
          color="light-blue lighten-1"
          block
          :loading="loading"
          @click.native="postTweet(this)"
        >
          <span class="font-weight-black">
            <template
              v-if="
                $store.getters['Post/currentUserGroupState'] &&
                $store.getters['Post/currentUserGroupState'].IsGroup > 0
              "
            >
              Send in Group {{ $t('send in group') }}
            </template>
            <template v-else> {{ $t('send') }}</template>
          </span>
        </v-btn>
      </v-card>
    </v-sheet>

<!--    <RichEditor :dialog="dialog" />-->
  </div>
</template>

<script>
import Avatar from "@/components/Post/Avatar";
import * as tus from "tus-js-client";
import api from "@/api/api";
import { mapGetters } from "vuex";
import untils from "@/utils/untils";
import UrlPreviewCard from "@/components/Post/UrlPreviewCard";
import { VEmojiPicker } from "v-emoji-picker";
import RichEditor from "@/components/Post/RichEditor";
import LightBox from "vue-image-lightbox";
import AudioPlayer from "@/components/Post/AudioPlayer";
import { TWEET_CHARACTERS_MAX_COUNT } from "@/common/const";

let upToken;

let upload = null;
let uploadIsRunning = false;
let url = [];
let reg = new RegExp(
  "(?:(?:https?|ftp|file):\\/\\/|www\\.|ftp\\.)(?:\\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\\)|[-A-Za-z0-9+&@#/%=~_|$?!:,.])*(?:\\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\\)|[A-Za-z0-9+&@#/%=~_|$])"
);

export default {
  name: "TweetSendArea",
  data() {
    return {
      dialog: false,
      authStat: {
        homeCheck: true,
        groupCheck: false,
        name: "group",
        icon: "ri-group-line",
      },
      icons: [
        {
          name: "ri-image-add-line",
          bgcolor: "blue lighten-5",
          color: "blue darken-1",
        },
        {
          name: "ri-movie-line",
          bgcolor: "deep-purple lighten-5",
          color: "deep-purple darken-1",
        },
      ],
      fileCount: 4,
      sendTyp: "",
      rules: [(v) => v.length <= 512 || "最大512个汉字"],
      loader: null,
      snackbar: false,
      snacktext: "",
      loading: false,
      clickedTextArea: false,
      sendStatus: false,
      btn_send: "发送",
      fileTyp: "",
      previewUrl: "",
      previewData: null,
      previewShow: false,
      imagePreviewUrl: [],
      uploadFileType: "",
      fileSource: null,
      showPreview: false,
      uploadFilesList: [],
      remainedCharactersCount: TWEET_CHARACTERS_MAX_COUNT,
      showUserAutoComplete: false,
      selectedItem: null,
      temporaryUser: '',
      showUserList: [],
      userList: [],
			snackBarMesasge: ''
    };
  },
  components: {
    RichEditor,
    VEmojiPicker,
    UrlPreviewCard,
    Avatar,
    LightBox,
    AudioPlayer,
  },
  mounted() {
    this.$store.dispatch('Post/userInfoAction',JSON.parse(localStorage.getItem('userinfo')))

    //API：tweetuser  刷新页面后更新用户基础信息
    // this.api.updateUserInfo(this.api.getAuthToken());
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
    tweet() {
      this.remainedCharactersCount = TWEET_CHARACTERS_MAX_COUNT - this.tweet.length;
      this.previewUrl = this.linkify(this.tweet).urls[0]
    },
    temporaryUser() {

      // alert(this.temporaryUser)

      if (this.temporaryUser.replace(/[\u0391-\uFFE5]/g,"aa").length >= 1) {

        console.log('temporaryUser:' + this.temporaryUser)

        this.api.searchFollow(this.temporaryUser).then((response) => {
          if (!response.data['Code']) {
            this.showUserList = response.data['Body']
          } else {
            this.showUserList = []
          }
        })
      } else {
        this.showUserList = []
      }
    }
  },
  //过滤器
  filters: {},
  computed: {
    ...mapGetters({
      userState: "Post/userState",
    }),
    tweet: {
      get() {
        return this.$store.getters["Post/userState"].tweet;
      },
      set(value) {
        this.$store.dispatch("Post/tweetAction", value);
        if (value) {
          this.sendStatus = true;
        } else {
          this.sendStatus = false;
        }
      },
    },
  },
  methods: {
    onSelectItem(item) {
      this.showUserAutoComplete = false
      this.$store.dispatch("Post/tweetAction", `${this.tweet.slice(0, this.temporaryUser.length - this.temporaryUser.length * 2)}${this.showUserList[item].Username}`);
      this.temporaryUser = ''
    },
    onKeyDown(eve) {
      if (eve.key === "Backspace") {
        this.temporaryUser = this.temporaryUser.slice(0, -1);
        return
      }
    },
    onKeyPress(eve) {
      if (eve.key === '@' && !this.showUserAutoComplete) {
        this.temporaryUser = ''
        this.showUserAutoComplete = true
        return
      }

      if (this.showUserAutoComplete) {
        this.temporaryUser = this.temporaryUser.concat(eve.key)
      }
    },
    remlinkify(text) {
      let urlRegex =/(\b(https?|http|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      let replacedText = text.replace(urlRegex, function(url) {
        return '';
      });

      return replacedText
    },
    linkify(text) {
      let urlRegex =/(\b(https?|http|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      let urls = [];
      let replacedText = text.replace(urlRegex, function(url) {
        urls.push(url);
        return '<a href="' + url + '">' + url + '</a>';
      });

      return { replacedText, urls }
    },
    onPhotoClick(index) {
      this.$refs.lightbox.showImage(index);
    },
    imageClick: function () {
      this.$refs.videoUploadRef.value = null;
      this.$refs.audioUploadRef.value = null;
      this.$refs.imageUploadRef.click();
    },
    videoClick: function () {
      this.$refs.audioUploadRef.value = null;
      this.$refs.imageUploadRef.value = null;
      this.$refs.videoUploadRef.click();
    },
    audioClick: function () {
      this.$refs.videoUploadRef.value = null;
      this.$refs.imageUploadRef.value = null;
      this.$refs.audioUploadRef.click();
    },
    imageFileChanged: function (e) {
			for (let i = 0; i < e.target.files.length; i++) {
				if (!this.isImage(e.target.files[i].name)) {
					this.$refs.imageUploadRef.value = null
					this.snackBarMesasge = "You can upload only image files."
					this.snackbar = true
					return
				}
			}
      this.sendStatus = true;

      if (this.sendTyp != 'I') this.uploadFilesList = [];
      this.sendTyp = 'I';

      if (e.target.files.length) this.showPreview = true;

      for (let i = 0; i < e.target.files.length; i++) {
        if (this.imagePreviewUrl.length >= 8) {
					this.snackBarMesasge = "Maximum 8 pictures"
          this.snackbar = true;
          break;
        }

        this.imagePreviewUrl.push({
          thumb: URL.createObjectURL(e.target.files[i]),
          src: URL.createObjectURL(e.target.files[i]),
          type: "image",
        });

        this.uploadFilesList.push(e.target.files[i]);
      }
    },
    videoFileChanged: function (e) {
			if (!this.isVideo(e.target.files[0].name)) {
				this.$refs.imageUploadRef.value = null
				this.snackBarMesasge = "You can upload only video file."
				this.snackbar = true
				return
			}

      this.sendStatus = true;
      this.showPreview = true;
      this.imagePreviewUrl = [];
      this.fileSource = null;
      this.sendTyp = 'V';

      const files = e.target.files || [];
      const that = this;

      if (!files.length) return;

      const reader = new FileReader();

      reader.onload = function (e) {
        that.fileSource = e.target.result;
        that.$refs.videoPlayer.load();
        that.$refs.videoPlayer.play();
      };

      reader.onprogress = function (e) {};
      reader.readAsDataURL(files[0]);

      this.uploadFilesList = [];
      this.uploadFilesList.push(files[0]);
    },
    audioFileChanged: function (e) {
			if (!this.isAudio(e.target.files[0].name)) {
				this.$refs.imageUploadRef.value = null
				this.snackBarMesasge = "You can upload only audio file."
				this.snackbar = true
				return
			}
      this.sendStatus = true;
      this.showPreview = true;
      this.imagePreviewUrl = [];
      this.fileSource = null;
      this.sendTyp = "S";

      const files = e.target.files || [];
      const that = this;

      if (!files.length) return;

      const reader = new FileReader();

      reader.onload = function (e) {
        that.fileSource = e.target.result;
      };

      reader.onprogress = function (e) {};
      reader.readAsDataURL(files[0]);

      this.uploadFilesList = [];
      this.uploadFilesList.push(files[0]);
    },
    deleteItem: function (index) {
      if (this.sendTyp === 'I') {
        if (this.$refs.imageUploadRef.files.length === 1)
          this.$refs.imageUploadRef.value = null
        this.imagePreviewUrl.splice(index, 1);
        this.uploadFilesList.splice(index, 1);

        if (!this.imagePreviewUrl.length) this.sendStatus = false;
      } else {
        this.fileSource = null;
        this.uploadFilesList.splice(index, 1);
        this.sendStatus = false;
      }
    },
    openEditor: function () {
      this.dialog = true;
    },
    // 选择表情
    selectEmoji(emoji) {
      //显示发送按钮
      this.sendStatus = true;
      this.$store.dispatch(
        "Post/tweetAction",
        this.$store.getters["Post/userState"].tweet + emoji.data
      );
    },
    // 预览路径
    getPreviewUrl: function () {
      if (this.previewUrl != "") {
        if(!this.previewUrl)
          return
        //获取meta信息
        this.api
          .getMetaDataAPI(encodeURIComponent(this.previewUrl))
          .then((response) => {
            if (response.data["Code"] === 0) {
              console.log(
                "获取meta信息:" + JSON.stringify(response.data["Body"])
              );

              this.previewData = response.data["Body"]

              //显示渲染卡片
              this.previewShow = true;


            } else {

              this.previewShow = false;
            }
          })
          .catch((err) => console.log(err));
      }
    },
    // 匹配识别路径
    regUrl: function (val) {
      let reg = new RegExp(
        "(?:(?:https?|ftp|file):\\/\\/|www\\.|ftp\\.)(?:\\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\\)|[-A-Za-z0-9+&@#/%=~_|$?!:,.])*(?:\\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\\)|[A-Za-z0-9+&@#/%=~_|$])"
      );

      if (reg.test(val)) {
        alert(reg[Symbol.match](val));
        // return reg.test(val)
      }
    },
    authGroup: function () {
      this.authStat.homeCheck = false;
      this.authStat.groupCheck = true;
      this.authStat.name = "group";
      this.authStat.icon = "ri-group-line";
    },
    authHome: function () {
      this.authStat.homeCheck = true;
      this.authStat.groupCheck = false;
      this.authStat.name = "home";
      this.authStat.icon = "ri-home-2-line";
      this.$store.dispatch("Post/currentGroupAction", 0);
    },
    updateTweet: function (e) {
      this.$store.dispatch("Post/tweetAction", e);

      if (this.userList) {
        this.userList = this.$store.getters['Post/userFollowToGroupState'];
      }
    },
    updateUploadToken: function (e) {
      this.$store.dispatch("Post/uploadTokenAction", e.target.value);
    },
    // 先获取上传文件token，再执行上传文件
    getUploadToken: function (tokenCount) {
      //获取相应数量token  Max=10
      this.api
        .postUploadTokensAPI(tokenCount)
        .then((response) => {
          console.log(
            "获取上传文件token:" + JSON.stringify(response.data["Body"])
          );
          //保存文件token到store
          this.$store.dispatch(
            "Post/uploadTokensAction",
            response.data["Body"]
          );

          console.log(
            "文件token列表：" + this.$store.getters["Post/uploadTokensState"]
          );
          //上传文件
          this.postUploadFile(tokenCount);
        })
        .catch((err) => console.log(err));
    },
    postUploadFile: function (tokenCount) {
      console.log("文件数量：" + this.uploadFilesList.length);

      //有多张图片，遍历上传
      for (let j = 0; j < this.uploadFilesList.length; j++) {
        //新增上传对象
        new tus.Upload(
          this.uploadFilesList[j],
          this.getOptions(j)
        ).start();
      }

      uploadIsRunning = true;
    },
    uploadFiles: function () {
      //有几个文件就需要几个Token
      let tokenCount = this.uploadFilesList.length;
      if (tokenCount > 0) {
        //先去获取获取文件上传token，再开始上传任务
        this.getUploadToken(tokenCount);
      }
    },
    emptyFileInput: function (file) {
      this.$refs.vueFileAgent.deleteFileRecord(file); // will trigger 'delete' event
      this.sendStatus = false;
    },
    getOptions: function (i) {
      let _this = this;
      return {
        endpoint: "https://uploadtest.vog.media/uapi/v1/files/",
        chunkSize: 1000000,
        retryDelays: [0, 1000, 3000, 5000],
        parallelUploads: 1,
        metadata: {
          filename: this.uploadFilesList[i].name,
          filetype: this.uploadFilesList[i].type,
          uploadtoken: this.$store.getters["Post/uploadTokensState"][i],
        },
        onError: function (error) {
          if (error.originalRequest) {
            if (window.confirm("上传失败: " + error + "\n重试?")) {
              upload.start();
              uploadIsRunning = true;
            }
          } else {
            window.alert("上传失败: " + error);
            _this.loading = false;
          }
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(
            `文件序列:${i},上传进度：` + bytesUploaded,
            "文件大小：" + bytesTotal,
            percentage + "%"
          );

          //文本输入框处的加载动画
          _this.loading = true;
          //显示上传进度数值
          // _this.btn_send = (bytesUploaded / bytesTotal * 100).toFixed(0) + '%'
        },
        onSuccess: function () {
          //上传成功后，获取地址   最后一个任务完成后，再执行获取Url
          if (i === _this.uploadFilesList.length - 1) {
            _this.getFinalUrl();
          }
          //显示加载动画
          //_this.loading = false
        },
      };
    },
    //发送卡片效果贴文
    postPreviewCard: function (pData) {

      let data = {
        "groupid": 0,
        "tweet": this.remlinkify(this.userState.tweet),
        "mtyp": "U",
        "url":JSON.stringify(pData),
        "device": "web"
      }

      this.api
          .postTweetAPI(data)
          .then((response) => {
            if (response.data.Code === 0) {
              console.log(
                  "发推成功，返回数据为：" + JSON.stringify(response.data)
              );

              let userinfo = JSON.parse(localStorage.getItem("userinfo"));


              //更新Following to数据
              if(userinfo.IsGroup > 0) {

                let uInfo = JSON.parse(JSON.stringify(this.$store.getters['Post/userInfoState']))

                uInfo.LTw = this.userState.tweet

                uInfo.ALive = 1

                this.$store.dispatch('Post/userInfoAction',uInfo)

              }

              this.snackbar = false;
              this.loading = false;
              //清空消息框
              this.$store.dispatch("Post/tweetAction", "");
              //隐藏发送按钮
              this.sendStatus = false;

              //清空卡片数据
              this.previewData = null
              this.previewShow = false

            }
          })
          .catch((err) => console.log(err));


    },
    //发送推文
    postTweet: function () {

      if(this.previewData !== null) {
        this.postPreviewCard(this.previewData)
        return
      }


      this.regUrl(this.userState.tweet);


      this.loading = true;

      if (!this.untils.isEmpty(this.uploadFilesList)) {
        // 发送图文消息或图片
        // 启动上传头像
        let result = this.uploadFiles();
      } else {
        // 发送文字消息
        let data = {
          tweet: this.userState.tweet,
          device: "web",
          chatid: localStorage.getItem("chatid"),
          groupid:
            this.$store.getters["Post/currentUserGroupState"].IsGroup > 0
              ? this.$store.getters["Post/currentUserGroupState"].UserId
              : 0,
        };

        let Tw = {};
        Tw.Type = "Tw";
        Tw.Tw = this.userState.tweet;

        this.$store.dispatch("Post/msgJSONAction", Tw);

        this.api
          .postTweetAPI(data)
          .then((response) => {
            if (response.data.Code === 0) {
              console.log(
                "发推成功，返回数据为：" + JSON.stringify(response.data)
              );

              let userinfo = JSON.parse(localStorage.getItem("userinfo"));


                //更新Following to数据
                if(userinfo.IsGroup > 0) {

                  let uInfo = JSON.parse(JSON.stringify(this.$store.getters['Post/userInfoState']))

                  uInfo.LTw = this.userState.tweet

                  uInfo.ALive = 1

                  this.$store.dispatch('Post/userInfoAction',uInfo)

                }

              this.snackbar = false;
              this.loading = false;
              //清空消息框
              this.$store.dispatch("Post/tweetAction", "");
              //隐藏发送按钮
              this.sendStatus = false;
            }
          })
          .catch((err) => console.log(err));
      }
    },
    getFinalUrl: function () {
      console.log(
        "getFinnalUrl file token:" +
          this.$store.getters["Post/uploadTokensState"][0]
      );

      //获取文件最终url地址数组

      this.api
        .postFinalUrlsAPI(this.$store.getters["Post/uploadTokensState"])
        .then((response) => {
          if (response.data["Body"]) {
            console.log(
              "图片Url地址列表：" + JSON.stringify(response.data["Body"])
            );

            let urlArr = [];

            for (let i = 0; i < response.data["Body"].length; i++) {
              urlArr.push(response.data["Body"][i]["Url"]);
            }

            console.log("拼装多媒体 Url 数组：" + urlArr);

            console.log("媒体类型：" + this.sendTyp);

            //发送图片
            if (this.sendTyp === "I") {
              this.postTweetMedia("I", urlArr);
              //发送视频、音频
            } else if (this.sendTyp === "V") {
              this.postTweetMedia("V", urlArr[0]);
            } else if (this.sendTyp === "S") {
              this.postTweetMedia("S", urlArr[0]);
            } else {
              this.postTweetMedia("", urlArr[0]);
            }
          } else {
            console.log("获取图片FinalUrl错误");
          }
        })
        .catch((err) => console.log(err));
    },
    //发送多媒体消息
    postTweetMedia: function (typ, url) {
      let data;
      if (typ === "I") {
        data = {
          pic: url,
          tweet: this.userState.tweet,
          chatid: localStorage.getItem("chatid"),
          groupid:
            this.$store.getters["Post/currentUserGroupState"].IsGroup > 0
              ? this.$store.getters["Post/currentUserGroupState"].UserId
              : 0,
          mtyp: "",
        };
      } else {
        data = {
          url: url,
          tweet: this.userState.tweet,
          chatid: localStorage.getItem("chatid"),
          groupid:
            this.$store.getters["Post/currentUserGroupState"].IsGroup > 0
              ? this.$store.getters["Post/currentUserGroupState"].UserId
              : 0,
          mtyp: typ,
        };
      }

      this.api
        .postTweetPicAPI(data)
        .then((response) => {
          if (response.data.Code === 0) {
            // 返回T数据后，组装message消息体，存放进messages数组中，立即显示在timeline
            if (response.data["Body"].T) {
              console.log(
                "发多媒体消息成功 ：" + JSON.stringify(response.data["Body"])
              );

            }

            //隐藏动画
            this.btn_loading = false;
            this.loading = false;

            //清空数据
            this.uploadFilesList = [];
            this.imagePreviewUrl = [];
            this.sendStatus = false;
            this.showPreview = false;
            //清空消息框
            this.$store.dispatch("Post/tweetAction", "");

          }
        })
        .catch((err) => console.log(err));
    },
    getExtension: function(filename) {
      var parts = filename.split('.');
      return parts[parts.length - 1];
    },
    isImage: function(filename) {
      var ext = this.getExtension(filename);
      switch (ext.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'bmp':
        case 'png':
        case 'bmp':
        case 'svg':
          //etc
          return true;
      }
      return false;
    },
    isVideo: function(filename) {
      var ext = this.getExtension(filename);
      switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
          // etc
          return true;
      }
      return false;
    },
    isAudio: function(filename) {
      var ext = this.getExtension(filename);
      switch (ext.toLowerCase()) {
        case 'mp3':
        case 'wav':
        case 'ogg':
          // etc
          return true;
      }
      return false;
    }
  },
};

function askToResumeUpload(previousUploads, upload) {
  if (previousUploads.length === 0) return;

  let text = "You tried to upload this file previously at these times:\n\n";
  previousUploads.forEach((previousUpload, index) => {
    text += "[" + index + "] " + previousUpload.creationTime + "\n";
  });
  text +=
    "\nEnter the corresponding number to resume an upload or press Cancel to start a new upload";

  const answer = prompt(text);
  const index = parseInt(answer, 10);

  if (!isNaN(index) && previousUploads[index]) {
    upload.resumeFromPreviousUpload(previousUploads[index]);
  }
}
</script>

<style  lang="scss">
.theme-default {
  .grid-block-wrapper {
    .grid-block {
      width: 100% !important;
      .file-preview {
        padding-bottom: 75% !important;
        z-index: 99 !important;
      }
    }
  }
}

.send-area {
  border-left: 1px solid #efefef !important;
  border-right: 1px solid #efefef !important;
}

.vue-file-agent {
  border: 0 !important;
  box-shadow: none !important;
}

.card-container {
  width: 100%;
  background-color: #ffffff;
  min-height: 118px;
  border-right: 1px solid #efefef;
  border-left: 1px solid #efefef;
  /*max-height: 160px;*/
  padding-top: 0 !important;
  .profile {
    float: left;
    height: 100%;
    width: 50px;
    margin-right: 10px;
  }
}

.preview-images-holder {
  width: 100%;
  display: block;
  line-height: 0;
  margin-bottom: 10px;
}

.preview-video-holder {
  padding: 40px 10px 5px 10px;
  position: relative;
}

.preview-audio-holder {
  padding: 40px 10px 5px 10px;
  position: relative;
}

.preview-images-list {
  line-height: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: hidden;
  margin-left: -5px;
  margin-right: -5px;
}

.preview-images-list-item {
  width: 25%;
  max-width: 25%;
  min-width: 25%;
  flex-basis: 25%;
  padding: 5px;
}

.li-inner-content {
  border-radius: 5px;
  border: 1px solid #e6ecf0;
  overflow: hidden;
  position: relative;
  background: #e6ecf0;
  height: 100%;
  width: 100%;
}

.delete-preview-image {
  position: absolute;
  padding: 0;
  margin: 0;
  line-height: 0;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  border-radius: 10em;
  cursor: pointer;
  transition: visibility 0.1s linear, opacity 0.1s linear;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #1e579c;
  border: none;
  box-shadow: none;
  outline: 0;
}

.delete-preview-video-audio {
  position: absolute;
  padding: 0;
  margin: 0;
  line-height: 0;
  top: 5px;
  right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 10em;
  cursor: pointer;
  transition: visibility 0.1s linear,opacity 0.1s linear;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #1e579c;
  border: none;
  box-shadow: none;
  outline: 0;
}

.preview-image {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}

.v-snack__content {
  text-align: center !important;
}

.user-auto-complete {
  z-index: 1;
  position: fixed;
  width: 300px;
}
</style>
