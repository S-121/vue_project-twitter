<template>
  <v-card>
    <v-list-item-content class="justify-center">
      <div class="mx-auto text-center">
        <v-avatar
            color="brown"
        >
          <v-img  :src="source.Group.UserA | getFullUrl" />
        </v-avatar>
        <h3>{{ source.Group.User }}</h3>
        <p class="text-caption mt-1">
          xxxxx.elon@gmail.com
        </p>
        <v-divider class="my-3"></v-divider>

      </div>
    </v-list-item-content>
  </v-card>
</template>

<script>
export default {
  name: "PostGroupHoverCard",
  props: {
    source: Object
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
