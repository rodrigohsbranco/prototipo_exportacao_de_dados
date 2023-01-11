<template>
  <v-client-table
    class="component-data-table"
    :data="config.data"
    :columns="config.columns"
    :options="options"
  >
    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData"><slot :name="name" v-bind="slotData" /></template>
  </v-client-table>
</template>

<script>
export default {
  name: "ComponentDataTable",
  props: {
    config: {
      type: Object,
    },
  },
  mixins: [],
  components: {}, //components
  data() {
    return {

      defaultOptions: {
        sortIcon: {
          base:'fas', 
          up:'fa-sort-down', 
          down:'fa-sort-up', 
          is:'fa-sort' 
        },
        texts: {
          count: "Mostrando de {from} até {to} de {count} registros|{count} registros|Um registro",
          first: 'Primeiro',
          last: 'Último',
          filter: "Filtro:",
          filterPlaceholder: "Buscar por...",
          limit: "Registros:",
          page: "Página:",
          noResults: "Nenhum registro encontrado",
          filterBy: "Filtrar por {column}",
          loading: 'Carregando...',
          defaultOption: 'Selecione {column}',
          columns: 'Colunas'
        },
      }

    };
  }, //data
  computed: {

    options() {

      let ret = {};

      Object.assign(ret, this.defaultOptions);

      if(this.config.options) {
        Object.assign(ret, this.config.options);
      }

      return ret;

    }

  }, //computed
  methods: {}, //methods
  watch: {}, //watch
  created() {}, //created
  beforeMount() {}, //
  mounted() {}, //mounted
  destroyed() {}, //destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>

<style scoped>
.component-data-table
{
  font-size: 0.9em;
}

.component-data-table >>> table
{
  background-color: #fff;
}

.component-data-table >>> tr td:last-child
{
  white-space: nowrap;
}

.component-data-table >>> .VueTables__search-field
{
  display: flex;
}

.component-data-table >>> .VueTables__sortable
{
  cursor: pointer;
}

.component-data-table >>> .VueTables__search__input
{
  font-size: 0.925em;
}

.component-data-table >>> .VueTables__search-field label
{
  margin-right: 0.5em;
}

.component-data-table >>> .VueTables__sort-icon
{
  margin-top: 0.25em;
}
</style>
