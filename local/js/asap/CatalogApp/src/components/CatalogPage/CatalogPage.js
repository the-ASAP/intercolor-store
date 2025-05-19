import { mapActions, mapState } from 'ui.vue3.pinia';
import { useCatalogStore } from '../../store/store';
import { ProductList } from '../ProductList/ProductList';
import { Search } from '../Search/Search';
import './CatalogPage.css';

export const CatalogPage = {
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ProductList,
    Search,
  },
  computed: {
    ...mapState(useCatalogStore, ['query']),
  },
  methods: {
    ...mapActions(useCatalogStore, ['setQuery']),
  },
  template: `
    <div class='catalog-page'>
      <Search :query="query" @update-query="setQuery"/>
      <ProductList />
    </div>
  `,
};
