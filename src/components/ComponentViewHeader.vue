<template>
  <div class="component-view-header" :style="{'background-color': webgca.themeColor, 'color': webgca.viewHeaderTextColor}">
    <b-container class="container-title-breadcrumbs">
      <b-row align-v="center" cols="1" cols-lg="2">
        <b-col>
					<h1>{{title}}</h1>
				</b-col>
        <b-col class="text-lg-right">
          <div class="mt-4 mt-lg-0 container-breadcrumbs">
            <template v-for="(item, index) in breadcrumbs">

              <router-link :key="'link-' + index" :to="item.url" v-if="getBreadcrumbItemIs(item) === 'router-link'">
                <i :class="['mr-1', item.icon]" v-if="item.icon"></i>
                <span>{{item.label}}</span>
              </router-link>
              <a :key="'link-' + index" :href="item.url" v-else-if="getBreadcrumbItemIs(item) === 'a'">
                <i :class="['mr-1', item.icon]" v-if="item.icon"></i>
                <span>{{item.label}}</span>
              </a>
              <span :key="'link-' + index" v-else>
                <i :class="['mr-1', item.icon]" v-if="item.icon"></i>
                <span>Exportação de Dados</span>
              </span>

              <span class="mx-2" :key="'separator-' + index" v-if="(index + 1) < breadcrumbs.length">/</span>

<!-- <component :key="'link-' + index" :href="getBreadcrumbItemIs(item) === 'a' ? item.url : false" :is="getBreadcrumbItemIs(item)" :to="getBreadcrumbItemIs(item) === 'router-link' ? item.url : false">
  <i :class="['mr-1', item.icon]" v-if="item.icon"></i>
  <span>{{item.label}}</span>
</component> -->

            </template>
          </div>
				</b-col>
      </b-row>
    </b-container>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "ComponentViewHeader",
  props: {
    breadcrumbs: {
      type: Array
    },
    description: {
      type: String
    },
    title: {
      type: String
    },
  },
  mixins: [],
  components: {}, //components
  data() {
    return {
      webgca: window.webgca,
    };
  }, //data
  computed: {}, //computed
  methods: {

    getBreadcrumbItemIs(item) {
      
      let ret = null;

      if(item.url) {

        if(item.url.indexOf('http') >= 0) {
          ret = 'a';
        }
        else if(item.url) {
          ret = 'router-link';
        }

      } else {
        ret = 'span';
      }

      return ret;

    }

  }, //methods
  watch: {}, //watch
  created() {}, //created
  mounted() {}, //mounted
  destroyed() {}, //destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>

<style scoped>
.component-view-header
{
  background-color: #e4e4e4;
  padding: 1em 0;
}


h1
{
	font-size: 1.75em;
  font-weight: 300;
}

.container-title-breadcrumbs
{
	
}

.container-view-description
{
  font-size: 0.9em;
}

.container-breadcrumbs
{
  font-size: 0.85em;
}

.container-breadcrumbs a
{
  color: inherit;
}
</style>