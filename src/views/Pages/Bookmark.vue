<template>
  <div>{{bookmark}}</div>
</template>

<script>
import untils from "@/utils/untils";


export default {
  name: "Bookmark",
  data: () => ({
    bookmark: ''
  }),

  created() {

    // 获取bookmark
    this.api.getBookmarkAPI('').then(response => {
          if(response.data.Code === 0) {
            console.log("获取bookmark:"+ JSON.stringify(response.data))
            this.bookmark = response.data
          }
        }
    ).catch(err => console.log(err))

  },
  methods: {
    // 添加bookmark
    addBookmark: function (t){

      let data = {
        "T": t
      }

      this.api.postAddBookmarkAPI(data).then(response => {

            if(response.data.Code === 0) {

              console.log("添加bookmark:"+ JSON.stringify(response.data))

            }

          }
      ).catch(err => console.log(err))

    },

    // 删除bookmark
    remBookmark: function (t){

      let data = {
        "T": t
      }

      this.api.postRemBookmarkAPI(data).then(response => {

            if(response.data.Code === 0) {

              console.log("添加bookmark:"+ JSON.stringify(response.data))

            }

          }
      ).catch(err => console.log(err))

    }
  }

}

</script>

<style scoped>

</style>
