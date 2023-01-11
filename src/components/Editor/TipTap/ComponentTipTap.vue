<template>
  <div class="component-tip-tap">
    <div class="container-toolbar" v-if="editor">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <i class="fas fa-bold"></i>
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <i class="fas fa-italic"></i>
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        <i class="fas fa-strikethrough"></i>
      </button>
      <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('strike') }">
        <i class="fas fa-underline"></i>
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        <i class="fas fa-list-ul"></i>
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        <i class="fas fa-list-ol"></i>
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        <i class="fas fa-quote-right"></i>
      </button>
      <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }" v-if="!editor.isActive('link')">
        <i class="fas fa-link"></i>
      </button>
      <button @click="editor.chain().focus().unsetLink().run()" v-if="editor.isActive('link')">
        <i class="fas fa-unlink"></i>
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        —
      </button>
      <button @click="editor.chain().focus().undo().run()">
        <i class="fas fa-undo"></i>
      </button>
      <button @click="editor.chain().focus().redo().run()">
        <i class="fas fa-redo"></i>
      </button>
      <span class="form-inline">
        <b-dropdown text="Título" variant="light">
          <b-dropdown-item @click="dropdownTitleItemClick($event, 1)">Grande</b-dropdown-item>
          <b-dropdown-item @click="dropdownTitleItemClick($event, 3)">Médio</b-dropdown-item>
          <b-dropdown-item @click="dropdownTitleItemClick($event, 5)">Pequeno</b-dropdown-item>
        </b-dropdown>
      </span>
      <span class="form-inline" v-if="showVariables">
        <b-dropdown text="Campos" variant="light">
          <b-dropdown-item :key="`variable_${index}`" @click="dropdownVariablesItemClick($event, item)" v-for="(item, index) in variables">{{item.label}}</b-dropdown-item>
        </b-dropdown>
      </span>
    </div>
    <editor-content class="editor-content" :editor="editor" ref="editorContent" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link'

export default {
  name: "ComponentTipTap",
  props: {
    content: {
      type: String,
    },
    id: {
      type: String,
    },
    showVariables: {
      default: true,
      type: Boolean,
    },
    variables: {
      type: Array,
    }
  },
  mixins: [],
  components: {
    EditorContent,
  }, //components
  data() {
    return {
      editor: null,
    };
  }, //data
  computed: {}, //computed
  methods: {

    setLink() {
      const url = window.prompt('URL')

      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },

    //Events

    dropdownTitleItemClick(e, level) {
      const editor = this.editor;
      editor.chain().focus().toggleHeading({ level }).run();
    },

    dropdownVariablesItemClick(e, item) {

      const editor = this.editor;

      let content = null;

      if(typeof item === 'object') {

        const {type, value} = item;
        
        content = type === 'link' ? `<a href="${value}">${value}</a>` : `${value}`;

      } else {
        content = item;
      }

      editor
        .chain()
        .focus()
        .insertContent(content)
        .run()

    },
  }, //methods
  watch: {

    content(value, oldValue) {
      
        const content = this.content;
        const editor = this.editor;

        if (content) {
          editor.commands.setContent(content);
        }

    }

  }, //watch
  created() {}, //created
  beforeMount() {}, //beforeMount
  mounted() {

    // editor-content - Poe foco no conteudo editavel ao clicar no container
    this.$refs.editorContent.$el.addEventListener(
      'click',
      (e) => {
        e.currentTarget.querySelector('div[contenteditable="true"]').focus();
      },
    );

    this.editor = new Editor({
      content: "",
      extensions: [
        StarterKit, 
        Link.configure({
          openOnClick: false,
        }),
        Underline
      ],
      onCreate: () => {
        const content = this.content;
        const editor = this.editor;

        if (content) {
          editor.commands.setContent(content);
        }
      },
      onUpdate: () => {
        const editor = this.editor;
        const id = this.id;
        const html = editor.getHTML();
        const json = editor.getJSON();

        this.$emit("contentChange", {
          editor,
          html,
          id,
          json,
        });
      },
    });
  }, //mounted
  beforeDestroy() {
    this.editor.destroy();
  }, //beforeDestroy
  destroyed() {}, //destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>
<style lang="scss" scoped>
.component-tip-tap {
  border: 1px solid #ced4da;
  border-radius: 0.25rem 0.25rem 0 0.25rem;
  .container-toolbar {
    border-bottom: 1px solid #ced4da;
    padding: 0.25em 0;
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      background-color: transparent;
      border: none;
      font-weight: bold;
      height: 2.75em;
      width: 2.75em;
    }
    .form-inline {
      display: inline-flex;
    }
  }
  input {
    border: none;
  }
  .editor-content {
    max-height: 24em;
    min-height: 10em;
    overflow-y: scroll;
    padding: 1em;
    ::v-deep .ProseMirror {
      outline: none;
    }
  }
}
</style>