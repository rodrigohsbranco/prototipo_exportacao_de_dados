<template>
  <section id="view-forms-sections-create-edit">

    <ComponentViewHeader class="mb-4" :breadcrumbs="viewHeader.breadcrumbs" :description="viewHeader.description" :title="viewHeader.title" />

    <b-container class="mb-4 mb-lg-0 container-view-buttons">
      <b-row>
        <b-col class="text-right">
          <router-link :to="`/formularios/${routeParamSlugForm}/editar`">
            <i class="fas fa-arrow-left"></i>
            Voltar para o formulário
          </router-link>
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row>
        <b-col>
          <ComponentParentIdentifierForms title-key="titulo" description-key="descricao" :endpoint="`/formularios/${routeParamSlugForm}/`" @load="ComponentParentIdentifierFormsLoad" />
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row>
        <b-col>
          <ComponentBlockAlert class="mb-4" :type="blockAlertView.type" :show="blockAlertView.show"><template v-slot:message>{{ blockAlertView.content }}</template></ComponentBlockAlert>
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row>
        <b-col>
          <div class="text-center" v-if="requesting.loadSection">
            <ComponentLoading size="lg" text="Carregando seção" />
          </div>
          <b-card class="card-infos-view-edit" v-else>
            <b-row>
              <b-col cols="12" lg="3">
                <label>Nome:</label>
              </b-col>
              <b-col>
                <span v-if="!isCreating && !isEditing">{{model.name}}</span>
                <b-form-input v-model="model.name" v-else></b-form-input>
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col cols="12" lg="3">
                <label>Descrição (conceito):</label>
              </b-col>
              <b-col>
                <span v-if="!isCreating && !isEditing">{{model.description}}</span>
                <b-form-textarea rows="4" v-model="model.description" v-else></b-form-textarea>
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col cols="12" lg="3">
                <label>Ordem:</label>
              </b-col>
              <b-col>
                <span v-if="!isCreating && !isEditing">{{model.order}}</span>
                <b-form-input type="number" v-model="model.order" @blur="inputOrderBlur" v-else></b-form-input>
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col>
                <b-button class="px-4" @click="buttonEditClick" v-if="!isCreating && !isEditing">
                  <span>Editar seção</span>
                </b-button>
                <template v-if="isCreating || isEditing">
                  <ComponentLoading class="ml-3 align-middle" text="Salvando" v-if="requesting.save" />
                  <b-button class="px-5" :disabled="!idForm || !isFormValid" variant="success" @click="buttonSaveClick" v-if="!requesting.save">
                    <span>Salvar</span>
                  </b-button>
                  <b-button class="ml-2" :disabled="!idForm || requesting.save" variant="link" @click="buttonCancelClick" v-if="!requesting.save">
                    <span>Cancelar</span>
                  </b-button>
                </template>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="mt-3">
      <b-row>
        <b-col>
          
          <h2 class="mb-3" v-if="!isCreating && !requesting.loadQuestions">Questões</h2>

          <ComponentBlockAlert :type="blockAlertQuestions.type" :show="blockAlertQuestions.show"><template v-slot:message>{{ blockAlertView.content }}</template></ComponentBlockAlert>

          <div class="my-4 text-center" v-if="!isCreating && requesting.loadQuestions">
            <ComponentLoading size="lg" text="Carregando questões" />
          </div>
          
          <b-card class="mb-4" v-if="!isCreating && !requesting.loadQuestions">

            <div class="mb-3" v-if="tableFormSectionQuestions.data.length < 1">
              Esta seção ainda não tem questões cadastradas
              <hr>
            </div>

            <div>
              <router-link :to="`/formularios/${routeParamSlugForm}/secoes/${routeParamSlugSection}/questoes/criar`"  v-slot="{ href, route, navigate, isActive, isExactActive }" custom>
                <button class="btn btn-success" @click="navigate">
                  <i class="mr-2 fas fa-plus-circle"></i>
                  <span>Inserir questão</span>
                </button>
              </router-link>
            </div>

            <template v-if="tableFormSectionQuestions.data.length > 0">

              <hr>
              
              <ComponentDataTable class="table-form-section-questions" :config="tableFormSectionQuestions">
                <template #descricao="{row}">
                  <div v-html="row.descricao">
                  </div>
                </template>
                <template #escala="{row}">
                  {{getScaleDescriptionById(row.escala, scales)}}
                </template>
                <template #acoes="{row}">
                  <b-button class="mx-1" size="sm" @click="tableFormSectionsButtonEditClick($event, row)">
                    <i class="fas fa-pencil-alt"></i>
                  </b-button>
                  <b-button class="mx-1" size="sm" variant="danger" @click="tableFormSectionsButtonDeleteClick($event, row)">
                    <i class="fas fa-trash"></i>
                  </b-button>
                </template>
              </ComponentDataTable>

            </template>

          </b-card>

        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="!isCreating && hasQuestionsCreated" class="mb-5 mt-2">
      <b-row>
        <b-col class="text-center">

          <span>
            <span class="mr-2">Ir para</span>
            <a :href="nextStepUrl" class="btn btn-secondary text-white">
              <span class="mr-2">Abrir coleta</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </span>

        </b-col>
      </b-row>
    </b-container>

    <ComponentModalConfirm 
      :config="modalDeleteConfirm" 
      text="Tem certeza que deseja excluir esta questão?" 
      title="Excluir questão"
      @yes="modalDeleteConfirmYes"
      @no="modalDeleteConfirmNo" />

  </section>
