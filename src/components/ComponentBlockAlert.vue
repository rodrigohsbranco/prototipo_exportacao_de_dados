<template>
    <b-alert class="component-block-alert" :show="internalShow" :variant="type" dismissible><slot name="message"></slot></b-alert>
</template>

<script>
export default {
  name: "ComponentBlockAlert",
  props: {
    dismissDelay: {
      default: 10000,
      type: Number
    },
		type: {
			type: String
		},
    show: {
      default: false,
      type: Boolean
    }
	},
  mixins: [],
  components: {}, //components
  data() {
    return {
      internalShow: false
    };
  }, //data
  computed: {}, //computed
  methods: {},//methods
  watch: {

    show(value, oldValue) {

      if(value) {

        this.internalShow = true;

      }

    }

  },//watch
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
.component-block-alert
{

}
</style>
