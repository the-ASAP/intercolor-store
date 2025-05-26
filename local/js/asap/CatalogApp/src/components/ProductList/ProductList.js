import { mapActions, mapState } from 'ui.vue3.pinia';
import { useCatalogStore } from '../../store/store';
import { Pagination } from '../Pagination/Pagination';
import './ProductList.css';

export const ProductList = {
  components: { Pagination },
  computed: {
    ...mapState(useCatalogStore, ['products', 'pagination']),
  },
  methods: {
    ...mapActions(useCatalogStore, ['setPage']),
  },
  template: `
    <div>      
      <div v-if="products.length" class="product-list">
        <ul class="">
          <li v-for="product in products" :key="product.id" class="list__item product-item">
            <div class="product-item__info">
              <div class="card card-thumb">
                <img
                  class="card-thumb__img"
                  :src="product.image"
                  alt=""
                />
              </div>
              <div>
                <div class="product-item__title">{{product.name}}</div>
                <div class="product-item__sku caption">Арт. {{product.sku}}</div>
              </div>
            </div>

            <div class="product-item__stock">
              <div class="product-item__stock-storage">
                <span class="caption">Москва:</span><span class="label-2">116 000</span>
              </div>
              <div class="product-item__stock-storage">
                <span class="caption">С.Петерб:</span
                ><span class="label-2">116 000</span>
              </div>
            </div>

            <div class="input-container input-container--quantity">
              <div class="input-field quantity-input">
                <button class="quantity-control" data-action="minus">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.28516 10H14.7132"
                      stroke="#323232"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <input type="number" class="quantity-value" value="100000" />
                <button class="quantity-control" data-action="plus">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.28516 10H14.7132"
                      stroke="#323232"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.9992 5.28595V14.714"
                      stroke="#323232"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="product-item__price number-1">2 250 000 ₽</div>

            <button class="btn btn--icon-only--large btn--dark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.96905 6.625L5.30205 3.625H3.37305"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.73099 14.835L5.96899 6.625H18.627C19.264 6.625 19.738 7.212 19.605 7.835L18.103 14.835C18.004 15.296 17.597 15.625 17.125 15.625H8.70799C8.23699 15.625 7.82999 15.296 7.73099 14.835Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.465 19.25C17.258 19.25 17.09 19.418 17.092 19.625C17.092 19.832 17.26 20 17.467 20C17.674 20 17.842 19.832 17.842 19.625C17.841 19.418 17.673 19.25 17.465 19.25"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.85605 19.25C8.64905 19.25 8.48105 19.418 8.48305 19.625C8.48205 19.832 8.65005 20 8.85705 20C9.06405 20 9.23205 19.832 9.23205 19.625C9.23205 19.418 9.06405 19.25 8.85605 19.25"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </li>
        </ul>
        <Pagination :pagination="pagination" @update-page="setPage"/>
      </div>
      <div v-else class="product-list-empty">
          Найдено 0 товаров
      </div>
    </div>    
  `,
};
