<template>
    <b-row class="row-header">
        <b-col coll="2" class="mycol">
            <img src="https://s3-us-west-1.amazonaws.com/aws.s3.bucket.demo/VOG_LOGO-small.png" width="75px" style="margin-top:0px;margin-left:5px;text-align:center">
        </b-col>
        <b-col cols="3" class="mycol">
            <b-list-group horizontal>
              <router-link to="/">
                <b-list-group-item class="home-menu"  :class="active == 100000? 'active': ''" @click="setactive(100000)">{{$t('home')}}</b-list-group-item>
              </router-link>
              <router-link :to="{name: 'home.articlehome'}">
                <b-list-group-item class="home-menu"  :class="active == 100001? 'active': ''" @click="setactive(100001)">{{$t('article')}}</b-list-group-item>
              </router-link>
              <router-link :to="{name: 'home.videohome'}">
                <b-list-group-item class="home-menu" :class="active == 100002? 'active': ''" @click="setactive(100002)">{{$t('video')}}</b-list-group-item>
              </router-link>
              <router-link :to="{name: 'home.tweet'}">
                <b-list-group-item class="home-menu" :class="active == 100003? 'active': ''" @click="setactive(100003)">Tweet</b-list-group-item>
              </router-link>
            </b-list-group>
        </b-col>
        <b-col cols="7" class="mycol">
            <a :key="locale?'en':'cn'" @click="changeLang()" style="padding-top:0.3rem;padding-left:2rem">{{lang}}</a>
        </b-col>
    </b-row>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'headerHome',
        data () {
            return {
                active: 100000,
                locale: 'cn',
                lang: 'EN'
            }
        },
        methods: {
            changeLang () {
                // 增加传入语言
                if(this.locale=='cn'){
                    this.lang='EN';
                    this.locale='en';
                }else{
                    this.lang='中文';
                    this.locale='cn';
                }
                this.$i18n.locale = this.locale;
                localStorage.setItem('lang', this.locale);
            },
            setactive(index) {
                console.log(index)
                this.active = index;
            }
        }
    }
</script>

<style scoped>
    .row-header {
        background-color:#E5E5E5;
        height:40px
    }
    .mycol {
        padding-left:0.5rem;
        padding-right:0.5rem;
        padding-top:0.3rem;
    }
    .home-menu {
        color: #004085;
        background-color: transparent;
        border: 0px;
        text-align: center;
        padding: 0.2rem;
    }
    .list-group-item.active {
        color: #004085;
        font-weight: bold;
        background-color: transparent;
    }
    .list-group-item-action:hover {
        background-color: transparent;
        font-weight: bold;
        color: #004085;
    }
</style>
