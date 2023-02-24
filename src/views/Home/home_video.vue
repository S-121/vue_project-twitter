<template>
    <div>
        <div id="live" class="mycontent">
            <b-card
                img-src="https://s3-us-west-1.amazonaws.com/aws.s3.bucket.demo/EgkCpWZVkAIElUH.jpg"
                img-alt=""
                img-top
                style="max-width: 20rem;"
                class="mylive">
                <b-card-text>
                    <b-container fluid="" class="bv-example-row">
                        <b-row>
                            <b-col cols="4" class="mycol2">
                                <b-avatar variant="info" class="live-avatar" src="https://s3-us-west-1.amazonaws.com/aws.s3.bucket.demo/VOG_LOGO2.png"></b-avatar>
                            </b-col>
                            <b-col>
                                <b-button variant="danger" class="button-onlive">{{$t('onlive')}}</b-button><br>
                                <label class="mylive-title">战友之家</label>
                            </b-col>
                        </b-row>
                    </b-container>

                </b-card-text>
            </b-card>
        </div>
        <div id="video" class="mycontent">
            <a href="/article/zh/cat/3" class="title-text"><b>{{$t('videos')}}</b></a>
            <b-card no-body class="mb-2 mycard"
                v-for="(value,index) in video" :key="index">
                <b-row no-gutters>
                    <b-col>
                        <a v-bind:href="getArticleHref(value.ArticleId)">
                            <b-card-img-lazy
                                v-bind:src="value.PicS"
                                alt="Image"
                                class="rounded-0">
                            </b-card-img-lazy>
                        </a>
                    </b-col>
                </b-row>
                <b-row no-gutters>
                    <b-col>
                        <b-card-body>
                            <b-card-text>
                                <a v-bind:href="getArticleHref(value.ArticleId)" class="mylink-title" v-html="value.Title"></a>
                                <a v-bind:href="getUserHref(value.AuthorId)" class="mylink-author">{{value.Author}}</a><br>
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
        name: 'home_video',
        data () {
            return {
                video: {},
            }
        },
        methods: {
            getvideo:function (){
                let vm = this
                axios.get('/api/v1/getacat?page=1&count=10&cats=3&lang=zh',
                {headers:{"Access-Control-Allow-Origin":"*"}
                }).then(
                    function (response){
                        vm.video = response.data[0].ACS
                    }
                );
            },
            getArticleHref:function(val){
                return '/article/zh/'+val
            },
            getUserHref:function(val) {
                return '/user/Article/zh/'+val
            },
        },
        mounted :function() {
            this.getvideo()
        }
    }

</script>

<style scoped>
    .mycol {
        padding-left:0.5rem;
        padding-right:0.5rem;
        padding-top:0.5rem;
    }
    .mycol2 {
        padding-left:0rem;
        padding-right:0rem;
        margin-bottom: 0rem;
    }
    .mylive {
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        border: 0px;
        border-radius: 0rem;
    }
    .live-avatar {
        width:55px;
        height:55px;
        margin:0.4rem;
    }
    .button-onlive {
        background-color: #C20017;
        font-size: 12px;
        padding: 0.2rem 0.5rem 0.2rem 0.5rem;
        margin-top: 0.6rem;
    }
    .mylive-title {
        font-size: 14px;
        font-weight: bold;
        color: #004085;
        padding: 0.2rem 0.1rem 0.2rem 0.1rem;
        margin-top: 0.1rem;
    }
    .title-text {
        margin-left: 1rem;
        font-size: 12px;
        color: #004085;
    }
    .mb-2.mycard {
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 0.5rem;
        border: 0px;
        border-radius: 0rem;
    }
    .card-body {
        padding: 0rem;
        padding-right: 0rem;
        padding-top: 0rem;
        padding-bottom: 0.5rem;
    }
    .card-img, .card-img-top {
        border-top-left-radius: 0rem;
        border-top-right-radius: 0rem;
    }
    .card-img, .card-img-left {
        border-top-left-radius: 0rem;
        border-top-right-radius: 0rem;
    }
    .mylink {
        font-size: 10px;
        color: #454545;
        line-height: 20px
    }
    .mylink-title {
        font-size: 12px;
        font-weight: bold;
        color: #004085;
        line-height: 18px;
        padding-top: 0.2rem;
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
        line-height: 20px;
    }
    .mycontent {
        background-color: #FFFFFF;
        padding-top: 0.2rem
    }
</style>
