<template>
    <ComponentModal id="component-modal-confirm" ref="componentModalConfirm" v-if="config.show">
      <template #modal-header="{}">
        <h5>{{title}}</h5>
        <b-btn-close :disabled="config.requesting === true" v-if="showClose" @click="buttonCloseClick" />
      </template>
      <template #default="{}">
          {{text}}
      </template>
      <template #modal-footer="{ ok, cancel, hide }">
        <b-button :disabled="config.requesting === true" class="px-4" variant="success" @click="buttonYesClick">Sim</b-button>
        <b-button :disabled="config.requesting === true" class="px-4" variant="danger" @click="buttonNoClick">Não</b-button>
      </template>
    </ComponentModal>
</template>

<script>
import ComponentModal from '@/components/ComponentModal'

export default {
  name: "ComponentModalConfirm",
  props: {
      text: {
          required: true,
          type: String,
      },
      title: {
          required: true,
          type: String,
      },
      config: {
          required: true,
          type: Object,
      },
      showClose: {
        default: false,
        type: Boolean,
      }
  },
  mixins: [],
  components: {
    ComponentModal,
  }, //components
  data() {
    return {};
  }, //data
  computed: {}, //computed
  methods: {

      //Events

      buttonCloseClick(e) {
          this.$emit('close');
      },

      buttonYesClick(e) {
          this.$emit('yes', this.config.data);
      },

      buttonNoClick(e) {
          this.$emit('no', this.config.data);
      },

  },//methods
  watch: {},//watch
  created() {},//created
  beforeMount() {},//
  mounted() {},//mounted
  destroyed() {},//destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>

<style scoped>

</style>
