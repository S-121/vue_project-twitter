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
             {{ $t('find your password') }}
          </h2>
          <v-card elevation="12" class="py-8" rounded >

            <div class=" text-center">
              <v-row justify="center">
                <v-col cols="12" md="10">

                  <v-card-title class="text-h6 font-weight-regular justify-space-between">
                    <span>{{ currentTitle }}</span>
                    <v-avatar
                        color="grey lighten-1"
                        class="subheading white--text"
                        size="24"
                        v-text="step"
                    ></v-avatar>
                  </v-card-title>

                  <validation-observer
                      ref="observer1"
                      v-slot="{ invalid }"
                  >

                  <v-window v-model="step">


                    <!--输入邮箱-->
                    <v-window-item :value="1">
                      <v-card-text>
                        <validation-provider
                            vid="email"
                            v-slot="{ errors }"
                            name="Email"
                            rules="required|email"
                        >

                          <v-text-field
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
                        <span class="text-caption grey--text text--darken-1">
                          {{ $t('this is the email you will use to login') }}
                        </span>
                      </v-card-text>
                    </v-window-item>

                    <!--输入Code-->
                    <v-window-item :value="2">
                      <v-card-text>
                        <validation-provider
                            vid="code"
                            v-slot="{ errors }"
                            name="code"
                            rules="required|digits: 6"
                        >

                          <v-text-field
                              v-model="valiForm.Code"
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
                        <span class="text-caption grey--text text--darken-1">
                          {{ $t('please enter the verification code received from your email') }}
                        </span>
                      </v-card-text>
                    </v-window-item>

                    <!--输入密码-->
                    <v-window-item :value="3">
                      <v-card-text>
                        <validation-provider
                            v-slot="{ errors }"
                            name="Password"
                            rules="required|min:8|max:20"
                            vid="confirmpw"
                        >
                          <v-text-field
                              type="password"
                              v-model="valiForm.confirmPw"
                              :counter="20"
                              :error-messages="errors"
                              label="Confirm password"
                              solo
                              flat
                              dense
                              outlined
                              rounded
                              prepend-inner-icon="ri-lock-line"
                              required
                          ></v-text-field>
                        </validation-provider>

                        <validation-provider
                            v-slot="{ errors }"
                            name="Password"
                            rules="confirmed:confirmpw"
                        >
                          <v-text-field
                              type="password"
                              v-model="valiForm.Pw"
                              :counter="20"
                              :error-messages="errors"
                              label="New Password"
                              solo
                              flat
                              dense
                              outlined
                              rounded
                              prepend-inner-icon="ri-lock-line"
                              required
                          ></v-text-field>
                        </validation-provider>

                        <span class="text-caption grey--text text--darken-1">

                          {{ $t('please enter a password for your account') }}
                        </span>
                      </v-card-text>
                    </v-window-item>



                  </v-window>

                  <v-divider></v-divider>

                  <v-card-actions class="pa-4">
                    <v-btn
                        :disabled="step === 1"
                        text
                        @click="step--"
                    >

                      {{ $t('back') }}
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="invalid"
                        @click="goStep"
                        color="info"
                        rounded
                    >

                      {{ $t('next') }}
                    </v-btn>
                  </v-card-actions>

                  </validation-observer>

                </v-col>
              </v-row>
            </div>



          </v-card>

          <div class="mt-6 text-center">

            <div class="mt-6 white--text font-weight-black">
              <span class="font-weight-black white--text"
              > {{ $t('already have a account') }}?</span>
              <router-link to="/sign-in" class="text-decoration-none" >
                        <span class="font-weight-black white--text"
                        >   {{ $t('log in') }}</span>
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
      >{{ this.loginText }}</v-progress-circular>
    </v-overlay>



  </v-img>
</div>
</template>

<script>
import { required, numeric, digits, email, min, max, regex, confirmed } from 'vee-validate/dist/rules'
import { extend,  ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import crypto from 'crypto'
import Fingerprint2 from "fingerprintjs2";

setInteractionMode('eager')

const validator = {
  messages: {
    en: (field, args) => {
      // 英文错误提示
      return 'enenenen'
    },
    cn: (field, args) => {
      // 中文错误提示
      return '错误错误'
    }
  },
  validate(value, args) {
    // Returns a Boolean or a Promise.
  }
};

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits.',
})

