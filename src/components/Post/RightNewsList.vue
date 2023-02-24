<template>
  <v-card
      flat
      class="mx-2 mt-4"
      elevation="1"
  >
      <v-row dense>
        <v-list-item-title class="ml-4 mt-2 text-h6 font-weight-black">
          News
        </v-list-item-title>
        <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
        >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                    class="text-subtitle-2"
                    v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist + '12/3 09:58'"></v-card-subtitle>

              </div>

              <v-avatar
                  class="ma-3"
                  size="50"
                  rounded
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>

          <v-divider v-if="i !== items.length-1"/>

        </v-col>
      </v-row>
  </v-card>
</template>

<script>
export default {
name: "RightNewsList",
  data: () => ({
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: '【文雍漫谈】中共出台《个人信息保护法（草案）》，他们终于可以依法偷窥你了！',
        artist: '为子孙爱七哥农场 ',
      },
      {
        src: 'https://gnews-media-offload.s3.amazonaws.com/wp-content/uploads/2020/12/03042859/23.jpg',
        title: '民主捍卫者特朗普',
        artist: '疯狂的韭菜',
      },
      {
        src: 'https://gnews-media-offload.s3.amazonaws.com/wp-content/uploads/2020/12/03033438/PSX_20201203_142221.jpg',
        title: '笑 ：嘲笑、冷笑和笑不出来',
        artist: '文迹～见证神迹',
      },
      {
        src: 'https://gnews-media-offload.s3.amazonaws.com/wp-content/uploads/2020/11/01081922/%E6%AF%8F%E6%97%A5%E5%BF%AB%E6%8A%A5.png',
        title: 'CNN高层密谋逼川普下台会谈内容曝光《每日快报 — 2020.12.03》',
        artist: '杨眉剑出鞘，星空无垠',
      },
      {
        src: 'https://gnews-media-offload.s3.amazonaws.com/wp-content/uploads/2020/12/03013521/photo_2020-10-11_22-06-05.jpg',
        title: '香港要闻】聂德权：效忠属理所当然，“拒绝者会否被炒”还未定案',
        artist: '卡西欧 文粤',
      },
    ],
  }),
}
</script>

<style scoped>

</style>
