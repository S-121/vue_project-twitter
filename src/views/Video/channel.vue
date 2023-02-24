<template>
    <div>
        <b-container fluid="" class="bv-example-row">
            <b-row cols="1" class="video-live" cols-lg="1" cols-xl="2">
                <b-col class="video-live">
                    <b-aspect :aspect="aspect">
                        <iframe title="【細品魔戒】你能找到的最清晰系统的《魔戒》解说大合集(1/18)"
                        width=100% height=100% src="https://www.youtube.com/embed/YpgNdtdOcTU?feature=oembed"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </b-aspect>
                </b-col>
                <b-col class="video-live">
                        <iframe class="frame-live-text"
                            srcdoc="直播节目预告直播节目预告直播节目预告直播节目预告直播节目预告直播节目预告直播节目预告直播节目预告直播节目预告直播节目预告直播节目预告直播节目预告
                            直播节目预告<br>
                            直播节目预告<br>
                            直播节目预告<br>
                            直播节目预告<br>
                            直播节目预告<br>
                            ">
                        </iframe>
                </b-col>
            </b-row>
            <b-row cols="1" class="video-row" cols-xs="1" cols-sm="2" cols-md="3" cols-lg="3" cols-xl="4">
                <b-col v-for="(value,index) in video" :key="index" class="video-col">
                    <b-card no-body class="mb-2 mycard">
                        <b-row no-gutters>
                            <b-col>
                                <a v-bind:href="getArticleHref(value.ArticleId)">
                                    <b-card-img-lazy
                                        v-bind:src="value.PicS"
                                        alt="Image"
                                        class="mycardimg">
                                    </b-card-img-lazy>
                                </a>
                            </b-col>
                        </b-row>
                        <b-row no-gutters>
                            <b-col>
                                <b-card-body>
                                    <b-card-text>
                                        <a v-bind:href="getArticleHref(value.ArticleId)" class="mylink-title" v-html="value.Title"></a><br>
                                        <a v-bind:href="getUserHref(value.AuthorId)" class="mylink-author">{{value.Author}}</a>
                                    </b-card-text>
                                </b-card-body>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'chanel',
        data () {
            return {
                video: {},
                aspect: '16:9'
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
            delHtmlTag:function(str) {
                let s1 = str.replace(/<[^>]+>/g,"")
                return s1
            }
        },
        mounted :function() {
            this.getvideo("Article", 3)
        }
    }

</script>

<style scoped>
    .mycol {
        padding-top: 0.5rem;
        padding-left: 0rem;
        padding-right: 0rem;
        padding-bottom: 0.5rem;
    }
    .list-group.mylistgroup {
        padding-bottom: 0.5rem;
        border-bottom-style:solid;
        border-color:#F7F7F7;
        border-width:2px;
    }
    .list-group-item {
        font-size: 14px;
        padding: 0.6rem 1rem 0.6rem 1rem;
        border: none;
        background-color: #FFFFFF;
    }
    .list-group-item:first-child {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    .list-group-item:last-child {
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 0px;
    }
    .list-group-item:hover {
        background-color: #F7F7F7;
    }
    .list-group-item-action:hover .list-group-item-action:focus {
        background-color: #FFFFFF;
    }
    .myicon {
        color: #004085;
        margin-right: 0.6rem;
    }
    .title-text {
        margin-left: 1rem;
        font-size: 12px;
        color: #004085;
    }
    .mb-2.mycard {
        margin-top: 0.5rem;
        border: 0px;
        border-radius: 0rem;
    }
    .video-row {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    .video-col {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    .mycardimg {
        width: 100%;
    }
    .card-body {
        padding-left: 0rem;
        padding-right: 0rem;
        padding-top: 0.2rem;
        padding-bottom: 0.5rem;
        background-color: #F7F7F7;
        font-size: 14px;
        color: #004085;
    }
    .frame-live-text {
        width: 100%;
        height: 100%;
        border-width: 0px;
        border-style: inset;
        border-color: initial;
        border-image: initial;
    }


</style>
