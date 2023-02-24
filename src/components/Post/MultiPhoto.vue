<template>
  <v-sheet
    color="rgb(0,0,0,0)"
    max-width="520"
    class="p-1"
  >
    <v-row no-gutters >
      <template>
        <v-carousel
          :show-arrows="imageCount > 1"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="300"
        >
          <v-carousel-item
            v-for="(pic,index) in images"
            :key="index"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <img
              alt=""
              :src="pic"
              class="rounded overflow-hidden image-center"
              :width="qotS ? 474 : 500"
              height="300"
              style="display: relative !important;"
              @click.stop="imageClick(images, index)">

              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="blue lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>

            </img>
            <span class="image-counter" >{{ index + 1 }} / {{ images.length }}</span>
          </v-carousel-item>
        </v-carousel>
      </template>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: "MultiPhoto",
  props: {
    images: Array,
    qotS: Boolean
  },
  computed: {
    imageCount() {
      return this.images.length
    }
  },
  methods: {
    imageClick(images, index) {
      this.$emit("photoClick", this.images, index);
    }
  }
}
</script>

<style scoped>
.image-center {
  height: 100%;
  object-fit: cover;
}
.image-counter {
  color: white ;
  position: absolute;
  top: 10px;
  right: 30px;
  background-color: rgb(169,169,169, 0.5);
  padding: 0px 10px;
  border-radius: 50%;
}
</style>
