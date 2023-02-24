<template>
  <b-row style="background-color:#F7F7F7" cols-md="1">
    <b-col cols="2" xl="2" lg="2" class="mycol d-none d-lg-block d-xl-block">
      <homeVideo></homeVideo>
    </b-col>
    <b-col cols="12" xl="6" lg="8" class="mycol">
      <tweetSendArea />
      <div class="line"></div>
      <Tweet />
    </b-col>
    <b-col cols="4" xl="4" lg="2" class="mycol d-none d-lg-block d-xl-block">
      <homeArticle></homeArticle>
    </b-col>
  </b-row>
  <!-- <homeFooter></homeFooter> -->
</template>

<script>
import axios from "axios";
import headerHome from "@/views/Home/header_home"
// import homeFooter from "./home_footer"
import homeVideo from "@/views/Home/home_video"
import homeArticle from "@/views/Article/right_article"
import TweetSendArea from "@/components/Post/TweetSendArea";
import Tweet from "@/views/Pages/Pages";
import HomeHeader from "@/views/Home/Shared/HomeHeader";
export default {
  name: 'home',
  components: {headerHome, homeVideo, homeArticle, Tweet, TweetSendArea},
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.mycol {
  padding-left:0.5rem;
  padding-right:0.5rem;
  padding-top:0.5rem;
}
.line {
  margin-top: auto;
  width: 100%;
  height: 10px;
  background: #F7F7F7;
}
</style>
