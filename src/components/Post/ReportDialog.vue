<template>
  <v-dialog
      v-model="getDialogStatus"
      width="480"
      transition="dialog-transition"
  >
    <v-card>
      <v-container>

        <!--显示被引用的原推文内容，文字、多图片、音视频等-->
        <v-list>
          <v-list-item-group
              @change="selectItem($event)"
              color="pink"
          >
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <!--END 显示被引用的原推文内容，文字、多图片、音视频等-->

      </v-container>


      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="close"
        >
           {{ $t('cancel') }}
        </v-btn>
        <v-btn
            color="pink darken-1"
            text
            @click="reportPost"
        >
           {{ $t('reports') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "ReportDialog",
  data: function () {
    return {
      items: [
        {
          Rtype: '1',
          icon: 'ri-image-line',
          text: 'It contents sensitive photo, video, audio, etc.',
        },
        {
          Rtype: '2',
          icon: 'ri-alarm-warning-line',
          text: 'It is abusive or harmful to others.',
        },
      ],
      selectValue: 0,
    }
  },

  computed: {
    getDialogStatus: {
      get () {
        return this.$store.getters['Post/reportDialogState']
      },
      set (value) {
        this.$store.dispatch('Post/reportDialogAction',value)
      }
    },
  },
  methods: {
    selectItem: function (e) {
      this.selectValue = e + 1
    },
    close: function () {
      this.$store.dispatch('Post/reportDialogAction',false)
    },
    reportPost: function () {

      let source = this.$store.getters['Post/reportPostState']

      let data = {
        "T": source.Retw === '' ? source.T : source.Retw,
        "RType": this.selectValue.toString()
      }

      //关闭弹窗
      this.$store.dispatch('Post/reportDialogAction',false)

      this.api.postReportPostAPI(data).then(response => {

        if(response.data.Code === 0) {

          console.log("举报贴子成功，:"+JSON.stringify(response.data))

          // 显示举报成功信息
          this.$store.dispatch('Home/snackBarTextAction','Report success')
          this.$store.dispatch('Home/snackBarShowAction',true)

        }else{

          // 显示信息
          this.$store.dispatch('Home/snackBarTextAction',response.data['Msg'])
          this.$store.dispatch('Home/snackBarShowAction',true)

        }

      }).catch(err => console.log(err))

    }
  }

}
</script>

<style lang="scss"  scoped>

</style>
