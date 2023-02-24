<template>

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
            {{ $t('sign in to') }}  VOG
          </h2>
          <v-card elevation="12" class="py-8" rounded >

            <div class="mt-6 text-center">
              <v-row justify="center">
                <v-col cols="12" md="10">

                  <validation-observer
                      ref="observer"
                      v-slot="{ invalid }"
                  >
                    <form @submit.prevent="submit">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Username/Email"
                        :rules="{
                          required: true,
                          max:20,
                          min:4,
                        }"
                      >

                        <v-text-field
                            v-model="valiForm.user"
                            :error-messages="errors"
                            :label="`${$t('username')}/${$t('email')}`"
                            solo
                            flat
                            dense
                            outlined
                            rounded
                            prepend-inner-icon="mdi-account-outline"
                        ></v-text-field>
                      </validation-provider>

                      <validation-provider
                          v-slot="{ errors }"
                          name="Password"
                          :rules="{
                            required: true,
                            regex: /^[A-Za-z0-9]+$/,
                            min:8,
                          }"
                      >
                        <v-text-field
                            type="password"
                            v-model="valiForm.pw"
                            :error-messages="errors"
                            :rules="password_rules"
                            :label="$t('password')"
                            solo
                            flat
                            dense
                            outlined
                            rounded
                            prepend-inner-icon="ri-lock-password-line"
                            @input="inputEvt"
                        ></v-text-field>
                      </validation-provider>

<!--                      <validation-provider
                          v-slot="{ errors }"
                          name="Verify Code"
                          :rules="{
                            required: true,
                            min:4,
                          }"
                      >
                        <v-text-field
                            v-model="valiForm.vCode"
                            :error-messages="errors"
                            label="Verify Code"
                            solo
                            flat
                            dense
                            outlined
                            rounded
                            prepend-inner-icon="ri-phone-lock-line"
                        >
                          <template v-slot:append class="mt-0">
                            <div class="code" @click="refreshCode">
                              <VerifyCode  @click="refreshCode" :identifyCode="identifyCode"></VerifyCode>
                            </div>
                          </template>

                        </v-text-field>

                      </validation-provider>-->

                      <validation-provider
                          v-slot="{ errors }"
                          name="checkbox"
                      >
                        <v-checkbox
                            class="mt-0"
                            v-model="rememberPwd"
                            :error-messages="errors"
                            :label="$t('keep me signed in on this computer')"
                            type="checkbox"
                        ></v-checkbox>
                      </validation-provider>

                      <v-btn
                          class="mr-4"
                          type="submit"
                          :disabled="invalid"
                          color="info"
                          rounded
                          @click="loginSubmit"
                      >
                        {{SignStatus}}
                      </v-btn>
<!--                      <v-btn  color="blue" dark rounded @click="guestLogin">
                        {{GuestStatus}}
                      </v-btn>-->

                    </form>

                  </validation-observer>

                </v-col>

              </v-row>



            </div>

          </v-card>

          <div class="mt-6 text-center">

            <div class="mt-6 white--text font-weight-black">
              <router-link to="/forgot"  class="text-decoration-none">
                        <span class="font-weight-black white--text"
                        >  {{ $t('forgot password') }}?</span>
              </router-link>
              -
              <router-link to="/sign-up"  class="text-decoration-none">
                        <span class="font-weight-black white--text"
                        > {{ $t('dont have an account') }}?</span>
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



</template>

<script>
import { required, digits, email, max, min ,regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import Fingerprint2 from "fingerprintjs2"
import crypto from "crypto"
import VerifyCode from "@/components/Common/VerifyCode";

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
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
  // message: "{_field_} {_value_} does not match {regex}",
  message: "{_field_} {_value_} does not match number or character",
})

