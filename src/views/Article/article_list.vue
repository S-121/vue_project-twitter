<template>
  <div>
    <b-breadcrumb class="mybreadcrumb">
      <b-breadcrumb-item href="/">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" class="mybread"></b-icon><a class="mybread-text">{{$t('home')}}</a>
      </b-breadcrumb-item>
      <b-breadcrumb-item href="/article"><b>{{$t($route.params.role)}}</b></b-breadcrumb-item>
      <b-breadcrumb-item active><b>{{title}}</b></b-breadcrumb-item>
    </b-breadcrumb>
    <b-card no-body class="overflow-hidden"
            v-for="(value, index) in articlelist" :key="index">
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img-lazy
              v-bind:src="value.PicS"
              alt="Image"
              class="rounded-0">
          </b-card-img-lazy>
        </b-col>
        <b-col md="9">
          <b-card-body>
            <b-card-text>
              <router-link class="mylink-title" :to="{name:'article.articlepage',params:{id:value.ArticleId,lang:'zh'}}">
                {{value.Title}}
              </router-link>
              <router-link class="mylink-excerpt" :to="{name:'article.articlepage',params:{id:value.ArticleId,lang:'zh'}}">
                {{delHtmlTag(value.Excerpt)}}
              </router-link>
              <router-link class="mylink-author"  :to="{name:'article.usercontent',params:{id:value.AuthorId,lang:'zh'}}">
                {{value.Author}}
              </router-link>
              <a class="mylink-date">{{getArticleTime(value.ArticleTime, value.PastTime)}}</a>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'articleList',
        data () {
            return {
                articlelist: {},
                title: ""
            }
        },
        methods: {
            getlistbycat:function (role, id){
                let vm = this
                axios.get('/api/v1/getacat?page=1&count=10&lang=zh&cats='+id,
                {headers:{"Access-Control-Allow-Origin":"*"}
                }).then(
                    function (response){
                        vm.articlelist = response.data[0].ACS
                        vm.title = response.data[0].CatDesc
                    }
                )
            },
            getlistbytag:function (role, id){
                let vm = this
                axios.get('/api/v1/articlebytags?page=1&count=10&lang=zh&wpid='+id,
                {headers:{"Access-Control-Allow-Origin":"*"}
                }).then(
                    function (response){
                        vm.articlelist = response.data.ATS
                        vm.title = response.data.Tag
                    }
                )
            },
            delHtmlTag:function(str) {
                let s1 = str.replace(/<[^>]+>/g,"")
                return s1
            }
        },
      computed:{
        getArticleTime() {
          return function(t, tp) {
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
        }
      },
        mounted :function() {
            console.log(this.$route.params)
            if (this.$route.params.role === "cat") {
                this.getlistbycat(this.$route.params.role, this.$route.params.id)
            } else if (this.$route.params.role === "tag") {
                this.getlistbytag(this.$route.params.role, this.$route.params.id)
            }
        }
    }
</script>

<style scoped>
    .mycol {
        padding-left:0.5rem;
        padding-right:0.5rem;
        padding-top:0.5rem;
    }
    .mycol .breadcrumb.mybreadcrumb {
        margin-bottom: 0rem;
        border-radius: 0rem;
        background-color: #FFFFFF;
        font-size: 12px;
        color: #004085;
        padding-top: 0.8rem;
        padding-bottom: 0.6rem;
        padding-left: 1rem;
    }
    .mybread {
        font-weight: bold;
        color: #004085;
        margin-right: 0.6rem;
    }
    .mybread-text {
        font-weight: bold;
        color: #004085;
    }
    .card-body {
        padding-left: 0.5rem;
        padding-right: 0rem;
        padding-top: 0rem;
        padding-bottom: 0.5rem;
    }
    .no-gutters {
        margin-bottom: 0.7rem;
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
        color: #004085;
        line-height: 22px;
        padding-top: 0.3rem;
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
