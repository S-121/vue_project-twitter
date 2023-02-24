<template>

  <v-card flat outlined rounded class="mt-2" >

      <div  class="d-flex flex-no-wrap justify-space-between" @click.stop = 'linkUrl(pData.Url)'>
        <v-img  class="rounded-tl rounded-bl" max-width="120" height="120" :src="pData.Image" :lazy-src="require('../../assets/img/url.jpg')"></v-img>
        <div>
          <v-card-title class="text-subtitle-2 pt-4">
            {{ pData.Title }}
          </v-card-title>
          <v-card-subtitle style="width: 22rem;" class="py-1 text-truncate">
            {{ pData.Description }}
          </v-card-subtitle>
          <v-card-subtitle  style="width: 22rem;" class="pt-0 pb-1 text-truncate text-no-wrap">
            <v-icon small class="mr-1">ri-link-m</v-icon>
            {{ pData.Url }}
          </v-card-subtitle>
        </div>
      </div>

  </v-card>

</template>

<script>
export default {
  name: "TimeLineUrlPreviewCard",
  data() {
    return {

    }
  },

  props: {
    previewData: String
  },

  computed:{
    pData: function () {
      return JSON.parse(this.previewData)
    }

  },

  methods:{
    linkUrl: function (url) {

      window.open(url, "_blank")

    }
  }


}
</script>

<style scoped>

</style>
