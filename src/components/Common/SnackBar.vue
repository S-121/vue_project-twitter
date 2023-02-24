<template>
  <v-snackbar
      v-model="snackBar"
      color="green"
  >
    {{ $store.getters['Home/snackBarTextState'] }}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="close"
      >
        {{ $t('close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  data: () => ({
  }),
  computed: {
    snackBar: {
      get () {
        return this.$store.getters['Home/snackBarShowState']
      },
      set (value) {
        this.$store.dispatch('Home/snackBarShowAction',value)
      }
    },
  },
  methods: {
    close: function () {
      this.$store.dispatch('Home/snackBarShowAction',false)
    }
  }
}
</script>

<style scoped>

</style>
