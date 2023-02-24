<template>
    <div>
        <div id="advisor" class="mycontent">
            <b-carousel
                id="carousel-1"
                :interval="30000"
                fade
                indicators
                img-width="1024"
                img-height="480"
                class="home-carousel"
                >
                <a href="http://localhost:8080">
                    <b-carousel-slide img-src="https://pbs.twimg.com/media/ErclkyDW4AIR59F?format=jpg&name=medium"></b-carousel-slide>
                </a>
                <a href="http://localhost:8080">
                    <b-carousel-slide img-src="https://pbs.twimg.com/media/Erfpu80VcAAnHvv?format=jpg&name=360x360"></b-carousel-slide>
                </a>
                <a href="http://localhost:8080">
                    <b-carousel-slide img-src="https://pbs.twimg.com/media/Erfpu84UcAMsfBx?format=jpg&name=900x900"></b-carousel-slide>
                </a>
                <a href="http://localhost:8080">
                    <b-carousel-slide>
                        <template #img>
                        <img
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="480"
                            href="http://localhost:8080"
                            src="https://pbs.twimg.com/card_img/1346512350422044672/zgbG95tU?format=jpg&name=small"
                            alt="image slot"
                        >
                        </template>
                    </b-carousel-slide>
                </a>
            </b-carousel>

        </div>
        <!-- <div style="height:1rem;background-color:#F7F7F7"></div> -->
        <div id="article" class="mycontent">
          <router-link :to="{name:'article.articlelist',params:{id:'2',lang:'zh',role:'cat'}}" >
            <b class="title-text">{{$t('articles')}}</b>
          </router-link>
            <b-card no-body class="overflow-hidden"
                v-for="(value, index) in articles" :key="index">
                <b-row no-gutters cols-lg="1" cols-xl="2">
                  <b-col>
                      <router-link tag="a" :to="{name:'article.articlepage',params:{id:value.ArticleId,lang:'zh'}}">
                      <b-card-img-lazy
                          v-bind:src="value.PicS"
                          alt="Image"
                          class="rounded-0">
                      </b-card-img-lazy>
                      </router-link>
                  </b-col>
                  <b-col>
                    <b-card-body>
                      <b-card-text>
                        <router-link tag="a" :to="{name:'article.articlepage',params:{id:value.ArticleId,lang:'zh'}}">
                          <a class="mylink-title" v-html="value.Title"></a>
                        </router-link>

                        <router-link tag="a" :to="{name:'article.usercontent',params:{id:value.AuthorId,lang:'zh',role:'article'}}">
                          <a class="mylink-author">{{value.Author}}&nbsp;</a>
                        </router-link>
                        <label class="mylink-date">{{getArticleTime(value.ArticleTime, value.PastTime)}}</label>
                      </b-card-text>
                    </b-card-body>
                  </b-col>


                </b-row>
            </b-card>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'RightArticle',
        data () {
            return {
                articles: {},
                aspect: '16:9'
            }
        },
        methods: {
            getArticles:function (){
                let vm = this
                axios.get('/api/v1/getacat?page=1&count=10&cats=3&lang=zh',
                {headers:{"Access-Control-Allow-Origin":"*"}
                }).then(
                    function (response){
                        vm.articles = response.data[0].ACS
                    }
                );
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
            this.getArticles()
        }
    }

</script>

<style scoped>
    .mycol {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 0.5rem;
        background-color: #FFFFFF;
    }
    .home-carousel {
        padding:0.5rem 1rem 0.5rem 1rem;
        background-color:#FFFFFF;
        padding-bottom: 1rem;
    }
    .title-text {
        margin-left: 1rem;
        font-size: 12px;
        color: #004085;
    }
    .card-body {
        padding-left: 0.4rem;
        padding-right: 0.3rem;
        padding-top: 0rem;
        padding-bottom: 0rem;
    }
    .card-img .card-img-top {
        border-top-left-radius: 0rem;
        border-top-right-radius: 0rem;
    }
    .overflow-hidden {
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 0.5rem;
        border: 0px;
        border-radius: 0rem;
    }
    .card-img, .card-img-left {
        border-top-left-radius: 0rem;
        border-top-right-radius: 0rem;
    }
    .mylink-title {
      font-size: 12px;
      font-weight: bold;
      color: #004085;
      line-height: 20px;
      margin-bottom: 0.3rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .mylink-author {
      font-size: 12px;
      font-weight: bold;
      color: #616161;
      line-height: 12px;
      margin-bottom: 0.3rem;
    }
    .mylink-date {
      font-size: 12px;
      color: #616161;
      font-style: italic;
      margin-bottom: 0.3rem;
    }
    .mycontent {
        background-color: #FFFFFF;
        padding-top: 0.2rem;
    }
</style>
