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
  emits: ['updateFilters'],
  data() {
    return {
      selectedFilters: {
        brands: {},
        delivery: '',
      },
    };
  },
  computed: {},
  methods: {
    onSelectFilter(key, value) {
      switch (key) {
        case 'brands':
          if (this.selectedFilters[key][value]) {
            delete this.selectedFilters[key][value];
          } else {
            this.selectedFilters[key][value] = value;
          }
          break;
        default:
          this.selectedFilters[key] = value;
          break;
      }
    },
    applyFilters() {
      this.$emit('updateFilters', this.selectedFilters);
    },
  },
  template: `
    <div class="filter">
      <a class="filter__all-category" href="/catalog/sections/">
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
                <input class="v-checkbox__input" type="checkbox" name="brand" :value="filter.name" @change="onSelectFilter('brands', filter.name)"/>
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
                <input class="radio" name="delivery" type="radio" :value="filter.value" @change="onSelectFilter('delivery', filter.value)"/>
                {{filter.value}}
              </label>
            </div>
          </div>          
        </template>
      </Accordion>
      <div class="filter__buttons">
        <button class="btn btn--dark btn--text" @click="applyFilters">
          Применить          
        </button>
        <button class="filter__button-reset btn btn--text">
          Сбросить
        </button>
      </div>
    </div>
  `,
};