extend('numeric', {
  ...numeric,
  message: 'verification {_field_} must be numeric',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('min', {
  ...min,
  message: '{_field_} must be at least {length} characters',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: 'Email valid',
})

extend('confirmed', {
  ...confirmed,
  message: 'The {_field_} field confirmation does not match',
})


export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      step: 1,
      loginText: '',
      valiForm: {
        Token: '',
        Email: '',
        Code: '',
        Pw: '',
        confirmPw: ''
      },
      overlay: false,
    }
  },
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Please enter your email'
        case 2: return 'Verification Code'
        default: return 'Please enter a new password'
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
  methods: {

    goStep:function () {

      switch (this.step) {
        //email
        case 1:

          let data1 = {
            "Email": this.valiForm.Email
          }

          this.api.postResetPwAPI(data1).then(response => {
                if(response.data.Code === 0) {
                  console.log("返回邮箱确认信息:" + JSON.stringify(response.data['Body']))

                  if(response.data['Body']) {
                    this.valiForm.Token = response.data['Body']['Token']
                  }

                  // this.valiForm.Code =  response.data['Body']['Code']
                }else{
                  // 错误信息提示
                  alert(JSON.stringify(response.data['Msg']))
                  //返回登录
                  //login page
                  this.$router.push({
                    path: "/sign-in",
                  })

                }
              }
          ).catch(err => console.log(err))

          break

        //code
        case 2:

          break

        //new password
        default:

          let pw = this.encodePw(this.valiForm.confirmPw)

          let data2 = {
            "token": this.valiForm.Token,
            "code": this.valiForm.Code,
            "pw": pw,
          }

          this.api.postLoginComfirmAPI(data2).then(response => {

                if(response.data.Code === 0) {
                  console.log("修改密码成功:" + JSON.stringify(response.data['Body']))

                  //login page
                  this.$router.push({
                    path: "/sign-in",
                  })

                }else{
                  alert(SON.stringify(response.data['Msg']))

                  //login page
                  this.$router.push({
                    path: "/forgot",
                  })

                }
              }

          ).catch(err => console.log(err))

          break


      }

      this.step++



    },
    checkEmail: function () {

      this.$refs.observer.setErrors('{"email":["This is not a valid eamil"],"password":[]}}')

    },
    checkDisplayname: function () {

      let json = '{"email":["This is not a valid eamil"],"password":[]}}'

      let data = {
        "Displayname": this.valiForm.Displayname
      }

      this.api.postCheckRegAPI(data).then(response => {
            if(response.data.Code === 1) {
              console.log("被占用:"+response.data['Msg'])
            }
          }
      ).catch(err => console.log(err))

    },
    checkUsername: function () {

      this.$refs.observer.setErrors('{"email":["This is not a valid eamil"],"password":[]}}')

      if(this.valiForm.Username.length >= 3) {

        let data = {
          "Username": this.valiForm.Username
        }

        this.api.postCheckRegAPI(data).then(response => {
              if(response.data.Code === 1) {
                console.log("被占用:"+response.data['Msg'])
              }
            }
        ).catch(err => console.log(err))

      }

    },
    submit () {
      this.$refs.observer.validate()
    },
    //用户注册
    registerForm: function (evt) {
      evt.preventDefault()

      //显示加载状态
      this.overlay = true
      this.SignStatus = 'processing'
      this.loginText = this.SignStatus

      //加密用户明文密码
      // this.valiForm.Pw = this.encodePw(this.valiForm.Pw)

      this.postForm.Username = this.valiForm.Username
      this.postForm.Displayname = this.valiForm.Displayname
      this.postForm.Email = this.valiForm.Email
      this.postForm.Pw = this.encodePw(this.valiForm.Pw)


      this.api.postRegisterAPI(this.postForm).then(response => {
        if(response.data.Code === 0) {
          console.log("注册成功:"+response.data);

          let data = {
            code: response.data.Body['Code'],
            token: response.data.Body['Token']
          };
          this.api.postLoginComfirmAPI(data).then(response => {
                if(response.data.Code === 0) {
                  this.SignStatus = 'Register successfully'
                  console.log("注册用户omfirm成功:"+response.data)
                  //清空记住密码设置
                  //清除localStorage
                  localStorage.removeItem('rememberPwd')

                  setTimeout(() => {
                    //跳转到登录页面
                    this.$router.push('/sign-in')
                  },100)

                }else {
                  console.log("注册用户comfirm失败:"+response.data)

                  this.SignStatus = 'Register failed'

                  //跳转到重新注册
                  this.$router.push('/sign-up')
                }
              }
          ).catch(err => console.log(err))
        }
      }).catch(err => console.log(err))
    },
    encodePw: function (pw) {
      //加密用户明文密码 MD5
      let md5 = crypto.createHash("sha256")
      md5.update(pw)

      return md5.digest('hex')
    },
    //游客登录
    guestLogin: function () {
      //显示加载状态
      this.overlay = true
      this.GuestStatus = 'Logging in'
      this.loginText = 'Guest Logging in'
      let guestFinger
      //先获从Cookie获取用户指纹信息
      if(!this.untils.isEmpty(this.api.getFingerCookie())) {
        guestFinger = this.api.getFingerCookie()
        //获取游客token
        this.getGuestToken(guestFinger)
      }else { //如果没有指纹数据则生成指纹数据
        this.getUserFinger()
      }
    },
    //获取可用域名
    getHelloData: function () {

      //获取可用域名
      this.api.getHelloData()

    },
    //获取游客身份Token
    getGuestToken: function (finger) {

      let params = {
        "Key": finger
      }

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

      this.getHelloData()

      this.api.getUserInfoAPI().then(response => {
        if(response.data['Code'] === 0) {

          console.log("获取用户基础信息-getUserInfoAPI-SignIn :" + JSON.stringify(response.data['Body']))
          if(response.data['Body']) {

            //存储用户基础信息
            sessionStorage.setItem('userinfo',JSON.stringify(response.data['Body']))

            /*  //组装用户相关信息  无UserId
              let data = {}
              let User = {}
              //设置store中User type
              data.Type = "User"

              //数据不为空时将数据储存进store
              if(!this.untils.isEmpty(response.data['Body']['Username'])) {
                // User.UId = response.data['Body']['UId']
                User.User = response.data['Body']['Username']
              }else {
                User.User = 'guest'
              }

              if(!this.untils.isEmpty(response.data['Body']['DisplayName'])) {
                User.UserD = response.data['Body']['DisplayName']
              }else{
                User.UserD = 'guest'
              }

              if(!this.untils.isEmpty(response.data['Body']['Avatar96'])) {
                User.UserA = response.data['Body']['Avatar96']
              }else{
                User.UserA = require('../assets/users/user-d.png')
              }


              data.User = User

              console.log('组装用户数据User：' + JSON.stringify(data))

              this.$store.dispatch('Post/msgJSONAction',data)*/

            //初始化chatid
            let chatid = Math.random().toString(36).slice(-8)
            sessionStorage.setItem('chatid',chatid)

            //跳转到tweet首页
            this.$router.push('/timeline')
          }
        }
      }).catch(err => console.log(err))
    }

  },

}
</script>
