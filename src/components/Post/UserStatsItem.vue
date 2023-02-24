<template>
  <div>

    <v-divider ></v-divider>
    <v-list-item class="pl-0">
      <v-badge
        bordered
        bottom
        color="green accent-4"
        dot
        offset-x="25"
        offset-y="30"
        :value="userData.Online < 60 * 10"
      >
        <v-list-item-avatar size="50">
          <v-img
            v-if="userData.Avatar96"
            :src="userData.Avatar96 | getFullUrl"
          />
          <v-img v-else :src="dAvatar.url" />
        </v-list-item-avatar>
      </v-badge>
      <v-list-item-content class="align-self-start mt-3">
        <v-list-item-title class="text-no-wrap font-weight-bold">
          {{ userData.DisplayName }}
        </v-list-item-title>
        <v-list-item-subtitle class="grey--text lighten-1 mt-0">
          {{ userData.Description }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action class="mt-0">
        <!--START 关注/粉丝列表-->
<!--        <v-btn
          v-if="userState === state.followingState || userState === state.followerState"
          depressed
          small
          :outlined="!userData.IFollowed"
          :class="userData.IFollowed ? 'white&#45;&#45;text' : ''"
          style="text-transform: capitalize;"
          color="blue"
          @click.native="userData.Followed ? remFo(userData) : addFo(userData)"
        >
          {{userData.IFollowed ? 'Following': 'Follow'}}
        </v-btn>-->
        <!--END 关注/粉丝列表-->

        <!--START 拉黑列表-->
        <template v-if="userData.IBlockHim">
          <v-btn
              depressed
              small
              class="white--text"
              style="text-transform: capitalize;"
              color="secondary"
              @click.native="remBl(userData)"
          >
            Blocking
          </v-btn>
        </template>
        <template v-else>
          <template v-if="userData.IFollowed">

            <v-btn
                depressed
                small
                class="white--text"
                style="text-transform: capitalize;"
                color="blue"
                @click.native="remFo(userData)"
            >
               {{ $t('followed') }}
            </v-btn>
          </template>
          <template v-else>

            <v-btn
                depressed
                small
                outlined

                style="text-transform: capitalize;"
                color="blue"
                @click.native="addFo(userData)"
            >
                {{ $t('follow') }}
            </v-btn>

          </template>
        </template>

        <!--<v-btn
          v-if="userState === state.blockingState"
          depressed
          small
          :outlined="!userData.IBlockHim || !userData.IFollowed"
          :class="userData.IBlockHim ? 'white&#45;&#45;text' : ''"
          style="text-transform: capitalize;"
          :color="userData.IBlockHim ? 'secondary' : 'blue'"
          @click.native="userData.IBlockHim ? addFo(userData) : addBl(userData)"
        >
          {{userData.IBlockHim ? 'Blocking': !userData.IFollowed ? 'Following' : 'Follow'}}
        </v-btn>-->

        <!--END 拉黑列表-->
      </v-list-item-action>

    </v-list-item>
    <div class="user-stats-container">
      <div class="user-stats-item">
        <v-icon color="green">ri-user-line</v-icon>
        {{ userData.FollowBy }}
      </div>
      <div class="user-stats-item">
        <v-icon color="info">ri-user-follow-line</v-icon>
        {{ userData.FollowTo }}
      </div>
      <div class="user-stats-item">
        <v-icon color="pink">ri-indeterminate-circle-line</v-icon>
        {{ userData.Blocked }}
      </div>
      <div class="user-stats-item">
        <v-icon color="purple">ri-message-3-line</v-icon>
        {{ userData.TwCount }}
      </div>
    </div>
  </div>
</template>
<script>
import untils from "@/utils/untils";

export default {
  name: "UserStatsItem",
  components: {},
  data: () => ({
    dAvatar: {
      url: require("../../assets/users/user-d.png"),
      alt: "默认头像",
    },
    state: {
      followingState: 0,
      followerState: 1,
      blockingState: 2,
    },
  }),
  filters: {
    getFullUrl(url) {
      if (localStorage.getItem("aUrl")) {
        if (untils.isEmpty(url)) {
          return require("../../assets/users/user-d.png");
        } else {
          return localStorage.getItem("aUrl") + url;
        }
      } else {
        //重新登录
        this.$router.push("/sign-in");
      }
    },
  },
  props: {
    userData: Object,
    userState: Number,
    index: Number,
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    addFo: function (item) {
      this.$emit("addFollow", item, this.userState)
    },
    remFo: function (item) {
      this.$emit("removeFollow", item, this.userState)
    },
    addBl: function (item) {
      this.$emit("addBlock", item)
    },
    remBl: function (item) {
      this.$emit("removeBlock", item)
    },
  },
};
</script>

<style scoped>
.user-stats-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin-left: 100px;
  margin-bottom: 10px;
}
.user-stats-item {
  background-color: rgba(255, 255, 255, 0.8);
}

.follow {
 color: lightseagreen;

}

.following {

}

.block {

}

.blocking {

}
</style>
