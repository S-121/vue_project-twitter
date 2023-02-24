<template>
  <VueFileAgent
      ref="vueFileAgent"
      :theme="'default'"
      :multiple="true"
      :deletable="true"
      :meta="false"
      :accept="'image/*,audio/*,video/*'"
      :resumable="true"
      :maxSize="'40MB'"
      :maxFiles="fileCount"
      :helpText="'媒体'"
      :uploadWithCredentials="false"
      :errorText="{
                type: '只能上传图片格式',
                size: '文件最大20M',
                }"
      @select="filesSelected($event)"
      @beforedelete="onBeforeDelete($event)"
      @delete="fileDeleted($event)"
      v-model="fileRecords"
      :thumbnailSize="560"

  >

    <template v-slot:before-inner >
      <template v-for="icon in icons">
        <v-btn
            :color="icon.bgcolor"
            fab
            depressed
            x-small
            class="ma-1"
        >
          <v-icon size="20" :color="icon.color">
            {{ icon.name }}
          </v-icon>
        </v-btn>
      </template>


    </template>


    <!--<template v-slot:before-outer >
      before-outer
    </template>-->

    <template v-slot:file-preview-new>
      preview
    </template >

    <!--          <template v-slot:file-preview >file-preview</template>-->

    <!--          <template v-slot:file-preview-before >file-preview-before</template>-->

    <!--          <template v-slot:file-preview-after >file-preview-after</template>-->

    <!--          <template v-slot:file-preview-new >file-preview-new</template>-->

    <!--          <template v-slot:sortable-handle >sortable-handle</template>-->

    <!--          <template v-slot:file-preview-new>

                <v-btn
                    color="blue lighten-5"
                    fab
                    depressed
                    small
                    class="ma-2"
                    key="new"
                >
                  <v-icon size="24" color="green">
                    ri-image-add-line
                  </v-icon>
                </v-btn>

              </template >-->

    <template v-slot:file-preview="slotProps">
      <!--            <v-img :src="slotProps.fileRecord.urlResized" ></v-img>-->
    </template>

  </VueFileAgent>
</template>

<script>
export default {
  name: "CustomFileAgent"
}
</script>

<style scoped>

</style>
