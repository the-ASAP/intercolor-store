import { createPinia, defineStore } from 'ui.vue3.pinia';

export const store = createPinia();

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    query: '',
    products: [],
    filter: {},
    sorting: {},
    sort: '',
    pagination: {
      currentPage: 1,
      totalPages: 10,
    },
    loading: false,
  }),
  getters: {
    getParams(state) {
      return {
        query: state.query,
        sort: state.sort,
        page: state.pagination.currentPage,
      };
    },
  },
  actions: {
    async fetchCatalog(params = this.getParams) {
      this.loading = true;

      try {
        const url = this.buildUrl(params);
        console.log(url);
        const responce = await fetch(url);
        const data = await responce.json();

        this.products = data.items;
        this.sorting = data.sorting;
        this.filter = data.filter;
        this.pagination.totalPages =
          data.totalPages ?? this.pagination.totalPages;
        this.pagination.currentPage =
          data.currentPage ?? this.pagination.currentPage;

        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    buildUrl({ query, sort, page }) {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (sort) params.append('sort', sort);
      if (page) params.append('page', page);
      return `https://managers.intercolor.asap-lp.ru/api/v1/catalog/section/?${params.toString()}`;
    },

    setQuery(query) {
      if (this.query === query) return;
      this.query = query;
      this.pagination.currentPage = 1;
      if (query) {
        this.fetchCatalog();
      }
    },

    setPage(page) {
      if (this.pagination.currentPage === page) return;
      this.pagination.currentPage = page;
      this.fetchCatalog();
    },

    setSort(option) {
      if (JSON.stringify(this.sort) === JSON.stringify(option)) return;
      this.pagination.currentPage = 1;
      this.sort = option.value;
      this.fetchCatalog();
    },
  },
});
