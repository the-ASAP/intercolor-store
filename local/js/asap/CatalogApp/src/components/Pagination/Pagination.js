export const Pagination = {
  props: {
    pagination: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['updatePage'],
  methods: {
    onChangePage(page) {
      if (
        page == 0 ||
        page > this.pagination.totalPages ||
        this.pagination.currentPage == page
      )
        return;
      this.$emit('updatePage', page);
    },
  },
  template: `
    <nav>
      <ul class="pagination__list">
        <li>
          <button class="page-btn page-btn--first" @click="onChangePage(1)">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 16L17.5 12L13.5 8"
                stroke="var(--color-stroke-dark)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.5 17L11.5 12L6.5 7"
                stroke="var(--color-stroke-dark)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </li>
        <li>
          <button class="page-btn page-btn--prev" @click="onChangePage(pagination.currentPage - 1)">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10L12 14L16 10"
                stroke="var(--color-stroke-dark)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </li>

        <li v-for="page in 5">
          <button class="page-btn" :class="{'page-btn--active': page == pagination.currentPage }" @click="onChangePage(page)">{{page}}</button>
        </li>

        <li>
          <div class="page-btn--ellipsis">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5027 18.5002C18.5027 18.7765 18.2788 19.0004 18.0025 19.0004C17.7263 19.0004 17.5023 18.7765 17.5023 18.5002C17.5023 18.224 17.7263 18 18.0025 18C18.2788 18 18.5027 18.224 18.5027 18.5002"
                stroke="var(--color-stroke-dark)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.5002 18.5002C12.5002 18.7765 12.2762 19.0004 12 19.0004C11.7237 19.0004 11.4998 18.7765 11.4998 18.5002C11.4998 18.224 11.7237 18 12 18C12.2762 18 12.5002 18.224 12.5002 18.5002"
                stroke="var(--color-stroke-dark)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.49773 18.5002C6.49773 18.7765 6.27378 19.0004 5.99752 19.0004C5.72127 19.0004 5.49731 18.7765 5.49731 18.5002C5.49731 18.224 5.72127 18 5.99752 18C6.27378 18 6.49773 18.224 6.49773 18.5002"
                stroke="var(--color-stroke-dark)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>

        <li>
          <button class="page-btn" :class="{'page-btn--active': pagination.currentPage == pagination.totalPages }" @click="onChangePage(pagination.totalPages)">{{pagination.totalPages}}</button>
        </li>

        <li>
          <button class="page-btn page-btn--next" @click="onChangePage(pagination.currentPage + 1)">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10L12 14L16 10"
                stroke="var(--color-stroke-dark)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </li>
        <li>
          <button class="page-btn page-btn--last" @click="onChangePage(pagination.totalPages)">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 16L17.5 12L13.5 8"
                stroke="var(--color-stroke-dark)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.5 17L11.5 12L6.5 7"
                stroke="var(--color-stroke-dark)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  `,
};
