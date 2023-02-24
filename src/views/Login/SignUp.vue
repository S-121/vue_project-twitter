<template>
  <div>
    <v-img
      class="fill-height"
      :src="require('../../assets/img/bg.jpg')"
      :lazy-src="require('../../assets/img/bg_lazy.jpg')"
      :aspect-ratio="16 / 9"
      height="100vh"
      width="100vw"
    >
      <v-container fill-height fluid>
        <v-row justify="center" align="center" class="fill-height">
          <v-col cols="12" md="6" lg="4" xl="3">
            <h2 class="text-h4 white--text font-weight-normal text-center ma-6">
              {{ $t("create your account") }}
            </h2>
            <v-card elevation="12" class="py-8" rounded>
              <div class="text-center">
                <v-row justify="center">
                  <v-col cols="12" md="10">
                    <v-card-title
                      class="text-h6 font-weight-regular justify-space-between"
                    >
                      <span>{{ currentTitle }}</span>
                      <v-avatar
                        color="grey lighten-1"
                        class="subheading white--text"
                        size="24"
                        v-text="step"
                      ></v-avatar>
                    </v-card-title>

                    <!-- <validation-observer ref="observer_" v-slot="{ invalid_ }"> -->
                      <v-window v-model="step">
                        <!--START Reg form-->
                        <v-window-item :value="1">
                          <validation-observer ref="observer1" v-slot="{ invalid }">
                            <v-card-text>
                              <form @submit.prevent="submit">
                                <!--START 用户名称-->
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Username"
                                  :rules="{
                                    required: true,
                                    max: 20,
                                    min: 4,
                                  }"
                                >
                                  <v-text-field
                                    v-if="step === 1"
                                    v-model="valiForm.Username"
                                    :counter="20"
                                    :error-messages="errors"
                                    label="Username"
                                    solo
                                    flat
                                    dense
                                    outlined
                                    rounded
                                    prepend-inner-icon="mdi-account-outline"
                                  ></v-text-field>
                                </validation-provider>
                                <!--END 用户名称-->

                                <!--START 显示名称-->
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Nickname"
                                  :rules="{
                                    required: true,
                                    max: 20,
                                    min: 4,
                                  }"
                                >
                                  <v-text-field
                                    v-if="step === 1"
                                    v-model="valiForm.Displayname"
                                    :counter="20"
                                    :error-messages="errors"
                                    label="Nickname"
                                    solo
                                    flat
                                    dense
                                    outlined
                                    rounded
                                    prepend-inner-icon="mdi-account-outline"
                                  ></v-text-field>
                                </validation-provider>
                                <!--END 显示名称-->

                                <!--START 邮箱-->
                                <validation-provider
                                  vid="email"
                                  v-slot="{ errors }"
                                  name="Email"
                                  rules="required|email"
                                >
                                  <v-text-field
                                    v-if="step === 1"
                                    v-model="valiForm.Email"
                                    :error-messages="errors"
                                    label="E-mail"
                                    solo
                                    flat
                                    dense
                                    outlined
                                    rounded
                                    prepend-inner-icon="ri-mail-line"
                                  ></v-text-field>
                                </validation-provider>
                                <!--END 邮箱-->

                                <!--START 确认密码-->
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Password"
                                  :rules="{
                                    required: true,
                                    regex: /^[A-Za-z0-9]+$/,
                                    min: 8,
                                    max: 20,
                                  }"
                                  vid="confirmpw"
                                >
                                  <v-text-field
                                    v-if="step === 1"
                                    type="password"
                                    v-model="confirmpw"
                                    :counter="20"
                                    :error-messages="errors"
                                    label="Password"
                                    solo
                                    flat
                                    dense
                                    outlined
                                    rounded
                                    prepend-inner-icon="ri-lock-line"
                                    required
                                  ></v-text-field>
                                </validation-provider>
                                <!--END 确认密码-->

                                <!--START 密码-->
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Password"
                                  :rules="{
                                    required: true,
                                    regex: /^[A-Za-z0-9]+$/,
                                    min: 8,
                                    max: 20,
                                    confirmed: 'confirmpw',
                                  }"
                                >
                                  <v-text-field
                                    v-if="step === 1"
                                    type="password"
                                    v-model="valiForm.Pw"
                                    :counter="20"
                                    :error-messages="errors"
                                    label="Confirm Password"
                                    solo
                                    flat
                                    dense
                                    outlined
                                    rounded
                                    prepend-inner-icon="ri-lock-line"
                                    required
                                  ></v-text-field>
                                </validation-provider>
                                <!--END 密码-->

                              </form>
                              <span
                                class="text-caption grey--text text--darken-1"
                              >
                                {{
                                  $t(
                                    "here you need to fill in your registration information"
                                  )
                                }}
                              </span>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions class="pa-4">
                              <v-btn :disabled="step === 1" text @click="resetFrom">
                                {{ $t("back") }}
                              </v-btn>
                              <v-spacer></v-spacer>
                              <v-btn
                                :disabled="invalid"
                                @click="goStep"
                                color="info"
                                rounded
                              >
                                {{ $t("next") }}
                              </v-btn>
                            </v-card-actions>
                          </validation-observer>
                        </v-window-item>
                        <!--END Reg form-->

                        <!--START Code-->
                        <v-window-item :value="2">
                          <validation-observer ref="observer2" v-slot="{ invalid }">
                          <v-card-text>
                            <validation-provider
                              vid="code"
                              v-slot="{ errors }"
                              name="code"
                              rules="required|digits: 6"
                            >
                              <v-text-field
                                v-if="step === 2"
                                v-model="regCode"
                                :error-messages="errors"
                                label="Code"
                                solo
                                flat
                                dense
                                outlined
                                rounded
                                prepend-inner-icon="ri-key-line"
                              ></v-text-field>
                            </validation-provider>
                            <span
                              class="text-caption grey--text text--darken-1"
                            >
                              {{
                                $t(
                                  "please enter the verification code received from your email"
                                )
                              }}
                            </span>
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions class="pa-4">
                            <v-btn :disabled="step === 1" text @click="resetFrom">
                              {{ $t("back") }}
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                              :disabled="invalid"
                              @click="goStep"
                              color="info"
                              rounded
                            >
                              {{ $t("next") }}
                            </v-btn>
                          </v-card-actions>
                          </validation-observer>
                        </v-window-item>
                        <!--END Code-->

                        <!--START Reg success-->
                        <v-window-item :value="3">
                          <validation-observer ref="observer3" v-slot="{ invalid }">
                          <v-card-text>
                            <div class="text-caption grey--text text--darken-1">
                              Go to index page after 2 seconds.
                            </div>
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions class="pa-4">
                            <v-btn :disabled="step === 1" text @click="resetFrom">
                              {{ $t("back") }}
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                              :disabled="invalid"
                              @click="goStep"
                              color="info"
                              rounded
                            >
                              Login
                            </v-btn>
                          </v-card-actions>
                          </validation-observer>
                        </v-window-item>
                        <!--END Reg success-->
                      </v-window>
                    <!-- </validation-observer> -->
                  </v-col>
                </v-row>
              </div>
            </v-card>

            <div class="mt-6 text-center">
              <div class="mt-6 white--text font-weight-black">
                <span class="font-weight-black white--text">
                  {{ $t("already have a account") }}?</span
                >
                <router-link to="/sign-in" class="text-decoration-none">
                  <span class="font-weight-black white--text">
                    {{ $t("log in") }}</span
                  >
                </router-link>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-overlay :value="overlay">
        <v-progress-circular
          color="light-blue lighten-5"
          indeterminate
          size="120"
          >{{ this.loginText }}</v-progress-circular
        >
      </v-overlay>
    </v-img>
  </div>
