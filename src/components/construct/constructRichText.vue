<template>
  <editor-content :editor="editor"/>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Placeholder from '@tiptap/extension-placeholder'
import History from '@tiptap/extension-history'
import CharacterCount from '@tiptap/extension-character-count'

// https://tiptap.dev/installation/vue3



export default {
  name: 'RichTextC',

  components: {
    EditorContent
  },

  data() {
    return {
      editor: null
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        Document,
        Paragraph.configure({
          HTMLAttributes: {
            class: 'text-gray-7=800 font-serif text-base leading-7 m-2',
            },
          }
        ),
        Text,
        Placeholder.configure({
          // Use a placeholder:
          placeholder: 'Type your personal statement here...',
        }),
        CharacterCount.configure({
          // Limit the character count:
          limit: 8000,
        }),
        History.configure({
          // Limit the history:
          depth: 100,
        }),
      ],

      onUpdate: () => {
        // HTML
        // this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        const editorObj = this.editor.getJSON();
        if (editorObj.content && this.modelValue.content)
        {  // this style causes problem with reactivity
          this.modelValue.content[0].type = editorObj.content[0].type;
          this.modelValue.content[0].text = editorObj.content[0].text;
          this.$emit('update:modelValue', this.modelValue)
        } else {
          this.$emit('update:modelValue', editorObj)
        }

        // JSON, get old and new value
        // const oldValue = this.modelValue
        // const newValue = this.editor.getJSON()
        // this.$emit('input', newValue, oldValue)

      }
    })
  },



  props: {
    modelValue: {
      // string or object
      type: Object,
      default: {
        "type": "text",
        "text": ""
      },
    },
  },

  computed: {
  },


  methods: {
    focusMe() {
      this.editor.commands.focus()
    },
  },



  watch: {
    modelValue: {
      handler(value, oldValue) {
        // HTML
        // const isSame = this.editor.getHTML() === value

        // JSON
        const editorValue = this.editor.getJSON()
        if (editorValue.content && value.content) {
          if (value.content[0].text != editorValue.content[0].text) {
            this.editor.commands.setContent(value, false);
          }
        } else {
          this.editor.commands.setContent(value, false);
        }
      }, deep: true,
    }
  },


  beforeUnmount() {
    this.editor.destroy()
  },
  
}
</script>

<style>
.ProseMirror {
  border: 0;
  padding-top: auto;
  padding-bottom: auto;
}

.ProseMirror:focus {
    outline: none !important;
}


/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>