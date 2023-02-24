<template>
  <img class="profileImage" :class="size" :src="url" alt="avatar" />
</template>

<script>
export default {
  name: "Avatar",
  data: () => ({
    url:''
  }),
  props: {
    image: {
      type: String,
      default: require('../../assets/users/user-02.jpg')
    },
    size: {
      type: String,
      default: "normal"
    }
  },
  mounted() {
    this.initUserInfo()
  },
  methods: {
    //初始化用户头像等基础信息
    initUserInfo: function () {

      this.api.getUserInfoAPI().then(response => {
        if(response.data['Code'] === 0) {

          console.log("-userinfo-Avatar.vue-用户信息 :" + JSON.stringify(response.data))
          if(response.data['Body']) {

            //组装用户相关信息  无UserId
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
              User.UserA = require('@/assets/users/user-d.png')
            }

            data.User = User

            console.log('组装用户数据User：' + JSON.stringify(data))

            this.$store.dispatch('Post/msgJSONAction',data)

            this.url = this.$store.getters["Post/msgJSONState"].User.UserA
          }
        }
      }).catch(err => console.log(err))
    }
  },
};
</script>

<style lang="scss" scoped>
.profileImage {
  display: inline-block;
  position: relative;
  border-radius: 50%;
}
.normal {
  width: 40px;
  height: 40px;
}
.large {
  width: 50px;
  height: 50px;
}
.xlarge {
  width: 60px;
  height: 60px;
}
</style>
