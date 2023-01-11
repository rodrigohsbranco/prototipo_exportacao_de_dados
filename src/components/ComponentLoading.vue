<template>
	<div class="component-loading">
		<span :class="size">
			<i class="mr-2 fas fa-spin fa-sync-alt"></i>
			<span>{{text}}</span>
		</span>
	</div>
</template>

<script>
export default {
  name: "ComponentLoading",
  props: {
		size: {
			type: String
		},
		text: {
			default: 'Carregando',
			type: String
		}
	},
  mixins: [],
  components: {}, //components
  data() {
    return {};
  }, //data
  computed: {}, //computed
  methods: {},//methods
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
.component-loading
{
	display: inline-block;
	opacity: 0.5;
}

.component-loading .sm
{
	font-size: 0.875em;
}

.component-loading .lg
{
	font-size: 1.5em;
}
</style>
