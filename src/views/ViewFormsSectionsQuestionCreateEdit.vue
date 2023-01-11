<template>
  <section id="view-forms-sections-question-create-edit">
    <ComponentViewHeader
      class="mb-4"
      :breadcrumbs="viewHeader.breadcrumbs"
      :description="viewHeader.description"
      :title="viewHeader.title"
    />

    <b-container class="mb-4 mb-lg-0 container-view-buttons">
      <b-row>
        <b-col cols="12" md="6">
          <router-link
            :to="
              `/formularios/${routeParamSlugForm}/secoes/${routeParamSlugSection}/editar`
            "
          >
            <i class="fas fa-arrow-left"></i>
            Voltar para a seção
          </router-link>
        </b-col>
        <b-col
          cols="12"
          md="6"
          class="mb-3 mt-5 my-md-0 text-center text-md-right"
        >
          <span v-if="isEditing">
            <span class="mr-2">Próximo passo:</span>
            <a :href="nextStepUrl" class="btn btn-secondary text-white">
              <span class="mr-2">Abrir coleta</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </span>
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row>
        <b-col>
          <ComponentParentIdentifierForms
            title-key="secao"
            description-key="descricao"
            :endpoint="`/secoes/${routeParamSlugSection}/`"
            @load="ComponentParentIdentifierFormsLoad"
          />
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row>
        <b-col>
          <ComponentBlockAlert
            class="mb-4"
            :type="blockAlertView.type"
            :show="blockAlertView.show"
            ><template v-slot:message>{{
              blockAlertView.content
            }}</template></ComponentBlockAlert
          >
        </b-col>
      </b-row>
    </b-container>

    <b-container class="mb-4">
      <b-row>
        <b-col>
          <div class="text-center" v-if="requesting.loadQuestion">
            <ComponentLoading size="lg" text="Carregando questão" />
          </div>
          <b-card v-else>
            <b-row>
              <b-col cols="12" lg="3">
                <label>Questão:</label>
              </b-col>
              <!-- <b-col>
                <b-form-input v-model="model.description"></b-form-input>
              </b-col> -->
            </b-row>
            <b-row>
              <b-col>
                <ComponentTipTap :content="editorContentInitial.convocation" @contentChange="componentTipTapContentChange" />
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col cols="12" lg="3">
                <label>Escala:</label>
              </b-col>
              <b-col>
                <ComponentDropdownScale
                  :is-loading="requesting.loadScales"
                  :scales="[...formScales, ...scalesFilteredByFormScales]"
                  :selected-scale="selectedScale || null"
                  @option-item-click="componentDropdownScaleOptionItemClick"
                />
              </b-col>
            </b-row>
            <hr />
            <b-row v-if="showMaxSelections">
              <b-col cols="12" lg="3">
                <label>Máximo de seleções:</label>
              </b-col>
              <b-col>
                <span v-if="!isCreating && !isEditing">{{
                  model.maxSelections
                }}</span>
                <b-form-input
                  type="number"
                  v-model="model.maxSelections"
                  @blur="inputMaxSelectionsBlur"
                  v-else
                ></b-form-input>
                <div class="mt-2 container-text-info">
                  Como a escala selecionada é do tipo múltipla escolha, você
                  pode informar a quantidade máxima de itens que o usuário pode
                  selecionar. Preencha com 0 (zero) para ilimitado.
                </div>
              </b-col>
            </b-row>
            <hr v-if="showMaxSelections" />
            <b-row>
              <b-col cols="12" lg="3">
                <label>Ordem:</label>
              </b-col>
              <b-col>
                <span v-if="!isCreating && !isEditing">{{ model.order }}</span>
                <b-form-input
                  type="number"
                  v-model="model.order"
                  @blur="inputOrderBlur"
                  v-else
                ></b-form-input>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col cols="12" lg="3"></b-col>
              <b-col>
                <b-form-checkbox
                  v-model="model.required"
                  :value="true"
                  :unchecked-value="false"
                  >Preenchimento obrigatório</b-form-checkbox
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" lg="3"></b-col>
              <b-col>
                <b-form-checkbox
                  v-model="model.cut"
                  :value="true"
                  :unchecked-value="false"
                  >Essa questão é um corte?</b-form-checkbox
                >
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <ComponentLoading
                  class="ml-3 align-middle"
                  text="Salvando"
                  v-if="requesting.save"
                />
                <b-button
                  class="px-5"
                  :disabled="!idSection || !isFormValid"
                  variant="success"
                  @click="buttonSaveClick"
                  v-if="!requesting.save"
                >
                  <span>Salvar</span>
                </b-button>
                <b-button
                  class="ml-2"
                  :disabled="!idSection || requesting.save"
                  variant="link"
                  @click="buttonCancelClick"
                  v-if="!requesting.save"
                >
                  <span>Cancelar</span>
                </b-button>
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
import ComponentLoading from "@/components/ComponentLoading";
import ComponentParentIdentifierForms from "@/components/ComponentParentIdentifierForms";
import ComponentViewHeader from "@/components/ComponentViewHeader";
import ComponentDropdownScale from "@/components/ComponentDropdownScale";
import ComponentTipTap from "@/components/Editor/TipTap/ComponentTipTap";

