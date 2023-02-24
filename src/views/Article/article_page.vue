<template>
  <b-container fluid="" class="bv-example-row">
    <b-row class="myrow">
      <b-col class="mycol">
        <div class="article-title" v-html="articleDetail.Title"></div>
      </b-col>
    </b-row>
    <b-row class="myrow">
      <b-col class="mycol-article">
        <div class="article-author" v-html="articleDetail.Author"></div>
      </b-col>
    </b-row>
    <b-row class="myrow">
      <b-col class="mycol-article">
        <div class="article-time">
          {{ getArticleTime(articleDetail.ArticleTime, articleDetail.PastTime) }}
        </div>
      </b-col>
    </b-row>
    <b-row class="myrow">
      <b-col class="mycol-article">
        <label class="article-excerpt" v-html="articleDetail.Excerpt"></label>
      </b-col>
    </b-row>
    <b-row class="myrow">
      <b-col class="mycol-article">
        <div class="article-body" v-html="articleDetail.Content">
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
    import axios from "axios";
    import headerHome from "@/views/Home/header_home"
    import headerTag from "./header_tag"
    import homeFooter from "@/views/Home/home_footer"
    import homeArticle from "./right_article"
    import homeVideo from "@/views/Home/home_video"
    export default {
        name: 'articlePage',
        components: {headerHome, headerTag, homeFooter, homeVideo, homeArticle},
        data () {
            return {
                articleDetail: {}
            }
        },
        methods: {
            readarticle:function (val){
                let vm = this
                axios.get('/api/v1/read/zh/'+val,
                {headers:{"Access-Control-Allow-Origin":"*"}
                }).then(
                    function (response){
                        console.log(response.data)
                        vm.articleDetail = response.data
                    }
                )
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
            }
        },
        mounted :function() {
            this.readarticle(this.$route.params.id)
        }
    }
</script>

<style scoped>
    .myrow {
        background-color: #FFFFFF
    }
    .mycol {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 0.5rem;
    }
    .mycol-article {
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 0.1rem;
    }
    .mb-2.mycard {
        border: 0px;
        border-radius: 0rem;
    }
    .article-title {
        font-size: 40px;
        font-weight: bold;
        color: #004085;
        line-height: 48px;
        text-align: center;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        background-color: #FFFFFF;
    }
    .article-author {
        font-size: 13px;
        font-weight: bold;
        color: #004085;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        padding-left: 0rem;
        padding-right: 0rem;
        background-color: #FFFFFF;
    }
    .article-time {
        font-size: 12px;
        color: #616161;
        font-style: italic;
        line-height: 16px;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        padding-left: 0rem;
        padding-right: 0rem;
        background-color: #FFFFFF;
    }
    .article-excerpt {
        font-size: 16px;
        color: #616161;
        font-style: italic;
        line-height: 24px;
        padding-top: 0.5rem;
        padding-bottom: 0rem;
        padding-left: 0rem;
        padding-right: 0rem;
        background-color: #FFFFFF;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .article-content {
        padding-top: 1rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #FFFFFF;
    }
    .article-body >>> img {
        max-width: 100%;
        height: auto;
    }
    .article-body >>> a {
        max-width: 100%;
        height: auto;
        color: #004085;
    }
    .article-body >>> a >>> img {
        max-width: 100%;
        height: auto;
    }
    .article-body >>> p {
        line-height: 32px;
        margin-top: 1em;
        font-size: 18px;
    }
    .article-body >>> .aligncenter {
        margin-left: auto;
        margin-right: auto;
        display: table;
        clear: both;
    }
    .article-body >>> .has-text-align-center {
        text-align: center;
    }
    .article-body >>> h2 {
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
</style>
