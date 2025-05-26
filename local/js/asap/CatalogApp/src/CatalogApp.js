import { BitrixVue } from 'ui.vue3';
import { mapActions } from 'ui.vue3.pinia';
import { CatalogPage } from './components/CatalogPage/CatalogPage';
import { store, useCatalogStore } from './store/store';

export class CatalogApp {
  #app;
  #data;

  constructor(rootNode, data) {
    this.rootNode = document.querySelector(rootNode);
    this.#data = data;
  }

  init() {
    this.initApp();
  }

  initApp() {
    const context = this;

    this.#app = BitrixVue.createApp({
      name: 'CatalogApp',
      components: {
        CatalogPage,
      },
      data() {
        return {
          params: context.#data,
        };
      },
      methods: {
        ...mapActions(useCatalogStore, ['fetchCatalog']),
      },
      beforeCreate() {
        this.$bitrix.Application.set(context);
      },
      created() {
        this.fetchCatalog();
      },
      template: `<CatalogPage :params='params'/>`,
    });
    this.#app.use(store);
    this.#app.mount(this.rootNode);
  }
}
