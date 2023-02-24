<template>
<div>
  <!--START 用户名称-->
  <span  class="font-weight-bold" @click.stop="getUserCenter(source)">

    <!--START 父亲贴-->
    <template v-if="this.patS">
      {{source.User['UserD']}}
    </template>
    <!--END 父亲贴-->

    <!--START 普通贴-->
    <template v-else>

      <template v-if="source.Retw === ''">
      {{source.User['UserD']}}
      </template>
      <template v-else>
        {{source.ReUser['UserD']}}
      </template>

    </template>
    <!--END 普通贴-->



  </span>
  <!--END 用户名称-->

  <span class="mx-1 font-weight-bold  text--lighten-1 grey--text" >
    <label class="">・</label>
  </span>

  <!--START 发送时间-->
  <span class="mr-16 font-weight-normal text-subtitle-2  grey--text">
    <label>{{ postTime(source) | formatDate }}</label>
  </span>
  <!--END 发送时间-->

  <!--START 右侧操作按钮-->
  <RightMoreBtn :source="source" :patS="this.patS"/>
  <!--END  右侧操作按钮-->
<!--{{this.$store.getters["Post/currentUserGroupState"]}}-->

  <!--START  显示所在群组-->
  <span
      v-if="(source.Group.Uid > 0 && $store.getters['Post/currentUserGroupState'].IsGroup < 1) || (!$store.getters['Post/currentUserGroupState'] && source.Group.User)"
      @click.stop="getGroupTimeline(source.Group)"
      class="body-2 grey--text text--darken-4 font-weight-black mr-16 pr-16 float-right" >

    <v-chip
        class=""
        small
        outlined
        style="cursor:pointer !important;"
    >
      <v-btn
          dark
          depressed
          color="orange"
          min-width="18"
          max-width="18"
          max-height="18"
          class="pa-0"
      >
            <v-icon size="12"  color="white">ri-group-fill</v-icon>
    </v-btn>

      <v-avatar >
        <v-img  max-height="18" max-width="18"  :src="source.Group.UserA | getFullUrl" />
      </v-avatar>

    </v-chip>


    <!--    <v-menu
            open-on-hover
            bottom
            min-width="200px"
            rounded
            offset-y
        >
            <template v-slot:activator="{ on }">
              <v-avatar size="24"  left v-on="on">
                <v-img  :src="source.Group.UserA | getFullUrl" />
              </v-avatar>
            </template>

          <PostGroupHoverCard :source="source"  />

          </v-menu>-->


  </span>

  <!--END 显示所在群组-->


</div>
</template>

<script>
import RightMoreBtn from "@/components/Post/RightMoreBtn";
import PostGroupHoverCard from "@/components/Post/PostGroupHoverCard";
export default {
  name: "PostNameTimeItem",
  components: {PostGroupHoverCard, RightMoreBtn},
  data() {
    return {
      mSecond: 1,

    };
  },
  props: {
    source: Object,
    patS: Boolean
  },
  computed: {
    postTime() {

      let _this = this
      return function (source) {
        if(source.T) {
          //计算时间差
          return  Number(Number(source.T.substring(0,10)) + Number(localStorage.getItem('diffTime')) + Number(_this.mSecond))
        }
      }
    },
  },
  methods: {
    getGroupTimeline: function (user) {

      //统一JSON中的字符串
      let User = {
        'IsGroup': 1,
        'UserId': user.Uid,
        'Username': user.UserD
      }

      this.api.getGroupTimeline(User)

    },

    //进入所选用户中心
    getUserCenter: function (source) {

      //跳转到用户中心页面
      this.$router.push({
        path: "/usercenter",
        query: {
          name:  this.patS ? source.User.UserD : (source.Retw === '' ? source.User.UserD : source.ReUser.UserD)
        }
      })

    },
  }
}
</script>

<style scoped>

</style>
