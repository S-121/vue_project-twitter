<template>
	<div @click="onClick">
    <vue-pdf-app style="height: 500px;" :config="config" pdf="sample.pdf"></vue-pdf-app>
  </div>
</template>

<script>
import VuePdfApp from "vue-pdf-app";
// import this to use default icons for buttons
// import "vue-pdf-app/dist/icons/main.css";

export default {
  name: "PDFViewer",
  components: {
    VuePdfApp
  },
	data() {
    return {
      config: {
        sidebar: false,
        secondaryToolbar: false,
        toolbar: false,
        errorWrapper: true,
      },
    };
  },
  methods: {
    onClick: function() {
      this.$emit("pdfClick", "sample.pdf");
    }
  }
};
</script>