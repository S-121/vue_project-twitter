<template>
<v-sheet
      v-if="loading"
      class="pa-3"
  >
    <v-skeleton-loader
        class="mx-auto"
        type="list-item-avatar-three-line, divider"
    ></v-skeleton-loader>

    <v-skeleton-loader
        class="mx-auto  mt-4"
        type=" divider,list-item-avatar-three-line, divider"
    ></v-skeleton-loader>

    <v-skeleton-loader
        class="mx-auto  mt-4"
        type=" divider,list-item-avatar-three-line, divider"
    ></v-skeleton-loader>

    <v-skeleton-loader
        class="mx-auto  mt-4"
        type=" divider,list-item-avatar-three-line, divider"
    ></v-skeleton-loader>

    <v-skeleton-loader
        class="mx-auto  mt-4"
        type=" divider,list-item-avatar-three-line, divider"
    ></v-skeleton-loader>

    <v-skeleton-loader
        class="mx-auto  mt-4"
        type=" divider,list-item-avatar-three-line, divider"
    ></v-skeleton-loader>

    <v-skeleton-loader
        class="mx-auto  mt-4"
        type=" divider,list-item-avatar-three-line, divider"
    ></v-skeleton-loader>

  </v-sheet>
</template>

<script>
export default {
  name: "UserSkeletonLoader",
  props: {
    loading: Boolean
  }
}
</script>

<style scoped>

</style>
