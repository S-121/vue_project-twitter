<template>
<div>
  <!--START 用户名称-->
  <span  class="font-weight-bold mr-1" >
    {{source.User['UserD']}} <!--   {{source.T}}-->
  </span>
  <!--END 用户名称-->

  <span class="mr-1 font-weight-bold  text--lighten-1 grey--text" >
    <label class="">·</label>
  </span>

  <!--START 发送时间-->
  <span class="font-weight-normal text-subtitle-2  grey--text">
    <label>{{ postTime(source) | formatDate }}</label>
  </span>
  <!--END 发送时间-->

  <!--START 右侧操作按钮-->
  <RightMoreBtn :source="source" />
  <!--END  右侧操作按钮-->

  <!--START  显示所在群组-->
  <span v-if="(source.Group.Uid > 0 && $store.getters['Post/currentUserGroupState'].IsGroup < 1) || (!$store.getters['Post/currentUserGroupState'] && source.Group.User)"
        @click.stop="getGroupTimeline(source.Group)"
        class="float-right body-2 grey--text text--darken-4 font-weight-black mr-16" >

    <v-btn small icon color="orange">
      <v-icon small >ri-group-fill</v-icon>
    </v-btn>

    <v-hover>
      <template v-slot:default="{ hover }">

        <v-avatar size="24"  left>
          <v-img  :src="source.Group.UserA | getFullUrl" />

          <v-fade-transition>
            <v-overlay
                v-if="hover"
                absolute
                color="#036358"
            >
              <v-btn
                  icon
                  color="white"
              >
                <v-icon x-small>ri-eye-line</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>

        </v-avatar>
      </template>
    </v-hover>

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
    source: Object
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
  }
}
</script>

<style scoped>

</style>
