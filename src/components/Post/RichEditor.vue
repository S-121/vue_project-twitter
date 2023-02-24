<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
  >
    <v-card tile>
      <v-toolbar
          flat
          dark
          color="info"
          max-height="60"
      >
        <v-btn
            icon
            dark
            @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Article Editor</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              @click="dialog = false"
          >
            Save
          </v-btn>
        </v-toolbar-items>
        <v-menu
            bottom
            right
            offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item

                @click="() => {}"
            >
              <v-list-item-title>Empty</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>

      <!-- Two-way Data-Binding -->
      <quillEditor
          style="height: 100%"
          ref="myQuillEditor"
          v-model="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
      />


    </v-card>
  </v-dialog>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: "RichEditor",
  components: {
    quillEditor
  },
  data () {
    return {
      content: '<h2>I am Example</h2><br><h2>I am Example</h2>',
      editorOption: {
        // Some Quill options...
      }
    }
  },
  props:{
    dialog: Boolean
  },
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  computed: {
    // editor() {
    //   return this.$refs.myQuillEditor.quill
    // }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  }
}
</script>

<style scoped>

</style>
