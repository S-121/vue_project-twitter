<template>
    <div>
        <b-list-group class="mylistgroup">
            <router-link :to="{name:'video.videohome'}">
              <b-list-group-item  :class="active == 100000? 'active': ''" @click="setactive(100000)">
                <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" class="myicon"></b-icon>
                视频首页
              </b-list-group-item>
            </router-link>

            <router-link  :to="{name:'video.channel',params:{id:'1'}}" >
                <b-list-group-item  :class="active == 100001? 'active': ''" @click="setactive(100001)">
                    <b-icon icon="film" scale="1.25" shift-v="1.25" aria-hidden="true" class="myicon"></b-icon>
                    频道1
                </b-list-group-item>
            </router-link>

          <router-link  :to="{name:'video.channel',params:{id:'2'}}" >
            <b-list-group-item  :class="active == 100002? 'active': ''" @click="setactive(100002)">
                <b-icon icon="film" scale="1.25" shift-v="1.25" aria-hidden="true" class="myicon"></b-icon>
                频道2
            </b-list-group-item>
          </router-link>

          <router-link  :to="{name:'video.channel',params:{id:'3'}}" >
            <b-list-group-item  :class="active == 3? 'active': ''" @click="setactive(3)">
                <b-icon icon="film" scale="1.25" shift-v="1.25" aria-hidden="true" class="myicon"></b-icon>
                频道3
            </b-list-group-item>
          </router-link>
        </b-list-group>
      <router-link to="/article/cat/zh/2" tag="a" >
        <label class="title-text"><b>我的收藏</b></label>
      </router-link>

        <b-list-group class="mylistgroup">
            <b-list-group-item :class="active == 0? 'active': ''" @click="setactive(0)">
                <b-icon icon="film" scale="1.25" shift-v="1.25" aria-hidden="true" class="myicon"></b-icon>
                频道1
            </b-list-group-item>
            <b-list-group-item :class="active == 1? 'active': ''" @click="setactive(1)">
                <b-icon icon="film" scale="1.25" shift-v="1.25" aria-hidden="true" class="myicon"></b-icon>
                频道2
            </b-list-group-item>
            <b-list-group-item :class="active == 2? 'active': ''" @click="setactive(2)">
                <b-icon icon="film" scale="1.25" shift-v="1.25" aria-hidden="true" class="myicon"></b-icon>
                频道3
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'videoMenu',
        data () {
            return {
                active: 100000,
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
            },
            setactive(index) {
                console.log(index)
                this.active = index;
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
    .list-group-item.active {
        z-index: 2;
        background-color: #4a739e;
        color: #fff;
    }
    .list-group-item.active .myicon {
        color: #FFFFFF;
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
</style>
