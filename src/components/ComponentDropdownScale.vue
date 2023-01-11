<template>
    <div class="component-dropdown-scale">
        <span :class="['d-flex align-items-center justify-content-between form-control', { active }]" @click="fromControlClick">
          <span v-if="isLoading">Carregando...</span>
          <span v-else-if="!isLoading && !selectedScale">Selecione</span>
          <span v-else>{{ selectedScale ? selectedScale.descricao : '' }}</span>
          <i class="fas fa-chevron-down"></i>
        </span>
        <div v-show="active" :class="['container-dropdown', { active }]" v-click-outside="containerDropdownClickOutside">
          <div class="container-option-items">
            <div v-for="scale in scales" :class="['container-option-item', { active: getOptionItemActiveClass(scale) }]" :key="`option_${scale.id}`" @click="optionItemClick($event, scale)">
              <div class="container-name">
                <span>{{ scale.descricao }}</span>
                <span v-if="scale.conceito" :title="scale.conceito">: {{ scale.conceito }}</span>
              </div>
              <div class="container-options" :title="getOptionsJoined(scale)">
                <span v-if="scale.itens.length > 0">Opções: {{ getOptionsJoined(scale) }}</span>
                <span v-else>Esta escala não possui opções</span>
              </div>
            </div>       
          </div>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: "ComponentDropdownScale",
  props: {

    isLoading: {
      type: Boolean,
    },

    scales: {
      type: Array,
      required: true,
    },

    selectedScale: {
      type: Object,
      default: null,
    },

  },
  mixins: [],
  components: {}, //components
  directives: {
    ClickOutside,
  },
  data() {
    return {

        active: false,

    };
  }, //data
  computed: {}, //computed
  methods: {

    getOptionItemActiveClass(scale) {

      const selectedScale = this.selectedScale;

      if (selectedScale) {
        const hasScaleSource = !!selectedScale.escala_origem;
  
        if (hasScaleSource) {
          return selectedScale.escala_origem === scale.id
        }
  
        return selectedScale.id === scale.id;
      }

      return false;

    },

    getOptionsJoined(scale) {
      return scale.itens.map(item=>item.descricao).join(', ')
    },

    //Events

    containerDropdownClickOutside(e) {

      const targetEl = e.target;
      const parentEl = targetEl.parentElement;

      if(this.active && (!targetEl.classList.contains('form-control') && !parentEl.classList.contains('form-control'))) {
        this.active = false;
      }

    },

    fromControlClick(e) {
      this.active = !this.active;
    },

    optionItemClick(e, scale) {
     
      this.$emit('option-item-click', scale);
      
      this.active = false;

    },

  },//methods
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

.component-dropdown-scale {
  position: relative;
}

.form-control {
    cursor: pointer;
}

.form-control.active {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(0 0 0 / 15%);
}

.form-control i {
  font-size: 0.8em;
  position: relative;
  top: 2px;
}

.container-dropdown {
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: absolute;
  z-index: 1000;
}

.container-dropdown .container-option-items {
  max-height: 200px;
  overflow: auto;
}

.container-dropdown .container-option-item {
  cursor: pointer;
  padding: 0.5rem 0.75rem;
}

.container-dropdown .container-option-item:hover {
  background-color: #533EEC;
}

.container-dropdown .container-option-item:hover *,
.container-dropdown .container-option-item.active:hover *
{
  color: #fff;
  opacity: 1 !important;
}

.container-dropdown .container-option-item.active * {
  color: #533EEC;
  opacity: 1 !important;
}

.container-dropdown .container-option-item:not(:last-child) {
  border-bottom: 1px solid #ced4da;
}

.container-dropdown .container-option-item .container-name {
  font-size: 0.9em;
}

.container-dropdown .container-option-item .container-options {
  font-size: 0.7em;
  opacity: 0.5;
  
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

@media (max-width: 991px) {

  .container-dropdown .container-option-item .container-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

}

@media (min-width: 992px) {

  .container-dropdown .container-option-item .container-name {
    max-width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

}
</style>
