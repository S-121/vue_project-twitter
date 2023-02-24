<template>

  <v-card flat outlined rounded class="mt-2"  v-if="show" >

    <div  class="d-flex flex-no-wrap justify-space-between" >
      <v-img  class="rounded-tl rounded-bl" max-width="120" height="120" :src="previewData.Image" :lazy-src="require('../../assets/img/url.jpg')"></v-img>

      <div>
        <v-card-title class="text-subtitle-2 pt-6">
          {{ previewData.Title }}
        </v-card-title>
        <v-card-subtitle style="width: 22rem;" class="py-1 text-truncate">
          {{ previewData.Description }}
        </v-card-subtitle>
        <v-card-subtitle  style="width: 22rem;" class="pt-0 pb-1 text-truncate text-no-wrap">
          <v-icon small class="mr-1">ri-link-m</v-icon>
          {{ previewData.Url }}
        </v-card-subtitle>
      </div>

      <v-card-actions>

        <v-btn
            color="grey"
            fab
            depressed
            small
            icon
            @click="closePreviewCard"
        >
          <v-icon >ri-close-line</v-icon>
        </v-btn>
      </v-card-actions>

    </div>
  </v-card>

</template>

<script>
export default {
  name: "UrlPreviewCard",
  data() {
    return {

    }
  },

  props: {
    show:Boolean,
    previewData: Object
  },

  computed:{

  },

  methods: {
    closePreviewCard: function () {
      //更改父组件中的props值
      this.$emit('update:show',false)
    },
  },


}
</script>

<style scoped>

</style>
