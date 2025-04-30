import { createPinia, defineStore } from 'ui.vue3.pinia';

export const store = createPinia();

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    query: '',
    products: [],
    filter: {
      availability: [],
      price: { min: 0, max: Infinity, ranges: [] },
      properties: [],
      delivery: [],
    },
    sort: '',
    pagination: {
      currentPage: 1,
      totalPages: 1,
    },
    loading: false,
  }),
  getters: {
    sorted() {
      console.log('computed');
      return this.products.slice().sort((a, b) => a.id - b.id);
    },
  },
  actions: {
    send() {
      console.log('send');
      return this.products.push({
        id: this.products.length,
        name: `товар${this.products.length}`,
      });
    },
    async fetchStore() {
      console.log('fetch');
      await fetch('https://managers.intercolor.asap-lp.ru/api/v1/catalog/')
        .then((res) => res.json())
        .then((data) => {
          this.products = data.section[169].items;
        });
    },
  },
});
