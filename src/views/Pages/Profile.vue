<template>
  <v-card class="mx-auto profile" tile flat min-height="710">
    <!--START the confirm dialog-->
    <v-dialog v-model="modal" width="500">
      <v-card class="v-card-modal">
        <v-card-title class="text-h6 white lighten-2">
          {{ modalTitle }}
        </v-card-title>
        <v-card-text style="padding-bottom: 5px">
          <v-text-field
            ref="username"
            class="modal-input"
            v-if="modalType === 'username'"
            v-model="t_userInfo.Username"
            solo
            flat
            dense
            outlined
            rounded
            hide-details
            style="width: 100%"
            prepend-inner-icon="mdi-account-outline"
          ></v-text-field>
          <v-textarea
            ref="description"
            class="modal-textarea"
            v-if="modalType === 'description'"
            v-model="t_userInfo.Description"
            outlined
            prepend-inner-icon="mdi-file-document-edit-outline"
            counter="200"
            :rules="rules"
          ></v-textarea>
          <div v-if="modalType === 'profile_image'">
            <cropper
              ref="cropper"
              stencil-component="circle-stencil"
              :src="userInfo.Avatar96"
            />
          </div>
          <div class="text-red">
            {{ errorMsg }}
          </div>
          <div v-if="modalType === 'username'" class="p-text-center">
            <span>{{ $t("Please enter your new username") }}</span>
          </div>
          <div v-if="modalType === 'description'" class="p-text-center">
            <span>{{ $t("Please enter your description") }}</span>
          </div>
        </v-card-text>
        <v-card-actions v-if="modalType === 'profile_image'">
          <div style="width: 100%; margin-bottom: 20px">
            <v-btn
              outlined
              color="info"
              width="100"
              @click="onCancel"
              class="mr-2 back"
              >{{ $t("cancel") }}</v-btn
            >
            <v-btn
              style="float: right"
              right
              ref="confirmBtn"
              color="info"
              width="100"
              :loading="confrimLoading"
              @click="changeAvatar"
              class="mr-2"
              >{{ $t("ok") }}</v-btn
            >
          </div>
        </v-card-actions>
        <v-card-actions v-else>
          <div style="width: 100%; margin-bottom: 20px">
            <v-btn
              outlined
              color="info"
              width="100"
              @click="onCancel"
              class="mr-2 back"
              >{{ $t("cancel") }}</v-btn
            >
            <v-btn
              style="float: right"
              right
              ref="confirmBtn"
              color="info"
              width="100"
              :loading="confrimLoading"
              @click="onConfirm"
              class="mr-2"
              >{{ $t("ok") }}</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--END the confirm dialog-->

    <!--START toolbar-->
    <v-toolbar light flat>
      <v-btn icon @click="backHistory">
        <v-icon color="info">ri-arrow-left-line</v-icon>
      </v-btn>

      <v-toolbar-title class="pl-0 font-weight-black">
       <!-- {{ $store.getters["Post/userInfoState"].DisplayName }} - -->
        {{ $t("profile") }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <!--END toolbar-->

    <!--START banner * tabs-->
    <v-card tile flat class="overflow-hidden">
      <v-img height="260" :src="userInfo.BannerPic">
        <v-row align="center" class="fill-height">
          <v-col class="pa-0 d-flex justify-center" cols="12">
            <v-btn
              class="ma-2"
              size="60"
              large
              outlined
              color="grey lighten-4"
              rounded
              elevation="16"
              @click.stop="bannerClick"
            >
              <v-icon color="grey lighten-4">mdi-pencil</v-icon> change banner
              <input
                ref="bannerUploadRef"
                class="d-none"
                type="file"
                accept="image/*"
                multiple
                @change="bannerChanged"
              />
            </v-btn>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
    <!--END banner * tabs-->

    <v-card tile flat class="my-4">

      <v-row align="center" class="ma-2">
        <v-col class="d-flex justify-center align-center" cols="4">

          <!--START 头像-->
          <v-hover :value="true">
            <template v-slot:default="{ hover }">

              <!-- <v-avatar size="110" class=""> -->
              <v-avatar size="110" class="" v-on:click="avatarCrop">
                <v-img :src="userInfo.Avatar96" alt=""> </v-img>
                <v-fade-transition>
                  <v-overlay absolute color="#00b3ff89">
                    <v-btn icon color="white" @click.stop="avatarClick">
                      <v-icon>ri-edit-line</v-icon>
                      <input
                        ref="avatarUploadRef"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        multiple
                        @change="avatarChanged"
                      />
                    </v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-avatar>
            </template>
          </v-hover>
          <!--END 头像-->
        </v-col>

        <v-col class="d-flex justify-center align-center" cols="8">
          <!--{{ userInfo }}-->
          <v-form ref="form" class="pt-6" style="width: 300px" lazy-validation>
            <v-text-field
              ref="diplayname"
              height="12"
              solo
              outlined
              rounded
              v-model="userInfo.DisplayName"
              @blur="changeDisplayName"
              label="Name"
              hint="please input username"
              prepend-inner-icon="mdi-account-outline"
              dense
              required
              flat
            >
            </v-text-field>

            <!-- <v-textarea
              v-model="userInfo.Description"
              @blur="changeDescription"
              auto-grow
              solo
              flat
              outlined
              dense
              rounded
              prepend-inner-icon="ri-pencil-line"
              label="Bio"
              rows="4"
              row-height="30"
              maxlength="200"
              :rules="rules"
            >
            </v-textarea> -->

            <v-textarea
              v-model="userInfo.Description"
              @blur="changeDescription"
              label="Bio"
              rows="4"
              row-height="30"
              prepend-inner-icon="ri-pencil-line"
              rounded
              flat
              dense
              auto-grow
              counter
              solo
              outlined
              maxlength="200"
              full-width
              single-line
            ></v-textarea>
          </v-form>
        </v-col>
      </v-row>

      <v-row align="center" class="d-flex justify-center">
        <v-btn
          color="info"
          large
          rounded
          width="510"
          depressed
          class="mr-4"
          @click="saveProfiles"
          :loading="confrimLoading"
        >
          Save Profiles
        </v-btn>
      </v-row>
    </v-card>

    <!--    <div class="profile-container">
        <div class="background-image px-8 py-6">
          <v-img :src="userInfo.BannerPic" max-height="224"></v-img>
          <div class="b-img-change">
            <span class="banner-text" @click="onButtonClick('banner')">{{
              $t("Change Banner")
            }}</span>
            <v-btn icon :ripple="false" @click="onButtonClick('banner')">
              <v-icon color="white">ri-edit-box-line</v-icon>
            </v-btn>
            <input
              ref="up_banner"
              class="d-none"
              type="file"
              accept="image/*"
              @change="onBannerChange"
            />
          </div>
        </div>
        <div class="profile-image px-8 py-6">
          <v-img
            :src="ProfilePic"
            max-height="130"
            max-width="130"
            class="profile-img"
            @click="onEditProfilePC"
          ></v-img>
          <div class="p-img-change">
            <v-btn icon :ripple="false" @click="onButtonClick('profile')">
              <v-icon color="info">ri-edit-box-line</v-icon>
            </v-btn>
            <span style="cursor: pointer" @click="onButtonClick('profile')">{{
              $t("Change Avatar")
            }}</span>
            <input
              ref="up_profile"
              class="d-none"
              type="file"
              accept="img/*"
              @change="onProfileChange"
            />
          </div>
        </div>
        <div class="user-name px-8 py-6">
          <div class="d-flex">
            <h4 style="color: #989898; font-weight: 400; padding: 7px 0px">
              {{ $t("Display Name") }}
            </h4>
            <v-btn icon :ripple="false" @click="onEditUserName">
              <v-icon color="info">ri-edit-box-line</v-icon>
            </v-btn>
          </div>
          <input
            v-model="userInfo.user_name"
            style="width: 100%; font-weight: 700"
            disabled
          />
        </div>
        <div class="description px-8 py-6">
          <div class="d-flex">
            <h4 style="color: #989898; font-weight: 400; padding: 7px 0px">
              {{ $t("Bio") }}
            </h4>
            <v-btn icon :ripple="false" @click="onEditDescription">
              <v-icon color="info">ri-edit-box-line</v-icon>
            </v-btn>
          </div>
          <input v-model="userInfo.Description" style="width: 100%" disabled />
          &lt;!&ndash; <v-textarea v-if="userInfo.Description" v-model="userInfo.Description"></v-textarea> &ndash;&gt;
        </div>
      </div>-->
  </v-card>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import CodeInput from "vue-verification-code-input";
import untils from "@/utils/untils";
import MainPost from "@/components/Post/MainPost";
import * as tus from "tus-js-client";
import router from "@/router";

let upToken;

let upload = null;
let uploadIsRunning = false;

export default {
  name: "Profile",
  components: { Cropper, MainPost, CodeInput },
  data: () => ({
    uploadBannerFilesList: [],
    uploadAFilesList: [],
    userInfo: {},
    t_userInfo: {},
    loading: false,
    modal: false,
    modalType: "",
    modalTitle: "",
    password: "",
    errorMsg: "",
    confrimLoading: false,
    currentDescription: "",
    verifyType: "",
    email: "",
    confirmCode: "",
    token: "",
    ProfilePic: "",
    sendTyp: "",
    initialAvatar: "",
    rules: [(v) => v.length <= 200 || "Max 200 characters"],
  }),
  mounted() {
    /*this.api.getAccountInfoAPI().then((response) => {
      if (response.data["Code"] === 0) {
        if (response.data["Body"]) {
          console.log("response.data", response.data["Body"]);
          this.userInfo = response.data["Body"];
          this.userInfo.user_name = response.data["Body"].Username;
          // this.userInfo.BannerPic = response.data["Body"].BannerPic;
          this.userInfo.BannerPic = require("@/assets/img/3.jpg");
          this.ProfilePic = require("@/assets/img/img4.jpg");
          console.log("mount img", this.ProfilePic);
          this.t_userInfo = JSON.parse(JSON.stringify(this.userInfo));
        }
      }
    });*/


    this.userInfo = JSON.parse(
      JSON.stringify(this.$store.getters["Post/userInfoState"])
    );

    this.userInfo['Avatar96'] = localStorage.getItem('aUrl') + this.$store.getters["Post/userInfoState"]['Avatar96']

    console.log('-------------', this.userInfo)
  },
  computed: {},
  watch: {
    userInfo() {
      this.t_userInfo = JSON.parse(JSON.stringify(this.userInfo));
    },
  },
  methods: {

    saveProfiles: function () {
      this.confrimLoading = true;
      // if image changed,upload

      // start banner upload
      this.uploadFiles();

      // start avatar upload
      this.uploadAFiles();
    },
    avatarClick: function () {
      this.$refs.avatarUploadRef.click();
    },

    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    },

		changeAvatar() {
      const { canvas } = this.$refs.cropper.getResult();
      this.userInfo.Avatar96 = canvas.toDataURL();

      var filename = (Math.random() + 1).toString(36).substring(7);
      var file = this.dataURLtoFile(canvas.toDataURL(), filename + '.png');

      this.userInfo.Avatar96 = URL.createObjectURL(file);
      this.uploadAFilesList.push(file);

      this.modal = false;
		},
    avatarCrop: function() {
      this.modalType = "profile_image";
      this.modalTitle = "Edit Avatar";
      this.modal = true;
    },
    avatarChanged: function (e) {
      this.userInfo.Avatar96 = URL.createObjectURL(e.target.files[0]);
      // this.uploadAFilesList.push(e.target.files[0]);

      this.modalType = "profile_image";
      this.modalTitle = "Edit Avatar";
      this.modal = true;
    },

    bannerClick: function () {
      this.$refs.bannerUploadRef.click();
    },

    bannerChanged: function (e) {
      console.log("URL.createObjectURL(e.target.files[0])111111111111111111111", e.target.files[0]);
      // console.log("URL.createObjectURL(e.target.files[0])111111111111111111111", URL.createObjectURL(e.target.files[0]));

      this.userInfo.BannerPic = URL.createObjectURL(e.target.files[0]);

      this.uploadBannerFilesList.push(e.target.files[0]);
    },

    // 保存头像
    saveAvatar: function (payload) {
      this.api.changeAvatarPicAPI(payload).then((response) => {
        if (response.data["Code"] === 0) {
          if (response.data["Body"]) {
            this.confrimLoading = false;
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", response.data["Body"])
          }
        }
      });
    },
    //保存banner
    saveBanner: function (url) {
      this.api.changeBannerPicAPI(url).then((response) => {
        if (response.data["Code"] === 0) {
          if (response.data["Body"]) {
            this.confrimLoading = false;
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", response.data["Body"])
          }
        }
      });
    },

    // 服务器参数
    getOptions: function (i) {
      let _this = this;
      return {
        endpoint: "https://uploadtest.vog.media/uapi/v1/files/",
        chunkSize: 1000000,
        retryDelays: [0, 1000, 3000, 5000],
        parallelUploads: 1,
        metadata: {
          filename: this.uploadBannerFilesList[i].name,
          filetype: this.uploadBannerFilesList[i].type,
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

          //显示上传进度数值
          // _this.btn_send = (bytesUploaded / bytesTotal * 100).toFixed(0) + '%'
        },
        onSuccess: function () {
          //上传成功后，获取地址   最后一个任务完成后，再执行获取Url
          if (i === _this.uploadBannerFilesList.length - 1) {
            _this.getFinalUrl();
          }
          //显示加载动画
          //_this.loading = false
        },
      };
    },
    // 获取最终地址，并上传
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

            // 保存图片Url到服务器
            this.saveBanner(urlArr[0]);
          } else {
            console.log("获取图片FinalUrl错误");
          }
        })
        .catch((err) => console.log(err));
    },

    postUploadFile: function (tokenCount) {
      console.log("文件数量：" + this.uploadBannerFilesList.length);

      //有多张图片，遍历上传
      for (let j = 0; j < this.uploadBannerFilesList.length; j++) {
        //新增上传对象
        new tus.Upload(
          this.uploadBannerFilesList[j],
          this.getOptions(j)
        ).start();
      }

      uploadIsRunning = true;
    },
    // 先获取上传文件token，再执行上传文件
    getUploadToken: function (tokenCount) {
      //获取相应数量token  Max=10
      this.api
        .postTokensAPI(tokenCount, "frt")
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

    uploadFiles: function () {
      //有几个文件就需要几个Token
      let tokenCount = this.uploadBannerFilesList.length;
      if (tokenCount > 0) {
        //先去获取获取文件上传token，再开始上传任务
        this.getUploadToken(tokenCount);
      }
    },

    /*
      头像相关，待优化合并
    */

    // 服务器参数
    getAOptions: function (i) {
      let _this = this;
      return {
        endpoint: "https://uploadtest.vog.media/uapi/v1/files/",
        chunkSize: 1000000,
        retryDelays: [0, 1000, 3000, 5000],
        parallelUploads: 1,
        metadata: {
          filename: this.uploadAFilesList[i].name,
          filetype: this.uploadAFilesList[i].type,
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

          //显示上传进度数值
          // _this.btn_send = (bytesUploaded / bytesTotal * 100).toFixed(0) + '%'
        },
        onSuccess: function () {
          //上传成功后，获取地址   最后一个任务完成后，再执行获取Url
          if (i === _this.uploadAFilesList.length - 1) {
            _this.getAFinalUrl();
          }
          //显示加载动画
          //_this.loading = false
        },
      };
    },
    // 获取最终地址，并上传
    getAFinalUrl: function () {
      console.log(
        "getFinnalUrl file token:" +
          this.$store.getters["Post/uploadTokensState"][0]
      );

      //获取文件最终url地址数组

      this.api
        .getAvatarUrlAPI(this.$store.getters["Post/uploadTokensState"][0])
        .then((response) => {
          if (response.data["Body"]) {
            console.log(
              "图片Url地址列表：" + JSON.stringify(response.data["Body"])
            );

            let data = response.data["Body"][0];

            let payload = {
              // Avatar48: data.MainPath.toString().concat(data.S48),
              Avatar48: data.S48,
              Avatar96: data.S96,
              Avatar400: data.S400,
            };

            // 保存图片Url到服务器
            this.saveAvatar(payload);
          } else {
            console.log("获取图片FinalUrl错误");
          }
        })
        .catch((err) => console.log(err));
    },

    postAUploadFile: function (tokenCount) {
      console.log("文件数量：" + this.uploadAFilesList.length);

      //有多张图片，遍历上传
      for (let j = 0; j < this.uploadAFilesList.length; j++) {
        //新增上传对象
        new tus.Upload(this.uploadAFilesList[j],
        this.getAOptions(j)).start();
      }

      uploadIsRunning = true;
    },
    // 先获取上传文件token，再执行上传文件
    getAUploadToken: function (tokenCount) {
      //获取相应数量token  Max=10
      this.api
        .postTokensAPI(tokenCount, "avt")
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
          this.postAUploadFile(tokenCount);
        })
        .catch((err) => console.log(err));
    },

    uploadAFiles: function () {
      //有几个文件就需要几个Token
      let tokenCount = this.uploadAFilesList.length;
      if (tokenCount > 0) {
        //先去获取获取文件上传token，再开始上传任务
        this.getAUploadToken(tokenCount);
      }
    },

    /*
      头像相关，待优化合并
    */

    onCancel() {
      this.modal = false;
      this.password = "";
      this.errorMsg = "";
      this.t_userInfo.Email = this.userInfo.Email;
    },
    onBack() {
      this.modalType = "email";
    },
    onConfirm() {
      switch (this.modalType) {
        case "username":
          this.changeUsername();
          break;
        case "description":
          this.changeDescription();
          break;
        case "profile_image":
          this.changeAvatarImage();
          break;
        default:
          this.modal = false;
          break;
      }
    },

    changeDisplayName() {
      this.api
        .changeDisplayNameAPI(this.userInfo.DisplayName)
        .then((response) => {
          console.log(JSON.stringify(response.data["Body"]));

          if (response.data["Code"] === 0) {
            if (response.data["Body"]) {
              if (this.userInfo.DisplayName === response.data["Body"]) {
                this.userInfo.DisplayName = response.data["Body"];
              }
            }
          }
        });
    },

    changeDescription() {
      this.api
        .changeDescriptionAPI(this.userInfo.Description)
        .then((response) => {
          if (response.data["Code"] === 0) {
            if (response.data["Body"]) {
              if (this.userInfo.Description === response.data["Body"]) {
                this.userInfo.Description = response.data["Body"];
              }
            }
          }
        });
    },
    changeAvatarImage() {
      const { canvas } = this.$refs.cropper.getResult();
      this.ProfilePic = canvas.toDataURL();
      this.modal = false;
    },
    onEditUserName() {
      this.modalType = "username";
      this.modalTitle = "Edit Username";
      this.modal = true;
    },
    onEditDescription() {
      this.modalType = "description";
      this.modalTitle = "Edit Description";
      this.modal = true;
    },
    onEditProfilePC() {
      this.modalType = "profile_image";
      this.modalTitle = "Edit Image";
      this.modal = true;
    },
    backHistory: function () {
      this.$router.go(-1); //返回上一层
    },
    //获取贴子数据
    fetchPostData: function () {


    },


    onButtonClick(e) {
      if (e == "banner") {
        this.$refs.up_banner.click();
      } else if (e == "profile") {
        this.$refs.up_profile.click();
      }
    },

    onBannerChange(e) {
      var B_files = e.target.files || e.dataTransfer.files;
      if (!B_files.length) return;
      this.createBanner(B_files[0]);
      // this.userInfo.BannerPic = require("@/assets/img/" + B_files[0].name);
    },
    async createBanner(B_file) {
      await this.api.get_token().then((res) => {
        var token = res.data.Body[0];
        console.log("--------------get_token", token);
        console.log("--------------name", B_file.name);
        console.log("--------------type", B_file.type);

        new tus.Upload(B_file, {
          endpoint: "https://uploadtest.vog.media/uapi/v1/files/",
          chunkSize: 1000000,
          retryDelays: [0, 1000, 3000, 5000],
          parallelUploads: 1,
          metadata: {
            filename: B_file.name,
            filetype: B_file.type,
            uploadtoken: token,
          },
          onError: function (error) {
            console.log(error);
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(
              `文件序列:上传进度：` + bytesUploaded,
              "文件大小：" + bytesTotal,
              percentage + "%"
            );
          },
          onSuccess: function () {
            this.api
              .postFinalUrlsAPI(token)
              .then((response) => {
                if (response.data["Body"]) {
                  console.log(
                    "图片Url地址列表 11111111111111111111111111111：" +
                      JSON.stringify(response.data["Body"])
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
        }).start();
      });
      // this.api.changeBannerPicAPI(this.t_userInfo.BannerPic).then((response) => {
      //   if (response.data["Code"] === 0) {
      //     if (response.data["Body"]) {
      //       if (this.t_userInfo.BannerPic === response.data["Body"]) {
      //         this.userInfo.BannerPic = response.data["Body"];
      //         console.log("this.userInfo.BannerPic => ", response.data["Body"])
      //       }
      //     }
      //   }
      // });
    },

    // get token
    // upload file with the token
    // get the image path withthe same token
    // store the image path into database

    onProfileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createProfile(files[0]);
    },

    async createProfile(file) {
      await this.api.get_token().then((res) => {
        var token = res.data.Body[0];
        console.log("--------------avatar get_token", token);
        console.log("--------------avatar name", file.name);
        console.log("--------------avatar type", file.type);

        new tus.Upload(file, {
          endpoint: "https://uploadtest.vog.media/uapi/v1/files/",
          chunkSize: 1000000,
          retryDelays: [0, 1000, 3000, 5000],
          parallelUploads: 1,
          metadata: {
            filename: file.name,
            filetype: file.type,
            uploadtoken: token,
          },
          onError: function (error) {
            console.log(error);
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(
              `文件序列:上传进度：` + bytesUploaded,
              "文件大小：" + bytesTotal,
              percentage + "%"
            );
          },
          onSuccess: function (res) {
            console.log("----------res------------", res);
          },
        }).start();
      });
      // this.api.changeAvatarPicAPI(this.t_userInfo.AvatarPic).then((response) => {
      //   if (response.data["Code"] === 0) {
      //     if (response.data["Body"]) {
      //       if (this.t_userInfo.AvatarPic === response.data["Body"]) {
      //         this.userInfo.AvatarPic = response.data["Body"];
      //         console.log("this.userInfo.AvatarPic => ", response.data["Body"])
      //       }
      //     }
      //   }
      // });

      this.modal = true;
    },
  },

  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchPostData();
  },
  beforeDestroy() {
    this.userInfo = ''
  }
};
</script>

<style lang="scss" scoped>
.modal-input {
  width: 100%;
  font-size: 20px;
  margin-top: 15px;
}
input {
  outline: none;
  border-bottom: 1px grey solid;
}
.b-img-change {
  float: right;
  margin-top: -7%;
  color: white !important;
}
.banner-text {
  position: absolute;
  right: 11%;
  margin-top: 1%;
  cursor: pointer;
}
.p-img-change {
  margin-top: -6%;
  margin-left: 45%;
  color: #2196f3;
}
.back {
  color: black !important;
  border: 0;
}
.back::before {
  background-color: white;
}
.profile-image {
  text-align: -webkit-center;
}
.profile-img {
  border-radius: 50%;
  height: 130px;
  width: 130px;
  cursor: pointer;
}
.v-card-modal {
  padding-top: 5%;
  padding-left: 7%;
  padding-right: 7%;
}
.p-text-center {
  border-bottom: 1px solid rgb(175, 175, 175);
  padding-top: 3%;
  padding-bottom: 3%;
  text-align: center;
}
.text-red {
  margin-top: 15px;
  width: 100%;
  text-align: left;
  font-size: 20px;
  color: crimson;
}
.modal-textarea {
  font-size: 1.099rem;
}
</style>