export default {
  components: {
    VerifyCode,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      password_rules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^[A-Za-z0-9]+$/
          return pattern.test(value) || 'Invalid password. Please use number or letter.'
        },
        value => (value && value.length >= 8) || 'Min 8 characters',
        value => (value && value.length <= 20) || 'Max 20 characters',
      ],
      code: '',
      // 随机抽取四位数
      identifyCodes: '1234567890abcdef',
      identifyCode: '',
      checked: false,

      valiForm: {
        user: '',
        pw: '',
        vCode: ''
      },
      postForm: {
        user: '',
        pw: ''
      },

      overlay: false,
      loginText: '',
      SignStatus: this.$t('login'),
      GuestStatus: 'Guest Login',

      name: '',
      phoneNumber: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      rememberPwd: false,
      newPwd: false,
    }
  },
  methods: {
    // 验证码处理
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },

    // 刷新验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ]
      }
      console.log(this.identifyCode)
    },


    inputEvt: function () {
      console.log('inputEvt: '+ this.valiForm.pw)

      //输入新密码，则将记住密码取消
      this.rememberPwd = false
      //标识新密码状态
      this.newPwd = true

      console.log('记住密码 状态：' + this.rememberPwd)

    },
    //加密用户明文密码 MD5
    encodePw: function (username, pw) {

      return this.untils.encodePW(username, pw)
    },
    //登录
    loginSubmit(evt) {
      evt.preventDefault()
      //显示加载状态
      this.overlay = true
      this.SignStatus = 'Logging in'
      this.loginText = this.SignStatus

      this.postForm.user = this.valiForm.user

      //记住密码
      if(this.rememberPwd === true) {

        //localStorage
        localStorage.setItem('rememberPwd','true')

        //新输入的密码
        if(this.newPwd) {
          //加密密码
          this.postForm.pw = this.encodePw(this.valiForm.user, this.valiForm.pw)

        }else {
          //从cookie中获取密码
          // this.postForm.pw = this.$cookies.get('user_pwd')
          this.postForm.pw = this.encodePw(localStorage.getItem('user_name') , localStorage.getItem('user_pwd'))
        }


        //将密码存入cookie
        // this.$cookies.set('user_name', this.postForm.user, 30)
        // this.$cookies.set('user_pwd', this.postForm.pw, 30)

        //将密码存入localStorage
        localStorage.setItem('user_name',this.postForm.user)
        localStorage.setItem('user_pwd',this.valiForm.pw)

      }else {
        //清除localStorage
        localStorage.removeItem('rememberPwd')

        this.postForm.pw = this.encodePw(this.valiForm.user, this.valiForm.pw)
        // this.postForm.pw = this.valiForm.pw
      }

      this.api.postSignuUpAPI(this.postForm).then(response => {

        if(response.data.Code === 0) {
          console.log("-login-返回登录成功:"+ JSON.stringify(response.data))

          //拼装登录确认confirm数据
          let data = {
            code: response.data.Body['Code'],
            token: response.data.Body['Token']
          }

          //返回token并登录
          this.api.postLoginComfirmAPI(data).then(response => {
                if(response.data.Code === 0) {

                  console.log("-confirm-返回token成功:" + JSON.stringify(response.data))
                  //存入Cookie
                  // this.$cookies.set('user_auth',response.data.Body.Token)

                  localStorage.setItem('userToken',response.data['Body'].Token)


                  //存入到store
                  // this.$store.dispatch('Post/authTokenAction',response.data.Body.Token)
                  //初始化用户基础信息
                  this.initUserInfo()
                  // this.$router.push('/tweet')
                }
              }
          ).catch(err => console.log(err))

        }else {
          //登录失败
          console.log("-login-返回登录失败:" + JSON.stringify(response.data))


          this.postForm.pw = this.oldEncodePw(this.valiForm.pw)

          //如果用新密码登录方式失败，用旧登录方式再试一次
          this.api.postSignuUpAPI(this.postForm).then(response => {

            if(response.data.Code === 0) {
              console.log("-login-返回登录成功:"+ JSON.stringify(response.data))

              //拼装登录确认confirm数据
              let data = {
                code: response.data.Body['Code'],
                token: response.data.Body['Token']
              }

              //返回token并登录
              this.api.postLoginComfirmAPI(data).then(response => {
                    if(response.data.Code === 0) {

                      console.log("-confirm-返回token成功:" + JSON.stringify(response.data))
                      //存入Cookie
                      // this.$cookies.set('user_auth',response.data.Body.Token)

                      localStorage.setItem('userToken',response.data['Body'].Token)

                      // 成功后，调用一次更新密码
                      this.updatePW()

                      //存入到store
                      // this.$store.dispatch('Post/authTokenAction',response.data.Body.Token)
                      //初始化用户基础信息
                      this.initUserInfo()
                      // this.$router.push('/tweet')
                    }
                  }
              ).catch(err => console.log(err))

            }else {
              //登录失败
              console.log("-login-返回登录失败:" + JSON.stringify(response.data))

              //隐藏加载状态
              this.overlay = false
              this.SignStatus = 'Login'

              // 清空用户名与密码
              this.valiForm.user = ''
              this.valiForm.pw = ''


            }
          }).catch(err => console.log(err))



        }
      }).catch(err => console.log(err))

    },



    //加密用户明文密码 MD5
    oldEncodePw: function (pw) {

      let md5 = crypto.createHash("sha256")
      md5.update(pw)

      return md5.digest('hex')
    },


    updatePW: function () {

      /*
      *  Pw: 旧加密方式的密码
      * Pwnew: 新加密方式的密码
      * */

      let params = {
        Username: this.valiForm.user,
        Pw: this.oldEncodePw(this.valiForm.pw),
        Pwnew: this.encodePw(this.valiForm.user,this.valiForm.pw)
      }

        this.api.postUpdatePwAPI(params).then(response => {

              if(response.data.Code === 0) {

                console.log("-login-更新密码成功:"+ JSON.stringify(response.data))


              }else{

               alert('更新失败')

              }

            }
        ).catch(err => console.log(err))
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
    /*getActiveDomain: function (token) {

      this.api.getDomainAPI(token).then(response => {
        if(response.data.Code === 0) {

          console.log("获取域名成功:" + JSON.stringify(response.data))

          if(response.data['Body']) {

            //计算本地时间与服务器时间差
            let diffTime =parseInt((Date.now()/1000).toString()) - response.data['Body'].TimeStamp

            //存储时间差
            localStorage.setItem('diffTime',diffTime.toString())

            //存储头像服务器路径
            localStorage.setItem('aUrl',response.data['Body'].Avatar)

            // alert(sessionStorage.getItem('diffTime'))

            //将可用域名保存在store中
            this.$store.dispatch("Post/helloDataAction",response.data['Body'])

            console.log(`本地时间：${parseInt((Date.now()/1000).toString())},服务器时间：${this.$store.getters['Post/helloDataState'].TimeStamp}`)


            // alert(JSON.stringify(this.$store.getters["Post/helloDataState"]))

          }
        }
      }).catch(err => console.log(err))
    },*/
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

            //将游客Token保存
            localStorage.setItem('userToken',response.data['Body'].Token)

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

            //储存 chatid
            // let chatid = Math.random().toString(36).slice(-8)
            // localStorage.setItem('chatid',chatid)

            //储存 group chatid
            // let group_chatid = Math.random().toString(36).slice(-8)
            // localStorage.setItem('group_chatid',group_chatid)

            //跳转到首页
            this.$router.push('/timeline')
          }
        }
      }).catch(err => console.log(err))
    }
  },
  mounted() {

    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)

    //从localStorege中获取记住密码状态
    let remPwd = localStorage.getItem('rememberPwd')

    if(remPwd && (remPwd === 'true')) {

      this.rememberPwd = true


      //从cookie中获取密码
      // let user_name  = this.$cookies.get('user_name')
      // let user_pwd = this.$cookies.get('user_pwd')

      let user_name = localStorage.getItem('user_name')
      let user_pwd = localStorage.getItem('user_pwd')

      this.valiForm.user = user_name
      this.valiForm.pw = user_pwd

    }else {
      this.rememberPwd = false
    }

  }
}
</script>
