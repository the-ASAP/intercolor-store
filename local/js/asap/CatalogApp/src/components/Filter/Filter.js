import { Accordion } from '../Accordion/Accordion';
import './Filter.css';

export const Filter = {
  components: {
    Accordion,
  },
  props: {
    filters: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['updateFilters', 'clearFilters'],
  data() {
    return {
      selectedFilters: {
        brands: [],
        delivery: '',
      },
    };
  },
  computed: {
    filtersCount() {
      let count = 0;
      const brands = this.selectedFilters.brands.length;
      const delivery = this.selectedFilters.delivery ? 1 : 0;
      count = brands + delivery;
      return count;
    },
  },
  methods: {
    applyFilters() {
      this.$emit('updateFilters', this.selectedFilters);
    },
    clearFilters() {
      this.selectedFilters.brands = [];
      this.selectedFilters.delivery = '';
      this.$emit('clearFilters');
    },
  },
  template: `
    <div class="filter">
      <a class="filter__all-category" href="">
        <svg class="filter__all-category-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7.08301 5.00065H17.083" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.91699 5.00065H3.75033" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.91699 10.0007H3.75033" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.91699 15.0007H3.75033" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.08301 10.0007H17.083" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.08301 15.0007H17.083" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Все категории
      </a>
      <Accordion class="filter__separator">
        <template #title>
          <p>Бренд</p>
        </template>
        <template #content>
          <div class="filter__group-container">
            <div class="v-checkbox" v-for="filter in filters.manufacturer" :key="filter.id">
              <label class="v-checkbox__label v-checkbox__input-wrap">
                <input class="v-checkbox__input" type="checkbox" name="brand" :value="filter.name" v-model="selectedFilters.brands"/>
                <svg class="v-checkbox__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6.5L9 17.5L4 12.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{filter.name}}
              </label>
            </div>
          </div>
        </template>
      </Accordion>
      <Accordion class="filter__separator">
        <template #title>
          <p>Срок доставки</p>
        </template>
        <template #content>
          <div class="filter__group-container">
            <div class="v-checkbox" v-for="filter in filters.delivery" :key="filter.id">
              <label class="v-checkbox__label v-checkbox__input-wrap">
                <input class="radio" name="delivery" type="radio" :value="filter.value" v-model="selectedFilters.delivery"/>
                {{filter.value}}
              </label>
            </div>
          </div>          
        </template>
      </Accordion>
      <div class="filter__buttons">
        <button class="btn btn--dark btn--text" @click="applyFilters">
          Применить
          <span v-if="filtersCount">({{filtersCount}})</span>          
        </button>
        <button class="filter__button-reset btn btn--text" @click="clearFilters">
          Сбросить
        </button>
      </div>
    </div>
  `,
};
