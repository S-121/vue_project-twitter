<template>
  <div>
    <headerTag></headerTag>
    <b-row style="background-color:#F7F7F7" cols-md="1">
      <b-col cols="12" xl="9" lg="10" style="background-color:#F7F7F7" class="mycol">
        <router-view :key="$route.fullPath"/>
      </b-col>
      <b-col cols="4" xl="3" lg="2" class="mycol d-none d-lg-block d-xl-block">
        <homeArticle></homeArticle>
      </b-col>
    </b-row>
    <!-- <homeFooter></homeFooter> -->
  </div>

</template>

<script>
import axios from "axios";
import headerTag from "@/views/Article/header_tag"
import homeArticle from "@/views/Article/right_article"
export default {
  name: 'ArticleHome',
  components: {headerTag, homeArticle},
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
  background-color: #F7F7F7;
}
.video-col {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.2rem;
  background-color: #FFFFFF;
}
.mycardimg {
  width: 100%;
  border-radius: 0px;
}
.card-body {
  padding-left: 0rem;
  padding-right: 0rem;
  padding-top: 0.2rem;
  padding-bottom: 0.5rem;
  background-color: #FFFFFF;
  font-size: 14px;
  color: #004085;
}
</style>
