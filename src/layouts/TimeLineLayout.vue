<template>
  <div>

    <TweetSendArea   />

    <div class="line"></div>
<!--    Post布局-->

<!--     <div class="d-flex">

       <div class="flex-column">
         <div>avatar</div>

         <div>avatar</div>

       </div>

       <div class="flex-column">
         <div>title</div>

         <div>content</div>

         <div>action</div>
       </div>

     </div>-->


    <TimeLineCard ></TimeLineCard>
  </div>
</template>

<script>
import TweetSendArea from "@/components/Post/TweetSendArea"
import TimeLineCard from "@/components/Post/TimeLineCard"

export default {
  components: {TimeLineCard, TweetSendArea },
};
</script>

<style scoped>
.timeline-content {
  border-left:1px solid #EFEFEF !important;
  border-right:1px solid #EFEFEF !important;
}
.line {
  height: 16px;
  background-color: #f5f5f5;
}
</style>
