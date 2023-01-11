<template>
  <section id="view-list-forms">
    <ComponentViewHeader
      class="mb-4"
      :breadcrumbs="viewHeader.breadcrumbs"
      title="Exportação de Dados"
    />

    <b-container>
      <b-row>
        <b-col>
          <ComponentBlockAlert
            :content="blockAlertView.content"
            :dismiss-auto="true"
            :type="blockAlertView.type"
            :show="blockAlertView.show"
          />
        </b-col>
      </b-row>
    </b-container>

    <div class="my-4 text-center" v-if="requesting.tableFormsData">
      <ComponentLoading size="lg" />
    </div>
    <b-container v-else>
      <b-row>
        <b-col>
          <b-card class="mb-4">
            <div>
              <h5>Exportação de Dados</h5>
            </div>

            <hr />

            <b-row>
              <b-col cols="12" lg="1">
                <label>Grupo:</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  v-model="selected"
                  :options="options"
                ></b-form-select>
              </b-col>
            </b-row>

            <hr />
            <div v-if="selected === 'formularios'">
              <b-row>
                <b-col cols="12" lg="1">
                  <label>Tipo:</label>
                </b-col>
                <b-col cols="5">
                  <b-form-select
                    v-model="selectedTipo"
                    :options="optionsTipo"
                  ></b-form-select>
                </b-col>
              </b-row>

              <b-row v-if="selectedTipo === 'coleta'" class="mt-3">
                <b-col cols="12" lg="1">
                  <label>Status:</label>
                </b-col>
                <b-col cols="5">
                  <b-form-select
                    v-model="selectedColeta"
                    :options="optionsColeta"
                  ></b-form-select>
                </b-col>
              </b-row>

              <hr />

              <div>
                <h5>Filtros</h5>
              </div>
              <hr />
              <b-col cols="5">
                <b-form-select
                  v-model="selectedFiltro"
                  :options="optionsFiltro"
                  @change="adicionarFiltro"
                ></b-form-select>
              </b-col>

              <b-row v-for="(name, id) in values" :key="id" class="mt-3 ml-0">
                <b-col cols="12" lg="3">
                  <b-card
                    style="height: calc(1.5em + 0.75rem + 2px);"
                    bg-variant="secondary"
                    class="text-center"
                    ><div class="text-light my-n3">{{ name }}</div></b-card
                  >
                </b-col>
                <b-col cols="5">
                  <b-form-input v-model="textFiltro[id]"></b-form-input>
                </b-col>
              </b-row>
              <div class="d-flex justify-content-end mt-3">
                <b-button
                  class="mr-2"
                  v-if="mostraTabela"
                  variant="outline-primary"
                  ><b-icon icon="download"></b-icon
                ></b-button>
                <b-button @click="mostraTabela = true" variant="primary"
                  >Gerar</b-button
                >
              </div>
            </div>

            <b-row class="mt-4" v-if="mostraTabela">
              <b-col>
                <b-card>
                  <b-table
                    small
                    responsive
                    :items="items"
                    :fields="fields"
                  ></b-table>
                </b-card>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import WebGcaSpaFormularios from "@/webgca-spa-rh-formularios";
const webGcaSpaFormularios = WebGcaSpaFormularios;

import MixinViewDefault from "@/mixins/MixinViewDefault.js";

import ComponentBlockAlert from "@/components/ComponentBlockAlert";
import ComponentDataTable from "@/components/ComponentDataTable";
import ComponentLoading from "@/components/ComponentLoading";
import ComponentModal from "@/components/ComponentModal";
import ComponentModalConfirm from "@/components/ComponentModalConfirm";
import ComponentViewHeader from "@/components/ComponentViewHeader";

