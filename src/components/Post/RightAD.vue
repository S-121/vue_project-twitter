<template>
  <v-card
      flat
      class="mx-2 mt-4"
      elevation="1"
  >
    <v-carousel
        height="250px"
        cycle
        hide-delimiters
        show-arrows-on-hover
        rounded
    >
      <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
          :src="slide.src"
          transition="fade-transition"
      >
        <span style="color: red;" >{{ i }} / {{ slides.length }}</span>
      </v-carousel-item>
    </v-carousel>
</v-card>
</template>

<script>
export default {
name: "RightAD",
  data () {
    return {
      slides: [
        {
          src: require('../../assets/img/1.jpg')
        },
        {
          src: require('../../assets/img/2.jpg')
        },
        {
          src: require('../../assets/img/3.jpg')
        }
      ],
    }
  },
}
</script>

<style scoped>

</style>
