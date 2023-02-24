<template>
  <div class="videoplayer">

  <vue-plyr :options="plyr_options"  >
    <video  playsinline loop poster="https://uploadtest.vog.media/storage2/gnsqmv6dlhgn2jybzzdj8c1rmocfm02w.png">
      <source v-bind:src="VideoUrl"  />
    </video>
  </vue-plyr>
  </div>
</template>
<!--
-->

<script>
export default {
  name: "VideoPlayer",
  data () {
    return {
      plyr_options: {
        headers: {
          'Authorization': 'Bearer iaf87h8fhd8idfidf=='
        },
        controls:['play','progress', 'current-time', 'mute', 'volume', 'airplay', 'fullscreen']
      },
    }
  },
  props: {
    VideoUrl: String
  }
}
</script>

<style scoped>
.videoplayer .plyr--video {
  border-radius: 20px !important;
}

.plyr{
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  margin: 20px auto;
}

</style>
