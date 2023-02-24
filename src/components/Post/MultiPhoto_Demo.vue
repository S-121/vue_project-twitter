<template>
  <v-sheet
    color="rgb(0,0,0,0)"
    max-width="520"
>
    <v-row no-gutters >
      <template v-if="imageCount === 1" >
        <v-col
            v-for="(pic,index) in images"
            :key="index"
            class="d-flex child-flex pa-1"
            cols="12"
        >
          <v-img
              :src="pic"
              class="grey lighten-2 rounded"
              max-width="470"
              max-height="320"
          >
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
          </v-img>
        </v-col>

      </template>

      <template v-else-if="imageCount === 2">
        <v-col
            v-for="(pic,index) in images"
            :key="index"
            class="d-flex child-flex pa-1"
            cols="12"
        >
          <v-img
              :src="pic"
              aspect-ratio="1"
              class="grey lighten-2 rounded"
              max-height="650" max-width="650"
          >
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
          </v-img>
        </v-col>

      </template>

      <template v-else-if="imageCount === 3">
        <v-col
            v-for="(pic,index) in images"
            :key="index"
            class="d-flex child-flex pa-1"
            cols="12"
        >
          <v-img
              :src="pic"
              class="grey lighten-2 rounded"
              max-height="650" max-width="650"
          >
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
          </v-img>
        </v-col>

      </template>

      <template v-else>
        <v-col
            v-for="(pic,index) in images"
            :key="index"
            class="d-flex child-flex pt-1 pl-1"
            cols="6"
        >
          <v-img
              :src="pic"
              :class="roundedComp(index)"
              width="550"
          >
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
          </v-img>
        </v-col>
      </template>

    </v-row>

  </v-sheet>

</template>

<script>
export default {
  name: "MultiPhoto",
  data() {
    return {
      images: [
        "https://xxx/1.jpg",
        "https://xxx/2.jpg",
        "https://xxx/3.jpg",
        "https://xxx/4.jpg"
      ]
    }
  },
  computed: {
    imageCount() {
      return this.images.length
    },
    roundedComp() {
      return function (index) {
        if(index === 0) {
          return 'grey lighten-2 rounded-tl'
        }else if(index === 1) {
          return 'grey lighten-2 rounded-tr'
        }else if(index === 2) {
          return 'grey lighten-2 rounded-bl'
        }else {
          return 'grey lighten-2 rounded-br'
        }

      }
    }
  }
}
</script>

<style scoped>

</style>