</template>

<script>
import WebGcaSpaFormularios from "@/webgca-spa-rh-formularios";
const webGcaSpaFormularios = WebGcaSpaFormularios;

import MixinViewDefault from "@/mixins/MixinViewDefault.js";

import ComponentParentIdentifierForms from "@/components/ComponentParentIdentifierForms";
import ComponentBlockAlert from "@/components/ComponentBlockAlert";
import ComponentDataTable from "@/components/ComponentDataTable";
import ComponentLoading from "@/components/ComponentLoading";
import ComponentModalConfirm from "@/components/ComponentModalConfirm";
import ComponentViewHeader from "@/components/ComponentViewHeader";

export default {
  name: "ViewFormsSectionsCreateEdit",
  props: [],
  mixins: [MixinViewDefault],
  components: {
    ComponentBlockAlert,
    ComponentDataTable,
    ComponentLoading,
    ComponentModalConfirm,
    ComponentParentIdentifierForms,
    ComponentViewHeader
  }, //components
  data() {
    return {

      blockAlertView: {
        content: null,
        type: null,
        show: false
      },

      blockAlertQuestions: {
        content: null,
        type: null,
        show: false
      },

      idForm: null,

      isCreating: false,

      isEditing: false,

      loadedForm: null,

      loadedSection: null,

      modalDeleteConfirm: {
        data: null,
        show: false,
      },

      model: {
        description: null,
        order: 0,
        name: null,
        type: null,
      },

      modelBeforeEdit: {},

      requesting: {
        loadQuestions: false,
        loadSection: false,
        save: false,
      },

      scales: [],

      tableFormSectionQuestions: {
        columns: [
          'descricao',
          'escala',
          'ordem',
          'acoes'
        ],
        data: [],
        options: {
            columnsClasses: {
              ordem: 'text-center',
              acoes: 'text-center',
            },
            filterable: [
              'descricao',
              'escala',
              'ordem',
            ],
            orderBy: {
              column: 'ordem'
            },
            sortable: [
              'descricao',
              'escala',
              'ordem',
            ],
            headings: {
              descricao: 'Descrição',
              escala: 'Escala',
              ordem: 'Ordem',
              acoes: 'Ações',
            },
        }
      },

    };
  }, //data
  computed: {

    hasQuestionsCreated() {

      const section = this.loadedSection;

      try {
        return section.questoes.length > 0;
      } catch(err) {
        return false;
      }

    },

    isFormValid() {

      let errorCount = 0;

      // if(!this.model.description) {
      //   errorCount++;
      // }

      if(!this.model.name) {
        errorCount++;
      }

      if(!this.model.order && this.model.order !== 0) {
        errorCount++;
      }

      return errorCount === 0;

    },

    nextStepUrl() {
      if(this.loadedForm) {
        return this.getCreateCollectUrl(this.loadedForm);
      }
      return '#';
    },

    routeParamSlugForm() {
      return this.$route.params.slugForm;
    },

    routeParamSlugSection() {
      return this.$route.params.slugSection;
    },

    viewHeader() {

      let breadcrumbs = [
        {
          icon: 'fas fa-home',
          label: 'Home',
          url: webgca.clientUrl
        },
        {
          icon: null,
          label: 'Lista de Formulários',
          url: '/formularios/lista'
        },
        {
          icon: null,
          label: 'Formulário',
          url: `/formularios/${this.routeParamSlugForm}/editar`
        },
      ];

      let ret = {};

      if(this.isCreating) {

        ret.title = 'Inserir seção';
        ret.description = 'Criar uma nova seção para o formulário';
        
        breadcrumbs.push(
          {
            icon: null,
            label: 'Inserir seção',
            url: null
          }
        );

      } else {

        ret.title = 'Editar seção';
        ret.description = 'Editar uma seção para o formulário';
        
        breadcrumbs.push(
          {
            icon: null,
            label: 'Editar seção',
            url: null
          }
        );

      }

      ret.breadcrumbs = breadcrumbs;

      return ret;

    },

  }, //computed
  methods: {

    loadSectionForEditing(slugSection) {

      this.requesting.loadSection = true;

      this.axios
        .get(`/secoes/${slugSection}/`)
        .then(
          response => {

            const data = response.data;
            const questions = data.questoes;

            this.loadedSection = data;

            this.idForm = data.formulario;

            this.model.description = data.descricao;
            this.model.name = data.secao;
            this.model.order = data.ordem;
            
          }
        )
        .finally(
          () => {
            this.requesting.loadSection = false;
          }
        );

    },

    loadQuestions() {

      this.requesting.loadQuestions = true;

      this.axios
        .get(`/secoes/${this.routeParamSlugSection}/questoes/`)
        .then(
          response => {

            const data = response.data;

            if(data.length > 0) {
              this.scales = data[0].escalas;
            }

            this.tableFormSectionQuestions.data = data;
            
          }
        )
        .finally(
          () => {
            this.requesting.loadQuestions = false;
          }
        );

    },

    //Events

    buttonCancelClick(e) {

      if(this.isCreating) {
        this.$router.push(`/formularios/${this.routeParamSlugForm}/editar`);
      } else {

        this.model = {...this.modelBeforeEdit};

        this.isEditing = false;

      }

    },

    buttonEditClick(e) {

      this.modelBeforeEdit = {...this.model};

      this.isEditing = true;

    },

    buttonSaveClick(e) {

      const slugForm = this.routeParamSlugForm;
      const slugSection = this.routeParamSlugSection;

      const payload = {
        secao: this.model.name,
        descricao: this.model.description,
        formulario: this.idForm,
        ordem: parseInt(this.model.order),
        secao_tipo: 1
      }
            
      this.requesting.save = true;

      if(this.isEditing) {

        this.axios
          .put(`/secoes/${slugSection}/`, payload)
          .then(
            response => {

              this.isEditing = false;

              this.loadSectionForEditing(slugSection);
              
            }
          )
          .catch(
            error => {

              this.blockAlertView.show = true;
              this.blockAlertView.content = 'Já existe uma seção cadastrada com o nome informado.';
              this.blockAlertView.type = 'danger';

            }
          )
          .finally(
            () => {
              this.requesting.save = false;
            }
          );

      } else {

        this.axios
          .post('/secoes/', payload)
          .then(
            response => {

              const data = response.data;
              const slugSection = data.slug;

              this.$router.replace(
                {
                  name: 'ViewRedirect',
                  params: {
                    to: `/formularios/${slugForm}/secoes/${slugSection}/editar`
                  }
                }
              );
              
            }
          )
          .catch(
            error => {

              this.blockAlertView.show = true;
              this.blockAlertView.content = 'Já existe uma seção cadastrada com o nome informado.';
              this.blockAlertView.type = 'danger';

            }
          )
          .finally(
            () => {
              this.requesting.save = false;
            }
          );

      }

    },

    ComponentParentIdentifierFormsLoad(obj) {
      this.loadedForm = obj;
      this.idForm = obj.id;
    },

    inputOrderBlur(e) {

      try {

        if(!this.model.order.match(/[0-9]+/)) {
          this.model.order = 0;
        }

      } catch(err) {

      }

    },

    modalDeleteConfirmYes(data) {

      const row = data;
      const slug = row.slug;
      
      this.axios
        .delete(`/questoes/${slug}/`)
        .then(
          response => {

            this.blockAlertQuestions.show = true;
            this.blockAlertQuestions.content = 'Questão excluída com sucesso';
            this.blockAlertQuestions.type = 'success';

            this.loadQuestions();

          }
        )
        .finally(
          () => {
            
          }
        );

      this.modalDeleteConfirm.show = false;
      
    },

    modalDeleteConfirmNo(data) {
      this.modalDeleteConfirm.show = false;
    },

    tableFormSectionsButtonDeleteClick(e, row) {
      this.modalDeleteConfirm.data = row;
      this.modalDeleteConfirm.show = true;
    },

    tableFormSectionsButtonEditClick(e, row) {

      const slugForm = this.routeParamSlugForm;
      const slugSection = this.routeParamSlugSection;
      const slugQuestion = row.slug;

      this.$router.push(`/formularios/${slugForm}/secoes/${slugSection}/questoes/${slugQuestion}/editar`);

    },

  },//methods
  watch: {},//watch
  created() {},//created
  beforeMount() {

    const route = this.$route;
    const slugForm = this.routeParamSlugForm;
    const slugSection = this.routeParamSlugSection;
    const path = route.path;

    if(path.indexOf('/criar') >= 0) {

      this.isCreating = true;

      this.isEditing = false;

    } else {
      
      this.isCreating = false;

      this.isEditing = false;

      this.loadSectionForEditing(slugSection);

      this.loadQuestions();

    }

  },//beforeMount
  mounted() {},//mounted
  destroyed() {},//destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>

<style scoped>
@import '../mixins/MixinViewDefault.css';

.table-form-section-questions >>> tr td:first-child
{
  width: 25%;
}

.table-form-section-questions >>> tr td:nth-child(3)
{
  width: 10%;
}

.table-form-section-questions >>> tr td:last-child
{
  width: 1%;
}

@media (min-width: 576px) {}

@media (min-width: 768px) {}

@media (max-width: 991px) {

  .table-form-section-questions >>> tr th:not(:first-child):not(:last-child),
  .table-form-section-questions >>> tr td:not(:first-child):not(:last-child)
  {
    display: none;
  }

}
@media (min-width: 992px) {}

@media (min-width: 1200px) {}
</style>