export default {
  name: "ViewFormsSectionsQuestionCreateEdit",
  props: [],
  mixins: [MixinViewDefault],
  components: {
    ComponentBlockAlert,
    ComponentDropdownScale,
    ComponentLoading,
    ComponentParentIdentifierForms,
    ComponentViewHeader,
    ComponentTipTap,
  }, //components
  data() {
    return {
      blockAlertView: {
        content: null,
        type: null,
        show: false,
      },

      formScales: [],

      idSection: null,

      isCreating: false,

      isEditing: false,

      loadedQuestion: null,

      editorContentInitial: {
        convocation: null,
        charge: null,
        acknowledgement: null,
        instruction: null,
      },

      model: {
        cut: false,
        description: null,
        maxSelections: 0,
        order: 0,
        scale: null,
        required: false,
      },

      requesting: {
        loadScales: false,
        loadQuestion: false,
        save: false,
      },

      scales: [],

      selectedScale: null,
    };
  }, //data
  computed: {
    nextStepUrl() {
      if (this.loadedQuestion) {
        return this.getCreateCollectUrl(this.loadedQuestion.formulario);
      }
      return "#";
    },

    isFormValid() {
      let errorCount = 0;

      if (!this.model.description) {
        errorCount++;
      }

      if (!this.model.scale) {
        errorCount++;
      }

      if (!this.model.order && this.model.order !== 0) {
        errorCount++;
      }

      return errorCount === 0;
    },

    routeParamSlugForm() {
      return this.$route.params.slugForm;
    },

    routeParamSlugSection() {
      return this.$route.params.slugSection;
    },

    routeParamSlugQuestion() {
      return this.$route.params.slugQuestion;
    },

    scalesFilteredByFormScales() {
      const question = this.loadedQuestion;
      const formScales = this.formScales;
      const scales = this.scales;

      const formScalesScaleOriginIds = formScales
        .filter((item) => item.formulario === question.formulario)
        .map((item) => item.escala_origem);

      const filteredScales = scales.filter(
        (item) => !formScalesScaleOriginIds.includes(item.id)
      );

      return filteredScales;
    },

    showMaxSelections() {
      let ret = false;

      if (this.selectedScale) {
        if (this.selectedScale.escala_estilo === 1) {
          ret = true;
        }
      }

      return ret;
    },

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
          url: "/formularios/lista",
        },
        {
          icon: null,
          label: "Formulário",
          url: `/formularios/${this.routeParamSlugForm}/editar`,
        },
        {
          icon: null,
          label: "Seção",
          url: `/formularios/${this.routeParamSlugForm}/secoes/${this.routeParamSlugSection}/editar`,
        },
      ];

      let ret = {};

      if (this.isCreating) {
        ret.title = "Inserir questão";
        ret.description = "Criar uma nova questão para a seção";

        breadcrumbs.push({
          icon: null,
          label: "Inserir questão",
          url: null,
        });
      } else {
        ret.title = "Editar questão";
        ret.description = "Editar uma questão do formulário";

        breadcrumbs.push({
          icon: null,
          label: "Editar questão",
          url: null,
        });
      }

      ret.breadcrumbs = breadcrumbs;

      return ret;
    },
  }, //computed
  methods: {
    loadScales() {
      this.requesting.loadScales = true;

      return this.axios
        .get(`/escalas/`)
        .then((response) => {
          const data = response.data;

          this.scales = data;

          this.model.scale = data[0];
        })
        .finally(() => {
          this.requesting.loadScales = false;
        });
    },

    loadFormScales(formScales) {
      const question = this.loadedQuestion;

      this.formScales = formScales.filter(
        (item) => item.formulario === question.formulario
      );
    },

    loadQuestionForEditing(slugQuestion) {
      this.requesting.loadQuestion = true;

      this.axios
        .get(`/questoes/${slugQuestion}/`)
        .then((response) => {
          const data = response.data;

          const formScales = data.escalas_formularios;

          let selectedScale;
          let selectedScaleForm;

          let loadedQuestion = (this.loadedQuestion = data);

          this.loadFormScales(formScales);

          this.idSection = data.secao;

          this.model.cut = data.corte;
          this.model.description = data.descricao;
          this.model.maxSelections = data.qtde_respostas_permitidas;
          this.model.order = data.ordem;
          this.model.required = data.obrigatorio;
          this.model.scale = data.escala_formulario;

          this.editorContentInitial.convocation = data.descricao;

          selectedScaleForm = data.escalas_formularios.find((item) => {
            return item.id === data.escala_formulario;
          });

          if (!selectedScaleForm) {
            selectedScale = data.escalas.find((item) => {
              return item.id === data.escala;
            });
          }

          this.selectedScale = selectedScaleForm || selectedScale || null;
        })
        .finally(() => {
          this.requesting.loadQuestion = false;
        });
    },

    //Events

    buttonCancelClick(e) {
      this.$router.push(
        `/formularios/${this.routeParamSlugForm}/secoes/${this.routeParamSlugSection}/editar`
      );
    },

    buttonEditClick(e) {
      this.isEditing = true;
    },

    buttonSaveClick(e) {
      const slugForm = this.routeParamSlugForm;
      const slugSection = this.routeParamSlugSection;
      const slugQuestion = this.routeParamSlugQuestion;

      const selectedScale = this.selectedScale;

      const isSelectedScaleExistent = !!selectedScale.escala_origem;

      let payload = {
        corte: this.model.cut,
        descricao: this.model.description,
        secao: this.idSection,
        obrigatorio: this.model.required,
        ordem: this.model.order,
      };

      payload.escala = this.selectedScale.escala_origem;

      if (selectedScale) {
        if (selectedScale.escala_estilo === 1) {
          payload.qtde_respostas_permitidas = this.model.maxSelections || 0;
        }
      }

      this.requesting.save = true;

      if (this.isEditing) {
        if (isSelectedScaleExistent) {
          payload.escala_formulario = this.selectedScale.id;
        } else {
          payload.escala = this.selectedScale.id;
          payload.escala_formulario = null;
        }

        this.axios
          .put(`/questoes/${slugQuestion}/`, payload)
          .then((response) => {
            const data = response.data;

            this.$router.replace({
              name: "ViewRedirect",
              params: {
                to: `/formularios/${slugForm}/secoes/${slugSection}/editar`,
              },
            });
          })
          .catch((error) => {
            this.blockAlertView.show = true;
            this.blockAlertView.content =
              "Já existe uma questão cadastrada com o nome informado.";
            this.blockAlertView.type = "danger";
          })
          .finally(() => {
            this.requesting.save = false;
          });
      } else {
        payload.escala = this.selectedScale.id;
        payload.escala_formulario = null;

        this.axios
          .post("/questoes/", payload)
          .then((response) => {
            const data = response.data;

            this.$router.replace({
              name: "ViewRedirect",
              params: {
                to: `/formularios/${slugForm}/secoes/${slugSection}/editar`,
              },
            });
          })
          .catch((error) => {
            this.blockAlertView.show = true;
            this.blockAlertView.content =
              "Já existe uma questão cadastrada com o nome informado.";
            this.blockAlertView.type = "danger";
          })
          .finally(() => {
            this.requesting.save = false;
          });
      }
    },

    ComponentParentIdentifierFormsLoad(obj) {
      this.idSection = obj.id;
    },

    componentDropdownScaleOptionItemClick(scale) {
      this.selectedScale = scale;
    },

    inputMaxSelectionsBlur(e) {
      try {
        if (!this.model.maxSelections.match(/[0-9]+/)) {
          this.model.maxSelections = 0;
        }
      } catch (err) {}
    },

    inputOrderBlur(e) {
      try {
        if (!this.model.order.match(/[0-9]+/)) {
          this.model.order = 0;
        }
      } catch (err) {}
    },

    componentTipTapContentChange(obj) {

      const html = obj.html;
      // const json = obj.json;
      // const id = obj.id;

      // console.log('OBJETO TEXTO DO TIPTAP:', obj);

      this.model.description = html

      // const model = this.model;

      // if(id === 'editor-convocation') {
      //   model.convocationContent = html;
      // }
      // else if(id === 'editor-charge') {
      //   model.chargeResponseContent = html;
      // }
      // else if(id === 'editor-acknowledgement') {
      //   model.acknowledgementContent = html;
      // }
      // else if(id === 'editor-instruction') {
      //   model.instructionContent = html;
      // }

    },
  }, //methods
  watch: {
    "requesting.loadScales": function(value, oldValue) {
      if (value) {
        this.model.scale = "_loading_";
      } else {
        this.model.scale = null;
      }
    },

    selectedScale(value, oldValue) {
      if (value) {
        this.model.scale = value.id;
      }
    },
  }, //watch
  created() {}, //created
  beforeMount() {
    const route = this.$route;
    const path = route.path;
    const slugSection = this.routeParamSlugSection;
    const slugQuestion = this.routeParamSlugQuestion;

    this.loadScales();

    if (path.indexOf("/criar") >= 0) {
      this.isCreating = true;

      this.isEditing = false;
    } else {
      this.isCreating = false;

      this.isEditing = true;

      this.loadQuestionForEditing(slugQuestion);
    }
  }, //beforeMount
  mounted() {}, //mounted
  destroyed() {}, //destroyed
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>

<style scoped>
@import "../mixins/MixinViewDefault.css";

a.btn {
  text-decoration: none;
}

.container-text-info {
  font-size: 0.85em;
  opacity: 0.75;
}
</style>
