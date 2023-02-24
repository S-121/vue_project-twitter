<template>
    <b-row class="row-header">
        <b-col class="mycol">
            <b-nav class="home-tags">
              <b-nav-item><label style="font-size:13px;color:#C20017"><b>{{$t('tags')}}</b></label></b-nav-item>
              <b-nav-item v-for="(value,key) in hottags" :key="key">
                <router-link class="nav-link" :to="{name:'article.articlelist',params:{id:value.WpId,lang:'zh',role:'tag'}}">
                  {{value.Tag}}
                </router-link>
              </b-nav-item>

              <b-nav-item style="font-size:13px;color:#004085" >
                <router-link class="nav-link" :to="{name:'article.tags'}">
                  <b>{{$t('more')}}...</b>
                </router-link>
              </b-nav-item>
            </b-nav>
        </b-col>
    </b-row>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'headerTag',
        data () {
            return {
                hottags: {},
            }
        },
        methods: {
            gethottags:function (){
                let vm = this
                axios.get('/api/v1/gethottags?page=1&count=10&lang=zh',
                {headers:{"Access-Control-Allow-Origin":"*"}
                }).then(
                    function (response){
                        vm.hottags = response.data
                    }
                );
            },
            getTagHref:function(val) {
                return '/article/tag/zh/'+val
            }
        },
        mounted :function() {
            this.gethottags()
        }
    }

</script>

<style scoped>
    .row-header {
        background-color:#FFFFFF;
        margin-top: 0.1rem;
    }
    .mycol {
        padding-left:0.5rem;
        padding-right:0.5rem;
        padding-top:0.3rem;
    }
    .home-tags .nav-link {
      font-size: 13px;
      color: #004085;
      padding-top: 0rem;
      padding-right: 0.3rem;
      padding-bottom: 0.1rem;
      padding-left: 0.3rem;
    }
    .home-tags .nav-link a:link {
        font-size: 13px;
        color: #004085;
    }
    .home-tags .nav-link a:hover {
        font-weight: bold;
        color: #004085;
    }
</style>