export default {
  name: "ViewFormsList",
  props: [],
  mixins: [MixinViewDefault],
  components: {
    ComponentBlockAlert,
    ComponentDataTable,
    ComponentLoading,
    ComponentModal,
    ComponentModalConfirm,
    ComponentViewHeader,
  }, //components
  data() {
    return {
      mostraTabela: false,
      selected: null,
      options: [
        { value: null, text: "Selecione um Grupo" },
        { value: "formularios", text: "Formulários" },
        { value: "escalas", text: "Escalas" },
        { value: "convocacoes", text: "Convocações" },
        { value: "cobrancas", text: "Cobranças" },
      ],

      selectedTipo: null,
      optionsTipo: [
        { value: null, text: "Selecione um Tipo" },
        { value: "coleta", text: "Possue Coleta" },
        { value: "semColeta", text: "Não possue Coleta" },
        { value: "secoes", text: "Possue Seções" },
        { value: "questoes", text: "Possue Questões" },
      ],

      selectedColeta: null,
      optionsColeta: [
        { value: null, text: "Selecione o Status da Coleta" },
        { value: "criada", text: "Criada" },
        { value: "iniciada", text: "Iniciada" },
        { value: "pausada", text: "Pausada" },
        { value: "finalizada", text: "Finalizada" },
        { value: "cancelada", text: "Cancelada" },
      ],

      selectedFiltro: null,
      optionsFiltro: [
        { value: null, text: "+ Adicionar Filtro" },
        { value: "nome", text: "Nome" },
        { value: "secao", text: "Seção" },
        { value: "questao", text: "Questão" },
        { value: "escala", text: "Escala" },
      ],

      values: [],
      textFiltro: [],

      fields: ["nome", "descricao", "imagem", "secoes", "questões", "escalas"],
      items: [
        {
          nome: "Formulário de coleta exemplo 1",
          descricao: "Descrição do Formulário 1",
          imagem: "ícone ou endereço da imagem",
          secoes: "Seção 1",
          questões: "Texto Exemplo questão 1",
          escalas: "Não possui escala",
        },
        {
          nome: "Formulário de coleta exemplo 2",
          descricao: "Descrição do Formulário 2",
          imagem: "ícone ou endereço da imagem",
          secoes: "Seção 2",
          questões: "Texto Exemplo questão 2",
          escalas: "Exemplo escala 1",
        },
        {
          nome: "Formulário de coleta exemplo 3",
          descricao: "Descrição do Formulário 3",
          imagem: "ícone ou endereço da imagem",
          secoes: "Seção 3",
          questões: "Texto Exemplo questão 3",
          escalas: "Não possui escala",
        },
        {
          nome: "Formulário de coleta exemplo 4",
          descricao: "Descrição do Formulário 4",
          imagem: "ícone ou endereço da imagem",
          secoes: "Seção 4",
          questões: "Texto Exemplo questão 4",
          escalas: "Exemplo escala 2",
        },
        {
          nome: "Formulário de coleta exemplo 5",
          descricao: "Descrição do Formulário 5",
          imagem: "ícone ou endereço da imagem",
          secoes: "Seção 5",
          questões: "Texto Exemplo questão 5",
          escalas: "Exemplo escala 3",
        },
      ],

      blockAlertView: {
        content: null,
        type: null,
        show: false,
      },

      modalConfirmCopyParticipants: {
        data: null,
        requesting: false,
        show: false,
      },

      modalDeleteConfirm: {
        data: null,
        show: false,
      },

      modalFormEntireView: {
        requesting: false,
        selectedForm: null,
        show: false,
      },

      requesting: {
        tableFormsData: false,
      },

      scales: [],

      tableForms: {
        columns: ["titulo", "descricao", "acoes"],
        data: [],
        options: {
          columnsClasses: {
            acoes: "text-center",
          },
          filterable: ["titulo", "descricao"],
          headings: {
            titulo: "Título",
            descricao: "Descrição",
            acoes: "Ações",
          },
          sortable: ["titulo", "descricao"],
        },
      },
    };
  }, //data
  computed: {
    viewHeader() {
      let breadcrumbs = [
        {
          icon: "fas fa-home",
          label: "Home",
          url: webgca.clientUrl,
        },
        {
          icon: null,
          label: "Lista de Formulários",
          url: null,
        },
      ];

      let ret = {};

      ret.breadcrumbs = breadcrumbs;

      return ret;
    },
  }, //computed
  methods: {
    adicionarFiltro() {
      if (this.selectedFiltro != null) {
        this.values.push(this.selectedFiltro);
      }

      console.log("VALUES:", this.values);
    },

    // capturarDados() {
    //   let url = "http://localhost:3000/formulario";

    //   this.axios.get(url).then((res) => {
    //     console.log("RESPOSTA:", res.data);
    //     this.mostraTabela = true;
    //     this.items = res.data;
    //   });
    // },

    copyForm({ data, copyParticipants }) {
      const slug = data.slug;
      const userId = webgca.userId;

      let url = `/formulario/${slug}/copy/?us=${userId}`;

      if (copyParticipants) {
        url += `&cp=1`;
      }

      this.modalConfirmCopyParticipants.requesting = true;

      this.axios
        .get(url)
        .then((response) => {
          this.loadFormsList();
        })
        .catch((error) => {
          this.blockAlertView.show = true;
          this.blockAlertView.content = "Erro ao copiar formulário";
          this.blockAlertView.type = "danger";
        })
        .finally(() => {
          this.modalConfirmCopyParticipants.requesting = false;
          this.modalConfirmCopyParticipants.show = false;
        });
    },

    rowHasCollects(row) {
      return Object.keys(row.coleta).length > 0;
    },

    loadFormsList() {
      this.requesting.tableFormsData = true;

      this.axios
        .get("/formularios/")
        .then((response) => {
          const data = response.data;

          this.tableForms.data = data;
        })
        .finally(() => {
          this.requesting.tableFormsData = false;
        });
    },

    loadFormBySlug(slug) {
      return this.axios.get(`/formulario/${slug}/`);
    },

    //Events

    modalConfirmCopyParticipantsClose() {
      this.modalConfirmCopyParticipants.data = null;
      this.modalConfirmCopyParticipants.show = false;
    },

    modalConfirmCopyParticipantsYes(data) {
      this.copyForm({
        copyParticipants: true,
        data,
      });
    },

    modalConfirmCopyParticipantsNo(data) {
      this.copyForm({
        copyParticipants: false,
        data,
      });
    },

    modalDeleteConfirmYes(data) {
      const row = data;
      const slug = row.slug;

      this.axios
        .delete(`/formularios/${slug}/`)
        .then((response) => {
          this.blockAlertView.show = true;
          this.blockAlertView.content = "Formulário excluído com sucesso";
          this.blockAlertView.type = "success";

          this.loadFormsList();
        })
        .finally(() => {});

      this.modalDeleteConfirm.show = false;
    },

    modalDeleteConfirmNo(data) {
      this.modalDeleteConfirm.show = false;
    },

    componentModalFormEntireViewClose(e) {
      this.modalFormEntireView.selectedForm = null;

      this.modalFormEntireView.show = false;
    },

    componentModalFormEntireViewCloseX(e) {
      this.componentModalFormEntireViewClose(e);
    },

    tableFormsButtonEditClick(e, row) {
      const slug = row.slug;

      this.$router.push(`/formularios/${slug}/editar`);
    },

    async tableFormsButtonViewClick(e, row) {
      this.modalFormEntireView.requesting = true;
      this.modalFormEntireView.show = true;

      const form = await this.loadFormBySlug(row.slug);

      this.modalFormEntireView.selectedForm = form.data;

      console.log("INFORMAÇÕES DAS QUESTÕES:", form.data);

      this.modalFormEntireView.requesting = false;
    },

    tableFormsButtonDeleteClick(e, row) {
      this.modalDeleteConfirm.data = row;
      this.modalDeleteConfirm.show = true;
    },

    tableFormsButtonDropdownCreateCollectClick(e, row) {
      window.location.href = this.getCreateCollectUrl(row);
    },

    tableFormsButtonDropdownCopyFormClick(e, row) {
      this.modalConfirmCopyParticipants.data = row;
      this.modalConfirmCopyParticipants.show = true;
    },
  }, //methods
  watch: {}, //watch
  created() {}, //created
  beforeMount() {
    this.loadFormsList();
  }, //beforeMount
  mounted() {}, //mounted
  destroyed() {}, //destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>
<style>
@media (min-width: 576px) {
}

@media (min-width: 768px) {
}

@media (max-width: 991px) {
}
@media (min-width: 992px) {
}

@media (min-width: 1200px) {
  #component-modal-form-entire-view .modal-dialog {
    max-width: 80vw;
  }
}
</style>
<style scoped>
@import "../mixins/MixinViewDefault.css";

