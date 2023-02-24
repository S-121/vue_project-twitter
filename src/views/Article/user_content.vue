<template>
        <b-container fluid="" class="bv-example-row">
          <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image" class="user-bannar"></b-img>
          <div class="user-icon-back"></div>
          <b-img v-bind:src="userinfo.Avatar96" alt="Image" fluid class="user-icon"></b-img>
          <div style="background-color:#FFFFFF">
            <label class="user-displayname">{{ userinfo.Displayname }}</label>
            <label class="user-name">@{{ userinfo.Wpname }}</label>
            <b-button variant="success" class="button1">关注</b-button><br>
            <label class="user-desc">
              海外最大、最可信赖的中文媒体，在全球35个国家设分支机构<br>
              油管: http://youtube.com/c/djynews │电报: http://t.me/djynews │Parler: @dajiyuan│爆料: +1 201-614-3989 talkdjy@gmail.com │支持我们: http://donate.epochtimes.com
            </label>
          </div>
          <b-card no-body class="overflow-hidden"
                  v-for="(value, index) in articlelist" :key="index">
            <b-row no-gutters>
              <b-col md="3">
                <b-card-img-lazy v-bind:src="value.PicS" alt="Image" class="rounded-0"></b-card-img-lazy>
              </b-col>
              <b-col md="9">
                <b-card-body>
                  <b-card-text>
                    <a v-bind:href="getArticleHref(value.ArticleId)" class="mylink-title" v-html="value.Title"></a>
                    <a v-bind:href="getArticleHref(value.ArticleId)" class="mylink-excerpt" v-html="value.Excerpt"></a>
                    <a v-bind:href="getUserHref(value.AuthorId)" class="mylink-author" v-html="value.Author"></a>
                    <label class="mylink-date">{{getArticleTime(value.ArticleTime, value.PastTime)}}</label>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-container>
</template>

<script>
    import axios from "axios";
    import headerHome from "@/views/Home/header_home"
    import headerTag from "./header_tag"
    import homeFooter from "@/views/Home/home_footer"
    import homeArticle from "./right_article"
    export default {
        name: 'userContent',
        components: {headerHome, headerTag, homeFooter, homeArticle},
        data () {
            return {
                articlelist: {},
                userinfo: {}
            }
        },
        methods: {
            getlistbyuser:function (val){
                let vm = this
                axios.get('/api/v1/getauser?page=1&count=10&lang=zh&user='+val,
                {headers:{"Access-Control-Allow-Origin":"*"}
                }).then(
                    function (response){
                        vm.articlelist = response.data
                    }
                )
            },
            getUser:function (val){
                let vm = this
                axios.get('/api/v1/getuser?ids='+val,
                {headers:{"Access-Control-Allow-Origin":"*"}
                }).then(
                    function (response){
                        vm.userinfo = response.data[0]
                    }
                )
            },
            getArticleHref:function(val){
                return '/Article/zh/'+val
            },
            getUserHref:function(val) {
                return '/user/Article/zh/'+val
            },
            getArticleTime:function(t, tp) {
                if (tp > 86400) {
                    var newDate = new Date();
                    newDate.setTime(t * 1000);
                    return newDate.toLocaleString("chinese", { hour12: false }).substring(5,15);
                } else {
                    if (tp < 60) {
                        return "<1min"
                    } else if (tp < 3600) {
                        let tp2 = tp / 60
                        return tp2+"mins"
                    } else {
                        let tp2 = tp / 3600
                        return tp2+"hours"
                    }
                }
            },
            delHtmlTag(str) {
                let s1 = str.replace(/<[^>]+>/g,"")
                return s1
            }
        },
        mounted :function() {
          this.getlistbyuser(this.$route.params.id)
        }
    }
</script>

<style scoped>
    .mycol {
        padding-left:0.5rem;
        padding-right:0.5rem;
        padding-top:0.5rem;
    }
    .user-bannar {
        z-index: 1;
        height: 180px;
        width: 100%;
    }
    .user-icon-back {
        z-index: 2;
        position: absolute;
        left: 35px;
        top: 135px;
        width: 106px;
        height: 106px;
        display: flex;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: #FFFFFF;
    }
    .user-icon {
        z-index: 3;
        position: absolute;
        left: 40px;
        top: 140px;
        width: 96px;
        height: 96px;
        display: flex;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .user-displayname {
        font-size: 16px;
        font-weight: bold;
        padding-left: 10rem;
        padding-top: 0.5rem;
    }
    .user-name {
        font-size: 13px;
        font-weight: normal;
        color: #454545;
        padding-left: 0.5rem;
        padding-top: 0.5rem;
    }
    .button1 {
        float:right;
        margin-right: 1rem;
        margin-top: 0.5rem;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .user-desc {
        font-size: 13px;
        font-weight: normal;
        color: #616161;
        padding-left: 1rem;
        padding-top: 1rem;
        padding-right: 1rem;
        padding-bottom: 0.5rem;
    }
    .card-body {
        padding-left: 0.5rem;
        padding-right: 0rem;
        padding-top: 0rem;
        padding-bottom: 0.5rem;
    }
    .no-gutters {
        margin-bottom: 0.5rem;
    }
    .overflow-hidden {
        border: 0px;
        border-radius: 0rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .mylink {
        font-size: 10px;
        color: #454545;
        line-height: 20px
    }
    .mylink-title {
        font-size: 16px;
        font-weight: bold;
        color: #004085;
        line-height: 26px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mylink-excerpt {
        font-size: 14px;
        color: #616161;
        font-style: normal;
        line-height: 22px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mylink-author {
      font-size: 12px;
      font-weight: bold;
      color: #616161;
      line-height: 20px;
    }
    .mylink-date {
        font-size: 12px;
        color: #616161;
        line-height: 20px;
        padding-left: 2rem;
        font-style: italic;
    }
    .mycontent {
        background-color: #FFFFFF;
        padding-top: 0.2rem
    }
</style>
