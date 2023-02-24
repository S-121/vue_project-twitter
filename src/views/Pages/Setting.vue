<template>
  <v-card class="mx-auto setting" tile flat min-height="710">
    <v-dialog v-model="modal" width="500">
      <v-card class="v-card-modal">
        <v-card-title class="text-h6 white lighten-2">
          {{ modalTitle }}
        </v-card-title>
        <v-card-text style="padding-bottom: 5px;">
          <v-text-field
            ref="username"
            class="modal-input"
            v-if="modalType === 'username'"
            v-model="t_userInfo.Username"
            solo flat dense outlined rounded hide-details
            style="width: 100%"
            prepend-inner-icon="mdi-account-outline"
          ></v-text-field>
          <div class="change-email" v-if="modalType === 'email'">
            <v-text-field
              ref="email"
              class="modal-input"
              :rules="email_rules"
              v-model="email"
              solo flat dense outlined rounded
              style="width: 100%; margin-top: 20px"
              prepend-inner-icon="mdi-account-outline"
              placeholder="New Email"
            ></v-text-field>
          </div>
          <div class="password" v-if="modalType === 'password'">
            <v-text-field
              ref="newpassword"
              class="modal-input"
              :rules="password_rules"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              solo flat dense outlined rounded
              style="width: 100%; margin-top: 20px"
              prepend-inner-icon="ri-lock-password-line"
              placeholder="New Password"
              @click:append="show1 = !show1"
              counter
            ></v-text-field>
          </div>
          <div class="change-user-group" v-if="modalType === 'changeUserGroup'">
            <h4 class="px-8" style="color: grey; padding: 7px 0px">
              {{ $t('minium requriements for speaking in my group') }}
            </h4>
            <div class="px-8 py-1">
              <div
                class="d-flex text-bold"
                style="color: grey; font-weight: bold"
              >
                <h4 style="color: grey; padding: 20px 0px; margin-right: 55px">
                  {{ $t('turn on/off user group') }}
                </h4>
                <v-radio-group v-model="t_userInfo.IsGroup" row>
                  <v-radio
                    label="On"
                    :value="1"
                    color="info"
                    :ripple="false"
                  ></v-radio>
                  <v-radio
                    label="Off"
                    :value="0"
                    color="info"
                    :ripple="false"
                  ></v-radio>
                </v-radio-group>
              </div>
              <div
                class="d-flex text-bold"
                style="color: grey; padding: 7px 0px; font-weight: bold"
              >
                {{ $t('at least') }}
                <input
                  v-model="t_userInfo.GroupLTw"
                  type="number"
                  :disabled="!t_userInfo.IsGroup"
                  style="width: 40px; margin: 0px 10px"
                />
                {{ $t('posts') }};
              </div>
              <div
                class="d-flex text-bold"
                style="color: grey; padding: 7px 0px; font-weight: bold"
              >
                {{ $t('at least') }}
                <input
                  v-model="t_userInfo.GroupLFol"
                  type="number"
                  :disabled="!t_userInfo.IsGroup"
                  style="width: 40px; margin: 0px 10px"
                />
                {{ $t('followers') }}
              </div>
            </div>
          </div>
          <v-text-field
            ref="verifyPassword"
            class="modal-input"
            :type="show2 ? 'text' : 'password'"
            v-if="modalType === 'verifyPassword'"
            :rules="password_rules"
            v-model="currentPassword"
            solo flat dense outlined rounded
            style="width: 100%"
            prepend-inner-icon="mdi-key"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show2 = !show2"
            counter
          ></v-text-field>
          <div v-if="modalType === 'confirmCode'">
            <v-text-field
              ref="confirmcode"
              class="modal-input"
              v-model="confirmCode"
              solo flat dense outlined rounded hide-details
              style="width: 100%; margin-top: 20px"
              prepend-inner-icon="mdi-key"
            ></v-text-field>
          </div>
          <div class="text-red">
            {{ errorMsg }}
          </div>
          <div v-if="modalType === 'username'" class="text-center">
            <span>{{ $t('Please enter your new username') }}</span>
          </div>
          <div v-if="modalType === 'verifyPassword'" class="text-center">
            <span>{{ $t('Please enter the current password') }}</span>
          </div>
          <div v-if="modalType === 'email'" class="text-center">
            <span>{{ $t('Please enter your new email') }}</span>
          </div>
          <div v-if="modalType === 'confirmCode'" class="text-center">
            <span>{{ $t('Please enter the verification code received from your email') }}</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <div v-if="modalType !== 'confirmCode'" style="width: 100%; margin-bottom: 20px">
            <v-btn
              outlined
              color="info"
              width="100"
              @click="onCancel"
              class="mr-2 back"
              >{{ $t('cancel') }}</v-btn
            >
            <v-btn
              style="float: right;"
              right
              ref="confirmBtn"
              color="info"
              width="100"
              :loading="confrimLoading"
              @click="onConfirm"
              class="mr-2"
              >{{ $t('ok') }}</v-btn
            >
          </div>
          <div v-if="modalType === 'confirmCode'" style="width: 100%; margin-bottom: 20px">
            <v-btn
              outlined
              color="info"
              width="100"
              @click="onBack"
              class="mr-2 back"
              >BACK</v-btn
            >
            <v-btn
              style="float: right;"
              right
              ref="confirmBtn"
              color="info"
              width="100"
              :loading="confrimLoading"
              @click="onConfirm"
              class="mr-2"
              >NEXT</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-toolbar light flat>
      <v-btn icon @click="backHistory">
        <v-icon color="info">ri-arrow-left-line</v-icon>
      </v-btn>

      <v-toolbar-title class="pl-0 font-weight-black">{{ $t('setting') }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <template>
      <div class="setting-container">
        <div class="user-name px-8 py-1">
          <!-- <div class="d-flex">
            <h4 style="color: grey; padding: 7px 0px">{{ $t('username') }}</h4>
            <v-btn icon :ripple="false" @click="onEditUserName">
              <v-icon color="info">ri-edit-box-line</v-icon>
            </v-btn>
          </div>
          <input v-model="userInfo.Username" style="width: 100%" disabled /> -->
          <v-text-field
            ref="diplayusername"
            height="12"
            :rules="user_rules"
            solo
            outlined
            rounded
            v-model="userInfo.Username"
            @blur="changeUsername"
            label="Username"
            hint="please input username"
            prepend-inner-icon="mdi-account-outline"
            dense
            required
            flat
          >
          </v-text-field>
        </div>
        <div class="email px-8 py-1">
          <!-- <div class="d-flex">
            <h4 style="color: grey; padding: 7px 0px">{{ $t('email') }}</h4>
            <v-btn icon :ripple="false" @click="onEditUserEmail">
              <v-icon color="info">ri-edit-box-line</v-icon>
            </v-btn>
          </div> -->
          <!-- <input v-model="userInfo.Email" style="width: 100%" disabled /> -->
          <v-text-field
            ref="diplayemail"
            height="12"
            solo
            outlined
            rounded
            dense
            flat
            @click="onEditUserEmail"
            value="******@gmail.com"
            label="email"
            hint="please input email"
            prepend-inner-icon="mdi-account-outline"
          >
          </v-text-field>
        </div>
        <div class="password px-8 py-1">
          <!-- <div class="d-flex">
            <h4 style="color: grey; padding: 7px 0px">{{ $t('password') }}</h4>
            <v-btn icon :ripple="false" @click="onEditPassword">
              <v-icon color="info">ri-edit-box-line</v-icon>
            </v-btn>
          </div> -->
          <v-text-field
            ref="diplaypass"
            height="12"
            solo
            outlined
            rounded
            @click="onEditPassword"
            type="password"
            value="******@gmail.com"
            label="password"
            hint="please input new password"
            prepend-inner-icon="mdi-account-outline"
            dense
            flat
          >
          </v-text-field>
        </div>
        <v-divider></v-divider>
        <div class="change-user-group px-8 pt-6 pb-1 d-flex">
          <h4 style="color: grey; padding: 7px 0px; width: 45%">
            {{ $t('change user group') }}
          </h4>
          <div style="width: 45%">
            <v-btn
              color="info"
              rounded
              depressed
              :outlined="!userInfo.IsGroup"
              class="my-1 w-100px"
              small
              :ripple="false"
              @click="onChangeUserGroup"
            >
              {{ $t('on') }} / {{ $t('off') }}
              <!-- {{ userInfo.IsGroup ? $t('on') : $t('off') }} -->
            </v-btn>
          </div>
          <div style="width: 10%; align-self: center;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="my-1 w-100px question-icon"
                  small
                  icon
                  :ripple="false"
                  v-bind="attrs"
                  v-on="on"
                  >?</v-btn
                >
              </template>
              <span>
                {{ $t('if you change to a group') }}
              </span
              >
            </v-tooltip>
          </div>
        </div>
        <div class="language px-8 py-1">
          <h4 style="color: grey; padding: 7px 0px">{{ $t('language') }}</h4>
          <v-select
            dense
            outlined
            solo
            rounded
            flat
            v-model="language"
            :items="items"
            item-text="text"
            item-value="lang"
            color="grey"
            @change="onSelectLang($event)"
          >
            <template v-slot:label>
              {{ " " }}
            </template>
          </v-select>
        </div>
        <v-divider></v-divider>
        <div class="change-user-group px-8 pt-6 pb-1 d-flex">
          <h4 style="color: grey; padding: 7px 0px; width: 45%"> {{ $t('dark mode') }}</h4>
          <div style="width: 45%">
            <v-btn
              color="info"
              rounded
              depressed
              class="my-1"
              small
              :ripple="false"
              >{{ $t('on') }} / {{ $t('off') }}</v-btn
            >
          </div>
        </div>
        <div class="change-user-group px-8 pt-6 pb-1 d-flex">
          <v-btn
            color="info"
            rounded
            depressed
            small
            outlined
            style="text-transform: capitalize"
            @click="onSuspendAccount"
            >{{ $t('suspend account') }}</v-btn
          >
        </div>
        <div class="change-user-group px-8 pt-4 pb-1 d-flex w-full">
          <v-btn
            rounded
            depressed
            large
            color="secondary"
            style="text-transform: capitalize; width: 100%"
            @click="onExitThisAccount"
            > {{ $t('exit this account') }}</v-btn
          >
        </div>
      </div>
    </template>
  </v-card>
</template>

<script>
import CodeInput from "vue-verification-code-input";
import untils from "@/utils/untils";
import MainPost from "@/components/Post/MainPost";
import crypto from "crypto";

export default {
  name: "Setting",
  components: { MainPost, CodeInput },
  data: () => ({
    user_rules: [
      value => !!value || 'Required.',
      value => (value && value.length >= 4) || 'Min 4 characters',
    ],
    email_rules: [
      value => !!value || 'Required.',
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
      value => (value || '').length <= 20 || 'Max 20 characters',
    ],
    password_rules: [
      value => !!value || 'Required.',
      value => {
        const pattern = /^[A-Za-z0-9]+$/
        return pattern.test(value) || 'Invalid password. Please use number or letter.'
      },
      value => (value && value.length >= 8) || 'Min 8 characters',
      value => (value && value.length <= 20) || 'Max 20 characters',
    ],
    items: [
      {
        text: '中文',
        lang: 'zh'
      },
      {
        text: 'English',
        lang: 'en'
      }
    ],
    show1: false,
    show2: false,
    userInfo: {},
    t_userInfo: {},
    loading: false,
    modal: false,
    modalType: "",
    modalTitle: "",
    language: "zh",
    password: "",
    errorMsg: "",
    confrimLoading: false,
    currentPassword: "",
    verifyType: "",
    email: "",
    confirmCode: "",
    token: ""
  }),
  mounted() {
    this.api.getAccountInfoAPI().then((response) => {
      if (response.data["Code"] === 0) {
        if (response.data["Body"]) {
          console.log("response.data", response.data["Body"])
          this.userInfo = response.data["Body"];
          this.t_userInfo = JSON.parse(JSON.stringify(this.userInfo));
        }
      }
    });
  },
  computed: {},
  watch: {
    userInfo() {
      this.t_userInfo = JSON.parse(JSON.stringify(this.userInfo));
    },
  },
  methods: {
    onSelectLang(e){

      let locale = 'en'

      if(e === 'zh'){
         locale = 'cn';

      }else if( e === 'en'){
        locale = 'en';
      }else{

      }
      this.$i18n.locale = locale;
      localStorage.setItem('lang', locale);


    },

    encryptedPassword(plain) {
      let md5 = crypto.createHash("sha256");
      md5.update(plain);

      return md5.digest("hex");
    },
    onCancel() {
      this.modal = false;
      this.password = "";
      this.errorMsg = "";
      this.t_userInfo.Email = this.userInfo.Email;
    },
    onBack() {
      this.modalType = "email"
    },
    onConfirm() {
      switch (this.modalType) {
        case "username":
          this.changeUsername();
          break;
        case "email":
          this.changeEmail();
          break;
        case "password":
          this.changePassword();
          break;
        case "changeUserGroup":
          this.changeUserGroup();
          break;
        case "verifyPassword":
          this.verifyPassword();
          break;
        case "confirmCode":
          this.confrimCode()
          break
        default:
          this.modal = false;
          break;
      }
    },
    changeUsername() {
      // this.$refs.username.disabled = true;
      this.confrimLoading = true;
      this.api.changeUserNameAPI(this.userInfo.Username).then((response) => {
        if (response.data["Code"] === 0) {
          if (response.data["Body"]) {
            if (this.userInfo.Username === response.data["Body"]) {
              this.userInfo.Username = response.data["Body"];
              // this.$refs.username.disabled = false;
              this.confrimLoading = false;
              this.modal = false;
            }
          }
        }
      });
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    changeEmail() {
      if (!this.validateEmail(this.t_userInfo.Email)) {
        this.errorMsg = "This email is incorrect";
        return;
      }

      this.$refs.email.disabled = true;
      this.confrimLoading = true;
      this.errorMsg = "";
      this.api
        .changeEmailAPI(
          this.email,
          this.encryptedPassword(this.currentPassword)
        )
        .then((response) => {
          if (response.data["Code"] === 0) {
            if (response.data["Body"]) {
              if (response.data["Body"].Token) {
                this.token = response.data["Body"].Token;
                this.confrimLoading = false;
                this.modalTitle = "Verification Code"
                this.modalType = "confirmCode"
              } else {
                this.$refs.email.disabled = false;
                this.confrimLoading = false;
                this.errorMsg = res.data["Msg"];
                this.currentPassword = "";
                this.modalTitle = "Token is incorrect";
              }
            }
          } else {
            this.errorMsg = response.data["Msg"];
            this.$refs.email.disabled = false;
            this.confrimLoading = false;
            this.currentPassword = "";
            this.modalType = "verifyPassword";
            this.modalTitle = "Verify your current password";
          }
        });
    },
    validateEmail(email) {
      const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regExp.test(String(email).toLowerCase());
    },
    changePassword() {
      this.$refs.newpassword.disabled = true;
      this.confrimLoading = true;
      this.errorMsg = "";

      this.api
        .changePassword({
          pw: this.encryptedPassword(this.currentPassword),
          pwnew: this.encryptedPassword(this.password),
        })
        .then((response) => {
          console.log("111111111111111111111111111111", response.data["Code"])
          if (!response.data["Code"]) {
            this.$refs.newpassword.disabled = false;
            this.confrimLoading = false;
            this.currentPassword = "";
            this.password = "";
            this.errorMsg = "";
            this.modal = false;
          } else {
            this.errorMsg = response.data["Msg"];
            this.$refs.newpassword.disabled = false;
            this.currentPassword = "";
            this.password = "";
            this.confrimLoading = false;
            this.modalType = "verifyPassword";
            this.modalTitle = "Verify your current password";
          }
        });
    },
    changeUserGroup() {
      if (this.userInfo.IsGroup != this.t_userInfo.IsGroup) {
        this.confrimLoading = true;
        if (this.t_userInfo.IsGroup) {
          this.api.changeToGroup().then((response) => {
            if (!response.data["Code"]) {
              this.userInfo.IsGroup = true
              if (
                this.userInfo.GroupLTw != this.t_userInfo.GroupLTw ||
                this.userInfo.GroupLFol != this.t_userInfo.GroupLFol
              ) {
                this.api
                  .setGroup(this.t_userInfo.GroupLTw, this.t_userInfo.GroupLFol)
                  .then((res) => {
                    if (!res.data["Code"]) {
                      this.confrimLoading = false;
                      this.modal = false;
                    } else {
                      this.errorMsg = res.data["Msg"];
                      this.confrimLoading = false;
                    }
                  });
              }
              this.confrimLoading = false;
              this.modal = false;
            } else {
              this.errorMsg = response.data["Msg"];
              this.confrimLoading = false;
            }
          });
        } else {
          this.api.changeToUser().then((response) => {
            if (!response.data["Code"]) {
              this.userInfo.IsGroup = false
              this.confrimLoading = false;
              this.modal = false;
            } else {
              this.errorMsg = response.data["Msg"];
              this.confrimLoading = false;
            }
          });
        }
      } else if (
        this.t_userInfo.IsGroup &&
        (this.userInfo.GroupLTw != this.t_userInfo.GroupLTw ||
          this.userInfo.GroupLFol != this.t_userInfo.GroupLFol)
      ) {
        this.confrimLoading = true;
        this.api
          .setGroup(
            parseInt(this.t_userInfo.GroupLTw),
            parseInt(this.t_userInfo.GroupLFol)
          )
          .then((response) => {
            if (!response.data["Code"]) {
              this.confrimLoading = false;
              this.modal = false;
            } else {
              this.errorMsg = response.data["Msg"];
              this.confrimLoading = false;
            }
          });
      }
    },
    verifyPassword() {
      this.errorMsg = "";

      if (this.verifyType === "resetPassword") {
        this.modalType = "password";
        this.modalTitle = "Inpute your new password";
      } else if (this.verifyType === "resetEmail") {
        this.modalType = "email";
        this.modalTitle = "Inpute your new email";
      }
    },
    onEditUserName() {
      this.errorMsg = "";
      this.modalType = "username";
      this.modalTitle = "Edit Username";
      this.modal = true;
    },
    onEditUserEmail() {
      this.errorMsg = "";
      this.modalType = "verifyPassword";
      this.modalTitle = "Verify your current password";
      this.verifyType = "resetEmail";
      this.modal = true;
      this.confrimLoading = false;
    },
    onEditPassword() {
      this.errorMsg = "";
      this.modalType = "verifyPassword";
      this.modalTitle = "Verify your current password";
      this.verifyType = "resetPassword";
      this.modal = true;
    },
    onChangeUserGroup() {
      this.errorMsg = "";
      this.modalType = "changeUserGroup";
      this.modalTitle = "Change User Group";
      this.modal = true;
    },
    onExitThisAccount() {
      //登出
      this.api
        .postLogoutAPI()
        .then((response) => {
          if (response.data["Code"] === 0) {
            console.log(
              "-logout-登出成功：" + JSON.stringify(response.data["Body"])
            );
          }
        })
        .catch((err) => console.log(err));

      //清空系统记录用户token值
      this.$store.dispatch("Post/authTokenAction", "");
      //清空用户信息
      //localStorage.setItem('userinfo','')
      this.$store.dispatch("Post/userInfoAction", "");

      //跳转到登录页
      this.$router.push("/sign-in");
    },
    onSuspendAccount() {
      this.api.suspendAccount().then((response) => {});
    },
    backHistory: function () {
      this.$router.go(-1); //返回上一层
    },
    //获取贴子数据
    fetchPostData: function () {
      //获取贴子id
      let pid = this.$route.query.pid;

      //获取贴子信息
      this.api
        .getTweetsAPI(pid)
        .then((response) => {
          if (
            response.data.Code === 0 &&
            !untils.isEmpty(response.data["Body"])
          ) {
            console.log(
              "-getTweetsAPI-" + JSON.stringify(response.data["Body"])
            );

            //存入store 跟帖列表
            this.$store.dispatch(
              "Post/postListAddAction",
              response.data["Body"]
            );

            console.log("跟帖列表：" + JSON.stringify(response.data["Body"]));
          }
        })
        .catch((err) => console.log(err));
    },
    onConfirmCodeChange(e) {
      this.confirmCode = e
    },
    onConfirmCodeComplete(e) {
      this.confirmCode = e
    },
    confrimCode() {
      this.confrimLoading = true;
      this.api
        .postLoginComfirmAPI({
          token: this.token,
          code: this.confirmCode,
        })
        .then((res) => {
          if (res.data["Code"] === 0) {
            if (res.data["Body"].Token) {
              this.userInfo.Email = this.email;
              this.modal = false;
              this.confrimLoading = false;
              localStorage.setItem("userToken", res.data["Body"].Token);
            }
          } else {
            this.errorMsg = res.data["Msg"];
            this.confrimLoading = false;
          }
        }).finally(() => {
          this.$refs.email.disabled = false;
          this.confrimLoading = false;
          this.currentPassword = "";
        })
    }
  },

  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchPostData();
  },
};
</script>

<style lang="scss" scoped>
.user-name {
  margin-top: 5%;
}
.modal-input {
  width: 100%;
  font-size: 20px;
  margin-top: 15px;
}
input {
  outline: none;
  border-bottom: 1px grey solid;
}
.back {
  color: black!important;
  border: 0;
}
.back::before {
  background-color: white;
}
.v-card-modal {
  padding-top: 5%;
  padding-left: 7%;
  padding-right: 7%;
}
.text-center {
  border-bottom: 1px solid rgb(175, 175, 175);
  padding-top: 3%;
  padding-bottom: 3%;
}
.text-red {
  margin-top: -5px;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
  color: crimson;
}
.question-icon {
  background-color: #2196f3;
  color: white!important;
  font-size: 1.5rem;
  font-weight: 800;
}
</style>
