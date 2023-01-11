<template>
    <b-modal centered no-close-on-backdrop no-close-on-esc ref="componentModal" v-bind="$attrs">
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData"><slot :name="name" v-bind="slotData" /></template>
    </b-modal>
</template>

<script>
export default {
	inheritAttrs: false,
  name: "ComponentModal",
  props: {},
  mixins: [],
  components: {}, //components
  data() {
    return {};
  }, //data
  computed: {}, //computed
  methods: {

      hide() {
          this.$refs['componentModal'].hide();
      },

      show() {
          this.$refs['componentModal'].show();
      },

      toggle() {
          this.$refs['componentModal'].toggle();
      },

  },//methods
  watch: {},//watch
  created() {},//created
  beforeMount() {},//
  mounted() {
      this.$refs['componentModal'].show();
  },//mounted
  destroyed() {},//destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>

<style scoped>
>>> .modal-body {
    max-height: 65vh;
    overflow: auto;
}
</style>