.table-forms >>> tr td:first-child {
  width: 30%;
}

.table-forms >>> tr td:last-child {
  width: 1%;
}

#component-modal-form-entire-view h2,
#component-modal-form-entire-view h3 {
  font-size: 1rem;
  font-weight: bold;
}

#component-modal-form-entire-view h4 {
  font-size: 0.9rem;
  font-weight: bold;
}

#component-modal-form-entire-view .container-form-description {
  font-size: 0.85em;
}

#component-modal-form-entire-view .container-section {
  background-color: #efefef;
  border-radius: 0.25rem;
  margin-bottom: 0.75em;
  padding: 0.75em;
}

#component-modal-form-entire-view .container-section-title {
  font-weight: bold;
}

#component-modal-form-entire-view .container-section-description {
  font-size: 0.85em;
}

#component-modal-form-entire-view .container-question {
  background-color: #fff;
  border-radius: 0.25rem;
  margin-bottom: 0.5em;
  padding: 0.75em;
}

#component-modal-form-entire-view .container-question hr {
  margin: 0.3em 0;
}

#component-modal-form-entire-view .container-question-scale {
  font-size: 0.85em;
}

@media (min-width: 576px) {
}

@media (max-width: 767px) {
  .table-forms >>> tr th:first-child {
    min-width: 230px;
  }
  .table-forms >>> .VueTables__limit {
    display: none;
  }
}

@media (min-width: 768px) {
}

@media (max-width: 991px) {
  .table-forms >>> tr th:not(:first-child):not(:last-child),
  .table-forms >>> tr td:not(:first-child):not(:last-child) {
    display: none;
  }
}
@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>
