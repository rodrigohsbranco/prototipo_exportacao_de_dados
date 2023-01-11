<template>
  <section id="view-forms-create-edit">
    <ComponentViewHeader
      class="mb-4"
      :breadcrumbs="viewHeader.breadcrumbs"
      :description="viewHeader.description"
      :title="viewHeader.title"
    />

    <b-container class="mb-4 container-view-buttons">
      <b-row>
        <b-col class="text-right">
          <router-link :to="`/formularios/lista`">
            <i class="fas fa-arrow-left"></i>
            Voltar para a lista de formulários
          </router-link>
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

    <b-container>
      <b-row>
        <b-col>
          <div class="text-center" v-if="requesting.loadForm">
            <ComponentLoading size="lg" text="Carregando formulário" />
          </div>
          <b-card class="card-infos-view-edit" v-else>
            <b-row>
              <b-col cols="12" lg="2">
                <label>Nome:</label>
              </b-col>
              <b-col>
                <span v-if="!isCreating && !isEditing">{{ model.title }}</span>
                <b-form-input v-model="model.title" v-else></b-form-input>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col cols="12" lg="2">
                <label>Descrição:</label>
              </b-col>
              <b-col>
                <span v-if="!isCreating && !isEditing">{{
                  model.description
                }}</span>
                <b-form-textarea
                  rows="4"
                  v-model="model.description"
                  v-else
                ></b-form-textarea>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col cols="12" lg="2">
                <label>Imagem (logo):</label>
              </b-col>
              <b-col>
                <div v-if="!isCreating && !isEditing && !hasImage">
                  Não cadastrada
                </div>
                <div class="mb-2 container-image-preview" v-if="hasImage">
                  <img :src="model.imageUrl" alt="" />
                  <b-button
                    size="sm"
                    variant="outline-danger"
                    v-if="isCreating || isEditing"
                    @click="buttonRemoveImageClick"
                  >
                    <i class="mr-2  fas fa-times"></i>
                    <span>Remover imagem</span>
                  </b-button>
                </div>
                <div>
                  <div class="d-inline-block">
                    <b-form-file
                      accept="image/jpeg, image/png"
                      :placeholder="
                        model.imageUrl
                          ? 'Selecionar outra imagem'
                          : 'Selecionar imagem'
                      "
                      v-model="model.imageFile"
                      v-if="isCreating || isEditing"
                    >
                    </b-form-file>
                  </div>
                </div>
                <div
                  class="mt-2 container-text-info-image"
                  v-if="isCreating || isEditing"
                >
                  Para melhor resultado, sua imagem deve estar com 900 pixels
                  (largura) e 140 pixels de altura. Ao adicionar, alterar ou
                  remover a imagem, você precisa salvar o formulário para que a
                  imagem seja vinculada.
                </div>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <b-button
                  class="px-4"
                  @click="buttonEditClick"
                  v-if="!isCreating && !isEditing"
                >
                  <span>Editar formulário</span>
                </b-button>
                <template v-if="isCreating || isEditing">
                  <ComponentLoading
                    class="ml-3 align-middle"
                    text="Salvando"
                    v-if="requesting.save"
                  />
                  <b-button
                    class="px-5"
                    :disabled="!isFormValid"
                    variant="success"
                    @click="buttonSaveClick"
                    v-if="!requesting.save"
                  >
                    <span>Salvar</span>
                  </b-button>
                  <b-button
                    class="ml-2"
                    :disabled="requesting.save"
                    variant="link"
                    @click="buttonCancelClick"
                    v-if="!requesting.save"
                  >
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
          <h2 class="mb-3" v-if="!isCreating && !requesting.loadForm">
            Seções
          </h2>

          <ComponentBlockAlert
            :type="blockAlertSections.type"
            :show="blockAlertSections.show"
            ><template v-slot:message>{{
              blockAlertView.content
            }}</template></ComponentBlockAlert
          >

          <div
            class="my-4 text-center"
            v-if="!isCreating && requesting.loadForm"
          >
            <ComponentLoading size="lg" text="Carregando seções" />
          </div>

          <b-card class="mb-4" v-if="!isCreating && !requesting.loadForm">
            <div class="mb-3" v-if="tableFormSections.data.length < 1">
              Este formulário ainda não tem seções cadastradas
              <hr />
            </div>

            <div>
              <router-link
                :to="`/formularios/${routeParamSlugForm}/secoes/criar`"
                v-slot="{ href, route, navigate, isActive, isExactActive }"
                custom
              >
                <button class="btn btn-success" @click="navigate">
                  <i class="mr-2 fas fa-plus-circle"></i>
                  <span>Inserir seção</span>
                </button>
              </router-link>
            </div>

            <template v-if="tableFormSections.data.length > 0">
              <hr />

              <ComponentDataTable
                class="table-form-sections"
                :config="tableFormSections"
              >
                <template #acoes="{row}">
                  <b-button
                    class="mx-1"
                    size="sm"
                    @click="tableFormSectionsButtonEditClick($event, row)"
                  >
                    <i class="fas fa-pencil-alt"></i>
                  </b-button>
                  <b-button
                    class="mx-1"
                    size="sm"
                    @click="
                      tableFormSectionsButtonViewQuestionsClick($event, row)
                    "
                  >
                    <i class="fas fa-eye"></i>
                  </b-button>
                  <b-button
                    class="mx-1"
                    size="sm"
                    variant="danger"
                    @click="tableFormSectionsButtonDeleteClick($event, row)"
                  >
                    <i class="fas fa-trash"></i>
                  </b-button>
                </template>
              </ComponentDataTable>
            </template>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container
      v-if="!isCreating && hasSectionsAndQuestionsCreated"
      class="mb-5 mt-2"
    >
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

    <ComponentModal
      ref="componentModalViewQuestions"
      size="lg"
      v-if="modalViewQuestions.show"
    >
      <template #modal-header="{}">
        <h5>Questões da seção</h5>
        <b-button-close
          @click="componentModalViewQuestionsCloseX"
        ></b-button-close>
      </template>
      <template #default>
        <div
          class="text-center"
          v-if="requesting.modalViewQuestionsLoadQuestions"
        >
          <ComponentLoading text="Carregando questões" />
        </div>
        <div v-else>
          <ComponentDataTable
            class="table-questions-of-section"
            :config="modalViewQuestions.tableQuestions"
          >
            <template #descricao="{row}">
              <div v-html="row.descricao"></div>
            </template>
            <template #escala="{row}">
              {{ getScaleDescriptionById(row.escala, row.escalas) }}
            </template>
          </ComponentDataTable>
        </div>
      </template>
      <template #modal-footer="{ ok, cancel, hide }">
        <b-button size="sm" @click="componentModalViewQuestionsClose"
          >Fechar</b-button
        >
      </template>
    </ComponentModal>

    <ComponentModalConfirm
      :config="modalDeleteConfirm"
      text="Tem certeza que deseja excluir esta seção?"
      title="Excluir seção"
      @yes="modalDeleteConfirmYes"
      @no="modalDeleteConfirmNo"
    />
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
  name: "ViewFormsCreateEdit",
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
      blockAlertSections: {
        content: null,
        type: null,
        show: false,
      },

      blockAlertView: {
        content: null,
        type: null,
        show: false,
      },

      isCreating: false,

      isEditing: false,

      loadedForm: null,

      modalDeleteConfirm: {
        data: null,
        show: false,
      },

      modalViewQuestions: {
        show: false,
        tableQuestions: {
          columns: ["descricao", "escala"],
          data: [],
          options: {
            filterable: false,
            headings: {
              descricao: "Descrição",
              escala: "Escala",
            },
            sortable: [],
          },
        },
      },

      model: {
        title: "",
        description: "",
        imageFile: null,
        imageUrl: null,
      },

      modelBeforeEdit: {},

      requesting: {
        loadForm: false,
        modalViewQuestionsLoadQuestions: false,
        save: false,
      },

      tableFormSections: {
        columns: ["secao", "descricao", "ordem", "acoes"],
        data: [],
        options: {
          columnsClasses: {
            ordem: "text-center",
            acoes: "text-center",
          },
          filterable: ["secao", "descricao", "ordem"],
          orderBy: {
            column: "ordem",
          },
          sortable: ["secao", "descricao", "ordem"],
          headings: {
            secao: "Seção",
            descricao: "Descrição",
            ordem: "Ordem",
            acoes: "Ações",
          },
        },
      },
    };
  }, //data
  computed: {
    hasImage() {
      return this.model.imageUrl !== null;
    },

    hasSectionsAndQuestionsCreated() {
      const form = this.loadedForm;

      try {
        return (
          form.secoes.length > 0 &&
          form.secoes
            .map((section) => section.questoes)
            .some((questions) => questions.length > 0)
        );
      } catch (err) {
        return false;
      }
    },

    isFormValid() {
      let errorCount = 0;

      // if(!this.model.description) {
      //   errorCount++;
      // }

      if (!this.model.title) {
        errorCount++;
      }

      return errorCount === 0;
    },

    nextStepUrl() {
      if (this.loadedForm) {
        return this.getCreateCollectUrl(this.loadedForm);
      }
      return "#";
    },

    routeParamSlugForm() {
      return this.$route.params.slugForm;
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
      ];

      let ret = {};

      if (this.isCreating) {
        ret.title = "Adicionar formulário";
        ret.description = "Criar um novo formulário para preenchimento";

        breadcrumbs.push({
          icon: null,
          label: "Adicionar formulário",
          url: null,
        });
      } else {
        ret.title = "Editar formulário";
        ret.description = "Editar um formulário existente";

        breadcrumbs.push({
          icon: null,
          label: "Editar formulário",
          url: null,
        });
      }

      ret.breadcrumbs = breadcrumbs;

      return ret;
    },
  }, //computed
  methods: {
    loadFormForEditing(slug) {
      this.requesting.loadForm = true;

      this.axios
        .get(`/formulario/${slug}/`)
        .then((response) => {
          const data = response.data;
          const sections = data.secoes;

          this.loadedForm = data;

          this.tableFormSections.data = sections;

          this.model.description = data.descricao;
          this.model.imageUrl = data.imagem;
          this.model.title = data.titulo;
        })
        .finally(() => {
          this.requesting.loadForm = false;
        });
    },

    loadQuestionsOfSection(slugSection) {
      this.requesting.modalViewQuestionsLoadQuestions = true;

      this.axios
        .get(`/secoes/${slugSection}/questoes/`)
        .then((response) => {
          const data = response.data;

          this.modalViewQuestions.tableQuestions.data = data;
        })
        .finally(() => {
          this.requesting.modalViewQuestionsLoadQuestions = false;
        });
    },

    //Events

    buttonCancelClick(e) {
      if (this.isCreating) {
        this.$router.push("/formularios/lista");
      } else {
        this.model = { ...this.modelBeforeEdit };

        this.isEditing = false;
      }
    },

    buttonEditClick(e) {
      this.modelBeforeEdit = { ...this.model };

      this.isEditing = true;
    },

    buttonRemoveImageClick(e) {
      const slug = this.routeParamSlugForm;

      this.axios
        .delete(`/formulario-imagem/${slug}/`)
        .then((response) => {
          this.loadFormForEditing(slug);
        })
        .catch((error) => {
          this.blockAlertView.show = true;
          this.blockAlertView.content = "Erro ao remover imagem do formulário.";
          this.blockAlertView.type = "danger";
        })
        .finally(() => {});
    },

    buttonSaveClick(e) {
      const formData = new FormData();

      formData.append("titulo", this.model.title);
      formData.append("descricao", this.model.description);
      formData.append("tipo_formulario", "P");

      if (this.model.imageFile) {
        formData.append("imagem", this.model.imageFile);
      }

      this.requesting.save = true;

      if (this.isEditing) {
        const slug = this.routeParamSlugForm;

        this.axios
          .put(`/formularios/${slug}/`, formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.isEditing = false;

            this.loadFormForEditing(slug);
          })
          .catch((error) => {
            this.blockAlertView.show = true;
            this.blockAlertView.content =
              "Já existe um formulário cadastrado com o nome informado";
            this.blockAlertView.type = "danger";
          })
          .finally(() => {
            this.requesting.save = false;
          });
      } else {
        this.axios
          .post("/formularios/", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((response) => {
            const data = response.data;
            const slug = data.slug;

            this.$router.replace({
              name: "ViewRedirect",
              params: {
                to: `/formularios/${slug}/editar`,
              },
            });
          })
          .catch((error) => {
            this.blockAlertView.show = true;
            this.blockAlertView.content =
              "Já existe um formulário cadastrado com o nome informado.";
            this.blockAlertView.type = "danger";
          })
          .finally(() => {
            this.requesting.save = false;
          });
      }
    },

    componentModalViewQuestionsClose(e) {
      this.modalViewQuestions.tableQuestions.data = [];

      this.modalViewQuestions.show = false;
    },

    componentModalViewQuestionsCloseX(e) {
      this.componentModalViewQuestionsClose(e);
    },

    modalDeleteConfirmYes(data) {
      const slugForm = this.routeParamSlugForm;

      const row = data;
      const slug = row.slug;

      this.axios
        .delete(`/secoes/${slug}/`)
        .then((response) => {
          this.blockAlertSections.show = true;
          this.blockAlertSections.content = "Seção excluída com sucesso";
          this.blockAlertSections.type = "success";

          this.loadFormForEditing(slugForm);
        })
        .finally(() => {});

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
      const slugSection = row.slug;

      this.$router.push(
        `/formularios/${slugForm}/secoes/${slugSection}/editar`
      );
    },

    async tableFormSectionsButtonViewQuestionsClick(e, row) {
      const slugSection = row.slug;

      this.modalViewQuestions.show = true;

      this.loadQuestionsOfSection(slugSection);
    },
  }, //methods
  watch: {}, //watch
  created() {}, //created
  beforeMount() {
    const route = this.$route;
    const slug = this.routeParamSlugForm;
    const path = route.path;

    if (path.indexOf("/criar") >= 0) {
      this.isCreating = true;

      this.isEditing = false;
    } else {
      this.isCreating = false;

      this.isEditing = false;

      this.loadFormForEditing(slug);
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

h2 {
  font-size: 1.5em;
}

.table-form-sections >>> tr td:first-child {
  width: 25%;
}

.table-form-sections >>> tr td:nth-child(3) {
  width: 10%;
}

.table-form-sections >>> tr td:last-child {
  width: 1%;
}

.container-image-preview {
}

.container-image-preview img {
  max-width: 440px;
  margin-bottom: 0.5em;
  margin-right: 1em;
  width: 100%;
}

.container-text-info-image {
  font-size: 0.85em;
  opacity: 0.75;
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {
}

@media (max-width: 991px) {
  .table-form-sections >>> tr th:not(:first-child):not(:last-child),
  .table-form-sections >>> tr td:not(:first-child):not(:last-child) {
    display: none;
  }
}
@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>
