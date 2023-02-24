<template>
  <p class="text-justify mr-2 mb-2" style="word-break: break-word"  @click.stop="getDetailPost(source)">
    {{ source.Tw }}
  </p>
</template>

<script>
export default {
  name: "PostTextItem",
  props: {
    source: Object
  },
  methods: {
    //查看详细推文list
    getDetailPost: function (source) {
      //调用公用方法
      this.api.getDetailPost(source)

    },
  }
}
</script>

<style scoped>

</style>
