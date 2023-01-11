<template>
	<div class="component-parent-identifier">
		<div class="text-center" v-if="requesting.load">
			<ComponentLoading />
		</div>
		<div v-else>
			<div class="container-title" v-if="title">{{title}}</div>
			<div class="container-description" v-if="description">{{description}}</div>
		</div>
		<hr>
	</div>
</template>

<script>
import ComponentLoading from "@/components/ComponentLoading";

export default {
  name: "ComponentParentIdentifierForms",
  props: {
		descriptionKey: {
			required: true,
			type: String
		},
		endpoint: {
			required: true,
			type: String
		},
		titleKey: {
			required: true,
			type: String
		},
	},
  mixins: [],
  components: {
		ComponentLoading,
	}, //components
  data() {
    return {

			description: null,

			title: null,

			requesting: {
				load: false,
			},

		};
  }, //data
  computed: {}, //computed
  methods: {

    load() {

			const endpoint = this.endpoint;

      this.requesting.load = true;

      this.axios
        .get(endpoint)
        .then(
          response => {
            
						const data = response.data;
						
						const titleKey = this.titleKey;
						const descriptionKey = this.descriptionKey;

						this.title = data[titleKey];

						this.description = data[descriptionKey];

						this.$emit('load', data);

          }
        )
        .finally(
          () => {
            this.requesting.load = false;
          }
        );

    },

	},//methods
  watch: {},//watch
  created() {},//created
  beforeMount() {
		this.load();
	},//
  mounted() {},//mounted
  destroyed() {},//destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>

<style scoped>
.component-parent-identifier {
	border-radius: 0.25rem;
	font-size: 0.85em;
	opacity: 0.55;
}

.container-title {
	font-weight: bold;
	margin-bottom: 0.25em;
}

.container-description {
	font-size: 0.9em;
}
</style>
