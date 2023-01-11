<template></template>
<script>
export default {
  name: "ViewRedirect",
  props: [],
  mixins: [],
  components: {}, //components
  data() {
    return {};
  }, //data
  computed: {}, //computed
  methods: {},//methods
  watch: {},//watch
  created() {},//created
  beforeMount() {
      this.$router.replace(this.$route.params.to);
  },//beforeMount
  mounted() {},//mounted
  destroyed() {},//destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>
<style></style>