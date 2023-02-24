<template>
  <v-card class="mx-auto reports" tile flat>
    <v-toolbar
        light
        flat
    >
      <v-btn icon @click="backHistory">
      <v-icon color="info" >ri-arrow-left-line</v-icon>
      </v-btn>

      <v-toolbar-title class="pl-0 font-weight-black">{{ $t('reports') }}</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-toolbar>
    <v-divider ></v-divider>
    <ReportList :items="items" />
    <v-pagination
      v-model="page"
      :length="paginationLength"
      color="info"
      class="py-4"
    ></v-pagination>
  </v-card>
</template>
<script>
import ReportList from "@/components/Post/ReportList";
export default {
  name: "Reports",
  components: { ReportList },
  data() {
    return {
      items: [],
      page: 1,
    }
  },
  mounted() {
    this.api.getUserInfoAPI().then(({data}) => {
      this.api
        .getReportList({
          uid: undefined, //data['Body'].UserId,
          count: 20,
        })
        .then((res) => {
          if (!res.data["Code"]) {
            this.items = res.data["Body"];
            console.log(this.items, '++++++++++')
          } else {
          }
        });
    })
  },
  watch: {},
  computed: {
    paginationLength() {
      return this.items.length < 10 ? 1 : this.items.length / 10
    }
  },
  methods: {
    backHistory() {
      this.$router.go(-1);
    },
  },
};
</script>
