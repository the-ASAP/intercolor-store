import { debounce } from 'lodash';
import './Search.css';

export const Search = {
  props: {
    query: String,
  },
  emits: ['updateQuery'],
  data() {
    return {
      searchQuery: '',
    };
  },
  watch: {
    searchQuery() {
      this.debouncedSearch();
    },
  },
  methods: {
    search() {
      if (this.searchQuery !== this.query) {
        this.$emit('updateQuery', this.searchQuery);
      }
    },
  },
  created() {
    this.debouncedSearch = debounce(this.search, 300);
  },
  unmounted() {
    this.debouncedSearch.cancel();
  },
  template: `
    <div class="catalog-search">
      <input
        type="search"
        class="catalog-search__input input-field input-search input-search--tall"
        v-model.trim="searchQuery"
      />
      <button class="catalog-search__submit btn btn--dark btn--text--large" @click="debouncedSearch">
        Найти
      </button>
    </div>
  `,
};