</template>

<script>
import {
  required,
  numeric,
  digits,
  email,
  min,
  max,
  regex,
  confirmed,
} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import crypto from "crypto";
import Fingerprint2 from "fingerprintjs2";

setInteractionMode("eager");

const validator = {
  messages: {
    en: (field, args) => {
      // 英文错误提示
      return "enenenen";
    },
    cn: (field, args) => {
      // 中文错误提示
      return "错误错误";
    },
  },
  validate(value, args) {
    // Returns a Boolean or a Promise.
  },
};

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits.",
});

extend("numeric", {
  ...numeric,
  message: "verification {_field_} must be numeric",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("min", {
  ...min,
  message: "{_field_} must be at least {length} characters",
});

extend("regex", {
  ...regex,
  // message: "{_field_} {_value_} does not match {regex}",
  message: "{_field_} {_value_} does not match number or character",
});

extend("email", {
  ...email,
  message: "Email valid",
});

extend("confirmed", {
  ...confirmed,
  message: "The {_field_} field confirmation does not match",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      step: 1,
      loginText: "",
      regToken: "",
      regCode: "",
      regStat: "",
      logToken: "",
      valiForm: {
        Username: "",
        Displayname: "",
        Email: "",
        Pw: "",
      },
      postForm: {
        Username: "",
        Displayname: "",
        Email: "",
        Pw: "",
      },
      GuestStatus: "Guest Login",
      confirmpw: "",
      email: "",
      overlay: false,
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Please enter your registration form.";
        case 2:
          return "Verification Code";
        default:
          return "Register successfully";
      }
    },
  },
  watch: {
    /*overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 3000)
    },*/
  },
  mounted() {

    console.log('final pw:' + this.encodePW('elon','123456'))

  },
  methods: {
    resetFrom: function () {
      this.step--;
    },
    goStep: function () {
      console.log("this step:" + this.step);

      switch (this.step) {
        //email
        case 1:
          //提交注册
          this.register();
          break;
        //code
        case 2:
          this.regConfirm();
          break;

        //new password
        default:
          //自动登录
          this.initUserInfo();
          break;
      }
    },
    checkEmail: function () {
      this.$refs.observer.setErrors(
        '{"email":["This is not a valid eamil"],"password":[]}}'
      );
    },
    checkDisplayname: function () {
      let json = '{"email":["This is not a valid eamil"],"password":[]}}';

      let data = {
        Displayname: this.valiForm.Displayname,
      };

      this.api
        .postCheckRegAPI(data)
        .then((response) => {
          if (response.data.Code === 1) {
            console.log("被占用:" + response.data["Msg"]);
          }
        })
        .catch((err) => console.log(err));
    },
    checkUsername: function () {
      this.$refs.observer.setErrors(
        '{"email":["This is not a valid eamil"],"password":[]}}'
      );

      if (this.valiForm.Username.length >= 3) {
        let data = {
          Username: this.valiForm.Username,
        };

        this.api
          .postCheckRegAPI(data)
          .then((response) => {
            if (response.data.Code === 1) {
              console.log("被占用:" + response.data["Msg"]);
            }
          })
          .catch((err) => console.log(err));
      }
    },
    submit() {
      this.$refs.observer.validate();
    },

    //用户注册
    register: function() {

      this.postForm.Username = this.valiForm.Username
      this.postForm.Displayname = this.valiForm.Displayname
      this.postForm.Email = this.valiForm.Email
      this.postForm.Pw = this.encodePW(this.postForm.Username , this.valiForm.Pw)

      this.api.postRegisterAPI(this.postForm).then(response => {
        if(response.data.Code === 0) {

          console.log("提交注册信息成功:"+JSON.stringify(response.data));

          //保存Token信息
          this.regToken = response.data.Body['Token']

          //返回成功后，跳转到下一步
          this.step++

        }else{
          // 注册失败，一般是重名问题
          //显示错误提示
          this.$store.dispatch('Home/snackBarShowAction',true)
          this.$store.dispatch('Home/snackBarTextAction',response.data['Msg'])

          alert(response.data['Msg'])

          // 跳转重新注册
          this.$router.push('/sign-up')


        }
      }).catch(err => console.log(err))

    },

    //注册确认
    regConfirm: function () {

      let data = {
        code: this.regCode,
        token: this.regToken
      };
      this.api.postLoginComfirmAPI(data).then(response => {
            if(response.data.Code === 0) {
              this.regStat = 'Register successfully'
              console.log("注册用户confirm成功")

              this.logToken = response.data.Body['Token']

              //保存Token
              localStorage.setItem('userToken',this.logToken)


              //返回成功后，跳转到下一步
              this.step++

              //5秒后跳转到timeline
              setTimeout(this.initUserInfo,200)


            }else {
              console.log("注册用户comfirm失败")

              this.regStat = response.data['Msg']

              //跳转到重新注册
               this.$router.push('/sign-up')

            }
          }
      ).catch(err => console.log(err))

    },

    //自动登录
    login: function (token) {

      this.initUserInfo()

    },

    encodePW: function (username , pw) {

      return this.untils.encodePW(username , pw)

    },
    //游客登录
    guestLogin: function () {
      //显示加载状态
      this.overlay = true;
      this.GuestStatus = "Logging in";
      this.loginText = "Guest Logging in";
      let guestFinger;
      //先获从Cookie获取用户指纹信息
      if (!this.untils.isEmpty(this.api.getFingerCookie())) {
        guestFinger = this.api.getFingerCookie();
        //获取游客token
        this.getGuestToken(guestFinger);
      } else {
        //如果没有指纹数据则生成指纹数据
        this.getUserFinger();
      }
    },
    //获取可用域名
    getHelloData: function () {
      //获取可用域名
      this.api.getHelloData();
    },
    //获取游客身份Token
    getGuestToken: function (finger) {
      let params = {
        Key: finger,
      };

      //将指纹码发送至服务器，返回Token
      this.api.postGuestRegAPI(params).then(response => {
        if(response.data.Code === 0) {
          console.log("获取游客Token信息成功:" + JSON.stringify(response.data))
          if(response.data['Body'].Token){
            //将游客Token保存在Cookie
            this.$cookies.set('user_auth',response.data['Body'].Token)
            //保存在store
            this.$store.dispatch('Post/authTokenAction',response.data['Body'].Token)

            //初始化用户基础信息
            this.initUserInfo()

          }else {
            this.$router.push('/sign-in')
          }
        }
      }).catch(err => console.log(err))

    },
    //获取用户浏览器指纹数据
    getUserFinger: function () {

      let userFinger
      let _this = this

      Fingerprint2.get(function(components) {
        const values = components.map(function(component,index) {
          if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
            return component.value.replace(/\bNetType\/\w+\b/, '')
          }
          return component.value
        })

        // 生成最终id
        userFinger = Fingerprint2.x64hash128(values.join(''), 31)
        console.log('游客身份生成指纹：' + userFinger)

        // 浏览器指纹信息存储到store
        _this.$store.dispatch("Post/fingerprintAction",userFinger)

        // 浏览器指纹储存到cookie
        _this.$cookies.set('user_code',userFinger)

        //获取游客token
        _this.getGuestToken(userFinger)

      })
    },
    //初始化用户头像等基础信息
    initUserInfo: function () {

      //获取HelloData
      this.api.getHelloData()

      this.api.getUserInfoAPI().then(response => {
        if(response.data['Code'] === 0) {
          console.log("获取用户基础信息-getUserInfoAPI-SignIn :" + JSON.stringify(response.data['Body']))
          if(response.data['Body']) {

            //存储用户基础信息
            localStorage.setItem('userinfo',JSON.stringify(response.data['Body']))

            //跳转到首页
            this.$router.push('/timeline')
          }
        }
      }).catch(err => console.log(err))
    }

  },

}
</script>
