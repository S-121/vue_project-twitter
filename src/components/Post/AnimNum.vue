<template>
  <div>
  {{ animatedNumber }}
<!--    <button @click="doNum()">加</button>-->
  </div>
</template>

<script>
import {gsap} from "gsap"
export default {
  name: "AnimNum",
  data: function () {
    return {
      number: 0,
      tweenedNumber: 0
    }
  },
  props: {
    num: Number
  },
  computed: {
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    num: function(newValue) {
      gsap.to(this.$data, { duration: 1.6, tweenedNumber: newValue });
    }
  },
  methods: {
    doNum:function () {
      this.num = 99
    }
  }
}
</script>

<style scoped>

</style>
