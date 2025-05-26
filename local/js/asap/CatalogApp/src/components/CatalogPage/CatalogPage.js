import { mapActions, mapState } from 'ui.vue3.pinia';
import { useCatalogStore } from '../../store/store';
import { Filter } from '../Filter/Filter';
import { ProductList } from '../ProductList/ProductList';
import { Search } from '../Search/Search';
import { Select } from '../Select/Select';
import './CatalogPage.css';

export const CatalogPage = {
  components: {
    ProductList,
    Search,
    Filter,
    Select,
  },
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState(useCatalogStore, ['query', 'filter', 'sorting']),
  },
  methods: {
    ...mapActions(useCatalogStore, ['setQuery', 'setSort', 'setFliters']),
  },
  template: `
    <div class="catalog-page">
      <Search class="catalog-page__search" :query="query" @update-query="setQuery"/>
      <div class="catalog-page__header-container">
        <h1>Каталог</h1>
        <Select :options="sorting.sort" @update-select="setSort"/>
      </div>
      <Filter class="catalog-page__filter" :filters="filter.characteristics" @update-filters="setFliters"/>
      <ProductList />
    </div>
  `,
};
