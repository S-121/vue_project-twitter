<template>
    <b-container fluid="" class="bv-example-row">
      <b-breadcrumb class="mybreadcrumb">
        <b-breadcrumb-item href="https://localhost:8080">
          <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" class="mybread"></b-icon><a class="mybread-text">{{$t('home')}}</a>
        </b-breadcrumb-item>
        <b-breadcrumb-item active><b>{{$t('tag')}}</b></b-breadcrumb-item>
      </b-breadcrumb>
      <div style="background-color:#FFFFFF">
        <b-nav class="home-tags">
          <b-nav-item  v-for="(value, key) in taglist" :key="key">
            <router-link :to="{name:'article.articlelist',params:{id:value.WpId,lang:'zh',role:'tag'}}">
              {{value.Tag}}
              <b-badge class="mybadge">
                {{value.Count}}
              </b-badge>
            </router-link>
          </b-nav-item>
        </b-nav>
      </div>
    </b-container>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'tagList',
        data () {
            return {
                taglist: {},
            }
        },
        methods: {
            gethottags:function (){
                let vm = this
                axios.get('/api/v1/gethottags?page=1&count=500&lang=zh',
                {headers:{"Access-Control-Allow-Origin":"*"}
                }).then(
                    function (response){
                        vm.taglist = response.data
                    }
                );
            }
        },
        mounted :function() {
            this.gethottags()
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
    .home-tags {
        color: #FFFFFF;
    }
    .badge-secondary {
        background-color: #5F8DBF;
    }
    .home-tags .nav-link {
        font-size: 14px;
        color: #004085;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .home-tags .nav-link a:link {
        font-size: 14px;
        color: #004085;
    }
    .home-tags .nav-link a:hover {
        font-weight: bold;
        color: #F7F7F7;
    }
    .mybadge {
        font-size: 10px;
        padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    }
</style>
