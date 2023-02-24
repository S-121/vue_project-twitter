<template>
  <vuetify-audio
    v-bind:file="AudioUrl"
    color="info"
    class="transparent audiofrom"
    :flat="true"
  >
  </vuetify-audio>
</template>

<script>
import VuetifyAudio from 'vuetify-audio'
export default {
  name: "AudioPlayer",
  components: {VuetifyAudio},
  props: {
    AudioUrl: String
  }
}
</script>

<style scoped>

</style>
