import { mapActions, mapState } from 'ui.vue3.pinia';
import { useCatalogStore } from '../../store/store';

export const CatalogPage = {
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState(useCatalogStore, ['products', 'sorted']),
  },
  methods: {
    ...mapActions(useCatalogStore, ['send']),
  },
  template: `
  <div v-for="{id, name} in products" :key="id">
    <div>{{id}}</div>
    <div>{{name}}</div>
  </div>
  <hr/>
  <div v-for="{id, name} in sorted" :key="id">
    <div>{{id}}</div>
    <div>{{name}}</div>
  </div>
  <button @click="send">sendbtn</button>
  `,
};
